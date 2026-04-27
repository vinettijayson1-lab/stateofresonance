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
      {/* Film Grain removed per request for clean photos */}

      <div className="relative z-10 py-16 md:py-32 px-4 md:px-12 max-w-[1800px] mx-auto">
        <div className="mb-12 md:mb-20 text-center">
          <p className="font-sans text-[0.65rem] md:text-xs tracking-[0.4em] md:tracking-[0.5em] text-gray-500 uppercase mb-3 md:mb-4">Archive 001</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-7xl tracking-widest leading-tight mb-4 md:mb-6 uppercase">
            Master Collection
          </h1>
          <p className="text-gray-400 text-sm md:text-xl font-sans tracking-wide max-w-2xl mx-auto leading-relaxed px-4">
            We are the architects of the unseen. A brutalist manifestation of esoteric truth.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-gray-400 py-10 md:py-20 font-sans tracking-widest uppercase text-sm">
            <p>[ Signal Lost ]</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 md:gap-8 md:space-y-8">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden break-inside-avoid bg-[#111] border border-white/5 shadow-xl md:shadow-2xl rounded-sm"
              >


                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className={`w-full h-auto object-cover transform scale-100 md:group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${img.style === 'bw' ? 'grayscale contrast-105' : 'contrast-105'}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  quality={100}
                  loading={idx < 4 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
