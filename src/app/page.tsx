import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import EmailCaptureForm from "@/components/layout/EmailCaptureForm";
import ProductCard from "@/components/shared/ProductCard";

const SOCIAL_IMAGES = [
  { src: "/jayson-social.jpg", label: "The Frequency Spreads", url: "https://www.facebook.com/photo?fbid=10164200068961063&set=a.10154362149296063" },
  { src: "/david-social.jpg", label: "David Goudro", url: "https://www.instagram.com/reel/DWGyGd1Eby5/" },
  { src: "/kelly-social.jpg", label: "Virgin Radio Kelly", url: "https://www.instagram.com/p/DVCd7LUkbxS/" },
];

export default async function Home() {
  const allProducts = await fetchProducts();

  return (
    <div className="min-h-screen bg-black">

      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full min-h-[85vh] md:min-h-[100vh] pt-32 md:pt-40 pb-20 flex flex-col items-center justify-center overflow-hidden border-b border-[rgba(212,175,55,0.15)]">
        <Image src="/hero-celestial.png" alt="State of Resonance — Occult Luxury Streetwear" fill priority sizes="100vw" className="object-cover opacity-60 scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-[rgba(0,0,0,0.8)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-7xl mx-auto w-full">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] tracking-[0.05em] xl:tracking-[0.08em] text-white mb-6 uppercase drop-shadow-[0_10px_25px_rgba(255,255,255,0.4)] leading-none max-w-5xl">
            Wear the Symbols That Shape You
          </h1>
          <div className="w-[80px] md:w-[150px] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-muted)] to-transparent my-6 md:my-10 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          <p className="font-sans text-sm md:text-base tracking-widest text-gray-300 max-w-2xl uppercase leading-relaxed mb-6">
            Premium streetwear designed for those who walk the path of inner alignment.
          </p>
          <div className="bg-black/50 border border-[rgba(212,175,55,0.3)] p-6 max-w-3xl mb-12 backdrop-blur-sm">
            <p className="font-sans text-xs md:text-sm tracking-widest text-[var(--color-gold-muted)] uppercase leading-relaxed">
              Every artifact is made to order, embroidered locally, and passes through my hands to guarantee quality. Because of this process, <strong className="text-white">only 10 pieces</strong> of each design are made before moving on to new prints.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <Link href="#shop-all" className="bg-[var(--color-gold)] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 text-black px-10 py-4 font-bold tracking-widest uppercase text-sm transition-all duration-300">Shop The Archive</Link>
            <Link href="/symbols" className="border border-[var(--color-gold-muted)] text-[var(--color-gold-muted)] px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[rgba(212,175,55,0.05)] transition-colors">Decode the Symbols</Link>
          </div>
          
          <a href="#reviews" className="flex items-center gap-2 group inline-flex cursor-pointer transition-opacity hover:opacity-80">
            <div className="flex gap-1 text-[var(--color-gold-muted)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-xs text-gray-400 font-sans tracking-wide uppercase">4.9/5 from Verified Buyers</span>
          </a>
        </div>
      </section>

      {/* ═══════ MEANING ═══════ */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center border-b border-[rgba(255,255,255,0.05)]">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8 tracking-wide leading-tight">
          Clothing is more than fabric.<br />It&apos;s a declaration of who you are becoming.
        </h2>
        <p className="text-gray-400 font-sans tracking-wide leading-relaxed mb-6">Every piece carries a symbol rooted in ancient geometry, spiritual archetypes, and personal transformation.</p>
        <p className="text-[var(--color-gold-muted)] font-serif italic text-lg tracking-wide">Not magic. Not metaphysics.<br />Just powerful meaning you choose to embody.</p>
      </section>

      {/* ═══════ ALL PRODUCTS ═══════ */}
      <section id="shop-all" className="py-20 px-6 max-w-[1400px] mx-auto text-center border-b border-[rgba(255,255,255,0.05)]">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 uppercase tracking-widest">The Archive</h2>
          <div className="text-gray-400 font-sans tracking-widest uppercase text-xs md:text-sm flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
            <span>Heavyweight silhouettes.</span><span className="hidden md:block">•</span><span>Intentional design.</span><span className="hidden md:block">•</span><span>Limited quantities.</span>
          </div>
        </div>
        {allProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full place-items-center">
            {allProducts.map((p, index) => <ProductCard key={p.id} p={p} priority={index < 3} />)}
          </div>
        )}
      </section>

      {/* ═══════ WHY DIFFERENT ═══════ */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-b border-[rgba(255,255,255,0.05)] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-10 uppercase tracking-widest leading-tight">Why Our Pieces<br />Feel Different</h2>
          <ul className="space-y-6">
            {["450gsm heavyweight cotton", "Oversized, structured fit", "Double‑stitched construction", "Designed in Canada", "Limited to small‑batch drops"].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[var(--color-gold-muted)] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                <span className="text-gray-300 font-sans tracking-wide uppercase text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-[var(--color-gold-muted)] font-serif italic text-xl tracking-wide">Crafted for presence. Built to last.</p>
        </div>
        <div className="aspect-[4/5] relative bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] overflow-hidden">
          <Image src="/fabric-texture.png" alt="450gsm heavyweight cotton close-up" fill className="object-cover opacity-80 mix-blend-luminosity hover:opacity-100 hover:scale-105 transition-all duration-700 hover:mix-blend-normal" />
        </div>
      </section>

      {/* ═══════ SYMBOLS ═══════ */}
      <section className="py-20 px-6 bg-[rgba(212,175,55,0.02)] border-b border-[rgba(255,255,255,0.05)] text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 uppercase tracking-widest">The Symbols</h2>
        <p className="text-gray-400 font-sans tracking-wide mb-16 max-w-2xl mx-auto">Every symbol carries a story. Every story carries a transformation.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {[
            { title: "Metatron's Cube", desc: "clarity, structure, alignment", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 22 8 22 16 12 22 2 16 2 8 12 2"></polygon><polyline points="2 8 12 14 22 8"></polyline><line x1="12" y1="14" x2="12" y2="22"></line><line x1="12" y1="2" x2="12" y2="14"></line><line x1="2" y1="16" x2="12" y2="14"></line><line x1="22" y1="16" x2="12" y2="14"></line></svg> },
            { title: "Flower of Life", desc: "expansion, unity, creation", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="8"></circle><circle cx="6" cy="12" r="8"></circle><circle cx="18" cy="12" r="8"></circle><circle cx="12" cy="6" r="8"></circle><circle cx="12" cy="18" r="8"></circle><circle cx="7" cy="8" r="8"></circle><circle cx="17" cy="8" r="8"></circle><circle cx="7" cy="16" r="8"></circle><circle cx="17" cy="16" r="8"></circle></svg> },
            { title: "963 Hz", desc: "awakening, intuition, higher perspective", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M2 12c3-6 7 6 10 0s7-6 10 0"></path><path d="M2 16c3-6 7 6 10 0s7-6 10 0"></path></svg> },
            { title: "OM", desc: "grounding, breath, inner stillness", icon: <span className="text-2xl mt-1 text-[var(--color-gold)] opacity-80" style={{fontFamily: 'sans-serif'}}>ॐ</span> },
          ].map((sym, i) => (
            <div key={i} className="p-8 border border-[rgba(255,255,255,0.05)] bg-black flex flex-col items-center text-center group hover:border-[var(--color-gold-muted)] transition-colors">
              <div className="w-16 h-16 rounded-full border border-[var(--color-gold-muted)] flex items-center justify-center mb-6 text-[var(--color-gold-muted)] opacity-50 group-hover:opacity-100 transition-all [&_svg]:w-6 [&_svg]:h-6 overflow-hidden scale-100 group-hover:scale-110">
                {sym.icon}
              </div>
              <h3 className="font-serif text-lg text-white mb-2">{sym.title}</h3>
              <p className="text-xs font-sans text-gray-500 uppercase tracking-widest">{sym.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/symbols" className="inline-block border border-[var(--color-gold-muted)] text-[var(--color-gold-muted)] px-10 py-4 font-bold tracking-widest text-xs uppercase hover:bg-[rgba(212,175,55,0.05)] transition-colors">Decode the Symbols</Link>
      </section>

      {/* ═══════ COMMUNITY — REAL IMAGES ═══════ */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center border-b border-[rgba(255,255,255,0.05)]">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 uppercase tracking-widest">Community</h2>
        <p className="text-[var(--color-gold-muted)] font-sans tracking-widest uppercase text-sm mb-16">Real people. Real resonance.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {SOCIAL_IMAGES.map((img, i) => (
            <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className="aspect-square relative overflow-hidden border border-[rgba(255,255,255,0.05)] group">
              <Image src={img.src} alt={img.label} fill className="object-cover grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.6rem] text-gray-300 font-sans tracking-widest uppercase z-10 group-hover:text-white transition-colors text-center">{img.label}</span>
            </a>
          ))}
        </div>
        <Link href="/social-proof" className="inline-block border border-[rgba(255,255,255,0.2)] text-white px-10 py-4 font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-black transition-colors">See All Looks</Link>
      </section>

      {/* ═══════ REVIEWS ═══════ */}
      <section id="reviews" className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="font-serif text-3xl text-white mb-12 tracking-widest uppercase">Alchemical Reports</h2>
        <div className="max-w-5xl mx-auto px-4">
          {/* TrustIndex Widget — populated by loader.js */}
          <div className="trustindex-widget" data-url="2344a8869a5f373c8f9603a105f" />
        </div>
      </section>

      {/* ═══════ EMAIL CAPTURE ═══════ */}
      <section className="py-20 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(212,175,55,0.02)]">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="font-serif text-3xl text-white mb-6 uppercase tracking-widest">Decode Your Symbol</h2>
          <p className="text-sm font-sans tracking-widest text-gray-400 uppercase leading-relaxed mb-10">Get a free guide explaining the meaning behind the symbols in our collection, plus early access to drops.</p>
          <EmailCaptureForm />
        </div>
      </section>

    </div>
  );
}
