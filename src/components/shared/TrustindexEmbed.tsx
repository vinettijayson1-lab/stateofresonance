'use client';

import Script from 'next/script';

/**
 * Trustindex review widget embed using the official script tag approach.
 * 
 * The widget scripts are:
 * - Main widget: https://cdn.trustindex.io/loader.js?2344a8869a5f373c8f9603a105f
 * - Feed widget: https://cdn.trustindex.io/loader-feed.js?cabe8cb70335182b45167fb72cb
 * 
 * To change the widget, update the script src with your Trustindex widget code.
 * Get your embed code from: https://admin.trustindex.io/
 */
export default function TrustindexEmbed() {
  return (
    <div className="w-full flex justify-center">
      {/* 
        Trustindex widget container - the script injects the widget here.
        Make sure to replace the src with your actual widget code from Trustindex dashboard.
      */}
      <div className="w-full max-w-4xl">
        {/* Main review widget */}
        <Script
          src="https://cdn.trustindex.io/loader.js?2344a8869a5f373c8f9603a105f"
          strategy="lazyOnload"
        />
      </div>
    </div>
  );
}
