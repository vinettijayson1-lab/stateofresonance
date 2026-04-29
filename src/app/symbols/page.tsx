export default function SymbolsPage() {
  const symbols = [
    { title: "Metatron's Cube", meaning: "Represents the map of creation. It holds every geometric shape found in nature and symbolizes clarity, structure, and the balance between inner and outer worlds.", usage: "Featured on our Core Frequency collection.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 22 8 22 16 12 22 2 16 2 8 12 2"></polygon><polyline points="2 8 12 14 22 8"></polyline><line x1="12" y1="14" x2="12" y2="22"></line><line x1="12" y1="2" x2="12" y2="14"></line><line x1="2" y1="16" x2="12" y2="14"></line><line x1="22" y1="16" x2="12" y2="14"></line></svg> },
    { title: "Flower of Life", meaning: "An ancient pattern representing the interconnectedness of all living things. It symbolizes expansion, unity, and the cycle of creation.", usage: "Featured on select oversized tees and hoodies.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="8"></circle><circle cx="6" cy="12" r="8"></circle><circle cx="18" cy="12" r="8"></circle><circle cx="12" cy="6" r="8"></circle><circle cx="12" cy="18" r="8"></circle><circle cx="7" cy="8" r="8"></circle><circle cx="17" cy="8" r="8"></circle><circle cx="7" cy="16" r="8"></circle><circle cx="17" cy="16" r="8"></circle></svg> },
    { title: "963 Hz Frequency", meaning: "Known as the 'Frequency of the Gods,' 963 Hz is associated with awakening intuition, activating the pineal gland, and returning to oneness.", usage: "Represented symbolically across our graphic line.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M2 12c3-6 7 6 10 0s7-6 10 0"></path><path d="M2 16c3-6 7 6 10 0s7-6 10 0"></path></svg> },
    { title: "OM / AUM", meaning: "The primordial sound of the universe. OM represents grounding, breath, and the stillness found at the center of all things.", usage: "Woven into our meditation-inspired pieces.", icon: <span className="text-4xl text-[var(--color-gold)] opacity-80" style={{fontFamily: 'sans-serif'}}>ॐ</span> },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full pt-36 md:pt-44 pb-32 flex flex-col items-center justify-center border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-celestial.png')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl max-auto">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-6 inline-block border-b border-[var(--color-gold-muted)] pb-2 pr-1">The Codex</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-wide uppercase leading-tight">
            Decode the Symbols
          </h1>
          <p className="text-gray-400 font-sans text-sm md:text-base tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
            Every symbol we use carries centuries of meaning. Here is the key to understanding what you wear.
          </p>
        </div>
      </section>

      {/* ═══════ SYMBOL GRID ═══════ */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {symbols.map((sym, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 items-start border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 hover:border-[var(--color-gold-muted)] transition-colors group">
              <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full border border-[var(--color-gold-muted)] flex items-center justify-center text-[var(--color-gold-muted)] opacity-60 group-hover:opacity-100 transition-all [&_svg]:w-10 [&_svg]:h-10 md:[&_svg]:w-14 md:[&_svg]:h-14 overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:scale-110">
                {sym.icon}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[var(--color-gold-muted)] font-serif text-xl border-b border-[var(--color-gold-muted)] pb-1 w-8 text-center bg-[rgba(212,175,55,0.05)]">0{i + 1}</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-wider">{sym.title}</h2>
                </div>
                <p className="text-gray-300 font-sans text-sm leading-relaxed mb-6 tracking-wide">
                  {sym.meaning}
                </p>
                <div className="inline-block px-4 py-2 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.02)]">
                  <p className="text-[var(--color-gold-muted)] text-[0.65rem] md:text-xs uppercase tracking-[0.2em] font-sans">
                    {sym.usage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ═══════ CTA ═══════ */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.05)] text-center">
        <a href="/collection/all" className="inline-block bg-[var(--color-gold)] text-black px-12 py-5 font-bold tracking-[0.2em] uppercase text-sm hover:scale-105 transition-all shadow-gold">
          Explore The Archive
        </a>
      </section>
    </div>
  );
}
