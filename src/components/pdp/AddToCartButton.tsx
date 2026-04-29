"use client";

import { useCartStore } from "@/store/cart";
import { useState, Suspense } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { trackAddToCart } from "@/lib/tracking";
import { useSearchParams } from "next/navigation";

function AddToCartInner({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  const searchParams = useSearchParams();
  const variantParam = searchParams.get('variant');

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
    addItem({ 
      id: product.id, 
      variantId: currentVariant?.id || product.id, 
      title: product.title, 
      price: currentVariant?.price || product.price, 
      image: product.image.url, 
      quantity: 1 
    });
    trackAddToCart({ 
      id: product.id, 
      title: product.title, 
      price: currentVariant?.price || product.price, 
      category: product.category 
    });
    toggleCart();
  };

  return (
    <div id="variant-selector" className="w-full mb-6">
      {/* Variant Selector */}
      {product?.options?.some(o => o.name !== 'Title') && (
        <div className="flex flex-col gap-6 mb-6">
          {product.options.filter(o => o.name !== 'Title').map(option => (
            <div key={option.name} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {option.name}: <span className="text-foreground">{selectedOptions[option.name]}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {option.values.map(val => (
                  <button 
                    key={val} 
                    onClick={() => setSelectedOptions(p => ({ ...p, [option.name]: val }))}
                    className={`min-w-[3rem] px-4 py-2.5 text-xs tracking-wide uppercase transition-all border ${
                      selectedOptions[option.name] === val 
                        ? 'border-foreground bg-foreground text-background' 
                        : 'border-border bg-transparent text-foreground hover:border-foreground'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stock indicator */}
      {isAvailable && currentVariant?.quantityAvailable != null && currentVariant.quantityAvailable <= 10 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">
            Only {currentVariant.quantityAvailable} left in stock
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      <div id="main-add-to-cart" className="flex flex-col gap-3">
        {isAvailable ? (
          <>
            <button 
              onClick={handleAcquire}
              className="w-full py-4 bg-foreground text-background font-medium tracking-wide uppercase text-sm transition-all hover:bg-foreground/90 active:scale-[0.98]"
            >
              Add to Cart — {currentVariant?.price || product.price}
            </button>
            <button 
              onClick={() => { 
                handleAcquire(); 
                setTimeout(() => { 
                  window.location.href = useCartStore.getState().getCheckoutUrl(); 
                }, 100); 
              }}
              className="w-full py-4 bg-transparent text-foreground border border-border font-medium tracking-wide uppercase text-sm transition-all hover:bg-secondary"
            >
              Buy Now
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="py-4 bg-secondary text-muted-foreground text-center font-medium tracking-wide uppercase text-sm">
              Sold Out
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Notify logic simulated"); }} className="flex">
              <input 
                type="email" 
                placeholder="Enter email for restock updates" 
                required 
                className="flex-1 bg-transparent border border-border border-r-0 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" 
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide uppercase shrink-0 hover:bg-foreground/90 transition-colors"
              >
                Notify Me
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AddToCartButton({ product }: { product: ShopifyProduct }) {
  return (
    <Suspense fallback={<div className="h-20 w-full bg-secondary animate-pulse" />}>
      <AddToCartInner product={product} />
    </Suspense>
  );
}
