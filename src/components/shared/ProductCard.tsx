import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/lib/shopify';

/** Loading skeleton matching the ProductCard layout */
export function ProductCardSkeleton() {
  return (
    <div className="w-full flex flex-col items-center animate-pulse">
      <div className="w-full aspect-[4/5] bg-[#141414] glass-card" />
      <div className="mt-3 sm:mt-4 md:mt-6 w-full flex flex-col items-center gap-2 px-1">
        <div className="h-4 w-3/4 bg-[#1a1a1a] rounded" />
        <div className="h-3 w-1/3 bg-[#141414] rounded" />
      </div>
    </div>
  );
}

export default function ProductCard({ p, priority = false }: { p: ShopifyProduct, priority?: boolean }) {
  return (
    <Link
      href={`/product/${p.handle}`}
      className="group w-full flex flex-col items-center relative"
    >
      {/* Aura glow behind card (desktop only — saves paint cost on mobile) */}
      <div className="hidden md:block absolute -inset-4 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="w-full aspect-[4/5] relative overflow-hidden glass-card transition-all duration-500 md:group-hover:scale-[1.02] flex items-center justify-center p-2 sm:p-4 md:p-8">
        {/* Subtle inner gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-[1]" />

        {/* Sale badge */}
        {p.compareAtPrice && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-[var(--color-gold)] text-black text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 sm:px-3 sm:py-1 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            Sale
          </div>
        )}

        <Image
          src={p.image.url}
          alt={p.image.alt}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-contain p-2 sm:p-4 md:p-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] md:group-hover:brightness-110 md:group-hover:scale-105 transition-all duration-700 ease-out relative z-[2]"
        />

        {/* Hover-only "View Artifact" — desktop only */}
        <div className="hidden md:flex absolute bottom-4 left-0 w-full justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-[3] translate-y-2 group-hover:translate-y-0">
          <span className="bg-[var(--color-gold)] text-black px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] font-bold font-sans shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            View Artifact
          </span>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 md:mt-6 text-center w-full flex flex-col items-center px-1">
        <h2 className="text-sm sm:text-base md:text-xl font-serif text-white tracking-wide group-hover:text-[var(--color-gold)] transition-colors duration-300 line-clamp-2 leading-tight">
          {p.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm font-mono mt-1.5 sm:mt-2">
          {p.compareAtPrice && (
            <p className="text-gray-500 line-through">{p.compareAtPrice}</p>
          )}
          <p className="text-gray-300 tracking-wider font-bold">{p.price}</p>
        </div>
      </div>
    </Link>
  );
}
