import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import EmailCaptureForm from "@/components/layout/EmailCaptureForm";
import ProductCard from "@/components/shared/ProductCard";
import ScrollReveal from "@/components/shared/ScrollReveal";
import HorizontalCarousel from "@/components/shared/HorizontalCarousel";
import StickyBottomBar from "@/components/layout/StickyBottomBar";

const SOCIAL_IMAGES = [
  { src: "/jayson-social.jpg", label: "The Frequency Spreads", url: "https://www.facebook.com/photo?fbid=10164200068961063&set=a.10154362149296063" },
  { src: "/david-social.jpg", label: "David Goudro", url: "https://www.instagram.com/reel/DWGyGd1Eby5/" },
  { src: "/kelly-social.jpg", label: "Virgin Radio Kelly", url: "https://www.instagram.com/p/DVCd7LUkbxS/" },
];

export default async function Home() {
  const allProducts = await fetchProducts();
  
  const sortedProducts = [...allProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 999;
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 999;
    return priceA - priceB;
  });

  return (
    <div className="min-h-screen bg-black relative">

      {/* ═══════ HERO — Cinematic Layered Composition ═══════ */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Layer 1: Base celestial image with Ken Burns */}
        <Image src="/hero-celestial.webp" alt="State of Resonance — Occult Luxury Streetwear" fill priority sizes="100vw" className="object-cover opacity-50 animate-ken-burns" />
        
        {/* Layer 2: Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        
        {/* Layer 3: Golden light beam from center bottom */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,_rgba(212,175,55,0.12)_0%,_transparent_50%)] pointer-events-none" />
        
        {/* Layer 4: Subtle top-down blue accent for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(65,105,225,0.06)_0%,_transparent_40%)] pointer-events-none" />

        {/* Hero Content — Glassmorphism Container */}
        <ScrollReveal className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] rounded-sm px-6 py-10 md:px-16 md:py-20 w-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <span className="dot-label mb-6 block">Occult Luxury Streetwear</span>
            <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl tracking-[0.04em] text-white mb-4 md:mb-6 uppercase leading-[1.1] max-w-4xl">
              Wear the Symbols<br />That Shape You
            </h1>
            <div className="w-[60px] md:w-[120px] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent mx-auto my-4 md:my-8 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            <p className="font-sans text-xs md:text-sm tracking-[0.15em] text-gray-400 max-w-xl mx-auto uppercase leading-relaxed mb-8 md:mb-10">
              Premium streetwear designed for those who walk the path of inner alignment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full sm:w-auto">
              <Link href="#shop-all" className="w-full sm:w-auto bg-[var(--color-gold)] hover:bg-white text-black px-8 min-h-[48px] flex items-center justify-center font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">Shop The Archive</Link>
              <Link href="/symbols" className="w-full sm:w-auto bg-white/[0.04] backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-white px-8 min-h-[48px] flex items-center justify-center font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs hover:bg-white/[0.08] hover:border-[rgba(212,175,55,0.3)] transition-all duration-300">Decode the Symbols</Link>
            </div>
          </div>
          
          {/* Trust Badge */}
          <a href="#reviews" className="flex items-center gap-2 mt-6 group cursor-pointer transition-opacity hover:opacity-80">
            <div className="flex gap-0.5 text-[var(--color-gold)]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
              ))}
            </div>
            <span className="text-[10px] text-gray-500 font-sans tracking-[0.15em] uppercase">4.9/5 from Verified Buyers</span>
          </a>
        </ScrollReveal>

        {/* Scroll to Explore Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-scroll-bounce">
          <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-gray-500">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </section>

      {/* ═══════ PHILOSOPHY ═══════ */}
      <section className="relative py-24 md:py-32 px-6 border-b border-[rgba(255,255,255,0.04)]">
        {/* Aura orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.04)_0%,_transparent_60%)] pointer-events-none animate-float-orb" />
        
        <ScrollReveal className="max-w-3xl mx-auto text-center relative z-10">
          <span className="dot-label mb-6 block">The Philosophy</span>
          <h2 className="font-serif text-2xl md:text-4xl text-white mb-6 tracking-wide leading-tight">
            Clothing is more than fabric.<br />It&apos;s a declaration of who you are becoming.
          </h2>
          <p className="text-gray-500 font-sans tracking-wide leading-relaxed text-sm mb-6">Every piece carries a symbol rooted in ancient geometry, spiritual archetypes, and personal transformation.</p>
          <p className="text-[var(--color-gold-muted)] font-serif italic text-base md:text-lg tracking-wide">Not magic. Not metaphysics.<br />Just powerful meaning you choose to embody.</p>
        </ScrollReveal>
      </section>

      {/* ═══════ THE ARCHIVE — Products ═══════ */}
      <section id="shop-all" className="relative py-24 md:py-32 px-6 max-w-[1400px] mx-auto text-center border-b border-[rgba(255,255,255,0.04)]">
        {/* Aura orb left */}
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none animate-float-orb" />
        {/* Aura orb right */}
        <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(65,105,225,0.04)_0%,_transparent_60%)] pointer-events-none animate-float-orb" style={{animationDelay: '-4s'}} />
        
        <ScrollReveal className="mb-16 relative z-10">
          <span className="dot-label mb-4 block">The Archive</span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 uppercase tracking-widest">Shop All</h2>
          <div className="text-gray-500 font-sans tracking-[0.2em] uppercase text-[0.65rem] md:text-xs flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
            <span>Heavyweight silhouettes</span><span className="hidden md:block text-[rgba(212,175,55,0.3)]">◆</span><span>Intentional design</span><span className="hidden md:block text-[rgba(212,175,55,0.3)]">◆</span><span>Limited quantities</span>
          </div>
        </ScrollReveal>
        
        {allProducts.length > 0 && (
          <ScrollReveal className="relative z-10">
            {/* Mobile Carousel */}
            <div className="md:hidden -mx-6">
              <HorizontalCarousel>
                {sortedProducts.slice(0, 6).map((p, index) => (
                  <div key={p.id} className="min-w-[75vw] snap-center">
                    <ProductCard p={p} priority={index < 3} />
                  </div>
                ))}
              </HorizontalCarousel>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10 w-full place-items-center">
              {sortedProducts.map((p, index) => <ProductCard key={p.id} p={p} priority={index < 3} />)}
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ═══════ WHY DIFFERENT ═══════ */}
      <section className="relative py-24 md:py-32 px-6 max-w-6xl mx-auto border-b border-[rgba(255,255,255,0.04)] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
        <ScrollReveal>
          <span className="dot-label mb-4 block">The Craft</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-10 uppercase tracking-widest leading-tight">Why Our Pieces<br />Feel Different</h2>
          <ul className="space-y-5 mb-8">
            {["450gsm heavyweight cotton", "Oversized, structured fit", "Double‑stitched construction", "Designed in Canada", "Limited to small‑batch drops"].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                <span className="text-gray-400 font-sans tracking-[0.15em] uppercase text-xs">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="glass-card p-5 md:p-6 mb-10">
            <p className="font-sans text-[0.7rem] md:text-xs tracking-[0.15em] text-[var(--color-gold-muted)] uppercase leading-relaxed">
              Every artifact is made to order, embroidered locally, and passes through my hands to guarantee quality. Because of this process, <strong className="text-white">only 10 pieces</strong> of each design are made before moving on to new prints.
            </p>
          </div>

          <p className="text-[var(--color-gold-muted)] font-serif italic text-lg tracking-wide">Crafted for presence. Built to last.</p>
        </ScrollReveal>
        <ScrollReveal className="reveal-delay-2">
          <div className="aspect-[4/5] relative overflow-hidden glass-card">
            <Image src="/fabric-texture.webp" alt="450gsm heavyweight cotton close-up" fill className="object-cover opacity-70 mix-blend-luminosity hover:opacity-100 hover:scale-105 transition-all duration-700 hover:mix-blend-normal" />
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════ SYMBOLS ═══════ */}
      <section className="relative py-24 md:py-32 px-6 border-b border-[rgba(255,255,255,0.04)] text-center overflow-hidden">
        {/* Aura orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(65,105,225,0.04)_0%,_transparent_55%)] pointer-events-none animate-float-orb" />
        
        <ScrollReveal className="relative z-10">
          <span className="dot-label mb-4 block">Sacred Geometry</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 uppercase tracking-widest">The Symbols</h2>
          <p className="text-gray-500 font-sans tracking-[0.15em] mb-16 max-w-xl mx-auto text-xs uppercase">Every symbol carries a story. Every story carries a transformation.</p>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-16 relative z-10">
          {[
            { title: "Metatron's Cube", desc: "clarity · structure · alignment", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><polygon points="12 2 22 8 22 16 12 22 2 16 2 8 12 2"></polygon><polyline points="2 8 12 14 22 8"></polyline><line x1="12" y1="14" x2="12" y2="22"></line><line x1="12" y1="2" x2="12" y2="14"></line><line x1="2" y1="16" x2="12" y2="14"></line><line x1="22" y1="16" x2="12" y2="14"></line></svg> },
            { title: "Flower of Life", desc: "expansion · unity · creation", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6"><circle cx="12" cy="12" r="8"></circle><circle cx="6" cy="12" r="8"></circle><circle cx="18" cy="12" r="8"></circle><circle cx="12" cy="6" r="8"></circle><circle cx="12" cy="18" r="8"></circle></svg> },
            { title: "963 Hz", desc: "awakening · intuition · higher self", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M2 12c3-6 7 6 10 0s7-6 10 0"></path><path d="M2 16c3-6 7 6 10 0s7-6 10 0"></path></svg> },
            { title: "OM", desc: "grounding · breath · inner stillness", icon: <span className="text-xl text-[var(--color-gold)] opacity-60" style={{fontFamily: 'sans-serif'}}>ॐ</span> },
          ].map((sym, i) => (
            <ScrollReveal key={i} className={`reveal-delay-${i + 1}`}>
              <div className="glass-card p-6 md:p-8 flex flex-col items-center text-center group hover:border-[rgba(212,175,55,0.25)] transition-all duration-500">
                <div className="w-14 h-14 rounded-full border border-[rgba(212,175,55,0.2)] flex items-center justify-center mb-5 text-[var(--color-gold-muted)] opacity-40 group-hover:opacity-100 transition-all duration-500 [&_svg]:w-6 [&_svg]:h-6 overflow-hidden group-hover:scale-110 group-hover:border-[rgba(212,175,55,0.4)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                  {sym.icon}
                </div>
                <h3 className="font-serif text-sm md:text-base text-white mb-2">{sym.title}</h3>
                <p className="text-[0.6rem] font-sans text-gray-600 uppercase tracking-[0.15em]">{sym.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <Link href="/symbols" className="inline-block glass-card px-10 min-h-[48px] flex items-center justify-center font-bold tracking-[0.2em] text-[0.65rem] uppercase text-[var(--color-gold-muted)] hover:text-white hover:border-[rgba(212,175,55,0.3)] transition-all duration-300">Decode the Symbols</Link>
        </ScrollReveal>
      </section>

      {/* ═══════ COMMUNITY ═══════ */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto text-center border-b border-[rgba(255,255,255,0.04)]">
        <ScrollReveal>
          <span className="dot-label mb-4 block">Community</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 uppercase tracking-widest">The Circle</h2>
          <p className="text-gray-500 font-sans tracking-[0.15em] uppercase text-xs mb-16">Real people. Real resonance.</p>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16">
          {SOCIAL_IMAGES.map((img, i) => (
            <ScrollReveal key={i} className={`reveal-delay-${i + 1}`}>
              <a href={img.url} target="_blank" rel="noopener noreferrer" className="aspect-square relative overflow-hidden glass-card group">
                <Image src={img.src} alt={img.label} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.55rem] text-gray-400 font-sans tracking-[0.15em] uppercase z-10 group-hover:text-white transition-colors text-center whitespace-nowrap">{img.label}</span>
              </a>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <Link href="/social-proof" className="inline-block glass-card px-10 min-h-[48px] flex items-center justify-center font-bold tracking-[0.2em] text-[0.65rem] uppercase text-white hover:border-[rgba(212,175,55,0.3)] transition-all duration-300">See All Looks</Link>
        </ScrollReveal>
      </section>

      {/* ═══════ REVIEWS ═══════ */}
      <section id="reviews" className="py-24 md:py-32 px-6 max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <span className="dot-label mb-4 block">Testimonials</span>
          <h2 className="font-serif text-3xl text-white mb-12 tracking-widest uppercase">Alchemical Reports</h2>
          <div className="max-w-5xl mx-auto px-4">
            <div className="trustindex-widget" data-url="2344a8869a5f373c8f9603a105f" />
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════ EMAIL CAPTURE ═══════ */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(255,255,255,0.04)] overflow-hidden">
        {/* Aura orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none animate-float-orb" />
        
        <ScrollReveal className="max-w-xl mx-auto text-center px-6 relative z-10">
          <span className="dot-label mb-4 block">Join the Circle</span>
          <h2 className="font-serif text-3xl text-white mb-6 uppercase tracking-widest">Decode Your Symbol</h2>
          <p className="text-xs font-sans tracking-[0.15em] text-gray-500 uppercase leading-relaxed mb-10">Get a free guide explaining the meaning behind the symbols in our collection, plus early access to drops.</p>
          <EmailCaptureForm />
        </ScrollReveal>
      </section>

      <StickyBottomBar />

    </div>
  );
}
