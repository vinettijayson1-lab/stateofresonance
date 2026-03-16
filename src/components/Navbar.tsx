"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12 ${
        scrolled ? "glass py-3" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-heading text-xl md:text-2xl tracking-[0.2em] text-white">
          RESONANCE
        </Link>

        {/* Desktop Links */}
          <Link href="/attire" className="hover:text-gold transition-colors text-white/60">
            Attire
          </Link>
          <Link href="/collection/esoteric-manuscripts" className="hover:text-gold transition-colors text-white/80">
            Manuscripts
          </Link>
          <Link href="/collection/alchemical-elixirs-artifacts" className="hover:text-gold transition-colors text-white/80">
            Alchemy
          </Link>
          <Link href="/collection/sacred-smoke-artifacts" className="hover:text-gold transition-colors text-white/80">
            Sacred Smoke
          </Link>
          <Link href="/collection/earth-relics-artifacts" className="hover:text-gold transition-colors text-white/80">
            Earth Minerals
          </Link>
          <Link href="/transmissions" className="hover:text-gold transition-colors text-white/40 italic">
            Transmissions
          </Link>

        <div className="flex items-center gap-6">
          <Link
            href="https://state-of-resonance.myshopify.com/cart"
            target="_blank"
            className="hidden md:flex items-center gap-2 text-[0.7rem] tracking-[0.1em] uppercase border-b border-gold text-gold hover:text-white hover:border-white transition-all"
          >
            <ShoppingCart size={14} />
            <span>Cart</span>
          </Link>

          <button
            className="md:hidden text-gold"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-onyx z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-gold"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>
        <Link
          href="/sanctuary"
          className="text-2xl tracking-[0.3em] uppercase font-heading"
          onClick={() => setIsOpen(false)}
        >
          The Sanctuary
        </Link>
        <Link
          href="/attire"
          className="text-2xl tracking-[0.3em] uppercase font-heading"
          onClick={() => setIsOpen(false)}
        >
          Attire
        </Link>
        <Link
          href="/collection/esoteric-manuscripts"
          className="text-2xl tracking-[0.3em] uppercase font-heading"
          onClick={() => setIsOpen(false)}
        >
          Manuscripts
        </Link>
        <Link
          href="/collection/alchemical-elixirs-artifacts"
          className="text-2xl tracking-[0.3em] uppercase font-heading"
          onClick={() => setIsOpen(false)}
        >
          Alchemy
        </Link>
        <Link
          href="/collection/sacred-smoke-artifacts"
          className="text-2xl tracking-[0.3em] uppercase font-heading"
          onClick={() => setIsOpen(false)}
        >
          Sacred Smoke
        </Link>
        <Link
          href="/collection/earth-relics-artifacts"
          className="text-2xl tracking-[0.3em] uppercase font-heading"
          onClick={() => setIsOpen(false)}
        >
          Earth Minerals
        </Link>
        <Link
          href="/transmissions"
          className="text-2xl tracking-[0.3em] uppercase font-heading opacity-50 italic"
          onClick={() => setIsOpen(false)}
        >
          Transmissions
        </Link>
        <Link
          href="https://state-of-resonance.myshopify.com/cart"
          className="text-lg tracking-[0.2em] uppercase font-body text-gold border-b border-gold"
          onClick={() => setIsOpen(false)}
        >
          View Cart
        </Link>
      </div>
    </nav>
  );
}
