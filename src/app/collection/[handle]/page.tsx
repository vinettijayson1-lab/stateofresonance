import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = await prisma.collection.findUnique({
    where: { handle },
    include: { products: true }
  });

  if (!collection) {
    // If not found in DB, maybe fallback to a common handle or show empty
    return (
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12">
        <header className="max-w-7xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-heading text-white tracking-tight uppercase">
            {handle.replace(/-/g, ' ')}
          </h1>
          <p className="text-muted mt-6">No artifacts found in this collection.</p>
        </header>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-20 px-6 md:px-12">
      <header className="max-w-7xl mx-auto mb-16">
        <span className="text-gold tracking-[0.5em] uppercase text-[0.7rem] block mb-4">
          Collection
        </span>
        <h1 className="text-4xl md:text-6xl font-heading text-white tracking-tight uppercase">
          {collection.name}
        </h1>
        {collection.description && (
          <p className="text-muted mt-6 max-w-xl font-body leading-relaxed">
            {collection.description}
          </p>
        )}
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {collection.products.slice(0, 48).map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {collection.products.length > 48 && (
        <p className="max-w-7xl mx-auto mt-12 text-center text-gold/60 text-xs tracking-widest">
          Showing first 48 of {collection.products.length} artifacts. Catalog optimization in progress.
        </p>
      )}
    </main>
  );
}
