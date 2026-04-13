import type { VercelRequest, VercelResponse } from '@vercel/node';

// Fallback verify token for local configuration
const VERIFY_TOKEN = process.env.IG_VERIFY_TOKEN || 'RESONANCE_SECURE_TOKEN_963';
const PAGE_ACCESS_TOKEN = (process.env.IG_ACCESS_TOKEN || '').trim();

// Hardcoded Phone ID scraped from Meta Dashboard
const WHATSAPP_PHONE_ID = '998280930044799';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Meta Webhook Verification (GET request during App Setup)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'] as string;
    const token = req.query['hub.verify_token'] as string;
    const challenge = req.query['hub.challenge'] as string;

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        return res.status(200).send(challenge);
      } else {
        return res.status(403).json({ error: 'Verification failed' });
      }
    }
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // 2. Handling Incoming Messages (POST request)
  if (req.method === 'POST') {
    const body = req.body;

    // A. INSTAGRAM ROUTING
    if (body.object === 'instagram') {
      if (body.entry && Array.isArray(body.entry)) {
        for (const entry of body.entry) {
          if (entry.messaging && Array.isArray(entry.messaging)) {
            for (const webhookEvent of entry.messaging) {
              if (webhookEvent.message && webhookEvent.message.text) {
                const senderIgsid = webhookEvent.sender.id;
                const messageText = webhookEvent.message.text.trim().toLowerCase();

                if (messageText.includes('resonance')) {
                  await dispatchInstagramPassword(senderIgsid);
                }
              }
            }
          }
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    } 
    
    // B. WHATSAPP ROUTING
    else if (body.object === 'whatsapp_business_account') {
      if (body.entry && Array.isArray(body.entry)) {
        for (const entry of body.entry) {
          if (entry.changes && Array.isArray(entry.changes)) {
            for (const change of entry.changes) {
              if (change.value && change.value.messages && Array.isArray(change.value.messages)) {
                for (const msg of change.value.messages) {
                  if (msg.type === 'text' && msg.text && msg.text.body) {
                    const senderWaId = msg.from; // User's WhatsApp number
                    const messageText = msg.text.body.trim().toLowerCase();

                    if (messageText.includes('resonance')) {
                      await dispatchWhatsAppPassword(senderWaId);
                    }
                  }
                }
              }
            }
          }
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    }

    // Unrecognized Object
    return res.status(404).send('UNRECOGNIZED_META_EVENT');
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// ----------------------------------------------------------------------------
// DISPATCHERS
// ----------------------------------------------------------------------------

async function dispatchInstagramPassword(recipientIgId: string) {
  if (!PAGE_ACCESS_TOKEN) return;

  const payload = {
    recipient: { id: recipientIgId },
    message: {
      text: "Seeker, your frequency is acknowledged. The Vault Password is: RESONANCE963\n\nEnter the Sanctuary: https://stateofresonance.ca/gate"
    }
  };

  try {
    await fetch(`https://graph.instagram.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('[IG Webhook] Network exception:', err);
  }
}

async function dispatchWhatsAppPassword(recipientWaId: string) {
  if (!PAGE_ACCESS_TOKEN) return;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientWaId,
    type: "text",
    text: {
      preview_url: true,
      body: "Seeker, your frequency is acknowledged. The Vault Password is: *RESONANCE963*\n\nEnter the Sanctuary: https://stateofresonance.ca/gate"
    }
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${PAGE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const err = await response.json();
        console.error('[WA Webhook] Error sending reply:', JSON.stringify(err));
    } else {
        console.log(`[WA Webhook] Transmitted password to phone: ${recipientWaId}`);
    }
  } catch (err) {
    console.error('[WA Webhook] Network exception:', err);
  }
}
