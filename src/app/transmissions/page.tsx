"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Article {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  link: string;
  slug: string;
}

const articles: Article[] = [
  {
    title: "The Ultimate Guide to Selecting Premium Sweatpants for Men",
    excerpt: "Discover the synthesis of high-end aesthetics and unparalleled comfort. We explore the fabric science and design principles behind true luxury loungewear.",
    date: "MARCH 2026",
    category: "ATTIRE",
    link: "https://state-of-resonance.myshopify.com/blogs/news/premium-sweatpants-guide",
    slug: "premium-sweatpants-guide"
  },
  {
    title: "Understanding Healing Frequencies: How 432Hz Impacts Your Reality",
    excerpt: "Delve into the mathematics of the universe. Learn how specific tonal frequencies, like the 'Natural Pitch', can catalyze deep state alignment and reduce chaos.",
    date: "MARCH 2026",
    category: "ALCHEMY",
    link: "https://state-of-resonance.myshopify.com/blogs/news/healing-frequencies-432hz",
    slug: "healing-frequencies-432hz"
  },
  {
    title: "Building the Perfect Gothic Wardrobe: A 2026 Style Guide",
    excerpt: "Moving beyond basic black. How to construct a sophisticated, esoteric-inspired wardrobe that commands attention while remaining fundamentally wearable.",
    date: "FEBRUARY 2026",
    category: "ATTIRE",
    link: "https://state-of-resonance.myshopify.com/blogs/news/gothic-wardrobe-guide",
    slug: "gothic-wardrobe-guide"
  },
  {
    title: "The Power of Sigil Magic in Modern Life",
    excerpt: "Ancient technology for the contemporary mind. An introduction to constructing and activating sigils for focus, protection, and targeted intention manifestation.",
    date: "JANUARY 2026",
    category: "RITUAL",
    link: "https://state-of-resonance.myshopify.com/blogs/news/sigil-magic-intro",
    slug: "sigil-magic-intro"
  }
];

export default function TransmissionsPage() {
  return (
    <main className="flex-grow pt-32 pb-20 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <header className="max-w-3xl mx-auto mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-6">Transmissions</h1>
          <p className="text-gold tracking-[0.2em] uppercase text-xs">
            Echoes from the Void • Knowledge & Alchemy
          </p>
          <div className="w-px h-16 bg-gold/30 mx-auto mt-12" />
        </header>

        <div className="max-w-3xl mx-auto space-y-24">
          {articles.map((article, index) => (
            <motion.article 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group border-b border-white/5 pb-16 last:border-0"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-gold tracking-[0.3em] uppercase text-[0.6rem]">
                  {article.category}
                </span>
                <span className="text-muted text-[0.6rem] tracking-widest">
                  {article.date}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-heading text-white mb-6 leading-tight group-hover:text-gold transition-colors duration-500">
                <Link href={`/transmissions/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              <p className="text-muted font-body leading-relaxed mb-8">
                {article.excerpt}
              </p>
              <Link 
                href={`/transmissions/${article.slug}`}
                className="inline-block border border-gold/30 px-8 py-3 text-gold text-[0.7rem] tracking-[0.2em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-300"
              >
                Read Transmission
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
