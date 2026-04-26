import fs from "fs";
import path from "path";
import Image from "next/image";

export const metadata = {
  title: "Master Lookbook | State of Resonance",
  description: "A brutalist, esoteric visual transmission. State of Resonance.",
};

export default function LookbookPage() {
  const lookbookPath = path.join(process.cwd(), "src/content/lookbook.json");
  let images: Array<{ src: string; width: number; height: number; alt: string; style?: string }> = [];

  try {
    const fileContents = fs.readFileSync(lookbookPath, "utf8");
    images = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load lookbook data", error);
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden selection:bg-white selection:text-black">
      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] mix-blend-overlay" />

      <div className="relative z-10 py-32 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="mb-20 text-center">
          <p className="font-sans text-xs tracking-[0.5em] text-gray-500 uppercase mb-4">Archive 001</p>
          <h2 className="font-playfair text-5xl md:text-7xl tracking-widest leading-tight mb-6 uppercase">
            Master Collection
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-sans tracking-wide max-w-2xl mx-auto leading-relaxed">
            We are the architects of the unseen. A brutalist manifestation of esoteric truth.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-gray-600 py-20 font-sans tracking-widest uppercase">
            <p>[ Signal Lost ]</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden break-inside-avoid bg-[#111] border border-white/5 shadow-2xl rounded-sm"
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-sans tracking-[0.3em] text-white/90 uppercase text-xs border border-white/20 px-6 py-3 block mb-2">
                      {img.style === 'bw' ? 'Noir Edition' : 'Cinematic'}
                    </span>
                  </div>
                </div>

                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className={`w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${img.style === 'bw' ? 'contrast-125 grayscale' : 'saturate-50 contrast-125 sepia-[.15]'}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  loading={idx < 6 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
