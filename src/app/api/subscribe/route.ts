import { NextResponse } from 'next/server';

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
const KLAVIYO_LIST = process.env.KLAVIYO_LIST_ID;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    if (!KLAVIYO_KEY || !KLAVIYO_LIST) {
      console.warn('Klaviyo keys missing — simulating subscription for:', email);
      return NextResponse.json({ success: true, simulated: true });
    }

    const res = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_KEY}`,
        accept: 'application/json',
        revision: '2023-02-22',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            custom_source: 'Resonance Masterplan',
            profiles: {
              data: [{ type: 'profile', attributes: { email, subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } } } }],
            },
          },
          relationships: { list: { data: { type: 'list', id: KLAVIYO_LIST } } },
        },
      }),
    });

    if (!res.ok) return NextResponse.json({ error: 'Klaviyo API error.' }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
