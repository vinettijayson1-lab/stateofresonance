'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const triggerPopup = () => {
    if (localStorage.getItem('sor_exit_intent_seen') === 'true') return;
    if (useCartStore.getState().isOpen) return;
    setShow(true);
    localStorage.setItem('sor_exit_intent_seen', 'true');
  };

  useEffect(() => {
    if (localStorage.getItem('sor_exit_intent_seen')) return;

    // Track page views in current session
    const currentViews = parseInt(sessionStorage.getItem('sor_page_views') || '0', 10);
    const newViews = currentViews + 1;
    sessionStorage.setItem('sor_page_views', newViews.toString());

    // Strategy 1: Desktop True Exit Intent (only if they've been here 10s so we don't spam instantly)
    let canExitIntent = false;
    const safetyTimer = setTimeout(() => { canExitIntent = true; }, 10000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (canExitIntent && e.clientY <= 0) {
        triggerPopup();
      }
    };

    // Strategy 2: Time Delayed (Staggered over a minute)
    // Only set the long timer if they are on at least their 2nd page view, OR after 60 seconds.
    // This prevents hitting cold traffic with an instant wall.
    let mainTimer: NodeJS.Timeout;
    
    if (newViews >= 2) {
      // If it's their second page, show it after 15 seconds of reading the new page
      mainTimer = setTimeout(() => { triggerPopup(); }, 15000);
    } else {
      // First page they land on: Wait 60 seconds minimum (1 minute)
      mainTimer = setTimeout(() => { triggerPopup(); }, 60000);
    }

    // We removed the "60% scroll" trigger. If someone scrolls 60% down your product page, 
    // they are reading your sizing or reviews. Interrupting them ruins the conversion funnel.

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(safetyTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const res = await fetch('/api/klaviyo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-[#050505] border border-[var(--color-gold-muted)] p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col items-center text-center">
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        
        <p className="text-[var(--color-gold)] font-serif italic text-2xl md:text-3xl mb-4">Wait, seeker.</p>
        <h2 className="text-white font-sans uppercase tracking-[0.2em] font-bold text-xl md:text-2xl mb-6">Claim Your Artifact First</h2>
        <p className="text-gray-400 font-sans tracking-wide text-sm mb-8 leading-relaxed">
          Join the resonance. Get <strong>10% off your first order</strong> plus our exclusive esoteric Symbol Guide directly to your inbox.
        </p>

        {status === 'success' ? (
          <div className="bg-[rgba(212,175,55,0.1)] border border-[var(--color-gold-muted)] p-4 w-full">
            <p className="text-white uppercase tracking-widest text-sm font-bold">Transmission Sent.</p>
            <p className="text-[var(--color-gold-muted)] text-xs uppercase tracking-widest mt-2">{email}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black border border-[rgba(255,255,255,0.1)] px-4 py-4 text-center text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[var(--color-gold-muted)] tracking-widest text-sm uppercase transition-colors"
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-[var(--color-gold)] text-black px-4 py-4 font-bold tracking-[0.2em] uppercase text-sm hover:bg-white transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Encrypting...' : 'Unlock 10% Off'}
            </button>
            {status === 'error' && <p className="text-red-500 text-xs mt-2 uppercase tracking-widest">Error. Please try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
}
