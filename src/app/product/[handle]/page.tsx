import { fetchProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import AddToCartSection from "@/components/pdp/AddToCartSection";
import ProductGallery from "@/components/pdp/ProductGallery";
import ProductAccordion from "@/components/pdp/ProductAccordion";
import RelatedProducts from "@/components/pdp/RelatedProducts";
import { ChevronRight } from "lucide-react";

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
    : `Shop ${product.title} - premium heavyweight streetwear by State of Resonance. 450gsm cotton, limited to 10 units.`;
  
  return {
    title: product.title,
    description: desc,
    alternates: { canonical: `${BASE_URL}/product/${handle}` },
    openGraph: {
      title: `${product.title} - ${product.price} CAD`,
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
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images.map(i => i.url),
    description: product.descriptionHtml?.replace(/<[^>]*>/g, '') || `State of Resonance: ${product.title}`,
    brand: { "@type": "Brand", name: "State of Resonance" },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/product/${product.handle}`,
      priceCurrency: "CAD",
      price: product.price.replace('$', ''),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition"
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
      />
      
      {/* Breadcrumb */}
      <nav className="pt-20 md:pt-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <ol className="flex items-center gap-2 text-sm text-[#737373]">
          <li>
            <Link href="/" className="hover:text-[#fafafa] transition-colors">Home</Link>
          </li>
          <ChevronRight className="w-3 h-3" />
          <li>
            <Link href="/collection/all" className="hover:text-[#fafafa] transition-colors">Shop</Link>
          </li>
          <ChevronRight className="w-3 h-3" />
          <li className="text-[#fafafa] truncate max-w-[200px]">{product.title}</li>
        </ol>
      </nav>
      
      {/* Main product section */}
      <section className="pt-8 pb-16 md:pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={product.images} title={product.title} />
          </div>
          
          {/* Right: Product info */}
          <div className="lg:py-4">
            {/* Category */}
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#c4a077] mb-4">
              {product.category || 'Premium Streetwear'}
            </p>
            
            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#fafafa] mb-4">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#c4a077]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#737373]">4.9/5 from verified buyers</span>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              {product.compareAtPrice && (
                <span className="text-xl text-[#737373] line-through">{product.compareAtPrice}</span>
              )}
              <span className="text-2xl md:text-3xl text-[#fafafa]">{product.price}</span>
              <span className="text-sm text-[#737373]">CAD</span>
            </div>
            
            {/* Description */}
            {product.descriptionHtml && product.descriptionHtml.length > 5 && (
              <div 
                className="prose prose-sm prose-invert mb-8 text-[#a3a3a3]"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
              />
            )}
            
            {/* Trust badges - above the fold */}
            <div className="flex flex-wrap items-center gap-4 mb-8 py-4 border-y border-[#1a1a1a]">
              <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                450gsm Heavyweight
              </div>
              <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Limited to 10 Units
              </div>
              <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Free Shipping $100+
              </div>
            </div>
            
            {/* Add to cart section - prominent and sticky on mobile */}
            <AddToCartSection product={product} />
            
            {/* Payment methods */}
            <div className="mt-6 flex items-center justify-center gap-4 text-[#737373]">
              <span className="text-xs tracking-wide">Shop Pay</span>
              <span className="text-[#262626]">|</span>
              <span className="text-xs tracking-wide">Apple Pay</span>
              <span className="text-[#262626]">|</span>
              <span className="text-xs tracking-wide">Google Pay</span>
            </div>
            
            {/* Accordions with important info */}
            <div className="mt-12">
              <ProductAccordion />
            </div>
          </div>
        </div>
      </section>
      
      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 border-t border-[#1a1a1a]">
          <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-[#fafafa] mb-8 text-center">
              You May Also Like
            </h2>
            <RelatedProducts products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
