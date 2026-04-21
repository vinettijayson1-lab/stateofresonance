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
      type: "website",
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

      <nav className="mb-8 font-sans text-xs uppercase tracking-widest text-gray-500 flex gap-2">
        <Link href="/" className="hover:text-[var(--color-gold-muted)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collection/all" className="hover:text-[var(--color-gold-muted)] transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-300">{product.title}</span>
      </nav>

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
        <div className="w-full lg:w-1/2">
          <ProductGallery mainImage={product.image} images={product.images} />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left pt-4">
          <div className="mb-8 border-b border-[rgba(255,255,255,0.05)] pb-8">
            <p className="text-[var(--color-gold-muted)] tracking-[0.3em] text-xs uppercase mb-4 animate-pulse">{product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-serif text-white tracking-wide mb-4 leading-tight">{product.title}</h1>
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
            <TrustBadges />
            <div className="mt-6"><AddToCartButton product={product} /></div>
          </div>

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

      <div className="w-full mt-24 border-t border-[rgba(255,255,255,0.05)] pt-16">
        <h2 className="font-serif text-2xl text-center text-white mb-8 uppercase tracking-widest">Worn by the Community</h2>
        <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { src: "/jayson-social.jpg", label: "The Frequency Spreads", url: "https://www.facebook.com/photo?fbid=10164200068961063&set=a.10154362149296063" },
            { src: "/david-social.jpg", label: "David Goudro", url: "https://www.instagram.com/reel/DWGyGd1Eby5/" },
            { src: "/kelly-social.jpg", label: "Virgin Radio Kelly", url: "https://www.instagram.com/p/DVCd7LUkbxS/" },
          ].map((img, i) => (
            <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className="aspect-square relative overflow-hidden border border-[rgba(255,255,255,0.05)] group cursor-pointer hover:border-[var(--color-gold-muted)] transition-colors">
              <Image src={img.src} alt={img.label} fill className="object-cover grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.6rem] text-gray-300 font-sans tracking-widest uppercase z-10 group-hover:text-white transition-colors text-center whitespace-nowrap">{img.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full mt-24 border-t border-[rgba(255,255,255,0.05)] pt-16 pb-16" id="reviews">
        <h2 className="font-serif text-3xl text-center text-white mb-8 tracking-widest uppercase">Alchemical Reports</h2>
        <div className="flex justify-center mb-8">
          <a
            href="#"
            className="jdgm-write-rev-link text-xs tracking-widest uppercase font-sans border border-[var(--color-gold-muted)] text-[var(--color-gold-muted)] px-6 py-3 hover:bg-[var(--color-gold-muted)] hover:text-black transition-colors"
            data-id={numericId}
          >
            Write a Review
          </a>
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <div className="jdgm-widget jdgm-review-widget" data-id={numericId} />
        </div>
      </div>

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
}            </div>
            <h2 className="font-serif text-3xl text-white uppercase tracking-widest">The Philosophy</h2>
            <div className="space-y-6 text-gray-300 font-sans text-sm leading-relaxed tracking-wide">
              <p>Every piece in our collection is designed around sacred geometry, ancient symbols, and intentional frequencies. We don&apos;t just make clothes — we create artifacts that carry deep, personalized meaning.</p>
              <p>Based in Canada, we serve a global community of seekers, creators, and individuals who understand that style is An extension of spirit. Quality over quantity. Depth over trend.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[var(--color-gold-muted)] font-serif text-2xl">02</span>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-gold-muted)] to-transparent opacity-30" />
            </div>
            <h2 className="font-serif text-3xl text-white uppercase tracking-widest">The Process</h2>
            <div className="space-y-6 text-gray-300 font-sans text-sm leading-relaxed tracking-wide">
              <p>This is a hyper-personal project. Each piece is fundamentally made to order. The garments are embroidered right here at my local embroidery shop, and the graphics are printed individually as orders arrive.</p>
              <p>That means every single artifact passes directly through my hands. I personally check the stitching, the print weight, and the feel to ensure the absolute best quality before it reaches you.</p>
              <div className="p-6 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.02)] mt-8">
                <p className="text-[var(--color-gold-muted)] font-sans text-xs uppercase tracking-widest leading-relaxed">
                  Because of this intensely hands-on process, <strong className="text-white">only 10 pieces of each design are ever made.</strong> Once those 10 units are claimed, I move on to entirely new prints.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square md:aspect-[4/5] border border-[rgba(255,255,255,0.05)] overflow-hidden group">
            <Image src="/jayson-social.jpg" alt="Hands-on process" fill className="object-cover opacity-80 mix-blend-luminosity transform group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-1000" />
          </div>
        </div>
      </section>

      {/* ═══════ FOUNDER STORY ═══════ */}
      <section className="py-32 px-6 max-w-4xl mx-auto border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex flex-col items-center text-center">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-6 inline-block border-b border-[var(--color-gold-muted)] pb-2 pr-1">The Architect</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest mb-12">A Word from the Founder</h2>
          
          <div className="space-y-6 text-gray-300 font-sans text-sm md:text-base leading-relaxed tracking-wide text-left md:text-justify max-w-3xl">
            <p className="text-[var(--color-gold)] font-serif text-xl md:text-2xl mb-8 text-center uppercase tracking-widest">The Quest for Self.</p>
            <p>For many years, I searched for something without ever really knowing what or why. I carried an overwhelming emptiness in my soul—a void that never seemed to fill. Despite a beautiful family and a happy childhood, the feeling of not being &quot;enough&quot; persisted.</p>
            <p>At 13, I found a way to make that awkwardness evaporate. It became my solution, and it worked for 30 years—despite the chaos it created. Until the relief turned into despair. I was completely broken.</p>
            <p>November 21, 2024, was the day everything changed. Entering rehabilitation taught me that the only way to climb out of the dark was to finally admit I needed help. I learned to process my emotions rather than numb them. Because what I was truly searching for was myself. The void can only be filled from the inside.</p>
            <p>Through meditation, faith, and immersing myself in the mathematics of resonance and alchemical design, I realized I had to build the bridge between ancient esoteric wisdom and my modern reality.</p>
            <p>I began to see fashion as the architecture of the self. I wanted to create a modern uniform—something that feels like luxury loungewear, but behaves like a sacred shroud to cleanse the soul. <strong>State of Resonance was born from this rebirth.</strong></p>
            <p>Every artifact and garment is calibrated to a specific frequency—whether it&apos;s the 432Hz &apos;Heartbeat of the Earth&apos; or the 963Hz &apos;Frequency of the Gods&apos;. They are not meant to magically fix your void; they are meant to reflect the resonance and honesty you are building from the inside out. As the ancient Alchemical motto dictates: <em>V.I.T.R.I.O.L. — Visit the interior of the earth, and by rectifying, you will find the hidden stone.</em> That stone is your true self.</p>
            <p className="text-center font-serif text-[var(--color-gold-muted)] italic mt-8 text-lg">Life is infinitely sweeter when you can live &apos;just for today&apos;.</p>
            <p className="text-center text-white tracking-widest uppercase text-xs mt-4">Welcome to the synchronization point.</p>
          </div>
          
          <div className="mt-16 flex flex-col items-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-muted)] to-transparent mb-6" />
            <p className="font-serif italic text-white text-xl">Jay</p>
            <p className="text-xs text-[var(--color-gold-muted)] uppercase tracking-widest mt-2">Founder & Creator</p>
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE ═══════ */}
      <section className="py-32 px-6 border-t border-[rgba(255,255,255,0.05)] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_black_70%)] text-center">
        <p className="text-[var(--color-gold-muted)] font-serif italic text-2xl md:text-4xl max-w-3xl mx-auto leading-relaxed shadow-gold">
          &quot;Wear the frequency.<br />Become the resonance.&quot;
        </p>
      </section>
    </div>
  );
}
