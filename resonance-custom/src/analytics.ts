/**
 * Analytics Interface
 * State of Resonance
 */

export const trackEvent = (eventName: string, properties: any = {}) => {
  console.log(`[Analytics] Event: ${eventName}`, properties);
  
  // Facebook Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', eventName, properties);
  }
  
  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }

  // Conversions API (Server-Side Bridge)
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName,
      eventData: properties,
      userData: {
        // We can add hashed email/phone here if we have it
      }
    })
  }).catch(err => console.error('CAPI Bridge Error:', err));
};

export const initPixel = (_pixelId: string) => {
    if ((window as any).fbq) return;
    const n = (window as any).fbq = function() {
        (n as any).callMethod ? (n as any).callMethod.apply(n, arguments) : (n as any).queue.push(arguments);
    };
    if (!(window as any)._fbq) (window as any)._fbq = n;
    (n as any).push = n;
    (n as any).loaded = !0;
    (n as any).version = '2.0';
    (n as any).queue = [];
};
