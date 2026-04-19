import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full pt-48 pb-32 flex flex-col items-center justify-center border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/luxury-occult-bg.png')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl max-auto">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-6 inline-block border-b border-[var(--color-gold-muted)] pb-2 pr-1">The Origin</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-wide uppercase leading-tight">
            More Than Fabric.<br />A Declaration.
          </h1>
          <p className="text-gray-400 font-sans text-sm md:text-base tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
            State of Resonance was born from a simple belief: what you wear should mean something.
          </p>
        </div>
      </section>

      {/* ═══════ EDITORIAL GRID ═══════ */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-32">
          <div className="order-2 md:order-1 relative aspect-[4/5] border border-[rgba(255,255,255,0.05)] p-4">
            <div className="relative w-full h-full bg-[rgba(255,255,255,0.02)]">
              <Image src="/fabric-texture.png" alt="Heavyweight cotton texture" fill className="object-cover opacity-60 mix-blend-luminosity grayscale" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80" />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-left-6 w-32 h-32 border-b border-l md:border-r-0 border-[var(--color-gold-muted)] opacity-30 pointer-events-none" />
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[var(--color-gold-muted)] font-serif text-2xl">01</span>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-gold-muted)] to-transparent opacity-30" />
            </div>
            <h2 className="font-serif text-3xl text-white uppercase tracking-widest">The Philosophy</h2>
            <div className="space-y-6 text-gray-300 font-sans text-sm leading-relaxed tracking-wide">
              <p>Every piece in our collection is designed around sacred geometry, ancient symbols, and intentional frequencies. We don&apos;t just make clothes — we create artifacts that carry deep, personalized meaning.</p>
              <p>Based in Canada, we serve a global community of seekers, creators, and individuals who understand that style is An extension of spirit. Quality over quantity. Depth over trend.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[var(--color-gold-muted)] font-serif text-2xl">02</span>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-gold-muted)] to-transparent opacity-30" />
            </div>
            <h2 className="font-serif text-3xl text-white uppercase tracking-widest">The Process</h2>
            <div className="space-y-6 text-gray-300 font-sans text-sm leading-relaxed tracking-wide">
              <p>This is a hyper-personal project. Each piece is fundamentally made to order. The garments are embroidered right here at my local embroidery shop, and the graphics are printed individually as orders arrive.</p>
              <p>That means every single artifact passes directly through my hands. I personally check the stitching, the print weight, and the feel to ensure the absolute best quality before it reaches you.</p>
              <div className="p-6 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.02)] mt-8">
                <p className="text-[var(--color-gold-muted)] font-sans text-xs uppercase tracking-widest leading-relaxed">
                  Because of this intensely hands-on process, <strong className="text-white">only 10 pieces of each design are ever made.</strong> Once those 10 units are claimed, I move on to entirely new prints.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square md:aspect-[4/5] border border-[rgba(255,255,255,0.05)] overflow-hidden group">
            <Image src="/jayson-social.jpg" alt="Hands-on process" fill className="object-cover opacity-80 mix-blend-luminosity transform group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-1000" />
          </div>
        </div>
      </section>

      {/* ═══════ FOUNDER STORY ═══════ */}
      <section className="py-32 px-6 max-w-4xl mx-auto border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex flex-col items-center text-center">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-6 inline-block border-b border-[var(--color-gold-muted)] pb-2 pr-1">The Architect</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest mb-12">A Word from the Founder</h2>
          
          <div className="space-y-6 text-gray-300 font-sans text-sm md:text-base leading-relaxed tracking-wide text-left md:text-justify max-w-3xl">
            <p className="text-[var(--color-gold)] font-serif text-xl md:text-2xl mb-8 text-center uppercase tracking-widest">The Quest for Self.</p>
            <p>For many years, I searched for something without ever really knowing what or why. I carried an overwhelming emptiness in my soul—a void that never seemed to fill. Despite a beautiful family and a happy childhood, the feeling of not being &quot;enough&quot; persisted.</p>
            <p>At 13, I found a way to make that awkwardness evaporate. It became my solution, and it worked for 30 years—despite the chaos it created. Until the relief turned into despair. I was completely broken.</p>
            <p>November 21, 2024, was the day everything changed. Entering rehabilitation taught me that the only way to climb out of the dark was to finally admit I needed help. I learned to process my emotions rather than numb them. Because what I was truly searching for was myself. The void can only be filled from the inside.</p>
            <p>Through meditation, faith, and immersing myself in the mathematics of resonance and alchemical design, I realized I had to build the bridge between ancient esoteric wisdom and my modern reality.</p>
            <p>I began to see fashion as the architecture of the self. I wanted to create a modern uniform—something that feels like luxury loungewear, but behaves like a sacred shroud to cleanse the soul. <strong>State of Resonance was born from this rebirth.</strong></p>
            <p>Every artifact and garment is calibrated to a specific frequency—whether it&apos;s the 432Hz &apos;Heartbeat of the Earth&apos; or the 963Hz &apos;Frequency of the Gods&apos;. They are not meant to magically fix your void; they are meant to reflect the resonance and honesty you are building from the inside out. As the ancient Alchemical motto dictates: <em>V.I.T.R.I.O.L. — Visit the interior of the earth, and by rectifying, you will find the hidden stone.</em> That stone is your true self.</p>
            <p className="text-center font-serif text-[var(--color-gold-muted)] italic mt-8 text-lg">Life is infinitely sweeter when you can live &apos;just for today&apos;.</p>
            <p className="text-center text-white tracking-widest uppercase text-xs mt-4">Welcome to the synchronization point.</p>
          </div>
          
          <div className="mt-16 flex flex-col items-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-muted)] to-transparent mb-6" />
            <p className="font-serif italic text-white text-xl">Jay</p>
            <p className="text-xs text-[var(--color-gold-muted)] uppercase tracking-widest mt-2">Founder & Creator</p>
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE ═══════ */}
      <section className="py-32 px-6 border-t border-[rgba(255,255,255,0.05)] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_black_70%)] text-center">
        <p className="text-[var(--color-gold-muted)] font-serif italic text-2xl md:text-4xl max-w-3xl mx-auto leading-relaxed shadow-gold">
          &quot;Wear the frequency.<br />Become the resonance.&quot;
        </p>
      </section>
    </div>
  );
}
