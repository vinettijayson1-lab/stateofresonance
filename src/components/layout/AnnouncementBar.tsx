'use client';

import { useState } from 'react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-[var(--color-gold)] text-black text-[0.65rem] md:text-xs font-bold tracking-[0.2em] uppercase py-2 px-4 flex justify-between items-center z-50 relative">
      <div className="w-4" /> {/* spacer for balance */}
      <span className="text-center animate-pulse">🔥 FREE SHIPPING OVER $110 | LIMITED DROP — ONCE SOLD OUT, IT&apos;S GONE</span>
      <button onClick={() => setVisible(false)} className="w-4 h-4 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity" aria-label="Close Announcement">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
    </div>
  );
}
