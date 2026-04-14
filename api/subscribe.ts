import type { VercelRequest, VercelResponse } from '@vercel/node'

// Klaviyo API v3 integration
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, phone, source, properties, sms_consent } = req.body
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' })

  // Use KLAVIYO_API_KEY (the env var set in Vercel)
  const apiKey = process.env.KLAVIYO_API_KEY || process.env.KLAVIYO_PRIVATE_API_KEY

  // Route Inner Circle signups to their own list if configured, else fall back to main
  const isInnerCircle = source?.toLowerCase().includes('inner circle') || properties?.tier === 'inner_circle_prospect'
  const listId = (isInnerCircle && process.env.KLAVIYO_INNER_CIRCLE_LIST_ID)
    ? process.env.KLAVIYO_INNER_CIRCLE_LIST_ID
    : process.env.KLAVIYO_LIST_ID

  // Graceful degradation
  if (!apiKey) {
    console.log('[Subscribe Mock] Email captured:', email, '| Source:', source || 'General')
    return res.status(200).json({ success: true, mode: 'mock' })
  }

  if (!listId) {
    console.warn('[Subscribe] No KLAVIYO_LIST_ID set — profile will be created but not added to a list')
  }

  try {
    // Merge in source-specific custom properties
    const mergedProps: any = { ...(properties || {}) }
    if (isInnerCircle) {
      mergedProps.inner_circle_prospect = true
      mergedProps.inner_circle_request_source = source || 'Inner Circle Gate'
      mergedProps.inner_circle_request_date = new Date().toISOString()
    }

    const profileAttributes: any = {
      email: email,
      properties: mergedProps
    }

    if (phone) {
      profileAttributes.phone_number = phone
    }

    // Set up subscriptions
    const subscriptions: any = {
      email: {
        marketing: {
          consent: 'SUBSCRIBED'
        }
      }
    }

    if (phone && sms_consent) {
      subscriptions.sms = {
        marketing: {
          consent: 'SUBSCRIBED'
        }
      }
    }

    const response = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'accept': 'application/json',
        'content-type': 'application/json',
        'revision': '2024-02-15'
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            custom_source: source || 'Resonance Shop',
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    ...profileAttributes,
                    subscriptions: subscriptions
                  }
                }
              ]
            }
          },
          ...(listId ? {
            relationships: {
              list: {
                data: { type: 'list', id: listId }
              }
            }
          } : {})
        }
      })
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('[Subscribe] Klaviyo error:', err)
      // 409 = profile already subscribed — treat as success
      if (response.status === 409) return res.status(200).json({ success: true, note: 'already_subscribed' })
      return res.status(500).json({ error: 'Synchronization failed' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[Subscribe] Server Error:', err)
    return res.status(500).json({ error: 'Connection lost' })
  }
}
