import React from 'react';
import { fetchProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/pdp/AddToCartButton";
import ProductGallery from "@/components/pdp/ProductGallery";
import StickyMobileCart from "@/components/pdp/StickyMobileCart";
import ProductAccordion from "@/components/pdp/ProductAccordion";
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
    : `Shop ${product.title} — premium streetwear. Limited edition.`;
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

  const accordionItems = [
    {
      title: 'Size Guide',
      content: (
        <div className="space-y-4">
          <p>Our pieces are designed with an oversized, structured silhouette. We recommend sizing down for a more fitted look, or staying true to size for the intended oversized aesthetic.</p>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-medium">Size</th>
                <th className="text-left py-2 font-medium">Chest</th>
                <th className="text-left py-2 font-medium">Length</th>
                <th className="text-left py-2 font-medium">Shoulder</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50"><td className="py-2">S</td><td>54cm</td><td>70cm</td><td>52cm</td></tr>
              <tr className="border-b border-border/50"><td className="py-2">M</td><td>57cm</td><td>72cm</td><td>54cm</td></tr>
              <tr className="border-b border-border/50"><td className="py-2">L</td><td>60cm</td><td>74cm</td><td>56cm</td></tr>
              <tr className="border-b border-border/50"><td className="py-2">XL</td><td>63cm</td><td>76cm</td><td>58cm</td></tr>
              <tr><td className="py-2">XXL</td><td>66cm</td><td>78cm</td><td>60cm</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: 'Details & Care',
      content: (
        <ul className="space-y-2">
          <li>• 450gsm heavyweight cotton</li>
          <li>• Double-stitched seams throughout</li>
          <li>• Oversized, drop-shoulder construction</li>
          <li>• Machine wash cold, hang dry</li>
          <li>• Do not bleach or tumble dry</li>
        </ul>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-3">
          <p>Free shipping on orders over $150 CAD. Standard delivery takes 3-7 business days within Canada, 7-14 days internationally.</p>
          <p>We accept returns within 14 days of delivery for unworn items with tags attached. Final sale items are non-returnable.</p>
        </div>
      ),
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="px-4 lg:px-8 py-4 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collection/all" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.title}</span>
        </div>
      </nav>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@graph": [
          { "@type": "Product", name: product.title, image: product.images.map(i => i.url), description: product.descriptionHtml?.replace(/<[^>]*>/g, '').slice(0, 200) || product.title, brand: { "@type": "Brand", name: "State of Resonance" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "12" }, offers: { "@type": "Offer", url: `${BASE_URL}/product/${product.handle}`, priceCurrency: "CAD", price: product.price.replace('$', ''), availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition" } },
          { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }, { "@type": "ListItem", position: 2, name: "Shop", item: `${BASE_URL}/collection/all` }, { "@type": "ListItem", position: 3, name: product.title, item: `${BASE_URL}/product/${product.handle}` }] },
        ],
      })}} />
      
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <ProductGallery mainImage={product.image} images={product.images} />
          
          {/* Product Info */}
          <div className="flex flex-col animate-fade-up">
            {/* Category */}
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
              {product.category}
            </p>
            
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-medium tracking-tight mb-4 text-balance">
              {product.title}
            </h1>

            {/* Rating */}
            <a href="#reviews" className="flex items-center gap-2 mb-6 group">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                12 Reviews
              </span>
            </a>
            
            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.compareAtPrice}
                </span>
              )}
              <span className="text-2xl font-medium">
                {product.price} <span className="text-sm text-muted-foreground font-normal">CAD</span>
              </span>
            </div>
            
            {/* Description */}
            <div 
              className="text-sm text-muted-foreground leading-relaxed mb-8 prose prose-sm prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: product.descriptionHtml && product.descriptionHtml.length > 5 
                  ? product.descriptionHtml 
                  : '<p>Premium heavyweight cotton with a structured oversized silhouette. Limited to 10 units.</p>' 
              }} 
            />

            {/* Add to Cart */}
            <AddToCartButton product={product} />
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground mb-8">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Free shipping over $150
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                14-day returns
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout
              </span>
            </div>

            {/* Accordion */}
            <ProductAccordion items={accordionItems} />
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <section id="reviews" className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <h2 className="text-xl font-medium tracking-tight mb-8 text-center">Customer Reviews</h2>
          <div className="trustindex-widget" data-url="2344a8869a5f373c8f9603a105f" />
        </div>
      </section>
      
      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
            <h2 className="text-xl font-medium tracking-tight mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map(p => (
                <Link 
                  key={p.id} 
                  href={`/product/${p.handle}`} 
                  className="group block"
                >
                  <div className="aspect-[3/4] relative bg-secondary overflow-hidden mb-3">
                    <Image 
                      src={p.image.url} 
                      alt={p.image.alt} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy" 
                    />
                  </div>
                  <h3 className="text-sm font-medium truncate group-hover:underline underline-offset-4">
                    {p.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    {p.compareAtPrice && (
                      <span className="text-xs text-muted-foreground line-through">{p.compareAtPrice}</span>
                    )}
                    <span className="text-sm">{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Add to Cart */}
      <StickyMobileCart product={product} />
    </div>
  );
}
