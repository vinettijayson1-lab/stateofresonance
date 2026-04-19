import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions regarding State of Resonance shipping, production, styling, and philosophy."
};

export default function FAQPage() {
  const faqs = [
    { q: "What makes your pieces different from other streetwear?", a: "Every piece is crafted from 450gsm heavyweight cotton, features double-stitched seams, and carries sacred geometry symbols with deep intentional meaning. We produce in limited batches of 10 units or fewer." },
    { q: "How does sizing work?", a: "All of our pieces are designed with an oversized, drop-shoulder silhouette. We recommend ordering your true size for the intended oversized look, or sizing down one for a more fitted feel." },
    { q: "Where do you ship?", a: "We ship across Canada and internationally. Orders over $110 CAD qualify for free shipping. Standard delivery takes 2-4 business days within Canada." },
    { q: "What is your return policy?", a: "We offer a 30-day return guarantee. Items must be unworn, unwashed, and in original condition with tags attached." },
    { q: "Are your pieces limited edition?", a: "Yes. Each design is produced in a limited run of 10 units or fewer. Once sold out, it will not be restocked in the same form." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, Shop Pay, Apple Pay, Google Pay, and PayPal through our secure Shopify checkout." },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full pt-56 md:pt-64 pb-32 flex flex-col items-center justify-center border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/luxury-occult-bg.png')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        
        {/* Decorative Sacred Geometry element in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[rgba(212,175,55,0.03)] rounded-full animate-spin-slow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[rgba(212,175,55,0.02)] rounded-full animate-reverse-spin pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-4xl pt-12">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-widest mb-6 leading-tight drop-shadow-2xl">
            FREQUENTLY <br/> ASKED
          </h1>
          <p className="text-[var(--color-gold-muted)] font-mono tracking-[0.3em] text-xs md:text-sm uppercase max-w-2xl mx-auto leading-loose border-t border-[rgba(212,175,55,0.2)] pt-6 inline-block">
            Knowledge base and directives for seekers.
          </p>
        </div>
      </section>

      {/* ═══════ CONTENT ═══════ */}
      <section className="w-full py-24 px-6 md:px-12 relative z-10 max-w-3xl mx-auto">
        {/* JSON-LD FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}} />

        <div className="space-y-16 w-full">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[rgba(255,255,255,0.05)] pb-12 flex flex-col md:flex-row gap-6 md:gap-12 relative group">
              <span className="font-mono text-[var(--color-gold-muted)] text-sm tracking-widest opacity-50 shrink-0 mt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-white mb-4 tracking-wide group-hover:text-[var(--color-gold)] transition-colors">{faq.q}</h3>
                <p className="text-gray-400 text-sm md:text-base font-sans leading-relaxed tracking-wide uppercase">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
