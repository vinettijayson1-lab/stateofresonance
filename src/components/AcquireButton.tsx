"use client";

import { ShoppingCart } from "lucide-react";

interface AcquireButtonProps {
  handle: string;
  variantId?: string | null;
}

export default function AcquireButton({ handle, variantId }: AcquireButtonProps) {
  const handleClick = () => {
    const url = `https://state-of-resonance.myshopify.com/products/${handle}${variantId ? `?variant=${variantId}` : ""}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-4 bg-gold text-obsidian text-[0.8rem] tracking-[0.3em] uppercase font-bold hover:bg-white transition-all duration-300 flex items-center justify-center gap-3"
    >
      <ShoppingCart size={18} />
      Acquire Artifact
    </button>
  );
}
