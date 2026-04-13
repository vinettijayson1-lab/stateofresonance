import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, phone, cartItems, cartTotal, checkoutUrl } = req.body
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email for recovery' })

  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY

  if (!apiKey) {
    console.log('[Abandoned Cart Hook Mock] Firing recovery sequence to:', email)
    return res.status(200).json({ success: true, mode: 'mock', triggered: true })
  }

  try {
    // Send "Abandoned Checkout" custom metric event to Klaviyo V3
    const response = await fetch('https://a.klaviyo.com/api/events/', {
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
            profile: {
              email: email,
              phone_number: phone || undefined
            },
            metric: {
              name: 'Checkout Abandoned (Resonance)'
            },
            properties: {
              CheckoutURL: checkoutUrl,
              ItemNames: cartItems.map((item: any) => item.title),
              ItemCount: cartItems.length,
              $value: cartTotal,
              Items: cartItems
            },
            time: new Date().toISOString()
          }
        }
      })
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('[Abandoned Cart Hook] Klaviyo V3 error:', JSON.stringify(err))
      return res.status(500).json({ error: 'Failed to trigger recovery sequence' })
    }

    return res.status(200).json({ success: true, message: 'Recovery sequence initiated' })
  } catch (err) {
    console.error('[Abandoned Cart Hook] Server Error:', err)
    return res.status(500).json({ error: 'Connection lost' })
  }
}
