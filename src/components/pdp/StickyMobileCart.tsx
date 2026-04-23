'use client';

import { useState, useEffect, Suspense } from 'react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/cart';
import { useSearchParams } from 'next/navigation';

function StickyMobileCartInner({ product }: { product: ShopifyProduct }) {
  const [visible, setVisible] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  
  const searchParams = useSearchParams();
  const variantParam = searchParams.get('variant');
  const currentVariant = (variantParam && product.variants.find(v => v.id.includes(variantParam))) || product.variants[0];
  const isAvailable = currentVariant?.available;

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (window.innerWidth < 768 && window.scrollY > 400 && !isNearBottom) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTA = () => {
    if (product.options && product.options.some(o => o.name !== 'Title')) {
      const el = document.getElementById('variant-selector');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
      return;
    }
    
    if (!isAvailable) {
      const el = document.getElementById('variant-selector');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
      return;
    }
    
    addItem({ id: product.id, variantId: currentVariant?.id || product.id, title: product.title, price: currentVariant?.price || product.price, image: product.image.url, quantity: 1 });
    toggleCart();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-black/90 backdrop-blur-md border-t border-[rgba(212,175,55,0.2)] md:hidden z-50 animate-in slide-in-from-bottom-full duration-300">
      <button 
        onClick={handleCTA}
        className={`w-full py-4 tracking-widest uppercase font-bold text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)] ${isAvailable ? 'bg-[var(--color-gold)] text-black' : 'bg-gray-800 text-gray-400'}`}
      >
        {isAvailable ? 'Acquire Artifact' : 'Notify Me'}
      </button>
    </div>
  );
}

export default function StickyMobileCart({ product }: { product: ShopifyProduct }) {
  return (
    <Suspense fallback={null}>
      <StickyMobileCartInner product={product} />
    </Suspense>
  );
}
