import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import Link from "next/link";

export default async function AllCollectionPage() {
  const products = await fetchProducts();
  return (
    <div className="min-h-screen pt-40 pb-24 px-6 max-w-[1400px] mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mb-4">The Full Archive</h1>
        <p className="text-gray-400 font-sans tracking-widest uppercase text-sm">Every artifact. Every frequency.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(p => <Card key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function Card({ p }: { p: ShopifyProduct }) {
  return (
    <Link href={`/product/${p.handle}`} className="group">
      <div className="obsidian-glass overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-gold-muted)]">
        <div className="aspect-[4/5] relative overflow-hidden bg-[url('/esoteric-backdrop.png')] bg-cover bg-center flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 z-10 drop-shadow-2xl" />
          <div className="absolute top-4 right-4 bg-[var(--color-gold-muted)] text-black text-[0.65rem] font-bold px-3 py-1 tracking-widest uppercase z-20">Limited Drop</div>
        </div>
        <div className="p-6 text-center">
          <h3 className="font-serif text-[1rem] text-gray-100 group-hover:text-[var(--color-gold)] transition-colors">{p.title}</h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            {p.compareAtPrice && <span className="text-gray-500 line-through text-xs font-mono">{p.compareAtPrice}</span>}
            <p className="text-[var(--color-gold-muted)] font-mono text-sm">{p.price} CAD</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
