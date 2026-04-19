'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Shop', href: '/collection/all' },
  { label: 'Social Proof', href: '/social-proof' },
  { label: 'About', href: '/about' },
  { label: 'Symbols', href: '/symbols' },
  { label: 'FAQ', href: '/faq' },
];

export default function HeaderNav() {
  const items = useCartStore(s => s.items);
  const toggleCart = useCartStore(s => s.toggleCart);
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-accelerated bg-[rgba(0,0,0,0.85)] border-b border-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-[0.15em] text-white uppercase hover:text-[var(--color-gold-muted)] transition-colors">
          State of Resonance
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="text-[0.7rem] font-sans tracking-[0.2em] text-gray-400 uppercase hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
          <button onClick={toggleCart} className="relative text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {count > 0 && <span className="absolute -top-2 -right-2 bg-[var(--color-gold)] text-black text-[0.55rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>}
          </button>
        </nav>

        {/* Mobile Hamburger + Cart */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleCart} className="relative text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {count > 0 && <span className="absolute -top-2 -right-2 bg-[var(--color-gold)] text-black text-[0.55rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-black border-t border-[rgba(255,255,255,0.05)] px-6 py-8 flex flex-col gap-6">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm font-sans tracking-[0.2em] text-gray-300 uppercase hover:text-[var(--color-gold)] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
