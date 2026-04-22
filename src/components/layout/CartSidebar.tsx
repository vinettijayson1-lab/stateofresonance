'use client';

import { useCartStore } from '@/store/cart';
import { trackInitiateCheckout } from '@/lib/tracking';
import { X, Minus, Plus } from 'lucide-react';

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getCheckoutUrl } = useCartStore();

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
      <div className="fixed inset-0 bg-black/70 z-[60]" onClick={toggleCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--color-onyx)] border-l border-[rgba(255,255,255,0.05)] z-[70] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.05)]">
          <h2 className="font-serif text-xl text-white tracking-widest uppercase">Your Cart</h2>
          <button onClick={toggleCart}><X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" /></button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {items.length === 0 ? (
              <p className="text-gray-500 text-xs tracking-widest uppercase font-mono text-center mt-12">Your vessel is empty.</p>
            ) : items.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-[rgba(255,255,255,0.05)] pb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-black border border-[rgba(255,255,255,0.05)]" />
                <div className="flex-1">
                  <h3 className="text-sm text-white font-serif">{item.title}</h3>
                  <p className="text-xs text-[var(--color-gold-muted)] font-mono mt-1">{item.price} CAD</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="w-3 h-3 text-gray-400" /></button>
                    <span className="text-xs text-white font-mono">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="w-3 h-3 text-gray-400" /></button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto text-[0.6rem] text-red-400 uppercase tracking-widest hover:text-red-300">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Complete the ritual upsell */}
          {items.length > 0 && (
            <div className="px-6 pb-5 border-t border-[rgba(255,255,255,0.05)] pt-4">
              <p className="text-[0.5rem] uppercase tracking-[0.25em] text-gray-600 mb-3 font-mono">Complete the ritual</p>
              <a
                href="/collection/all"
                onClick={toggleCart}
                className="flex items-center gap-3 group border border-[rgba(255,255,255,0.05)] hover:border-[rgba(212,175,55,0.25)] transition-colors p-3"
              >
                <div className="w-9 h-9 bg-black border border-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
                  <span className="text-[var(--color-gold-muted)] text-xs">✦</span>
                </div>
                <div>
                  <p className="text-white text-xs font-serif group-hover:text-[var(--color-gold-muted)] transition-colors">Explore More Artifacts</p>
                  <p className="text-[0.55rem] text-gray-600 uppercase tracking-widest font-sans mt-0.5">Limited drops — 10 units each</p>
                </div>
              </a>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[rgba(255,255,255,0.05)]">
            {/* Shipping Estimate */}
            {total >= 110 ? (
              <div className="flex items-center gap-2 mb-4 px-3 py-2 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.03)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-gold-muted)] flex-shrink-0"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><path d="M15 18H9"/><circle cx="17" cy="18" r="2"/></svg>
                <span className="text-[0.6rem] text-[var(--color-gold-muted)] uppercase tracking-widest font-sans">Free Shipping Unlocked ✓</span>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex items-center gap-2 px-3 py-2 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500 flex-shrink-0"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><path d="M15 18H9"/><circle cx="17" cy="18" r="2"/></svg>
                  <span className="text-[0.6rem] text-gray-400 uppercase tracking-widest font-sans">Add ${(110 - total).toFixed(2)} more for free shipping</span>
                </div>
                <div className="w-full h-[2px] bg-[rgba(255,255,255,0.05)] mt-2">
                  <div className="h-full bg-[var(--color-gold-muted)] transition-all duration-500" style={{ width: `${Math.min((total / 110) * 100, 100)}%` }} />
                </div>
              </div>
            )}
            <div className="flex justify-between mb-6">
              <span className="text-sm text-gray-400 uppercase tracking-widest">Total</span>
              <span className="text-lg text-white font-mono">${total.toFixed(2)} CAD</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-[var(--color-gold)] text-black font-bold py-4 uppercase tracking-[0.2em] hover:bg-[#b5952f] transition-colors shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
