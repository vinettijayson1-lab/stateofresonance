import { fetchProducts } from "@/lib/shopify";
import { getSortedTransmissionsData } from "@/lib/transmissions";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";
import TrustindexWidget from "@/components/shared/TrustindexWidget";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const allProducts = await fetchProducts();
  const allTransmissions = getSortedTransmissionsData();
  
  const sortedProducts = [...allProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 999;
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 999;
    return priceA - priceB;
  });

  const featuredProducts = sortedProducts.slice(0, 6);
  const featuredTransmissions = allTransmissions.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      
      {/* Hero Section - Clean, centered, editorial */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#0a0a0a]" />
        
        {/* Hero content - Centered */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-8 flex flex-col items-center text-center pt-32 pb-20">
          {/* Eyebrow */}
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#c4a077] mb-8">
            Premium Heavyweight Streetwear
          </p>
          
          {/* Main headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1] tracking-tight text-[#fafafa] mb-8">
            Wear the Symbols
            <br />
            <span className="italic text-[#c4a077]">That Shape You</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg text-[#737373] max-w-xl mb-12 leading-relaxed">
            Premium streetwear designed for those who walk the path of inner alignment. 
            450gsm heavyweight cotton. Limited to 10 units per design.
          </p>
          
          {/* Single CTA — same width context as eyebrow via inline-flex centering */}
          <Link 
            href="/collection/all" 
            style={{ color: '#0a0a0a', backgroundColor: '#fafafa' }}
            className="inline-flex items-center justify-center gap-3 px-12 py-5 text-sm font-medium tracking-[0.1em] uppercase hover:bg-[#c4a077] transition-colors"
          >
            Shop Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-16 text-[11px] tracking-[0.15em] uppercase text-[#525252]">
            <span>Free Shipping $100+</span>
            <span className="w-1 h-1 bg-[#525252] rounded-full" />
            <span>30-Day Returns</span>
            <span className="w-1 h-1 bg-[#525252] rounded-full" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-20 md:py-32 border-t border-[#141414]">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Section header — same max-width as hero so it shares the center axis */}
          <div className="w-full max-w-3xl flex flex-col items-center text-center mb-12 md:mb-16 px-4">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-4">
              The Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa]">
              Featured Pieces
            </h2>
          </div>
          
          {/* Product grid — 2 columns on mobile so users see multiple products at once */}
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 lg:gap-12">
            {featuredProducts.map((p, index) => (
              <ProductCard key={p.id} p={p} priority={index < 4} />
            ))}
          </div>
          
          {/* View all link */}
          <div className="mt-12 md:mt-16">
            <Link 
              href="/collection/all" 
              className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#fafafa] transition-colors tracking-[0.1em] uppercase"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof — Trustindex verified reviews widget */}
      <section id="reviews" className="py-20 md:py-24 border-t border-[#141414] bg-[#0c0c0c]">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Centered header */}
          <div className="mb-10 md:mb-12 max-w-3xl">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#c4a077]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-2">
              4.9/5 from Verified Buyers
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#fafafa]">
              What People Say
            </h2>
          </div>

          {/* Live Trustindex review widget */}
          <TrustindexWidget token="2344a8869a5f373c8f9603a105f" className="w-full" />

          {/* Link to full reviews page */}
          <div className="mt-10 md:mt-12">
            <Link 
              href="/social-proof" 
              className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#fafafa] transition-colors tracking-[0.1em] uppercase"
            >
              See All Reviews
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section — fully centered to match the rest of the page */}
      <section className="py-32 border-t border-[#141414]">
        <div className="w-full max-w-3xl mx-auto px-8 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-6">
            Our Philosophy
          </p>

          {/* Headline */}
          <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa] mb-12 leading-[1.1]">
            Heavyweight Quality
            <br />
            <span className="italic text-[#c4a077]">Over Fast Fashion</span>
          </h2>

          {/* Image — centered, capped width */}
          <div className="relative w-full max-w-2xl aspect-[4/3] bg-[#111] overflow-hidden mb-12">
            <Image 
              src="/fabric-texture.webp" 
              alt="450gsm heavyweight cotton detail" 
              fill 
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
          </div>

          {/* Body copy */}
          <div className="space-y-6 text-[#737373] leading-relaxed max-w-2xl">
            <p>
              Every piece is crafted from 450gsm heavyweight cotton — the kind of fabric 
              that makes you stop and feel the difference. Thick, structured, premium.
            </p>
            <p>
              We produce in small batches of 10 units per design. When they&apos;re gone, 
              they&apos;re gone. This isn&apos;t artificial scarcity — it&apos;s intentional craft.
            </p>
          </div>

          {/* Feature list — centered */}
          <ul className="mt-12 flex flex-col items-center gap-4">
            {[
              "450gsm heavyweight cotton",
              "Oversized, structured fit",
              "Double-stitched construction",
              "Limited to 10 units per design",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-[#fafafa]">
                <span className="w-1.5 h-1.5 bg-[#c4a077] rounded-full" />
                <span className="text-sm tracking-wide">{item}</span>
              </li>
            ))}
          </ul>

          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 mt-12 text-sm text-[#c4a077] hover:text-[#fafafa] transition-colors tracking-[0.1em] uppercase"
          >
            Our Story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Transmissions / Blog Section */}
      {featuredTransmissions.length > 0 && (
        <section className="py-32 border-t border-[#141414]">
          <div className="w-full max-w-[1200px] mx-auto px-8 flex flex-col items-center">
            {/* Section header — same max-width as hero so it shares the center axis */}
            <div className="w-full max-w-3xl flex flex-col items-center text-center mb-16">
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-4">
                The Archive
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa]">
                Transmissions
              </h2>
            </div>
            
            {/* Blog grid - 3 columns, centered text within each card */}
            <div className="w-full grid md:grid-cols-3 gap-8">
              {featuredTransmissions.map((transmission) => (
                <Link 
                  key={transmission.slug} 
                  href={`/transmissions/${transmission.slug}`}
                  className="group"
                >
                  <article className="h-full flex flex-col items-center text-center">
                    {/* Date */}
                    <time className="text-[11px] text-[#525252] mb-4 tracking-[0.15em] uppercase">
                      {new Date(transmission.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    
                    {/* Title */}
                    <h3 className="font-serif text-xl text-[#fafafa] group-hover:text-[#c4a077] transition-colors line-clamp-2 mb-4">
                      {transmission.title}
                    </h3>
                    
                    {/* Excerpt */}
                    {transmission.excerpt && (
                      <p className="text-sm text-[#525252] line-clamp-3 leading-relaxed mb-6">
                        {transmission.excerpt}
                      </p>
                    )}
                    
                    {/* Read more */}
                    <span className="text-[11px] text-[#c4a077] tracking-[0.15em] uppercase mt-auto">
                      Read Article →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
            
            {/* View all */}
            <div className="mt-16">
              <Link 
                href="/transmissions" 
                className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#fafafa] transition-colors tracking-[0.1em] uppercase"
              >
                View All Articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section - Clean and minimal with generous breathing room */}
      <section className="pt-40 md:pt-48 pb-40 md:pb-48 border-t border-[#141414]">
        <div className="w-full max-w-3xl mx-auto px-8 flex flex-col items-center text-center">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-5">
            Join The Circle
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa] mb-8">
            Early Access
          </h2>
          <p className="text-[#737373] mb-12 leading-relaxed max-w-md">
            Get notified about new drops before anyone else.
            Plus a free guide explaining the meaning behind our symbols.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 min-w-0 bg-transparent border border-[#1a1a1a] text-[#fafafa] px-5 py-4 text-sm placeholder:text-[#525252] focus:outline-none focus:border-[#c4a077] transition-colors"
            />
            <button 
              type="submit"
              style={{ color: '#0a0a0a', backgroundColor: '#fafafa' }}
              className="px-8 py-4 text-sm font-medium tracking-[0.1em] uppercase hover:bg-[#c4a077] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-[11px] text-[#3a3a3a] mt-8 tracking-wide">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

    </div>
  );
}
