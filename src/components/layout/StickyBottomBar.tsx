'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StickyBottomBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out md:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="bg-black/80 backdrop-blur-xl border-t border-[rgba(212,175,55,0.2)] px-4 py-3 flex items-center justify-center gap-4" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <Link 
          href="#shop-all" 
          className="bg-[var(--color-gold)] text-black px-8 min-h-[44px] flex items-center justify-center font-bold tracking-widest uppercase text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-white transition-colors w-full text-center"
        >
          Shop The Archive
        </Link>
      </div>
    </div>
  );
}
