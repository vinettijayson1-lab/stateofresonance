'use client';

import ProductCard from '@/components/shared/ProductCard';
import { ShopifyProduct } from '@/lib/shopify';

interface RelatedProductsProps {
  products: ShopifyProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} p={product} />
      ))}
    </div>
  );
}
