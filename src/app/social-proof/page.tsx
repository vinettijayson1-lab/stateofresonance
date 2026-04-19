import Image from "next/image";

const LINKS = [
  { label: "Martin Bedard", platform: "Facebook", image: "/martin-social.jpg", url: "https://www.facebook.com/photo/?fbid=10163985728591063&set=a.10154362149296063" },
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
    <div className="min-h-screen pt-48 pb-24 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs mb-4">Verified Transmutations</p>
        <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-white mb-6">Social Proof</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm tracking-wider font-mono px-4 leading-relaxed">Cryptographically verified artifacts and the seekers who manifested them.</p>
      </div>

      {/* Featured */}
      <div className="w-full flex justify-center mb-24">
        <div className="relative group p-6 border border-[rgba(212,175,55,0.15)] bg-[rgba(0,0,0,0.4)] shadow-[0_0_30px_rgba(212,175,55,0.05)] w-full max-w-md">
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[var(--color-gold)]" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[var(--color-gold)]" />
          <Image src="/martin-social.jpg" alt="Martin Bedard wearing State of Resonance" width={500} height={510} className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90" />
          <div className="mt-8 text-center border-t border-[rgba(255,255,255,0.05)] pt-6">
            <p className="text-[var(--color-gold-muted)] font-serif italic text-lg mb-3 tracking-wide">&quot;J&apos;ai aussi capté la résonance !!!&quot;</p>
            <p className="text-gray-500 text-xs tracking-[0.2em] uppercase font-mono">— Martin Bedard</p>
          </div>
        </div>
      </div>

      {/* Share Your Look Grid */}
      <div className="w-full border-t border-[rgba(255,255,255,0.05)] pt-16 max-w-6xl mx-auto px-4 md:px-0">
        <div className="text-left mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-2 tracking-wide">Share your look. Share your story.</h2>
          <p className="text-[var(--color-gold-muted)] uppercase tracking-widest text-xs font-bold font-sans">TAG #STATEOFRESONANCE TO BE FEATURED.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {LINKS.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
              className="aspect-square flex flex-col justify-end p-4 border border-[rgba(255,255,255,0.05)] bg-[#050505] hover:border-[var(--color-gold-muted)] transition-all group relative overflow-hidden">
              {link.image && <Image src={link.image} alt={link.label} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="text-[0.65rem] text-center text-gray-400 font-sans tracking-widest uppercase group-hover:text-white transition-colors relative z-10 w-full mb-2">
                {link.image ? link.label : `Customer Look ${idx + 1}`}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
