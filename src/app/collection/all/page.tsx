import { fetchProducts } from "@/lib/shopify";
import type { Metadata } from "next";
import ProductCard from "@/components/shared/ProductCard";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse the full archive of State of Resonance. 450gsm heavyweight occult streetwear, embroidered locally.",
  alternates: { canonical: "https://stateofresonance.ca/collection/all" }
};

export default async function AllCollectionPage() {
  const products = await fetchProducts();
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 999;
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 999;
    return priceA - priceB;
  });
  return (
    <div className="min-h-screen pt-56 md:pt-64 pb-24 px-6 max-w-[1400px] mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mb-4">The Full Archive</h1>
        <p className="text-gray-400 font-sans tracking-widest uppercase text-sm">Every artifact. Every frequency.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {sortedProducts.map((p, index) => <ProductCard key={p.id} p={p} priority={index < 4} />)}
      </div>
    </div>
  );
}
