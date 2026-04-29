'use client';

import { useState, useMemo } from 'react';
import { useCartStore } from '@/store/cart';
import { ShopifyProduct } from '@/lib/shopify';
import { Minus, Plus, Check } from 'lucide-react';

interface AddToCartSectionProps {
  product: ShopifyProduct;
}

// Compute initial options from product (pure function)
function getInitialOptions(product: ShopifyProduct): Record<string, string> {
  const firstAvailable = product.variants.find(v => v.available) || product.variants[0];
  if (!firstAvailable) return {};
  
  const initialOptions: Record<string, string> = {};
  product.options.forEach((option, idx) => {
    const variantOption = idx === 0 ? firstAvailable.option1 
      : idx === 1 ? firstAvailable.option2 
      : firstAvailable.option3;
    initialOptions[option.name] = variantOption || option.values[0];
  });
  return initialOptions;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  
  // Use useMemo with a function to compute initial state
  const initialOptions = useMemo(() => getInitialOptions(product), [product]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Find matching variant based on selected options
  const selectedVariant = product.variants.find(variant => {
    return product.options.every((option, idx) => {
      const selectedValue = selectedOptions[option.name];
      const variantValue = idx === 0 ? variant.option1 
        : idx === 1 ? variant.option2 
        : variant.option3;
      return selectedValue === variantValue;
    });
  }) || product.variants[0];

  const isAvailable = selectedVariant?.available ?? true;

  const handleAddToCart = () => {
    const variant = selectedVariant || product.variants.find(v => v.available) || product.variants[0];
    
    if (!variant || isAdding) return;
    
    setIsAdding(true);
    
    addItem({
      id: variant.id,
      variantId: variant.id,
      title: `${product.title}${variant.title !== 'Default Title' ? ` - ${variant.title}` : ''}`,
      price: variant.price,
      image: product.image.url,
      quantity,
    });
    
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(false);
      toggleCart();
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Size/Option selectors */}
      {product.options.map(option => (
        <div key={option.name}>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-[#fafafa]">
              {option.name}
            </label>
            {option.name.toLowerCase() === 'size' && (
              <button className="text-xs text-[#737373] underline underline-offset-2 hover:text-[#fafafa] transition-colors">
                Size Guide
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {option.values.map(value => {
              const isSelected = selectedOptions[option.name] === value;
              // Check if this option value has any available variants
              const hasAvailableVariant = product.variants.some(v => 
                v.available && (v.option1 === value || v.option2 === value || v.option3 === value)
              );
              
              return (
                <button
                  key={value}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                  disabled={!hasAvailableVariant}
                  className={`px-4 py-3 text-sm border transition-all ${
                    isSelected
                      ? 'border-[#fafafa] bg-[#fafafa] text-[#0a0a0a]'
                      : hasAvailableVariant
                        ? 'border-[#262626] text-[#a3a3a3] hover:border-[#fafafa]'
                        : 'border-[#1a1a1a] text-[#737373] opacity-50 cursor-not-allowed line-through'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity selector */}
      <div>
        <label className="text-sm font-medium text-[#fafafa] mb-3 block">Quantity</label>
        <div className="flex items-center border border-[#262626] w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 text-[#a3a3a3] hover:text-[#fafafa] transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-[#fafafa]">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 text-[#a3a3a3] hover:text-[#fafafa] transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to cart button - prominent */}
      <button
        onClick={handleAddToCart}
        disabled={!isAvailable || isAdding}
        className={`w-full py-4 text-sm font-medium tracking-[0.1em] uppercase transition-all ${
          isAdded
            ? 'bg-green-600 text-white'
            : isAvailable
              ? 'bg-[#fafafa] text-[#0a0a0a] hover:bg-[#f5f5f0]'
              : 'bg-[#262626] text-[#737373] cursor-not-allowed'
        }`}
      >
        {isAdded ? (
          <span className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Added to Cart
          </span>
        ) : isAvailable ? (
          `Add to Cart - ${selectedVariant?.price || product.price}`
        ) : (
          'Sold Out'
        )}
      </button>

      {/* Stock indicator */}
      {isAvailable && selectedVariant?.quantityAvailable && selectedVariant.quantityAvailable <= 5 && (
        <p className="text-center text-sm text-[#c4a077]">
          Only {selectedVariant.quantityAvailable} left in stock
        </p>
      )}
    </div>
  );
}
