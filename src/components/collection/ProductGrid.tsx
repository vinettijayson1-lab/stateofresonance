'use client';

import ProductCard from '@/components/shared/ProductCard';
import { ShopifyProduct } from '@/lib/shopify';

interface ProductGridProps {
  products: ShopifyProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-[#737373]">No products found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} p={product} priority={index < 6} />
      ))}
    </div>
  );
}
