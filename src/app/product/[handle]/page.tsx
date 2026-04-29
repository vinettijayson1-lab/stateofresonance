import { fetchProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/pdp/AddToCartButton";
import ProductGallery from "@/components/pdp/ProductGallery";
import StickyMobileCart from "@/components/pdp/StickyMobileCart";
import ProductAccordion from "@/components/pdp/ProductAccordion";
import Image from "next/image";
import type { Metadata } from "next";
import ScrollReveal from "@/components/shared/ScrollReveal";

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
    ? product.descriptionHtml.replace(/<[^>]*>/g, '').slice(0, 155).trim() + '...'
    : `Shop ${product.title} — premium heavyweight streetwear. Limited to 10 units.`;
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
          <p className="text-sm text-muted-foreground">
            Our pieces are designed with an oversized, structured silhouette. Size down for a fitted look, 
            or stay true to size for the intended oversized aesthetic.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[300px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-medium text-foreground">Size</th>
                  <th className="text-left py-3 pr-4 font-medium text-foreground">Chest</th>
                  <th className="text-left py-3 pr-4 font-medium text-foreground">Length</th>
                  <th className="text-left py-3 font-medium text-foreground">Shoulder</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50"><td className="py-2.5 pr-4">S</td><td className="pr-4">54cm</td><td className="pr-4">70cm</td><td>52cm</td></tr>
                <tr className="border-b border-border/50"><td className="py-2.5 pr-4">M</td><td className="pr-4">57cm</td><td className="pr-4">72cm</td><td>54cm</td></tr>
                <tr className="border-b border-border/50"><td className="py-2.5 pr-4">L</td><td className="pr-4">60cm</td><td className="pr-4">74cm</td><td>56cm</td></tr>
                <tr className="border-b border-border/50"><td className="py-2.5 pr-4">XL</td><td className="pr-4">63cm</td><td className="pr-4">76cm</td><td>58cm</td></tr>
                <tr><td className="py-2.5 pr-4">XXL</td><td className="pr-4">66cm</td><td className="pr-4">78cm</td><td>60cm</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: 'Fabric & Construction',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block mb-1">Weight</span>
              <span className="text-foreground">450gsm Heavyweight Cotton</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Fit</span>
              <span className="text-foreground">Oversized, Drop Shoulder</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Seams</span>
              <span className="text-foreground">Double-Stitched Throughout</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Production</span>
              <span className="text-foreground">Limited to 10 Units</span>
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <span className="text-muted-foreground text-sm block mb-2">Care Instructions</span>
            <ul className="text-sm text-foreground space-y-1">
              <li>Machine wash cold, inside out</li>
              <li>Hang dry recommended</li>
              <li>Do not bleach or tumble dry</li>
              <li>Iron on low if needed</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <span className="text-foreground font-medium block mb-2">Free Shipping</span>
            <p className="text-muted-foreground">
              Orders over $150 CAD ship free. Standard delivery: 3-7 business days (Canada), 
              7-14 days (International).
            </p>
          </div>
          <div>
            <span className="text-foreground font-medium block mb-2">Returns & Exchanges</span>
            <p className="text-muted-foreground">
              14-day return window for unworn items with tags attached. Final sale items are non-returnable. 
              Contact support@stateofresonance.ca for assistance.
            </p>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="px-4 lg:px-8 py-4 border-b border-border" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collection/all" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </div>
      </nav>

      {/* Schema.org Structured Data */}
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@graph": [
          { 
            "@type": "Product", 
            name: product.title, 
            image: product.images.map(i => i.url), 
            description: product.descriptionHtml?.replace(/<[^>]*>/g, '').slice(0, 200) || product.title, 
            brand: { "@type": "Brand", name: "State of Resonance" }, 
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "12" }, 
            offers: { 
              "@type": "Offer", 
              url: `${BASE_URL}/product/${product.handle}`, 
              priceCurrency: "CAD", 
              price: product.price.replace('$', ''), 
              availability: "https://schema.org/InStock", 
              itemCondition: "https://schema.org/NewCondition" 
            } 
          },
          { 
            "@type": "BreadcrumbList", 
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }, 
              { "@type": "ListItem", position: 2, name: "Shop", item: `${BASE_URL}/collection/all` }, 
              { "@type": "ListItem", position: 3, name: product.title, item: `${BASE_URL}/product/${product.handle}` }
            ] 
          },
        ],
      })}} />
      
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Gallery - Large images to show fabric texture */}
          <ProductGallery mainImage={product.image} images={product.images} />
          
          {/* Product Info */}
          <div className="flex flex-col lg:sticky lg:top-24 lg:self-start animate-fade-up">
            {/* Category */}
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              {product.category || 'Streetwear'}
            </span>
            
            {/* Title */}
            <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight mb-4 text-balance leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <a href="#reviews" className="flex items-center gap-2 mb-6 group w-fit">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                12 Reviews
              </span>
            </a>
            
            {/* Price - Prominent */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.compareAtPrice}
                </span>
              )}
              <span className="text-3xl font-medium">
                {product.price}
              </span>
              <span className="text-sm text-muted-foreground">CAD</span>
            </div>
            
            {/* Description */}
            <div 
              className="text-sm text-muted-foreground leading-relaxed mb-8 prose prose-sm prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: product.descriptionHtml && product.descriptionHtml.length > 5 
                  ? product.descriptionHtml 
                  : '<p>Premium 450gsm heavyweight cotton with a structured oversized silhouette. Each piece is embroidered locally and limited to 10 units.</p>' 
              }} 
            />

            {/* Key Features - Visible, not hidden */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-secondary/50 border border-border">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="text-xs text-foreground font-medium block">450gsm Cotton</span>
                  <span className="text-[10px] text-muted-foreground">Heavyweight Premium</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="text-xs text-foreground font-medium block">Limited Edition</span>
                  <span className="text-[10px] text-muted-foreground">Only 10 Units</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div>
                  <span className="text-xs text-foreground font-medium block">Free Shipping</span>
                  <span className="text-[10px] text-muted-foreground">Orders $150+</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div>
                  <span className="text-xs text-foreground font-medium block">Easy Returns</span>
                  <span className="text-[10px] text-muted-foreground">14-Day Policy</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Section - Prominent & Sticky on mobile handled by StickyMobileCart */}
            <AddToCartButton product={product} />

            {/* Accordion for detailed info */}
            <div className="mt-8">
              <ProductAccordion items={accordionItems} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <section id="reviews" className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <ScrollReveal>
            <h2 className="text-xl font-medium tracking-tight mb-8 text-center">Customer Reviews</h2>
            <div className="trustindex-widget" data-url="2344a8869a5f373c8f9603a105f" />
          </ScrollReveal>
        </div>
      </section>
      
      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
            <ScrollReveal>
              <h2 className="text-xl font-medium tracking-tight mb-8 text-center">You May Also Like</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p, index) => (
                <ScrollReveal key={p.id} className={`reveal-delay-${index + 1}`}>
                  <Link href={`/product/${p.handle}`} className="group block">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Add to Cart for mobile */}
      <StickyMobileCart product={product} />
    </div>
  );
}
