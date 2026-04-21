import React from 'react';
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
          { "@type": "Product", name: product.title, image: product.images.map(i => i.url), description: `State of Resonance Official Artifact: ${product.title}`, brand: { "@type": "Brand", name: "State of Resonance" }, offers: { "@type": "Offer", url: `https://stateofresonance.ca/product/${product.handle}`, priceCurrency: "CAD", price: product.price.replace('$', ''), availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition" } },
          { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://stateofresonance.ca" }, { "@type": "ListItem", position: 2, name: "Shop", item: "https://stateofresonance.ca/collection/all" }, { "@type": "ListItem", position: 3, name: product.title, item: `https://stateofresonance.ca/product/${product.handle}` }] },
        ],
      })}} />
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start w-full">
        <div className="w-full lg:w-1/2">
          <ProductGallery mainImage={product.image} images={product.images} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left pt-4">
          <div className="mb-8 border-b border-[rgba(255,255,255,0.05)] pb-8">
            <p className="text-[var(--color-gold-muted)] tracking-[0.3em] text-xs uppercase mb-4 animate-pulse">{product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-serif text-white track
