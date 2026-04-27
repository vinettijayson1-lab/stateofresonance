'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StickyBottomBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the bar after scrolling past the 60vh mark (approx 500px)
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 md:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="bg-black/70 backdrop-blur-xl border-t border-[rgba(212,175,55,0.2)] px-4 py-3 flex items-center justify-between pb-safe">
        <div>
          <p className="text-[10px] font-sans text-gray-400 tracking-widest uppercase">The Archive</p>
          <p className="text-sm font-serif text-white">Occult Streetwear</p>
        </div>
        <Link 
          href="#shop-all" 
          className="bg-[var(--color-gold)] text-black px-6 py-2.5 font-bold tracking-widest uppercase text-xs rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:bg-white transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
