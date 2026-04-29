'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

const NAV_LINKS = [
  { href: '/collection/all', label: 'Shop' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/collection/best-sellers', label: 'Best Sellers' },
  { href: '/social-proof', label: 'Social Proof' },
  { href: '/transmissions', label: 'Transmissions' },
  { href: '/collab', label: 'Collaborate' },
  { href: '/about', label: 'About' },
  { href: '/symbols', label: 'Symbols' },
  { href: '/faq', label: 'FAQ' },
];

export default function HeaderNav() {
  const items = useCartStore(s => s.items);
  const toggleCart = useCartStore(s => s.toggleCart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#fafafa] hover:text-[#737373] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo - left with proper spacing */}
            <Link 
              href="/" 
              className="font-serif text-lg md:text-xl tracking-wide text-[#fafafa] flex-shrink-0"
            >
              State of Resonance
            </Link>

            {/* Desktop nav links - centered */}
            <div className="hidden md:flex items-center justify-center gap-6 flex-1 mx-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] font-medium tracking-[0.08em] uppercase text-[#737373] hover:text-[#fafafa] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart - right */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-[#fafafa] hover:text-[#737373] transition-colors flex-shrink-0"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#fafafa] text-[#0a0a0a] text-[10px] font-medium flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <div 
          className={`absolute top-0 left-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] border-r border-[#262626] transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#1a1a1a]">
            <span className="font-serif text-lg text-[#fafafa]">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-[#fafafa] hover:text-[#737373] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-6">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-2xl font-serif text-[#fafafa] hover:text-[#737373] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-12 pt-6 border-t border-[#1a1a1a]">
              <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#737373] mb-4">Follow us</p>
              <div className="flex gap-6">
                <a 
                  href="https://instagram.com/stateofresonance" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#737373] hover:text-[#fafafa] transition-colors"
                >
                  Instagram
                </a>
                <a 
                  href="https://tiktok.com/@stateofresonance" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#737373] hover:text-[#fafafa] transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
