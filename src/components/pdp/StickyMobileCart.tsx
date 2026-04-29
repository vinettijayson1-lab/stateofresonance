'use client';

import { useState, useEffect, Suspense } from 'react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/cart';
import { useSearchParams } from 'next/navigation';
import { trackAddToCart } from '@/lib/tracking';

function StickyCartInner({ product }: { product: ShopifyProduct }) {
  const [visible, setVisible] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  
  const searchParams = useSearchParams();
  const variantParam = searchParams.get('variant');
  const currentVariant = (variantParam && product.variants.find(v => v.id.includes(variantParam))) || product.variants[0];
  const isAvailable = currentVariant?.available;

  useEffect(() => {
    const handleScroll = () => {
      const addToCartBtn = document.getElementById('main-add-to-cart');
      if (addToCartBtn) {
        const rect = addToCartBtn.getBoundingClientRect();
        setVisible(rect.bottom < 0);
      } else {
        setVisible(window.scrollY > 500);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTA = () => {
    if (product.options && product.options.some(o => o.name !== 'Title')) {
      const el = document.getElementById('variant-selector');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return;
    }
    
    if (!isAvailable) return;
    
    addItem({ 
      id: product.id, 
      variantId: currentVariant?.id || product.id, 
      title: product.title, 
      price: currentVariant?.price || product.price, 
      image: product.image.url, 
      quantity: 1 
    });
    trackAddToCart({ id: product.id, title: product.title, price: currentVariant?.price || product.price, category: product.category });
    toggleCart();
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 safe-area-pb">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{product.title}</p>
            <p className="text-sm text-muted-foreground">{currentVariant?.price || product.price}</p>
          </div>
          <button 
            onClick={handleCTA}
            disabled={!isAvailable}
            className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all ${
              isAvailable 
                ? 'bg-foreground text-background hover:bg-foreground/90' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {isAvailable ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StickyMobileCart({ product }: { product: ShopifyProduct }) {
  return (
    <Suspense fallback={null}>
      <StickyCartInner product={product} />
    </Suspense>
  );
}
