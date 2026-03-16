import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck } from "lucide-react";
import AcquireButton from "@/components/AcquireButton";
import { isAzureGreen, calculateCADPrice } from "@/components/ProductCard";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  
  // Try finding by handle first, then fallback to ID
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { handle },
        { id: handle }
      ]
    }
  });

  if (!product) return notFound();

  return (
    <main className="flex-grow pt-32 pb-20 px-6 md:px-12 bg-obsidian relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-sapphire/20 via-transparent to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-amethyst/10 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-onyx border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] lg:sticky lg:top-32">
          <div className="absolute inset-0 bg-gradient-to-tr from-sapphire/5 to-transparent z-10 pointer-events-none" />
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-12">
          <header className="space-y-4">
            <span className="text-sapphire tracking-[0.6em] uppercase text-[0.7rem] font-bold block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-heading text-white tracking-tight">
              {product.title}
            </h1>
            <p className="text-2xl text-white/90 font-body tracking-widest">
              {isAzureGreen(product) 
                ? `$${calculateCADPrice(product.price)} CAD` 
                : (product.price.startsWith('$') ? product.price : `$${product.price}`)
              }
            </p>
          </header>

          <div className="prose prose-invert text-muted font-body leading-relaxed text-lg">
            <p>{product.description}</p>
          </div>

          <div className="space-y-6">
            <AcquireButton 
              handle={product.handle} 
              variantId={product.variantId} 
            />
            
            <div className="flex flex-col gap-4 text-[0.7rem] tracking-widest uppercase text-muted/60">
              <div className="flex items-center gap-3">
                <ShieldCheck size={14} className="text-sapphire" />
                <span>Authentic Alchemical Origin</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={14} className="text-amethyst" />
                <span>Ethereal Delivery (Worldwide)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
