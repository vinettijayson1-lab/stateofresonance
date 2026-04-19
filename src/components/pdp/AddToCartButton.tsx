"use client";

import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { trackAddToCart } from "@/lib/tracking";

export default function AddToCartButton({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    product?.options?.forEach(opt => {
      if (opt.name !== 'Title' && opt.values?.length > 0) defaults[opt.name] = opt.values[0];
    });
    return defaults;
  });

  const currentVariant = product?.variants?.find(v => {
    const selected = Object.entries(selectedOptions);
    if (selected.length === 0) return true;
    const vOpts: Record<string, string> = {};
    product.options?.forEach((opt, i) => {
      const val = [v.option1, v.option2, v.option3][i];
      if (val) vOpts[opt.name] = val;
    });
    return selected.every(([name, val]) => vOpts[name] === val);
  }) || product?.variants?.[0];

  const isAvailable = currentVariant?.available !== false;

  const handleAcquire = () => {
    if (!isAvailable) return;
    addItem({ id: product.id, variantId: currentVariant?.id || product.id, title: product.title, price: currentVariant?.price || product.price, image: product.image, quantity: 1 });
    trackAddToCart({ id: product.id, title: product.title, price: currentVariant?.price || product.price, category: product.category });
    toggleCart();
  };

  return (
    <div className="w-full relative mt-4 mb-8">
      {/* Variant Selector */}
      {product?.options?.some(o => o.name !== 'Title') && (
        <div className="flex flex-col gap-6 mb-8 pt-4 border-t border-[rgba(255,255,255,0.05)]">
          {product.options.filter(o => o.name !== 'Title').map(option => (
            <div key={option.name} className="flex flex-col gap-3">
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">Select {option.name}</span>
              <div className="flex flex-wrap gap-2">
                {option.values.map(val => (
                  <button key={val} onClick={() => setSelectedOptions(p => ({ ...p, [option.name]: val }))}
                    className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${selectedOptions[option.name] === val ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-[rgba(255,255,255,0.1)] text-gray-400 bg-transparent hover:border-[rgba(255,255,255,0.3)]'}`}>
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-[0.65rem] tracking-[0.3em] font-serif uppercase text-[var(--color-gold-muted)] mb-4 italic drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]">
        &quot;Let your vibes resonate. Enter the state of resonance.&quot;
      </p>

      {isAvailable && (
        <div className="flex items-center justify-center gap-2 mb-4 animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-[0.55rem] tracking-widest text-red-400 font-mono uppercase">High Frequency — Very Few Artifacts Remain</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button onClick={handleAcquire} disabled={!isAvailable}
          className={`w-full transition-colors font-bold uppercase tracking-[0.2em] py-5 ${isAvailable ? 'bg-[var(--color-gold)] hover:bg-[#b5952f] text-black shadow-[0_0_30px_rgba(212,175,55,0.2)]' : 'bg-[var(--color-onyx-light)] text-gray-500 cursor-not-allowed border border-[rgba(255,255,255,0.05)]'}`}>
          {isAvailable ? 'Acquire Artifact' : 'Resonance Depleted'}
        </button>
        {isAvailable && (
          <button onClick={() => { handleAcquire(); setTimeout(() => { window.location.href = useCartStore.getState().getCheckoutUrl(); }, 100); }}
            className="w-full bg-transparent hover:bg-white hover:text-black text-white border border-white transition-colors font-bold uppercase tracking-[0.2em] py-4">
            Buy It Now
          </button>
        )}
      </div>
    </div>
  );
}
