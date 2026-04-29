import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import ScrollReveal from '@/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Discover the philosophy behind State of Resonance. Premium heavyweight streetwear born from personal transformation, sacred geometry, and the pursuit of inner alignment.',
  alternates: { canonical: 'https://stateofresonance.ca/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="dot-label block mb-6">The Origin</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight leading-tight">
              More Than Fabric.
              <br />
              <span className="text-gold">A Declaration.</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              State of Resonance was born from a simple belief: what you wear should mean something. 
              Every piece carries intention, crafted for those who walk the path of inner alignment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 01: The Philosophy */}
      <section className="py-20 md:py-28 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal className="order-2 lg:order-1">
              <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
                <Image 
                  src="/fabric-texture.webp" 
                  alt="450gsm heavyweight cotton texture" 
                  fill 
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </ScrollReveal>
            
            <ScrollReveal className="order-1 lg:order-2 reveal-delay-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gold font-serif text-2xl">01</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 tracking-tight">
                The Philosophy
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Every piece in our collection is designed around sacred geometry, ancient symbols, 
                  and intentional frequencies. We don&apos;t just make clothes — we create artifacts 
                  that carry deep, personalized meaning.
                </p>
                <p>
                  Based in Canada, we serve a global community of seekers, creators, and individuals 
                  who understand that style is an extension of spirit. Quality over quantity. 
                  Depth over trend.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 02: The Process */}
      <section className="py-20 md:py-28 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gold font-serif text-2xl">02</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 tracking-tight">
                The Process
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  This is a hyper-personal project. Each piece is fundamentally made to order. 
                  The garments are embroidered right here at my local embroidery shop, and 
                  the graphics are printed individually as orders arrive.
                </p>
                <p>
                  That means every single artifact passes directly through my hands. I personally 
                  check the stitching, the print weight, and the feel to ensure the absolute best 
                  quality before it reaches you.
                </p>
              </div>
              
              <div className="mt-8 p-6 border border-gold/20 bg-gold/5">
                <p className="text-sm text-foreground leading-relaxed">
                  Because of this intensely hands-on process, <strong>only 10 pieces of each design 
                  are ever made.</strong> Once those 10 units are claimed, I move on to entirely new prints.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal className="reveal-delay-2">
              <div className="aspect-square relative overflow-hidden bg-secondary">
                <Image 
                  src="/jayson-social.jpg" 
                  alt="Hands-on craftsmanship" 
                  fill 
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 03: The Craft */}
      <section className="py-20 md:py-28 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-border" />
              <span className="text-gold font-serif text-2xl">03</span>
              <div className="h-px w-12 bg-border" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 tracking-tight">
              Why Our Pieces Feel Different
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '450gsm Cotton',
                description: 'Premium heavyweight fabric with substantial drape and structure.',
              },
              {
                title: 'Double-Stitched',
                description: 'Reinforced seams throughout for lasting durability.',
              },
              {
                title: 'Limited Runs',
                description: 'Maximum 10 units per design. True exclusivity.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} className={`reveal-delay-${i + 1}`}>
                <div className="p-6 border border-border hover:border-gold/30 transition-colors">
                  <h3 className="text-foreground font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: The Founder */}
      <section className="py-20 md:py-28 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="dot-label block mb-4">The Architect</span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight">
              A Word from the Founder
            </h2>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="space-y-6 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p className="text-gold font-serif text-xl md:text-2xl text-center tracking-wide mb-8">
                The Quest for Self.
              </p>
              
              <p>
                For many years, I searched for something without ever really knowing what or why. 
                I carried an overwhelming emptiness in my soul — a void that never seemed to fill. 
                Despite a beautiful family and a happy childhood, the feeling of not being &quot;enough&quot; persisted.
              </p>
              
              <p>
                At 13, I found a way to make that awkwardness evaporate. It became my solution, 
                and it worked for 30 years — despite the chaos it created. Until the relief turned 
                into despair. I was completely broken.
              </p>
              
              <p>
                November 21, 2024, was the day everything changed. Entering rehabilitation taught me 
                that the only way to climb out of the dark was to finally admit I needed help. I learned 
                to process my emotions rather than numb them. Because what I was truly searching for 
                was myself. The void can only be filled from the inside.
              </p>
              
              <p>
                Through meditation, faith, and immersing myself in the mathematics of resonance and 
                alchemical design, I realized I had to build the bridge between ancient esoteric wisdom 
                and my modern reality.
              </p>
              
              <p>
                I began to see fashion as the architecture of the self. I wanted to create a modern uniform — 
                something that feels like luxury loungewear, but behaves like a sacred shroud to cleanse 
                the soul. <strong className="text-foreground">State of Resonance was born from this rebirth.</strong>
              </p>
              
              <p>
                Every artifact and garment is calibrated to a specific frequency — whether it&apos;s the 
                432Hz &apos;Heartbeat of the Earth&apos; or the 963Hz &apos;Frequency of the Gods&apos;. They are not 
                meant to magically fix your void; they are meant to reflect the resonance and honesty 
                you are building from the inside out.
              </p>
              
              <p className="text-center font-serif text-gold italic text-lg mt-10">
                Life is infinitely sweeter when you can live &apos;just for today&apos;.
              </p>
              
              <div className="flex flex-col items-center mt-10 pt-10 border-t border-border">
                <p className="font-serif italic text-foreground text-xl">Jay</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">
                  Founder & Creator
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-6 border-t border-border bg-secondary/30">
        <ScrollReveal className="max-w-2xl mx-auto text-center">
          <p className="text-gold font-serif italic text-2xl md:text-3xl mb-8 leading-relaxed">
            &quot;Wear the frequency.
            <br />
            Become the resonance.&quot;
          </p>
          <Link 
            href="/collection/all" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium tracking-wide uppercase text-sm transition-all hover:bg-foreground/90"
          >
            Shop the Archive
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </ScrollReveal>
      </section>
      
    </div>
  );
}
