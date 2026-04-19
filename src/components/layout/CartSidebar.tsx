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

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
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

        {items.length > 0 && (
          <div className="p-6 border-t border-[rgba(255,255,255,0.05)]">
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
