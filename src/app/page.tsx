import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import EmailCaptureForm from "@/components/layout/EmailCaptureForm";

const SOCIAL_IMAGES = [
  { src: "/martin-social.jpg", label: "Martin Bedard", url: "https://www.facebook.com/photo/?fbid=10163985728591063&set=a.10154362149296063" },
  { src: "/jayson-social.jpg", label: "The Frequency Spreads", url: "https://www.facebook.com/photo?fbid=10164200068961063&set=a.10154362149296063" },
  { src: "/david-social.jpg", label: "David Goudro", url: "https://www.instagram.com/reel/DWGyGd1Eby5/" },
  { src: "/kelly-social.jpg", label: "Virgin Radio Kelly", url: "https://www.instagram.com/p/DVCd7LUkbxS/" },
];

export default async function Home() {
  const allProducts = await fetchProducts();

  return (
    <div className="min-h-screen bg-black">

      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full min-h-[70vh] md:min-h-[90vh] pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden border-b border-[rgba(212,175,55,0.15)]">
        <div className="absolute inset-0 bg-[url('/hero-celestial.png')] bg-cover bg-center bg-no-repeat opacity-60 scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-[rgba(0,0,0,0.8)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-7xl mx-auto w-full">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] tracking-[0.05em] xl:tracking-[0.08em] text-white mb-6 uppercase drop-shadow-[0_10px_25px_rgba(255,255,255,0.4)] leading-none max-w-5xl">
            Wear the Symbols That Shape You
          </h1>
          <div className="w-[80px] md:w-[150px] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-muted)] to-transparent my-6 md:my-10 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          <p className="font-sans text-sm md:text-base tracking-widest text-gray-400 max-w-2xl uppercase leading-relaxed mb-12">
            Premium, limited-edition streetwear designed for those who walk the path of inner alignment.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="#shop-all" className="bg-[var(--color-gold)] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 text-black px-10 py-4 font-bold tracking-widest uppercase text-sm transition-all duration-300">Shop The Archive</Link>
            <Link href="/symbols" className="border border-[var(--color-gold-muted)] text-[var(--color-gold-muted)] px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[rgba(212,175,55,0.05)] transition-colors">Decode the Symbols</Link>
          </div>
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
          <div className="flex flex-wrap justify-center gap-8 mt-16 w-full">
            {allProducts.map(p => <ProductCard key={p.id} p={p} />)}
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
            { title: "Metatron's Cube", desc: "clarity, structure, alignment" },
            { title: "Flower of Life", desc: "expansion, unity, creation" },
            { title: "963 Hz (symbolic)", desc: "awakening, intuition, higher perspective" },
            { title: "OM", desc: "grounding, breath, inner stillness" },
          ].map((sym, i) => (
            <div key={i} className="p-8 border border-[rgba(255,255,255,0.05)] bg-black flex flex-col items-center text-center group hover:border-[var(--color-gold-muted)] transition-colors">
              <div className="w-16 h-16 rounded-full border border-[var(--color-gold-muted)] flex items-center justify-center mb-6 text-[var(--color-gold-muted)] font-serif text-xs opacity-50 group-hover:opacity-100 transition-opacity">∆</div>
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
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="font-serif text-2xl text-white mb-16 uppercase tracking-widest">The Verdict</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          {[
            { body: "Best hoodie I've ever owned. Heavy, structured, and the symbolism hits deeply.", name: "Verified Customer" },
            { body: "The fit is insane. You feel different wearing it.", name: "Verified Customer" },
          ].map((r, i) => (
            <div key={i} className="p-8 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
              <div className="text-[var(--color-gold-muted)] mb-4 text-xl tracking-widest">★★★★★</div>
              <p className="text-gray-300 font-serif text-lg leading-relaxed mb-6 italic">&quot;{r.body}&quot;</p>
              <p className="text-xs text-gray-500 font-sans tracking-widest uppercase">— {r.name}</p>
            </div>
          ))}
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

function ProductCard({ p }: { p: ShopifyProduct }) {
  return (
    <Link href={`/product/${p.handle}`} className="group relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[400px]">
      <article className="obsidian-glass overflow-hidden rounded-md transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-gold-muted)]">
        <div className="w-full aspect-[4/5] relative border-b border-[rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center group-hover:brightness-110 transition-all duration-700 bg-[url('/esoteric-backdrop.png')] bg-cover bg-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 z-10 drop-shadow-2xl" />
          <div className="absolute top-4 right-4 bg-[var(--color-gold-muted)] text-black text-[0.65rem] font-bold px-3 py-1 tracking-widest uppercase z-20">Limited Drop</div>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-[1rem] leading-snug mb-2 text-gray-100 group-hover:text-[var(--color-gold)] transition-colors text-center">{p.title}</h3>
          <div className="flex justify-between items-center mt-4 border-t border-[rgba(255,255,255,0.05)] py-4">
            <span className="text-[var(--color-gold-muted)] font-mono text-sm tracking-wider">{p.price} CAD</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest hidden md:block group-hover:text-[var(--color-gold)] transition-colors">Explore</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
