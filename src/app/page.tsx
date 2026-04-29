import { fetchProducts } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const allProducts = await fetchProducts();
  
  const sortedProducts = [...allProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 999;
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 999;
    return priceA - priceB;
  });

  const featuredProducts = sortedProducts.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      
      {/* Hero Section - Full bleed editorial */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-celestial.webp" 
            alt="State of Resonance" 
            fill 
            priority 
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-20 pb-16">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#737373] mb-6">
              Premium Heavyweight Streetwear
            </p>
            
            {/* Main headline - big and bold */}
            <h1 className="font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-tight text-[#fafafa] mb-8">
              Wear the Symbols<br />
              <span className="italic text-[#c4a077]">That Shape You</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#a3a3a3] max-w-xl mb-10 leading-relaxed">
              Premium streetwear designed for those who walk the path of inner alignment. 
              450gsm heavyweight cotton. Limited drops.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/collection/all" 
                className="inline-flex items-center justify-center gap-2 bg-[#fafafa] text-[#0a0a0a] px-8 py-4 text-sm font-medium tracking-[0.05em] uppercase hover:bg-[#f5f5f0] transition-colors"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center gap-2 border border-[#262626] text-[#fafafa] px-8 py-4 text-sm font-medium tracking-[0.05em] uppercase hover:border-[#fafafa] hover:bg-[#fafafa]/5 transition-all"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#737373]">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#737373] to-transparent" />
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 md:py-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#737373] mb-3">
                The Collection
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa]">
                Featured Pieces
              </h2>
            </div>
            <Link 
              href="/collection/all" 
              className="inline-flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-[#fafafa] transition-colors group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featuredProducts.map((p, index) => (
              <ProductCard key={p.id} p={p} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Split layout */}
      <section className="py-24 md:py-32 border-t border-[#1a1a1a]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] bg-[#111] overflow-hidden order-2 lg:order-1">
              <Image 
                src="/fabric-texture.webp" 
                alt="450gsm heavyweight cotton detail" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#737373] mb-6">
                Our Philosophy
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#fafafa] mb-8 leading-[1.1]">
                Heavyweight Quality<br />
                <span className="italic text-[#c4a077]">Over Fast Fashion</span>
              </h2>
              <div className="space-y-6 text-[#a3a3a3] leading-relaxed">
                <p>
                  Every piece is crafted from 450gsm heavyweight cotton - the kind of fabric 
                  that makes you stop and feel the difference. Thick, structured, premium.
                </p>
                <p>
                  We produce in small batches of 10 units per design. When they&apos;re gone, 
                  they&apos;re gone. This isn&apos;t artificial scarcity - it&apos;s intentional craft.
                </p>
              </div>
              
              {/* Feature list */}
              <ul className="mt-10 space-y-4">
                {[
                  "450gsm heavyweight cotton",
                  "Oversized, structured fit",
                  "Double-stitched construction",
                  "Limited to 10 units per design",
                  "Designed in Canada"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#fafafa]">
                    <span className="w-1.5 h-1.5 bg-[#c4a077] rounded-full" />
                    <span className="text-sm tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Symbols Section */}
      <section className="py-24 md:py-32 border-t border-[#1a1a1a]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#737373] mb-3">
              Sacred Geometry
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa] mb-6">
              The Symbols We Carry
            </h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              Every symbol on our pieces carries meaning rooted in ancient geometry 
              and spiritual archetypes. Not magic - just powerful intention.
            </p>
          </div>
          
          {/* Symbols grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Metatron's Cube", meaning: "Clarity, structure, alignment" },
              { name: "Flower of Life", meaning: "Expansion, unity, creation" },
              { name: "963 Hz", meaning: "Awakening, intuition, higher self" },
              { name: "OM", meaning: "Grounding, breath, inner stillness" },
            ].map((symbol, i) => (
              <div 
                key={i} 
                className="p-6 md:p-8 border border-[#1a1a1a] hover:border-[#262626] transition-colors group"
              >
                <div className="w-12 h-12 border border-[#262626] rounded-full flex items-center justify-center mb-6 group-hover:border-[#c4a077] transition-colors">
                  <span className="text-[#c4a077] text-lg font-serif">{i + 1}</span>
                </div>
                <h3 className="font-serif text-lg text-[#fafafa] mb-2">{symbol.name}</h3>
                <p className="text-sm text-[#737373]">{symbol.meaning}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/symbols" 
              className="inline-flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-[#fafafa] transition-colors group"
            >
              Explore All Symbols
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Reviews Teaser */}
      <section className="py-24 md:py-32 border-t border-[#1a1a1a] bg-[#0f0f0f]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#c4a077]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#737373] mb-3">
              4.9/5 from Verified Buyers
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa]">
              What People Say
            </h2>
          </div>
          
          {/* Featured review */}
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl text-[#fafafa] italic leading-relaxed mb-8">
              &ldquo;The quality is unlike anything I&apos;ve felt. Heavy, structured, premium. 
              This isn&apos;t just a shirt - it&apos;s a statement.&rdquo;
            </p>
            <cite className="text-sm text-[#737373] not-italic">
              — Verified Buyer, Toronto
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 md:py-32 border-t border-[#1a1a1a]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#737373] mb-3">
              Join The Circle
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa] mb-6">
              Early Access
            </h2>
            <p className="text-[#a3a3a3] mb-10">
              Get notified about new drops before anyone else. Plus a free guide 
              explaining the meaning behind our symbols.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-[#262626] text-[#fafafa] px-4 py-4 text-sm placeholder:text-[#737373] focus:outline-none focus:border-[#fafafa] transition-colors"
              />
              <button 
                type="submit"
                className="bg-[#fafafa] text-[#0a0a0a] px-8 py-4 text-sm font-medium tracking-[0.05em] uppercase hover:bg-[#f5f5f0] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-[#737373] mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
