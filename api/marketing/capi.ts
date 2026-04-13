import { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN
  const META_PIXEL_ID = process.env.META_PIXEL_ID
  const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
  const TIKTOK_PIXEL_CODE = process.env.TIKTOK_PIXEL_CODE

  const { eventName, eventId, eventSourceUrl, user, customData } = req.body

  if (!eventName || !customData) {
    return res.status(400).json({ error: 'Missing required CAPI payload data' })
  }

  // Cryptographic Hashing for PII (Meta Requirement)
  const hashData = (data: string) => data ? crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex') : undefined

  // Extract Request Headers (Crucial for CAPI matching)
  const clientIpAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const clientUserAgent = req.headers['user-agent']

  const hashedEmail = user?.email ? hashData(user.email) : undefined
  const hashedPhone = user?.phone ? hashData(user.phone) : undefined

  const timestamp = Math.floor(Date.now() / 1000)

  // 1. Dispatch to Meta Conversions API
  const metaPromise = async () => {
    if (!META_CAPI_TOKEN || !META_PIXEL_ID) return { status: 'skipped', reason: 'Missing Meta CAPI Keys' }

    const metaPayload = {
      data: [{
        event_name: eventName,
        event_time: timestamp,
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: 'website',
        user_data: {
          client_ip_address: clientIpAddress,
          client_user_agent: clientUserAgent,
          em: hashedEmail ? [hashedEmail] : undefined,
          ph: hashedPhone ? [hashedPhone] : undefined
        },
        custom_data: {
          currency: customData.currency,
          value: customData.value,
          content_ids: customData.contents?.map((c: any) => c.id),
          content_type: 'product',
          contents: customData.contents
        }
      }]
    }

    try {
      const response = await fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaPayload)
      })
      return { status: response.ok ? 'success' : 'failed', data: await response.json() }
    } catch (e: any) {
      return { status: 'error', error: e.message }
    }
  }

  // 2. Dispatch to TikTok Events API
  const tiktokPromise = async () => {
    if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_CODE) return { status: 'skipped', reason: 'Missing TikTok API Keys' }

    const ttPayload = {
      pixel_code: TIKTOK_PIXEL_CODE,
      event: eventName,
      event_id: eventId,
      timestamp: new Date().toISOString(),
      context: {
        user: {
          email: hashedEmail,
          phone_number: hashedPhone
        },
        user_agent: clientUserAgent,
        ip: clientIpAddress,
        page: { url: eventSourceUrl }
      },
      properties: {
        currency: customData.currency,
        value: customData.value,
        contents: customData.contents?.map((c: any) => ({
          content_id: c.id,
          content_name: c.name,
          quantity: c.quantity,
          price: c.price
        }))
      }
    }

    try {
      const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Access-Token': TIKTOK_ACCESS_TOKEN
        },
        body: JSON.stringify(ttPayload)
      })
      return { status: response.ok ? 'success' : 'failed', data: await response.json() }
    } catch (e: any) {
      return { status: 'error', error: e.message }
    }
  }

  // Execute Graph Requests Concurrently
  const [metaResult, tiktokResult] = await Promise.all([metaPromise(), tiktokPromise()])

  return res.status(200).json({
    success: true,
    diagnostics: {
      meta: metaResult,
      tiktok: tiktokResult
    }
  })
}
