import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/lib/shopify';

export default function ProductCard({ p, priority = false }: { p: ShopifyProduct, priority?: boolean }) {
  const numericId = p.id.replace('gid://shopify/Product/', '');

  return (
    <Link href={`/product/${p.handle}`} className="group w-full max-w-sm flex flex-col items-center">
      <div className="w-full aspect-[4/5] relative border border-[rgba(255,255,255,0.05)] overflow-hidden bg-[url('/esoteric-backdrop.png')] bg-cover bg-center flex items-center justify-center p-4 md:p-8">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-[1]" />
        
        {/* Compare At Badge */}
        {p.compareAtPrice && (
          <div className="absolute top-4 right-4 z-10 bg-[var(--color-gold)] text-black text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            Sale
          </div>
        )}

        <Image 
          src={p.image.url} 
          alt={p.image.alt} 
          fill 
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-contain p-8 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] filter brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700 ease-in-out relative z-[2]" 
        />
        
        <div className="absolute bottom-4 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[3] translate-y-2 group-hover:translate-y-0">
          <span className="bg-white text-black px-6 py-2 text-xs uppercase tracking-widest font-bold font-sans">
            View Artifact
          </span>
        </div>
      </div>

      <div className="mt-8 text-center w-full flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-serif text-white tracking-wide group-hover:text-[var(--color-gold)] transition-colors">{p.title}</h2>
        

        <div className="flex gap-3 text-sm md:text-base font-mono mt-1">
          {p.compareAtPrice && <p className="text-gray-500 line-through">{p.compareAtPrice}</p>}
          <p className="text-gray-300 tracking-wider font-bold">{p.price}</p>
        </div>
      </div>
    </Link>
  );
}
