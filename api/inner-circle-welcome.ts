import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Inner Circle Welcome Email Trigger
 * 
 * POSTing to this endpoint sends the Inner Circle access code
 * via a Klaviyo transactional email to the supplied address.
 * 
 * This is used by:
 * 1. The Klaviyo Flow trigger (webhook after Inner Circle list join)
 * 2. Manual trigger from the admin dashboard
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, secret } = req.body

  // Simple shared secret to prevent abuse — set INNER_CIRCLE_WEBHOOK_SECRET in Vercel env
  const webhookSecret = process.env.INNER_CIRCLE_WEBHOOK_SECRET
  if (webhookSecret && secret !== webhookSecret) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const apiKey = process.env.KLAVIYO_API_KEY || process.env.KLAVIYO_PRIVATE_API_KEY

  if (!apiKey) {
    console.log('[Inner Circle Welcome Mock] Would send code to:', email)
    return res.status(200).json({ success: true, mode: 'mock' })
  }

  const accessCode = process.env.INNER_CIRCLE_ACCESS_CODE || 'RESONANCE963'
  const templateId = process.env.KLAVIYO_INNER_CIRCLE_TEMPLATE_ID

  try {
    // Step 1: Identify/update the profile with Inner Circle status
    const identifyRes = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'accept': 'application/json',
        'content-type': 'application/json',
        'revision': '2024-02-15'
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email,
            properties: {
              inner_circle_approved: true,
              inner_circle_access_code: accessCode,
              inner_circle_approved_date: new Date().toISOString()
            }
          }
        }
      })
    })

    // 409 = profile already exists, that's fine — we'll still send the email
    if (!identifyRes.ok && identifyRes.status !== 409) {
      const err = await identifyRes.text()
      console.error('[Inner Circle] Profile update error:', err)
    }

    // Step 2: Send the welcome/access code email via Klaviyo event
    // This fires the "Inner Circle Approved" event which triggers your Klaviyo Flow
    const eventRes = await fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'accept': 'application/json',
        'content-type': 'application/json',
        'revision': '2024-02-15'
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            profile: { email },
            metric: { name: 'Inner Circle Access Granted' },
            properties: {
              AccessCode: accessCode,
              AccessURL: `https://stateofresonance.ca/inner-circle`,
              GrantedAt: new Date().toISOString(),
              Message: `Your Inner Circle access code is: ${accessCode}. Visit stateofresonance.ca/inner-circle and enter this code to unlock exclusive drops.`
            },
            time: new Date().toISOString()
          }
        }
      })
    })

    if (!eventRes.ok) {
      const err = await eventRes.text()
      console.error('[Inner Circle] Event fire error:', err)
      return res.status(500).json({ error: 'Failed to trigger welcome flow' })
    }

    console.log('[Inner Circle] Access granted and flow triggered for:', email)
    return res.status(200).json({ success: true, email, code_sent: true })

  } catch (err) {
    console.error('[Inner Circle Welcome] Error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
