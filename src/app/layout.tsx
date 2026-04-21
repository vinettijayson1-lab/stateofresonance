import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/layout/HeaderNav";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import Analytics from "@/components/layout/Analytics";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import ExitIntentPopup from "@/components/layout/ExitIntentPopup";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | State of Resonance",
    default: "State of Resonance | Occult Luxury Streetwear",
  },
  description: "Exclusive, alchemically-inspired streetwear designed to elevate your resonance. Limited drops. Premium fabrics. Unseen architecture.",
  keywords: ["occult streetwear", "luxury streetwear", "esoteric clothing", "alchemy apparel", "state of resonance"],
  alternates: {
    canonical: "https://stateofresonance.ca",
  },
  other: {
    "facebook-domain-verification": "5mwd35tiaxnja0398tp7ct5dc1x1dr",
    "google-site-verification": "FsFIRctLjbwsOkCtvffNKYyvSC02fra-Z79OQ6sDtWs",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground bg-noise relative">
        <AnnouncementBar />
        <HeaderNav />
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5 bg-[url('/luxury-occult-bg.png')] bg-cover bg-center mix-blend-overlay" />
        <main className="flex-1 flex flex-col relative z-0">{children}</main>
        <Footer />
        <CartSidebar />
        <ExitIntentPopup />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />

        {/* Judge.me Floating Review Button */}
        <div className="jdgm-widget jdgm-floating-reviews-tab" />

        {/* Judge.me Widget Scripts */}
        <Script id="judge-me-config" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `jdgm=window.jdgm||{};jdgm.SHOP_DOMAIN='state-of-resonance.myshopify.com';jdgm.PLATFORM='shopify';jdgm.PUBLIC_TOKEN='-V1Ltj5NCRp5rGiOoAB6tIZNG3s';` }} />
        <Script id="judge-me-preloader" data-cfasync="false" src="https://cdnwidget.judge.me/widget_preloader.js" strategy="lazyOnload" />

        {/* TrustIndex — Widget Loader (renders visible review widget) */}
        <Script id="trustindex-loader" src="https://cdn.trustindex.io/loader.js?2344a8869a5f373c8f9603a105f" strategy="lazyOnload" />
        {/* TrustIndex — Feed/Carousel Widget */}
        <Script id="trustindex-feed" src="https://cdn.trustindex.io/loader-feed.js?23e85926815b0989143629301fc" strategy="lazyOnload" />
        {/* TrustIndex — Trust Certificate */}
        <Script id="trustindex-cert" src="https://cdn.trustindex.io/loader-cert.js?ef204277027f181fb316fe34015" strategy="lazyOnload" />
        {/* TrustIndex — Rich Snippets (Google star ratings in search) */}
        <Script id="trustindex-richsnippet" src="https://cdn.trustindex.io/assets/js/richsnippet.js?4ac058435219g3d9" strategy="lazyOnload" />
      </body>
    </html>
  );
}
