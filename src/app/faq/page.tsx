import type { Metadata } from "next";
import ScrollReveal from "@/components/shared/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about State of Resonance shipping, returns, sizing, production, and philosophy.",
  alternates: { canonical: "https://stateofresonance.ca/faq" },
};

const faqs = [
  { 
    q: "What makes your pieces different from other streetwear?", 
    a: "Every piece is crafted from 450gsm heavyweight cotton, features double-stitched seams, and carries sacred geometry symbols with deep intentional meaning. We produce in limited batches of 10 units or fewer, ensuring true exclusivity." 
  },
  { 
    q: "How does sizing work?", 
    a: "All of our pieces are designed with an oversized, drop-shoulder silhouette. We recommend ordering your true size for the intended oversized look, or sizing down one for a more fitted feel. Check our size guide on each product page for exact measurements." 
  },
  { 
    q: "Where do you ship?", 
    a: "We ship across Canada and internationally. Orders over $150 CAD qualify for free shipping. Standard delivery takes 3-7 business days within Canada and 7-14 days internationally." 
  },
  { 
    q: "What is your return policy?", 
    a: "We offer a 14-day return window for unworn items with original tags attached. Items must be in original condition. Final sale items are non-returnable. Contact support@stateofresonance.ca to initiate a return." 
  },
  { 
    q: "Are your pieces limited edition?", 
    a: "Yes. Each design is produced in a limited run of 10 units or fewer. Once sold out, it will not be restocked in the same form. This ensures every piece remains exclusive." 
  },
  { 
    q: "What payment methods do you accept?", 
    a: "We accept all major credit cards, Shop Pay, Apple Pay, Google Pay, and PayPal through our secure Shopify checkout. All transactions are encrypted and secure." 
  },
  {
    q: "How long does shipping take?",
    a: "Orders are typically processed within 3-5 business days. Standard shipping takes 3-7 business days within Canada and 7-14 days for international orders. Expedited shipping options are available at checkout."
  },
  {
    q: "What are the symbols on your clothing?",
    a: "Each design features symbols rooted in sacred geometry, ancient wisdom, and intentional frequencies. From Metatron's Cube to the Flower of Life, every symbol carries meaning for personal transformation and inner alignment. Visit our Symbols page to learn more."
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="px-6 py-4 border-b border-border" aria-label="Breadcrumb">
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">FAQ</span>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-16 pb-12 md:pt-24 md:pb-16 px-6 border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="dot-label block mb-4">Support</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Everything you need to know about our products, shipping, and policies.
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* FAQ List */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* JSON-LD FAQ Schema */}
          <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
          })}} />

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} className={`reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="border-b border-border py-8 group">
                  <div className="flex gap-6">
                    <span className="text-gold text-sm font-mono flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-foreground font-medium mb-3 group-hover:text-gold transition-colors">
                        {faq.q}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 px-6 border-t border-border bg-secondary/30">
        <div className="max-w-xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-xl font-medium text-foreground mb-4">
              Still have questions?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              We&apos;re here to help. Reach out and we&apos;ll get back to you as soon as possible.
            </p>
            <a 
              href="mailto:support@stateofresonance.ca" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground/90"
            >
              Contact Support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
