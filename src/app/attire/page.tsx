import ProductCard, { Product as ProductType } from "@/components/ProductCard";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AttirePage() {
  const collection = await prisma.collection.findUnique({
    where: { handle: 'ghost-and-bones' },
    include: {
      products: {
        where: {
          NOT: { image: { contains: 'placeholder' } }
        }
      }
    }
  });

  const attireProducts = collection?.products || [];

  return (
    <main className="flex-grow pt-32 pb-20 px-6 md:px-12 bg-obsidian relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-sapphire/10 via-transparent to-transparent rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amethyst/10 via-transparent to-transparent rounded-full blur-[100px] -z-10" />

      <header className="max-w-7xl mx-auto mb-16 relative">
        <span className="text-sapphire tracking-[0.5em] uppercase text-[0.7rem] font-bold block mb-4">
          Sacred Attire
        </span>
        <h1 className="text-4xl md:text-6xl font-heading text-white tracking-tight">
          The Ghost and Bones
        </h1>
        <p className="text-muted mt-6 max-w-xl font-body leading-relaxed">
          Custom-engineered garments designed for the modern practitioner. Each piece is a sigil, a statement of alignment with the unseen.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {attireProducts.slice(0, 48).map((product) => (
          <ProductCard 
            key={product.id} 
            product={{
              ...product,
              type: product.type as 'clothing' | 'esoteric',
              variantId: product.variantId || undefined
            } as ProductType} 
          />
        ))}
      </div>
      
      {attireProducts.length > 12 && (
        <div className="max-w-7xl mx-auto mt-12 text-center">
          <Link 
            href="/collection/ghost-and-bones" 
            className="inline-block py-4 px-12 border border-gold text-gold tracking-[0.3em] uppercase text-[0.7rem] hover:bg-gold hover:text-obsidian transition-all duration-500"
          >
            View Full Collection
          </Link>
        </div>
      )}
    </main>
  );
}
