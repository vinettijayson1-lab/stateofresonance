import CollectionCard from "@/components/CollectionCard";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function SanctuaryPage() {
  const toolCollections = await prisma.collection.findMany({
    where: { 
      handle: { not: 'ghost-and-bones' },
      products: { some: {} }
    },
    include: {
      _count: {
        select: { products: true }
      },
      products: {
        take: 1,
        select: { image: true }
      }
    }
  });

  return (
    <main className="flex-grow pt-32 pb-20 px-6 md:px-12 bg-obsidian relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-sapphire/20 via-amethyst/5 to-transparent pointer-events-none" />
      
      <header className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <span className="text-gold tracking-[0.5em] uppercase text-[0.7rem] block mb-4">
          Esoteric Compartments
        </span>
        <h1 className="text-4xl md:text-6xl font-heading text-white tracking-tight">
          The Sanctuary
        </h1>
        <p className="text-muted mt-6 mx-auto max-w-2xl font-body leading-relaxed">
          Explore the specialized catalogs of the Work. Each compartment contains curated alchemical tools, sacred manuscripts, and consecrated artifacts for the modern practitioner.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toolCollections.map(collection => (
          <CollectionCard
            key={collection.id}
            name={collection.name}
            handle={collection.handle}
            description={collection.description}
            image={collection.products[0]?.image || '/assets/placeholder.png'}
            productCount={collection._count.products}
          />
        ))}
      </div>
    </main>
  );
}
