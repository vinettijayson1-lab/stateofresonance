export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 })
  }

  try {
    const body = await req.json()
    const { eventName, eventId, eventSourceUrl, user, customData } = body

    const META_PIXEL_ID = process.env.META_PIXEL_ID || '929763562840150'
    const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN

    if (!META_CAPI_TOKEN) {
      // If no token is provided, just return success to prevent 404s on the frontend
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'CAPI stubbed. Add META_CAPI_TOKEN to enable server-side tracking.',
        received: eventName
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Forward to Meta Conversions API
    const metaResponse = await fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [{
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_id: eventId,
          event_source_url: eventSourceUrl,
          user_data: {
            em: user?.email ? [await hashData(user.email)] : undefined,
            client_ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
            client_user_agent: req.headers.get('user-agent'),
          },
          custom_data: customData
        }],
        access_token: META_CAPI_TOKEN
      })
    })

    const result = await metaResponse.json()
    
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error: any) {
    console.error('CAPI Error:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: error.message }), { status: 500 })
  }
}

// Meta requires SHA-256 hashed user data
async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
