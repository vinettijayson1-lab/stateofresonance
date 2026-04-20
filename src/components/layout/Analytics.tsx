'use client';

import Script from 'next/script';

export default function Analytics() {
  const FB_PIXEL_ID = '1274953901410673';
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-1Q6RNL65J4';
  const CLARITY_TAG = process.env.NEXT_PUBLIC_CLARITY_TAG || 'w1rmxt8w4b';

  return (
    <>
      {/* ---------- META PIXEL ---------- */}
      <Script id="fb-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${FB_PIXEL_ID}');
        fbq('track','PageView');
      `}} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
      </noscript>

      {/* ---------- GA4 & GOOGLE ADS ---------- */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-and-ads" strategy="afterInteractive">{`
        window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}
        gtag('js',new Date());
        gtag('config','${GA_ID}');
        gtag('config','AW-18006931785');
      `}</Script>

      {/* ---------- MICROSOFT CLARITY ---------- */}
      <Script id="ms-clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_TAG}");
      `}} />

      {/* ---------- KLAVIYO ONSITE ---------- */}
      {process.env.NEXT_PUBLIC_KLAVIYO_SITE_ID && (
        <Script src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_SITE_ID}`} strategy="afterInteractive" />
      )}
    </>
  );
}
