import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

/**
 * Meta Conversions API (CAPI) Bridge
 * State of Resonance
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { eventName, eventData, userData } = req.body;
  
  const PIXEL_ID = process.env.FB_PIXEL_ID;
  const ACCESS_TOKEN = process.env.FB_CAPI_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return res.status(500).json({ error: 'CAPI Credentials Missing' });
  }

  try {
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          user_data: {
            client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            client_user_agent: req.headers['user-agent'],
            ...userData
          },
          custom_data: eventData
        }
      ]
    };

    await axios.post(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events`,
      payload,
      { params: { access_token: ACCESS_TOKEN } }
    );

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('CAPI Error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to send to CAPI' });
  }
}
