import { fetchProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/pdp/AddToCartButton";
import ProductGallery from "@/components/pdp/ProductGallery";
import TrustBadges from "@/components/pdp/TrustBadges";
import StickyMobileCart from "@/components/pdp/StickyMobileCart";
import Image from "next/image";
import type { Metadata } from "next";

const BASE_URL = "https://stateofresonance.ca";

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map(p => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const products = await fetchProducts();
  const product = products.find(p => p.handle === handle);
  if (!product) return { title: "Product Not Found" };

  const desc = product.descriptionHtml
    ? product.descriptionHtml.replace(/<[^>]*>/g, '').slice(0, 155).trim() + '…'
    : `Shop ${product.title} — premium occult streetwear by State of Resonance. 450gsm heavyweight cotton, limited to 10 units.`;

  return {
    title: product.title,
    description: desc,
    alternates: { canonical: `${BASE_URL}/product/${handle}` },
    openGraph: {
      title: `${product.title} — ${product.price} CAD`,
      description: desc,
      url: `${BASE_URL}/product/${handle}`,
      siteName: "State of Resonance",
      images: [{ url: product.image.url, width: 800, height: 1000, alt: product.image.alt }],
      type: "website", // Standardizing on website as it safely maps preview images
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: desc,
      images: [product.image.url],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const allProducts = await fetchProducts();
  const product = allProducts.find(p => p.handle === handle);
  if (!product) return notFound();

  const related = allProducts.filter(p => p.handle !== handle).slice(0, 4);
  const numericId = product.id.replace('gid://shopify/Product/', '');

  return (
    <div className="w-full min-h-screen relative z-10 pt-56 lg:pt-64 pb-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col">

      {/* Breadcrumbs */}
      <nav className="mb-8 font-sans text-xs uppercase tracking-widest text-gray-500 flex gap-2">
        <Link href="/" className="hover:text-[var(--color-gold-muted)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collection/all" className="hover:text-[var(--color-gold-muted)] transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-300">{product.title}</span>
      </nav>

      {/* JSON-LD Product + BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@graph": [
          {
            "@type": "Product",
            name: product.title,
            image: product.images.map(i => i.url),
            description: `State of Resonance Official Artifact: ${product.title}`,
            brand: { "@type": "Brand", name: "State of Resonance" },
            offers: {
              "@type": "Offer",
              url: `https://stateofresonance.ca/product/${product.handle}`,
              priceCurrency: "CAD",
              price: product.price.replace('$', ''),
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://stateofresonance.ca" },
              { "@type": "ListItem", position: 2, name: "Shop", item: "https://stateofresonance.ca/collection/all" },
              { "@type": "ListItem", position: 3, name: product.title, item: `https://stateofresonance.ca/product/${product.handle}` },
            ],
          },
        ],
      })}} />

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start w-full">

        {/* LEFT: Gallery */}
        <div className="w-full lg:w-1/2">
          <ProductGallery mainImage={product.image} images={product.images} />
        </div>

        {/* RIGHT: Info */}
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left pt-4">
          <div className="mb-8 border-b border-[rgba(255,255,255,0.05)] pb-8">
            <p className="text-[var(--color-gold-muted)] tracking-[0.3em] text-xs uppercase mb-4 animate-pulse">{product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-serif text-white tracking-wide mb-4 leading-tight">{product.title}</h1>

            {/* Judge.me Preview Badge */}
            <div className="jdgm-widget jdgm-preview-badge mb-6 min-h-[20px]" data-id={numericId} data-template="product" />

            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-end gap-3 text-2xl font-mono tracking-wider">
                {product.compareAtPrice && (
                  <span className="text-gray-500 line-through text-xl">{product.compareAtPrice}</span>
                )}
                <p className="text-gray-300">{product.price} <span className="text-sm text-gray-500 font-sans">CAD</span></p>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs tracking-widest text-[#5a5a5a] uppercase mt-2 font-mono">
                <span>Shop Pay</span><span>•</span><span>Apple Pay</span><span>•</span><span>Google Pay</span>
              </div>
            </div>

            <div className="text-sm text-gray-400 font-sans leading-relaxed tracking-wide space-y-4 prose prose-invert mx-auto lg:mx-0"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml && product.descriptionHtml.length > 5 ? product.descriptionHtml : '<p>Forged in the abyss. This artifact resonates with frequencies designed to elevate your state of being.</p>' }} />
          </div>

          <div className="w-full mb-12">
            <AddToCartButton product={product} />
            <div className="mt-6"><TrustBadges /></div>
          </div>

          {/* Product Details */}
          <div className="w-full flex flex-col gap-10 mt-8 border-t border-[rgba(255,255,255,0.05)] pt-12 text-left">
            <div>
              <h3 className="font-serif text-xl text-[var(--color-gold-muted)] uppercase tracking-widest mb-4">Why This Piece Is Special</h3>
              <ul className="space-y-3 font-sans text-sm tracking-wide text-gray-300 uppercase">
                {["450gsm heavyweight cotton", "Oversized, structured silhouette", "Double‑stitched seams", "Limited to 10 units", "Designed in Canada"].map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[var(--color-gold-muted)] uppercase tracking-widest mb-4">Symbol Meaning</h3>
              <div className="font-sans text-sm tracking-wide text-gray-300 space-y-2">
                <p className="text-white font-bold">Metatron&apos;s Cube</p>
                <p>Represents clarity, structure, and the alignment of inner and outer worlds.</p>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[var(--color-gold-muted)] uppercase tracking-widest mb-4">Fit &amp; Feel</h3>
              <ul className="space-y-3 font-sans text-sm tracking-wide text-gray-300 uppercase">
                {["Oversized", "Drop shoulder", "Thick, warm, premium feel", "True to size for oversized look"].map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof on PDP */}
      <div className="w-full mt-24 border-t border-[rgba(255,255,255,0.05)] pt-16">
        <h2 className="font-serif text-2xl text-center text-white mb-8 uppercase tracking-widest">Worn by the Community</h2>
        <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {["/jayson-social.jpg", "/david-social.jpg", "/kelly-social.jpg"].map((src, i) => (
            <div key={i} className="aspect-square relative overflow-hidden border border-[rgba(255,255,255,0.05)] group">
              <Image src={src} alt={`Community ${i + 1}`} fill className="object-cover grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>

      {/* Judge.me Review Widget */}
      <div className="w-full mt-24 border-t border-[rgba(255,255,255,0.05)] pt-16 pb-16" id="reviews">
        <h2 className="font-serif text-3xl text-center text-white mb-12 tracking-widest uppercase">Alchemical Reports</h2>
        <div className="max-w-5xl mx-auto px-4">
          <div className="jdgm-widget jdgm-review-widget" data-id={numericId} />
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="w-full mt-24 border-t border-[rgba(255,255,255,0.05)] pt-16">
          <h2 className="font-serif text-3xl text-center text-white mb-16 tracking-widest uppercase">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {related.map(p => (
              <a key={p.id} href={`/product/${p.handle}`} className="group relative block transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/5] bg-black border border-[rgba(255,255,255,0.05)] flex items-center justify-center p-4 relative overflow-hidden group-hover:border-[var(--color-gold-muted)] transition-colors">
                  <div className="absolute inset-0 bg-[url('/esoteric-backdrop.png')] bg-cover bg-center opacity-50 group-hover:opacity-100 transition-opacity" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image.url} alt={p.image.alt} className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-white font-serif text-sm group-hover:text-[var(--color-gold-muted)] transition-colors">{p.title}</h3>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    {p.compareAtPrice && <span className="text-gray-500 line-through text-[0.65rem] font-mono">{p.compareAtPrice}</span>}
                    <p className="text-[var(--color-gold-muted)] font-mono text-xs">{p.price}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      
      <StickyMobileCart product={product} />
    </div>
  );
}
