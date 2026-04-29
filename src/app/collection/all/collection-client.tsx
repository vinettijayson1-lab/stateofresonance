'use client';

import { useState, useMemo, useTransition } from 'react';
import { ShopifyProduct } from "@/lib/shopify";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import ScrollReveal from "@/components/shared/ScrollReveal";

interface CollectionClientProps {
  products: ShopifyProduct[];
  categories: string[];
  sizes: string[];
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export default function CollectionClient({ products, categories, sizes }: CollectionClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by size availability
    if (selectedSize) {
      result = result.filter(p => 
        p.variants.some(v => v.available && v.option1 === selectedSize)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
          return priceB - priceA;
        });
        break;
      case 'newest':
        // Keep original order (assuming newest first from API)
        break;
      case 'featured':
      default:
        // Sort by price ascending as "featured"
        result.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 999;
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 999;
          return priceA - priceB;
        });
        break;
    }

    return result;
  }, [products, selectedCategory, selectedSize, sortBy]);

  const handleFilterChange = (setter: (val: string | null) => void, value: string | null) => {
    startTransition(() => {
      setter(value);
    });
  };

  const activeFilterCount = [selectedCategory, selectedSize].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-24 pb-8 md:pt-32 md:pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="dot-label block mb-3">The Archive</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-4">
              Shop All
            </h1>
            <p className="text-muted-foreground text-sm max-w-lg">
              Every artifact. Every frequency. Premium heavyweight streetwear designed for those who walk the path.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Category</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleFilterChange(setSelectedCategory, null)}
                      className={`block text-sm transition-colors ${
                        !selectedCategory ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      All
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleFilterChange(setSelectedCategory, cat)}
                        className={`block text-sm transition-colors ${
                          selectedCategory === cat ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => handleFilterChange(setSelectedSize, selectedSize === size ? null : size)}
                        className={`px-3 py-1.5 text-xs border transition-all ${
                          selectedSize === size 
                            ? 'border-foreground bg-foreground text-background' 
                            : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    startTransition(() => {
                      setSelectedCategory(null);
                      setSelectedSize(null);
                    });
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              <div className="flex items-center gap-4">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm text-foreground"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 text-[10px] bg-foreground text-background rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-sm text-foreground border-none focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {isPending ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredAndSortedProducts.map((product, index) => (
                  <ScrollReveal key={product.id} className={`reveal-delay-${Math.min((index % 3) + 1, 3)}`}>
                    <ProductCard p={product} priority={index < 6} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No products match your filters.</p>
                <button
                  onClick={() => {
                    startTransition(() => {
                      setSelectedCategory(null);
                      setSelectedSize(null);
                    });
                  }}
                  className="text-sm underline underline-offset-4 hover:text-gold transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-medium">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 -m-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-8">
              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Category</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleFilterChange(setSelectedCategory, null)}
                      className={`block text-sm transition-colors ${
                        !selectedCategory ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      All
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleFilterChange(setSelectedCategory, cat)}
                        className={`block text-sm transition-colors ${
                          selectedCategory === cat ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => handleFilterChange(setSelectedSize, selectedSize === size ? null : size)}
                        className={`px-4 py-2 text-sm border transition-all ${
                          selectedSize === size 
                            ? 'border-foreground bg-foreground text-background' 
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-border space-y-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    startTransition(() => {
                      setSelectedCategory(null);
                      setSelectedSize(null);
                    });
                  }}
                  className="w-full py-3 text-sm border border-border text-foreground"
                >
                  Clear all filters
                </button>
              )}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 text-sm bg-foreground text-background"
              >
                View {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
