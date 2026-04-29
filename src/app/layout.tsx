import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Bebas_Neue } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/layout/HeaderNav";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import Analytics from "@/components/layout/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({ 
  variable: "--font-instrument", 
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stateofresonance.ca"),
  title: {
    template: "%s | State of Resonance",
    default: "State of Resonance | Premium Streetwear",
  },
  description: "Premium heavyweight streetwear designed for those who walk the path of inner alignment. 450gsm cotton. Limited drops. Designed in Canada.",
  keywords: ["premium streetwear", "heavyweight cotton", "esoteric clothing", "luxury streetwear", "state of resonance", "canadian streetwear"],
  alternates: {
    canonical: "https://stateofresonance.ca",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "State of Resonance",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "facebook-domain-verification": "5mwd35tiaxnja0398tp7ct5dc1x1dr",
    "google-site-verification": "FsFIRctLjbwsOkCtvffNKYyvSC02fra-Z79OQ6sDtWs",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${instrumentSerif.variable} ${bebasNeue.variable} bg-background`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <HeaderNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartSidebar />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
