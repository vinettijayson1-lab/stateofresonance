'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

export default function ProductCard({ p, priority = false }: { p: ShopifyProduct, priority?: boolean }) {
  const addItem = useCartStore(s => s.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    setIsAdding(true);
    
    const firstAvailableVariant = p.variants.find(v => v.available) || p.variants[0];
    
    addItem({
      variantId: firstAvailableVariant.id,
      title: p.title,
      variantTitle: firstAvailableVariant.title,
      price: firstAvailableVariant.price,
      image: p.image.url,
      handle: p.handle,
      quantity: 1,
    });
    
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Link href={`/product/${p.handle}`} className="group block w-full">
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-[#111] overflow-hidden mb-4">
        <Image 
          src={p.image.url} 
          alt={p.image.alt || p.title} 
          fill 
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
        />
        
        {/* Sale badge */}
        {p.compareAtPrice && (
          <div className="absolute top-3 left-3 bg-[#fafafa] text-[#0a0a0a] text-[10px] font-medium tracking-[0.1em] uppercase px-2 py-1">
            Sale
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick add button */}
        <button
          onClick={handleQuickAdd}
          disabled={isAdding}
          className="absolute bottom-4 left-4 right-4 bg-[#fafafa] text-[#0a0a0a] py-3 text-xs font-medium tracking-[0.1em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#f5f5f0] disabled:opacity-50"
        >
          {isAdding ? 'Added' : 'Quick Add'}
        </button>
      </div>

      {/* Product info */}
      <div className="space-y-1">
        <h3 className="font-serif text-base text-[#fafafa] group-hover:text-[#a3a3a3] transition-colors line-clamp-1">
          {p.title}
        </h3>
        <div className="flex items-center gap-2">
          {p.compareAtPrice && (
            <span className="text-sm text-[#737373] line-through">{p.compareAtPrice}</span>
          )}
          <span className="text-sm text-[#a3a3a3]">{p.price} CAD</span>
        </div>
      </div>
    </Link>
  );
}

// Skeleton loader for product cards
export function ProductCardSkeleton() {
  return (
    <div className="w-full">
      <div className="aspect-[3/4] bg-[#1a1a1a] animate-pulse mb-4" />
      <div className="space-y-2">
        <div className="h-5 bg-[#1a1a1a] animate-pulse w-3/4" />
        <div className="h-4 bg-[#1a1a1a] animate-pulse w-1/3" />
      </div>
    </div>
  );
}
