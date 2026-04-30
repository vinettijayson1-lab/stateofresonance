import { fetchProducts } from "@/lib/shopify";
import { getSortedTransmissionsData } from "@/lib/transmissions";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";
import TrustindexEmbed from "@/components/shared/TrustindexEmbed";
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
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#0a0a0a]" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-32 pb-20">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#c4a077] mb-8">
            Premium Heavyweight Streetwear
          </p>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1] tracking-tight text-[#fafafa] mb-8">
            Wear the Symbols
            <br />
            <span className="italic text-[#c4a077]">That Shape You</span>
          </h1>
          
          <p className="text-lg text-[#737373] max-w-xl mb-12 leading-relaxed">
            Premium streetwear designed for those who walk the path of inner alignment. 
            450gsm heavyweight cotton. Limited to 10 units per design.
          </p>
          
          <Link 
            href="/collection/all" 
            style={{ color: '#0a0a0a', backgroundColor: '#fafafa' }}
            className="inline-flex items-center justify-center gap-3 px-12 py-5 text-sm font-medium tracking-[0.1em] uppercase hover:bg-[#c4a077] transition-colors"
          >
            Shop Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <div className="flex items-center justify-center gap-8 mt-16 text-[11px] tracking-[0.15em] uppercase text-[#525252]">
            <span>Free Shipping $100+</span>
            <span className="w-1 h-1 bg-[#525252] rounded-full" />
            <span>30-Day Returns</span>
            <span className="w-1 h-1 bg-[#525252] rounded-full" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 border-t border-[#141414]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-4">
              The Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa]">
              Featured Pieces
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map((p, index) => (
              <ProductCard key={p.id} p={p} priority={index < 4} />
            ))}
          </div>
          
          <div className="text-center mt-12 md:mt-16">
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

      {/* Social Proof / Reviews */}
      <section id="reviews" className="py-20 md:py-24 border-t border-[#141414] bg-[#0c0c0c]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10 md:mb-12">
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

          {/* Trustindex Widget Embed */}
          <TrustindexEmbed />

          <div className="text-center mt-10 md:mt-12">
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

      {/* Philosophy */}
      <section className="py-24 md:py-32 border-t border-[#141414]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-6">
              Our Philosophy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa] leading-[1.1]">
              Heavyweight Quality
              <br />
              <span className="italic text-[#c4a077]">Over Fast Fashion</span>
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative w-full aspect-[4/3] bg-[#111] overflow-hidden mb-12">
              <Image
                src="/fabric-texture.webp"
                alt="450gsm heavyweight cotton detail"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
            
            <div className="text-center space-y-6 text-[#737373] leading-relaxed">
              <p>
                Every piece is crafted from 450gsm heavyweight cotton — the kind of fabric
                that makes you stop and feel the difference. Thick, structured, premium.
              </p>
              <p>
                We produce in small batches of 10 units per design. When they&apos;re gone,
                they&apos;re gone. This isn&apos;t artificial scarcity — it&apos;s intentional craft.
              </p>
            </div>
            
            <ul className="mt-12 flex flex-col items-center gap-4">
              {[
                "450gsm heavyweight cotton",
                "Oversized, structured fit",
                "Double-stitched construction",
                "Limited to 10 units per design",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-[#fafafa]">
                  <span className="w-1.5 h-1.5 bg-[#c4a077] rounded-full flex-shrink-0" />
                  <span className="text-sm tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-center mt-12">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-[#c4a077] hover:text-[#fafafa] transition-colors tracking-[0.1em] uppercase"
              >
                Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transmissions */}
      {featuredTransmissions.length > 0 && (
        <section className="py-24 md:py-32 border-t border-[#141414]">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-4">
                The Archive
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa]">
                Transmissions
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredTransmissions.map((transmission) => (
                <Link
                  key={transmission.slug}
                  href={`/transmissions/${transmission.slug}`}
                  className="group"
                >
                  <article className="h-full flex flex-col items-center text-center">
                    <time className="text-[11px] text-[#525252] mb-4 tracking-[0.15em] uppercase">
                      {new Date(transmission.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h3 className="font-serif text-xl text-[#fafafa] group-hover:text-[#c4a077] transition-colors line-clamp-2 mb-4">
                      {transmission.title}
                    </h3>
                    {transmission.excerpt && (
                      <p className="text-sm text-[#525252] line-clamp-3 leading-relaxed mb-6">
                        {transmission.excerpt}
                      </p>
                    )}
                    <span className="text-[11px] text-[#c4a077] tracking-[0.15em] uppercase mt-auto">
                      Read Article →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-16">
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

      {/* Newsletter / Early Access */}
      <section className="py-32 md:py-40 border-t border-[#141414]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#525252] mb-5">
              Join The Circle
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#fafafa] mb-8">
              Early Access
            </h2>
            <p className="text-[#737373] mb-12 leading-relaxed">
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
        </div>
      </section>

    </div>
  );
}
