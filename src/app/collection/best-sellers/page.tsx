import { fetchProducts } from "@/lib/shopify";
import type { Metadata } from "next";
import ProductCard from "@/components/shared/ProductCard";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "Discover our most sought-after esoteric streetwear artifacts. Limited availability.",
  alternates: { canonical: "https://stateofresonance.ca/collection/best-sellers" }
};

export default async function BestSellersPage() {
  const products = await fetchProducts();
  // Simulate best sellers by taking top 4.
  const bestSellers = products.slice(0, 4);

  return (
    <div className="w-full min-h-screen pt-36 md:pt-40 pb-24 flex flex-col items-center bg-black">
      {/* ═══════ HEADER ═══════ */}
      <section className="pb-16 px-6 max-w-7xl mx-auto text-center border-b border-[rgba(255,255,255,0.05)] w-full">
        <h1 className="text-4xl lg:text-6xl font-serif tracking-wide text-white mb-6 uppercase">Best Sellers</h1>
        <p className="text-gray-400 font-sans tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed uppercase text-sm">
          Highly resonant artifacts moving quickly through the community.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <span className="text-[var(--color-gold-muted)] tracking-widest text-xs uppercase font-mono border border-[var(--color-gold-muted)] px-4 py-2">Most Popular Frequency Check</span>
        </div>
      </section>

      {/* ═══════ GRID ═══════ */}
      <section className="py-24 px-6 w-full max-w-[1400px]">
        {bestSellers.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {bestSellers.map(p => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 uppercase tracking-widest mt-20">The archive is currently empty.</p>
        )}
      </section>
    </div>
  );
}
