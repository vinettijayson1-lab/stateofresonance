"use client";

import { useCartStore } from "@/store/cart";
import { useState, useRef, Suspense } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { trackAddToCart } from "@/lib/tracking";
import SizeGuideModal from "./SizeGuideModal";
import { useSearchParams } from "next/navigation";

function AddToCartInner({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  const searchParams = useSearchParams();
  const variantParam = searchParams.get('variant');
  
  const buttonRef = useRef<HTMLDivElement>(null);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (variantParam && product?.variants) {
      const urlVariant = product.variants.find(v => v.id.includes(variantParam));
      if (urlVariant) {
        const opts: Record<string, string> = {};
        product.options?.forEach((opt, i) => {
          if (opt.name !== 'Title') {
            const val = [urlVariant.option1, urlVariant.option2, urlVariant.option3][i];
            if (val) opts[opt.name] = val;
          }
        });
        return opts;
      }
    }

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
    addItem({ id: product.id, variantId: currentVariant?.id || product.id, title: product.title, price: currentVariant?.price || product.price, image: product.image.url, quantity: 1 });
    trackAddToCart({ id: product.id, title: product.title, price: currentVariant?.price || product.price, category: product.category });
    toggleCart();
  };

  return (
    <div id="variant-selector" className="w-full relative mt-4 mb-8">
      {/* Variant Selector */}
      {product?.options?.some(o => o.name !== 'Title') && (
        <div className="flex flex-col gap-6 mb-8 pt-4 border-t border-[rgba(255,255,255,0.05)]">
          {product.options.filter(o => o.name !== 'Title').map(option => (
            <div key={option.name} className="flex flex-col gap-3">
              <div className="flex justify-between items-center w-full">
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">Select {option.name}</span>
                {option.name.toLowerCase() === 'size' && (
                  <SizeGuideModal />
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {option.values.map(val => (
                  <button key={val} onClick={() => setSelectedOptions(p => ({ ...p, [option.name]: val }))}
                    className={`px-5 py-3 text-xs tracking-widest uppercase transition-all border ${selectedOptions[option.name] === val ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-[rgba(255,255,255,0.1)] text-gray-400 bg-transparent hover:border-[rgba(255,255,255,0.3)]'}`}>
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

      {isAvailable && (() => {
        const qty = currentVariant?.quantityAvailable;
        const label = qty != null && qty <= 15
          ? `${qty} artifact${qty === 1 ? '' : 's'} remaining`
          : 'High Frequency — Very Few Artifacts Remain';
        return (
          <div className="flex items-center justify-center gap-2 mb-4 animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-[0.55rem] tracking-widest text-red-400 font-mono uppercase">{label}</span>
          </div>
        );
      })()}

      <div ref={buttonRef} className="flex flex-col gap-3">
        {isAvailable ? (
          <>
            <button onClick={handleAcquire}
              className={`w-full transition-all duration-300 font-extrabold uppercase tracking-[0.2em] py-5 bg-[var(--color-gold)] hover:bg-[#c9a738] hover:brightness-110 text-black shadow-[0_0_40px_rgba(212,175,55,0.4)]`}>
              Acquire Artifact
            </button>
            <button onClick={() => { handleAcquire(); setTimeout(() => { window.location.href = useCartStore.getState().getCheckoutUrl(); }, 100); }}
              className="w-full bg-transparent hover:bg-white hover:text-black text-white border border-white transition-colors font-bold uppercase tracking-[0.2em] py-4">
              Buy It Now
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <h4 className="text-[var(--color-gold-muted)] font-serif italic text-lg text-center mt-2">Resonance Depleted</h4>
            <p className="text-gray-400 font-sans text-xs tracking-widest uppercase text-center mb-2">Sign up to be notified of the next manifestation.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Notify logic simulated"); }} className="flex w-full">
              <input type="email" placeholder="ENTER YOUR EMAIL" required className="w-full bg-black border border-[rgba(255,255,255,0.1)] border-r-0 px-4 py-4 text-xs font-sans tracking-widest text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-gold-muted)]" />
              <button type="submit" className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[var(--color-gold)] hover:text-black hover:border-[var(--color-gold)] transition-colors px-6 text-xs font-bold uppercase tracking-widest shrink-0">Notify Me</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AddToCartButton({ product }: { product: ShopifyProduct }) {
  return (
    <Suspense fallback={<div className="h-20 w-full bg-black/50 animate-pulse border border-[rgba(255,255,255,0.1)]"></div>}>
      <AddToCartInner product={product} />
    </Suspense>
  );
}
