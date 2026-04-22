import { NextResponse } from 'next/server';

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
const KLAVIYO_LIST = process.env.KLAVIYO_LIST_ID;

export async function POST(request: Request) {
  try {
    const { email, phone } = await request.json();

    const hasEmail = email && email.includes('@');
    const hasPhone = phone && phone.trim().length >= 7;

    if (!hasEmail && !hasPhone) {
      return NextResponse.json({ error: 'Email or phone required.' }, { status: 400 });
    }

    if (!KLAVIYO_KEY || !KLAVIYO_LIST) {
      console.warn('Klaviyo keys missing — simulating subscription for:', email || phone);
      return NextResponse.json({ success: true, simulated: true });
    }

    // Build profile attributes dynamically based on what was provided
    const attributes: Record<string, unknown> = {};
    const subscriptions: Record<string, unknown> = {};

    if (hasEmail) {
      attributes.email = email;
      subscriptions.email = { marketing: { consent: 'SUBSCRIBED' } };
    }

    if (hasPhone) {
      // Ensure E.164 format — prepend +1 if no country code provided
      attributes.phone_number = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;
      subscriptions.sms = { marketing: { consent: 'SUBSCRIBED' } };
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
            custom_source: 'Resonance Exit Intent',
            profiles: {
              data: [{ type: 'profile', attributes: { ...attributes, subscriptions } }],
            },
          },
          relationships: { list: { data: { type: 'list', id: KLAVIYO_LIST } } },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Klaviyo error:', err);
      return NextResponse.json({ error: 'Klaviyo API error.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Subscribe error:', e);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
