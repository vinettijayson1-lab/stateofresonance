import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/lib/shopify';

export default function ProductCard({ p, priority = false }: { p: ShopifyProduct, priority?: boolean }) {
  return (
    <Link href={`/product/${p.handle}`} className="group w-full max-w-sm flex flex-col items-center relative">
      {/* Aura glow behind card */}
      <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-float-orb" />
      
      <div className="w-full aspect-[4/5] relative overflow-hidden glass-card transition-all duration-500 group-hover:scale-[1.02] flex items-center justify-center p-4 md:p-8">
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-[1]" />
        
        {/* Compare At Badge */}
        {p.compareAtPrice && (
          <div className="absolute top-4 right-4 z-10 bg-[var(--color-gold)] text-black text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            Sale
          </div>
        )}

        <Image 
          src={p.image.url} 
          alt={p.image.alt} 
          fill 
          sizes="(max-width: 768px) 75vw, (max-width: 1200px) 40vw, 30vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-contain p-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:brightness-110 group-hover:scale-105 transition-all duration-700 ease-out relative z-[2]" 
        />
        
        <div className="absolute bottom-4 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-[3] translate-y-2 group-hover:translate-y-0">
          <span className="bg-[var(--color-gold)] text-black px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] font-bold font-sans shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            View Artifact
          </span>
        </div>
      </div>

      <div className="mt-6 text-center w-full flex flex-col items-center">
        <h2 className="text-lg md:text-xl font-serif text-white tracking-wide group-hover:text-[var(--color-gold)] transition-colors duration-300">{p.title}</h2>
        <div className="flex gap-3 text-sm font-mono mt-2">
          {p.compareAtPrice && <p className="text-gray-500 line-through">{p.compareAtPrice}</p>}
          <p className="text-gray-300 tracking-wider font-bold">{p.price}</p>
        </div>
      </div>
    </Link>
  );
}
