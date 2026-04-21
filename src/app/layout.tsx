import type { Metadata } from "next";
import Script from "next/script";
// Note: Leave your existing imports here (like fonts, globals.css, headers, etc.)
import "./globals.css";

export const metadata: Metadata = {
  title: "State of Resonance",
  description: "Premium occult streetwear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Your navigation or header components go here if you have them */}

        {children}

        {/* --- JUDGE.ME SCRIPTS --- */}
        <Script id="judgeme-config" strategy="beforeInteractive">
          {`
            window.jdgm = window.jdgm || {};
            window.jdgm.SHOP_DOMAIN = 'state-of-resonance.myshopify.com';
            window.jdgm.PLATFORM = 'shopify';
          `}
        </Script>
        <Script 
          src="https://cdn1.judge.me/assets/installed.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}