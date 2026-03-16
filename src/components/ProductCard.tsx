"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionImage = motion(Image);

export interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string;
  handle: string;
  type: 'clothing' | 'esoteric';
  variantId?: string;
}

const CONVERSION_RATE = 1.36; // USD to CAD
const MARKUP = 1.3; // 30%

export const isAzureGreen = (product: Product | { id?: string; handle?: string }) => {
  return product?.id?.startsWith('ag-') || product?.handle?.includes('azure');
};

export const calculateCADPrice = (price: string) => {
  if (!price) return "0.00";
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
  if (isNaN(numericPrice)) return price;
  return ((numericPrice * CONVERSION_RATE) * MARKUP).toFixed(2);
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${product.handle}`} className="block space-y-4">
        <div className="relative aspect-[4/5] overflow-hidden bg-onyx border border-white/5 group-hover:border-sapphire/50 group-hover:shadow-[0_0_40px_rgba(6,14,26,0.5)] transition-all duration-700">
          <MotionImage
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-all duration-1000"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 group-hover:bg-sapphire/5 transition-colors duration-700 z-10" />
        </div>
        
        <div className="space-y-1 px-1">
          <span className="text-[0.6rem] tracking-[0.3em] text-gold uppercase opacity-80">
            {product.category}
          </span>
          <h3 className="text-lg tracking-wide text-white group-hover:text-gold transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-sm tracking-widest text-muted">
            {isAzureGreen(product) 
              ? `$${calculateCADPrice(product.price)} CAD`
              : (product.price.startsWith('$') ? product.price : `$${product.price}`)
            }
          </p>
        </div>
      </Link>
      
      <button 
        className="w-full mt-4 py-3 border border-gold/30 text-gold text-[0.7rem] tracking-[0.2em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-300"
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://state-of-resonance.myshopify.com/products/${product.handle}${product.variantId ? `?variant=${product.variantId}` : ''}`, '_blank');
        }}
      >
        Acquire Artifact
      </button>
    </motion.div>
  );
}
