'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { ShopifyProduct } from '@/lib/shopify';
import { Check, ShoppingBag } from 'lucide-react';

/**
 * Quick add-to-cart button for product cards.
 * - If the product has only one variant (or no options): adds directly to cart and opens sidebar.
 * - If the product has multiple variants (size/color/etc.): navigates to PDP for selection.
 * - If sold out: renders a disabled state.
 */
export default function QuickAddButton({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  const [added, setAdded] = useState(false);

  const firstAvailable = product.variants.find(v => v.available);
  const isSoldOut = !firstAvailable;

  // Multi-option products require user choice on PDP
  const requiresSelection =
    product.options.length > 1 ||
    (product.options.length === 1 && product.options[0].values.length > 1);

  if (isSoldOut) {
    return (
      <button
        type="button"
        disabled
        className="w-full mt-3 py-2.5 sm:py-3 text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase border border-[#262626] text-[#525252] cursor-not-allowed"
      >
        Sold Out
      </button>
    );
  }

  if (requiresSelection) {
    return (
      <Link
        href={`/product/${product.handle}`}
        className="w-full mt-3 py-2.5 sm:py-3 text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-center border border-[#fafafa] text-[#fafafa] hover:bg-[#fafafa] hover:text-[#0a0a0a] transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span>Select Options</span>
      </Link>
    );
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstAvailable || added) return;

    addItem({
      id: firstAvailable.id,
      variantId: firstAvailable.id,
      title: product.title,
      price: firstAvailable.price,
      image: product.image.url,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      toggleCart();
    }, 700);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full mt-3 py-2.5 sm:py-3 text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 ${
        added
          ? 'bg-[#22c55e] text-white'
          : 'bg-[#fafafa] text-[#0a0a0a] hover:bg-[#c4a077]'
      }`}
      aria-label={`Add ${product.title} to cart`}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Added</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}
