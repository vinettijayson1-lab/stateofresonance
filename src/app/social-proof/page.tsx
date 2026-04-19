import Image from "next/image";

const LINKS = [
  { label: "The Frequency Spreads", platform: "Facebook", image: "/jayson-social.jpg", url: "https://www.facebook.com/photo?fbid=10164200068961063&set=a.10154362149296063" },
  { label: "David Goudro", platform: "Instagram", image: "/david-social.jpg", url: "https://www.instagram.com/reel/DWGyGd1Eby5/" },
  { label: "Virgin Radio Kelly", platform: "Instagram", image: "/kelly-social.jpg", url: "https://www.instagram.com/p/DVCd7LUkbxS/" },
  { label: "Customer Look 5", platform: "Facebook", image: null, url: "https://www.facebook.com/photo/?fbid=122108735319242137&set=a.122103581931242137" },
  { label: "Customer Look 6", platform: "Instagram", image: null, url: "https://www.instagram.com/p/DUw1FD2Dtqp/" },
  { label: "Customer Look 7", platform: "Instagram", image: null, url: "https://www.instagram.com/reel/DVRH6e1j-K2/" },
  { label: "Customer Look 8", platform: "Instagram", image: null, url: "https://www.instagram.com/p/DVCd7LUkbxS/" },
];

export default function SocialProofPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full pt-56 md:pt-64 pb-32 flex flex-col items-center justify-center border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-celestial.png')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl max-auto">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-6 inline-block border-b border-[var(--color-gold-muted)] pb-2 pr-1">Verified Transmutations</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-wide uppercase leading-tight">
            Social Proof
          </h1>
          <p className="text-gray-400 font-sans text-sm md:text-base tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
            Cryptographically verified artifacts and the seekers who manifested them.
          </p>
        </div>
      </section>

      {/* ═══════ FEATURED ═══════ */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 uppercase tracking-widest leading-tight">The Frequency Speaks For Itself.</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-gold-muted)] to-transparent mb-8" />
            <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-8">
              A community of awakened individuals actively rewriting their reality. Every piece worn is an intention set in motion.
            </p>
            <p className="text-[var(--color-gold-muted)] font-serif italic text-xl">
              &quot;The energy changes the moment you put it on.&quot;
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-4 font-mono">— Verified Explorer</p>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="relative group p-4 md:p-6 border border-[rgba(212,175,55,0.15)] bg-[rgba(0,0,0,0.4)] shadow-[0_0_30px_rgba(212,175,55,0.05)]">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[var(--color-gold)]" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[var(--color-gold)]" />
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image src="/jayson-social.jpg" alt="Customer wearing State of Resonance" fill className="object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-1000 opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ GRID ═══════ */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.05)]">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-4 tracking-wide">Share your look. Share your story.</h2>
          <div className="inline-block px-6 py-3 border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.03)]">
            <p className="text-[var(--color-gold-muted)] uppercase tracking-[0.2em] text-xs font-bold font-sans">Tag #STATEOFRESONANCE To Be Featured</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {LINKS.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
              className="aspect-square flex flex-col justify-end p-4 md:p-6 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--color-gold-muted)] transition-all group relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              {link.image && <Image src={link.image} alt={link.label} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-110" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="text-[0.65rem] md:text-xs text-center text-gray-300 font-sans tracking-widest uppercase group-hover:text-white transition-colors relative z-10 w-full mb-1">
                {link.image ? link.label : `Community Look ${idx + 1}`}
              </span>
              <div className="w-4 h-[1px] bg-[var(--color-gold-muted)] mx-auto relative z-10 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
