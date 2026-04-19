export default function SymbolsPage() {
  const symbols = [
    { title: "Metatron's Cube", meaning: "Represents the map of creation. It holds every geometric shape found in nature and symbolizes clarity, structure, and the balance between inner and outer worlds.", usage: "Featured on our Core Frequency collection." },
    { title: "Flower of Life", meaning: "An ancient pattern representing the interconnectedness of all living things. It symbolizes expansion, unity, and the cycle of creation.", usage: "Featured on select oversized tees and hoodies." },
    { title: "963 Hz Frequency", meaning: "Known as the 'Frequency of the Gods,' 963 Hz is associated with awakening intuition, activating the pineal gland, and returning to oneness.", usage: "Represented symbolically across our graphic line." },
    { title: "OM / AUM", meaning: "The primordial sound of the universe. OM represents grounding, breath, and the stillness found at the center of all things.", usage: "Woven into our meditation-inspired pieces." },
  ];

  return (
    <div className="min-h-screen pt-48 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs mb-4">The Codex</p>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-wide">Decode the Symbols</h1>
        <p className="text-gray-400 text-sm tracking-wider max-w-xl mx-auto">Every symbol we use carries centuries of meaning. Here is the key to understanding what you wear.</p>
      </div>
      <div className="space-y-16">
        {symbols.map((sym, i) => (
          <div key={i} className="border-l-2 border-[var(--color-gold-muted)] pl-8">
            <h2 className="font-serif text-2xl text-white mb-4">{sym.title}</h2>
            <p className="text-gray-300 font-sans text-sm leading-relaxed mb-3">{sym.meaning}</p>
            <p className="text-[var(--color-gold-muted)] text-xs uppercase tracking-widest font-mono">{sym.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
