'use client';

import { useCartStore } from '@/store/cart';
import { trackInitiateCheckout } from '@/lib/tracking';
import { X, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on server or before hydration
  if (!mounted) return null;
  
  // Only render when cart is open
  if (!isOpen) return null;

  const total = items.reduce((s, i) => s + parseFloat(i.price.replace(/[^0-9.]/g, '')) * i.quantity, 0);

  const handleCheckout = () => {
    trackInitiateCheckout(items.map(i => ({ id: i.id, title: i.title, price: i.price })));
    const url = useCartStore.getState().getCheckoutUrl();
    if (url && url !== '#') {
      window.location.assign(url);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" 
        onClick={toggleCart}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#262626] z-[70] flex flex-col"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#262626]">
          <h2 className="font-serif text-xl text-[#fafafa]">Your Cart</h2>
          <button 
            onClick={toggleCart}
            className="p-2 -mr-2 text-[#737373] hover:text-[#fafafa] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <p className="text-[#737373] text-sm mb-4">Your cart is empty</p>
              <button 
                onClick={toggleCart}
                className="text-sm text-[#fafafa] underline underline-offset-4 hover:text-[#a3a3a3] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-24 bg-[#111] shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-[#fafafa] font-serif line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-[#a3a3a3] mt-1">{item.price} CAD</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-[#262626]">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-[#737373] hover:text-[#fafafa] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm text-[#fafafa]">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-[#737373] hover:text-[#fafafa] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-xs text-[#737373] hover:text-red-400 transition-colors ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#262626] space-y-4">
            {/* Free shipping progress */}
            {total >= 100 ? (
              <div className="flex items-center gap-2 text-sm text-[#c4a077]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/>
                  <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/>
                  <circle cx="7" cy="18" r="2"/>
                  <path d="M15 18H9"/>
                  <circle cx="17" cy="18" r="2"/>
                </svg>
                Free shipping unlocked
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs text-[#737373] mb-2">
                  <span>Add ${(100 - total).toFixed(2)} for free shipping</span>
                </div>
                <div className="w-full h-1 bg-[#262626] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#c4a077] transition-all duration-300" 
                    style={{ width: `${Math.min((total / 100) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between py-4 border-t border-[#262626]">
              <span className="text-[#a3a3a3]">Subtotal</span>
              <span className="text-lg text-[#fafafa]">${total.toFixed(2)} CAD</span>
            </div>

            {/* Checkout button */}
            <button 
              onClick={handleCheckout} 
              className="w-full bg-[#fafafa] text-[#0a0a0a] py-4 text-sm font-medium tracking-[0.1em] uppercase hover:bg-[#e5e5e5] transition-colors"
            >
              Checkout
            </button>

            {/* Continue shopping */}
            <button 
              onClick={toggleCart}
              className="w-full py-3 text-sm text-[#737373] hover:text-[#fafafa] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
