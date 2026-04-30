import { fetchProducts } from "@/lib/shopify";
import type { Metadata } from "next";
import { Suspense } from "react";
import ProductGrid from "@/components/collection/ProductGrid";
import FilterSidebar from "@/components/collection/FilterSidebar";
import { ProductCardSkeleton } from "@/components/shared/ProductCard";

export const metadata: Metadata = {
  title: "Shop All | Premium Heavyweight Streetwear Collection",
  description: "Browse our complete collection of heavyweight streetwear. 450gsm cotton, limited to 10 units per design. Premium quality streetwear designed in Canada. Free shipping over $100.",
  keywords: [
    "shop streetwear",
    "premium clothing collection",
    "heavyweight cotton",
    "canadian streetwear",
    "450gsm clothing",
    "limited edition streetwear",
  ],
  alternates: { 
    canonical: "https://stateofresonance.ca/collection/all" 
  },
  openGraph: {
    title: "Shop All Premium Streetwear | State of Resonance",
    description: "Browse our complete collection of heavyweight streetwear. 450gsm cotton, limited drops.",
    url: "https://stateofresonance.ca/collection/all",
    type: "website",
    images: [{
      url: "https://stateofresonance.ca/hero-celestial.webp",
      width: 1200,
      height: 630,
      alt: "State of Resonance Collection"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All Premium Streetwear | State of Resonance",
    description: "Browse our complete collection of heavyweight streetwear. 450gsm cotton, limited drops.",
    images: ["https://stateofresonance.ca/hero-celestial.webp"],
  },
};
};

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {[...Array(6)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

async function ProductsSection() {
  const products = await fetchProducts();
  
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 999;
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 999;
    return priceA - priceB;
  });

  // Extract unique categories and sizes for filters
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const sizes = [...new Set(products.flatMap(p => 
    p.options.find(o => o.name.toLowerCase() === 'size')?.values || []
  ))];

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Sidebar filters */}
      <aside className="lg:w-64 flex-shrink-0">
        <FilterSidebar categories={categories} sizes={sizes} />
      </aside>
      
      {/* Product grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-[#737373]">
            {sortedProducts.length} products
          </p>
          <select className="bg-transparent border border-[#262626] text-[#fafafa] text-sm px-3 py-2 focus:outline-none focus:border-[#fafafa]">
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        
        <ProductGrid products={sortedProducts} />
      </div>
    </div>
  );
}

export default function AllCollectionPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 md:pt-40 pb-24">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Page header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#737373] mb-3">
            The Collection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#fafafa]">
            Shop All
          </h1>
        </div>
        
        <Suspense fallback={
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="space-y-6">
                <div className="h-6 w-24 bg-[#1a1a1a] animate-pulse" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 w-32 bg-[#1a1a1a] animate-pulse" />
                  ))}
                </div>
              </div>
            </aside>
            <div className="flex-1">
              <ProductGridSkeleton />
            </div>
          </div>
        }>
          <ProductsSection />
        </Suspense>
      </div>
    </div>
  );
}
