'use client';

import { useState, useEffect } from 'react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/cart';

export default function StickyMobileCart({ product }: { product: ShopifyProduct }) {
  const [visible, setVisible] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  const isAvailable = product.variants[0]?.available;

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky cart button after scrolling down ~500px on mobile
      if (window.innerWidth < 768 && window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTA = () => {
    if (!isAvailable) {
      window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll back up to the Notify Me form
      return;
    }
    const currentVariant = product.variants[0];
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
