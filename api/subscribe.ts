import type { VercelRequest, VercelResponse } from '@vercel/node'

// Klaviyo API v3 integration
// USAGE: https://developers.klaviyo.com/en/reference/create_client_subscription
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, phone, source, properties, sms_consent } = req.body
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' })

  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY
  const listId = process.env.KLAVIYO_LIST_ID

  // Graceful degradation for local development/mocking
  if (!apiKey || !listId) {
    console.log('[Subscribe Mock] Email captured:', email, '| Phone:', phone, '| Source:', source || 'General')
    return res.status(200).json({ success: true, mode: 'mock' })
  }

  try {
    const profileAttributes: any = {
      email: email,
      properties: properties || {}
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
          relationships: {
            list: {
              data: {
                type: 'list',
                id: listId
              }
            }
          }
        }
      })
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('[Subscribe] Klaviyo V3 error:', JSON.stringify(err))
      return res.status(500).json({ error: 'Synchronization failed' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[Subscribe] Server Error:', err)
    return res.status(500).json({ error: 'Connection lost' })
  }
}
