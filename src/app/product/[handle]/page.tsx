import React from 'react';
import { fetchProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/pdp/AddToCartButton";
import ProductGallery from "@/components/pdp/ProductGallery";
import TrustBadges from "@/components/pdp/TrustBadges";
import StickyMobileCart from "@/components/pdp/StickyMobileCart";
import FrequencySignup from "@/components/pdp/FrequencySignup";
import Image from "next/image";
import type { Metadata } from "next";

const BASE_URL = "https://stateofresonance.ca";

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map(p => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const products = await fetchProducts();
  const product = products.find(p => p.handle === handle);
  if (!product) return { title: "Product Not Found" };
  const desc = product.descriptionHtml
    ? product.descriptionHtml.replace(/<[^>]*>/g, '').slice(0, 155).trim() + '…'
    : `Shop ${product.title} — premium occult streetwear by State of Resonance. 450gsm heavyweight cotton, limited to 10 units.`;
  return {
    title: product.title,
    description: desc,
    alternates: { canonical: `${BASE_URL}/product/${handle}` },
    openGraph: {
      title: `${product.title} — ${product.price} CAD`,
      description: desc,
      url: `${BASE_URL}/product/${handle}`,
      siteName: "State of Resonance",
      images: [{ url: product.image.url, width: 800, height: 1000, alt: product.image.alt }],
      type: "website",
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: desc,
      images: [product.image.url],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const allProducts = await fetchProducts();
  const product = allProducts.find(p => p.handle === handle);
  if (!product) return notFound();
  const related = allProducts.filter(p => p.handle !== handle).slice(0, 4);
  
  return (
    <div className="w-full min-h-screen relative z-10 pt-24 lg:pt-40 pb-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col">
      <nav className="mb-8 font-sans text-xs uppercase tracking-widest text-gray-500 flex gap-2">
        <Link href="/" className="hover:text-[var(--color-gold-muted)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collection/all" className="hover:text-[var(--color-gold-muted)] transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-300">{product.title}</span>
      </nav>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@graph": [
          { "@type": "Product", name: product.title, image: product.images.map(i => i.url), description: `State of Resonance Official Artifact: ${product.title}`, brand: { "@type": "Brand", name: "State of Resonance" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "12" }, offers: { "@type": "Offer", url: `https://stateofresonance.ca/product/${product.handle}`, priceCurrency: "CAD", price: product.price.replace('$', ''), availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition" } },
          { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://stateofresonance.ca" }, { "@type": "ListItem", position: 2, name: "Shop", item: "https://stateofresonance.ca/collection/all" }, { "@type": "ListItem", position: 3, name: product.title, item: `https://stateofresonance.ca/product/${product.handle}` }] },
        ],
      })}} />
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start w-full">
        <div className="w-full lg:w-1/2">
          <ProductGallery mainImage={product.image} images={product.images} />
        </div>
        
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left pt-4">
          <div className="mb-8 border-b border-[rgba(255,255,255,0.05)] pb-8">
            <p className="text-[var(--color-gold-muted)] tracking-[0.3em] text-xs uppercase mb-4 animate-pulse">{product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-serif text-white tracking-wide mb-4 leading-tight">{product.title}</h1>

            <a href="#reviews" className="flex items-center gap-2 mb-6 group inline-flex cursor-pointer transition-opacity hover:opacity-80">
              <div className="flex gap-1 text-[var(--color-gold-muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
              </div>
              <span className="text-xs text-gray-400 font-sans tracking-wide uppercase">4.9/5 from Verified Buyers</span>
            </a>
            
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-end gap-3 text-2xl font-mono tracking-wider">
                {product.compareAtPrice && <span className="text-gray-500 line-through text-xl">{product.compareAtPrice}</span>}
                <p className="text-gray-300">{product.price} <span className="text-sm text-gray-500 font-sans">CAD</span></p>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs tracking-widest text-[#5a5a5a] uppercase mt-2 font-mono">
                <span>Shop Pay</span><span>•</span><span>Apple Pay</span><span>•</span><span>Google Pay</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-400 font-sans leading-relaxed tracking-wide space-y-4 prose prose-invert mx-auto lg:mx-0" dangerouslySetInnerHTML={{ __html: product.descriptionHtml && product.descriptionHtml.length > 5 ? product.descriptionHtml : '<p>Forged in the abyss. This artifact resonates with frequencies designed to elevate your state of being.</p>' }} />
          </div>
          
          <div className="w-full mb-12">
            <div className="mb-6"><AddToCartButton product={product} /></div>
            <TrustBadges />
          </div>
          
          <div className="w-full flex flex-col gap-10 mt-8 border-t border-[rgba(255,255,255,0.05)] pt-12 text-left">
            <div>
              <h3 className="font-serif text-xl text-[var(--color-gold-muted)] uppercase tracking-widest mb-4">Why This Piece Is Special</h3>
              <ul className="space-y-3 font-sans text-sm tracking-wide text-gray-300 uppercase">
                {["450gsm heavyweight cotton", "Oversized, structured silhouette", "Double‑stitched seams", "Limited to 10 units", "Designed in Canada"].map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[var(--color-gold-muted)] uppercase tracking-widest mb-4">Symbol Meaning</h3>
              <div className="font-sans text-sm tracking-wide text-gray-300 space-y-2">
                <p className="text-white font-bold">Metatron&apos;s Cube</p>
                <p>Represents clarity, structure, and the alignment of inner and outer worlds.</p>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[var(--color-gold-muted)] uppercase tracking-widest mb-4">Fit &amp; Feel</h3>
              <ul className="space-y-3 font-sans text-sm tracking-wide text-gray-300 uppercase">
                {["Oversized", "Drop shoulder", "Thick, warm, premium feel", "True to size for oversized look"].map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
            <FrequencySignup />
          </div>
        </div>
      </div>
      
      <div className="w-full mt-24 border-t border-[rgba(255,255,255,0.05)] pt-16">
        <h2 className="font-serif text-2xl text-center text-white mb-8 uppercase tracking-widest">Worn by the Community</h2>
        <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { src: "/jayson-social.jpg", label: "The Frequency Spreads", url: "https://www.facebook.com/photo?fbid=10164200068961063&set=a.10154362149296063" },
            { src: "/david-social.jpg", label: "David Goudro", url: "https://www.instagram.com/reel/DWGyGd1Eby5/" },
            { src: "/kelly-social.jpg", label: "Virgin Radio Kelly", url: "https://www.instagram.com/p/DVCd7LUkbxS/" },
          ].map((img, i) => (
            <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className="aspect-square relative overflow-hidden border border-[rgba(255,255,255,0.05)] group cursor-pointer hover:border-[var(--color-gold-muted)] transition-colors">
              <Image src={img.src} alt={img.label} fill className="object-cover grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.6rem] text-gray-300 font-sans tracking-widest uppercase z-10 group-hover:text-white transition-colors text-center whitespace-nowrap">{img.label}</span>
            </a>
          ))}
        </div>
      </div>
      
      <div className="w-full mt-24 border-t border-[rgba(255,255,255,0.05)] pt-16 pb-16" id="reviews">
        <h2 className="font-serif text-3xl text-center text-white mb-12 tracking-widest uppercase">Alchemical Reports</h2>
        <div className="max-w-5xl mx-auto px-4">
          {/* TrustIndex Widget — populated by loader.js */}
          <div className="trustindex-widget" data-url="2344a8869a5f373c8f9603a105f" />

        </div>
      </div>
      
      {related.length > 0 && (
        <div className="w-full mt-24 border-t border-[rgba(255,255,255,0.05)] pt-16">
          <h2 className="font-serif text-3xl text-center text-white mb-16 tracking-widest uppercase">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {related.map(p => (
              <a key={p.id} href={`/product/${p.handle}`} className="group relative block transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/5] bg-black border border-[rgba(255,255,255,0.05)] flex items-center justify-center p-4 relative overflow-hidden group-hover:border-[var(--color-gold-muted)] transition-colors">
                  <div className="absolute inset-0 bg-[url('/esoteric-backdrop.webp')] bg-cover bg-center opacity-50 group-hover:opacity-100 transition-opacity" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image.url} alt={p.image.alt} className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-white font-serif text-sm group-hover:text-[var(--color-gold-muted)] transition-colors">{p.title}</h3>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    {p.compareAtPrice && <span className="text-gray-500 line-through text-[0.65rem] font-mono">{p.compareAtPrice}</span>}
                    <p className="text-[var(--color-gold-muted)] font-mono text-xs">{p.price}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <StickyMobileCart product={product} />
    </div>
  );
}
