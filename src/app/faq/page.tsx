export default function FAQPage() {
  const faqs = [
    { q: "What makes your pieces different from other streetwear?", a: "Every piece is crafted from 450gsm heavyweight cotton, features double-stitched seams, and carries sacred geometry symbols with deep intentional meaning. We produce in limited batches of 120 units or fewer." },
    { q: "How does sizing work?", a: "All of our pieces are designed with an oversized, drop-shoulder silhouette. We recommend ordering your true size for the intended oversized look, or sizing down one for a more fitted feel." },
    { q: "Where do you ship?", a: "We ship across Canada and internationally. Orders over $110 CAD qualify for free shipping. Standard delivery takes 2-4 business days within Canada." },
    { q: "What is your return policy?", a: "We offer a 30-day return guarantee. Items must be unworn, unwashed, and in original condition with tags attached." },
    { q: "Are your pieces limited edition?", a: "Yes. Each design is produced in a limited run of 120 units or fewer. Once sold out, it will not be restocked in the same form." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, Shop Pay, Apple Pay, Google Pay, and PayPal through our secure Shopify checkout." },
  ];

  return (
    <div className="min-h-screen pt-48 pb-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs mb-4">Knowledge Base</p>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-wide">Frequently Asked Questions</h1>
      </div>
      <div className="space-y-8">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-[rgba(255,255,255,0.05)] pb-8">
            <h3 className="font-serif text-lg text-white mb-3">{faq.q}</h3>
            <p className="text-gray-400 text-sm font-sans leading-relaxed tracking-wide">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
