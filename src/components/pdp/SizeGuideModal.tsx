'use client';

import { useState } from 'react';

export default function SizeGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-gold-muted)] underline hover:text-[var(--color-gold)] transition-colors p-3 -mr-3"
      >
        Size Guide
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-[#050505] border border-[rgba(212,175,55,0.3)] shadow-[0_0_50px_rgba(212,175,55,0.1)] p-8 md:p-12">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            
            <h2 className="font-serif text-3xl text-white tracking-widest uppercase mb-4 text-center">Fit & Sizing</h2>
            <p className="text-gray-400 font-sans tracking-wide text-sm text-center mb-10 uppercase">
              All artifacts are cut with an intentional oversized, drop-shoulder silhouette.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs tracking-widest uppercase text-gray-300 border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)] text-[var(--color-gold-muted)]">
                    <th className="py-4 px-2">Size</th>
                    <th className="py-4 px-2">Chest (in)</th>
                    <th className="py-4 px-2">Length (in)</th>
                    <th className="py-4 px-2">Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { s: 'Small', c: '46', l: '26', sl: '23' },
                    { s: 'Medium', c: '48', l: '27', sl: '24' },
                    { s: 'Large', c: '50', l: '28', sl: '25' },
                    { s: 'X-Large', c: '52', l: '29', sl: '26' },
                    { s: '2X-Large', c: '54', l: '30', sl: '27' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-4 px-2 text-white font-bold">{row.s}</td>
                      <td className="py-4 px-2">{row.c}</td>
                      <td className="py-4 px-2">{row.l}</td>
                      <td className="py-4 px-2">{row.sl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center text-[0.65rem] tracking-widest text-[#5a5a5a] font-mono">
              <p>For the intended relaxed look, take your normal size.</p>
              <p>For a more traditional fitted look, size down once.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
