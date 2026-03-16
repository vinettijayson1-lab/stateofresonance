"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionImage = motion(Image);

interface CollectionCardProps {
  name: string;
  handle: string;
  description: string | null;
  image: string;
  productCount: number;
}

export default function CollectionCard({ 
  name, 
  handle, 
  description, 
  image, 
  productCount 
}: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="group relative aspect-[4/5] overflow-hidden bg-onyx border border-white/5 hover:border-gold/50 transition-colors duration-700"
    >
      <Link href={`/collection/${handle}`} className="block h-full w-full relative">
        {/* Background Image */}
        <MotionImage
          src={image}
          alt={name}
          fill
          className="object-cover transition-all duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-sapphire/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-amethyst/10 transition-colors duration-700 z-10" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-3 transform group-hover:-translate-y-2 transition-transform duration-500">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[0.6rem] tracking-[0.4em] text-gold uppercase opacity-80 block mb-2">
                Collection
              </span>
              <h3 className="text-2xl font-heading tracking-wide text-white group-hover:text-gold transition-colors duration-300 drop-shadow-lg">
                {name}
              </h3>
            </div>
            <span className="text-[0.6rem] tracking-[0.2em] text-white/40 mb-1">
              {productCount} Artifacts
            </span>
          </div>
          
          {description && (
            <p className="text-sm tracking-widest text-muted/80 leading-relaxed font-body overflow-hidden text-ellipsis line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
              {description}
            </p>
          )}

          <div className="pt-4 flex items-center gap-2 text-gold text-[0.6rem] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            Enter Sanctuary <span className="text-xs">&rarr;</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
