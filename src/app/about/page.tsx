import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'The story behind State of Resonance - premium heavyweight streetwear designed for those who walk the path of inner alignment.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 md:pt-40">
        <div className="absolute inset-0">
          <Image 
            src="/hero-celestial.webp" 
            alt="State of Resonance" 
            fill 
            priority 
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#c4a077] mb-6">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#fafafa] mb-6 leading-[1.1]">
            More Than Fabric.<br />
            <span className="italic">A Declaration.</span>
          </h1>
          <p className="text-lg text-[#a3a3a3] max-w-2xl mx-auto">
            State of Resonance was born from a simple belief: what you wear should mean something.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] bg-[#111] overflow-hidden">
              <Image 
                src="/fabric-texture.webp" 
                alt="450gsm heavyweight cotton" 
                fill 
                className="object-cover"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif text-2xl text-[#c4a077]">01</span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#262626] to-transparent" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-[#fafafa] mb-8">
                The Philosophy
              </h2>
              
              <div className="space-y-6 text-[#a3a3a3] leading-relaxed">
                <p>
                  Every piece in our collection is designed around sacred geometry, 
                  ancient symbols, and intentional frequencies. We don&apos;t just make 
                  clothes - we create artifacts that carry deep, personalized meaning.
                </p>
                <p>
                  Based in Canada, we serve a global community of seekers, creators, 
                  and individuals who understand that style is an extension of spirit. 
                  Quality over quantity. Depth over trend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 border-t border-[#1a1a1a]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif text-2xl text-[#c4a077]">02</span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#262626] to-transparent" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-[#fafafa] mb-8">
                The Process
              </h2>
              
              <div className="space-y-6 text-[#a3a3a3] leading-relaxed">
                <p>
                  This is a hyper-personal project. Each piece is fundamentally made to order. 
                  The garments are embroidered right here at my local embroidery shop, and the 
                  graphics are printed individually as orders arrive.
                </p>
                <p>
                  That means every single artifact passes directly through my hands. I personally 
                  check the stitching, the print weight, and the feel to ensure the absolute best 
                  quality before it reaches you.
                </p>
              </div>
              
              {/* Highlight box */}
              <div className="mt-8 p-6 border border-[#262626] bg-[#0f0f0f]">
                <p className="text-sm text-[#a3a3a3]">
                  Because of this intensely hands-on process, <strong className="text-[#fafafa]">only 
                  10 pieces of each design are ever made.</strong> Once those 10 units are claimed, 
                  we move on to entirely new prints.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative aspect-square bg-[#111] overflow-hidden">
              <Image 
                src="/jayson-social.jpg" 
                alt="Hands-on process" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 md:py-32 border-t border-[#1a1a1a]">
        <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#c4a077] mb-4">
              The Architect
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#fafafa]">
              A Word from the Founder
            </h2>
          </div>
          
          <div className="space-y-6 text-[#a3a3a3] leading-relaxed">
            <p className="text-center font-serif text-xl md:text-2xl text-[#c4a077] italic mb-8">
              &ldquo;The Quest for Self.&rdquo;
            </p>
            
            <p>
              For many years, I searched for something without ever really knowing what or why. 
              I carried an overwhelming emptiness in my soul - a void that never seemed to fill. 
              Despite a beautiful family and a happy childhood, the feeling of not being 
              &ldquo;enough&rdquo; persisted.
            </p>
            
            <p>
              November 21, 2024, was the day everything changed. Entering rehabilitation taught 
              me that the only way to climb out of the dark was to finally admit I needed help. 
              I learned to process my emotions rather than numb them.
            </p>
            
            <p>
              Through meditation, faith, and immersing myself in the mathematics of resonance 
              and alchemical design, I realized I had to build the bridge between ancient 
              esoteric wisdom and my modern reality.
            </p>
            
            <p>
              I began to see fashion as the architecture of the self. I wanted to create 
              a modern uniform - something that feels like luxury loungewear, but behaves 
              like a sacred shroud. <strong className="text-[#fafafa]">State of Resonance 
              was born from this rebirth.</strong>
            </p>
            
            <p className="text-center font-serif italic text-[#c4a077] text-lg mt-12">
              &ldquo;Life is infinitely sweeter when you can live just for today.&rdquo;
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent mx-auto mb-6" />
            <p className="font-serif italic text-[#fafafa] text-xl">Jay</p>
            <p className="text-xs text-[#737373] tracking-[0.1em] uppercase mt-1">
              Founder & Creator
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 border-t border-[#1a1a1a] bg-[#0f0f0f]">
        <div className="w-full max-w-3xl mx-auto px-4 md:px-8 text-center">
          <blockquote className="font-serif text-3xl md:text-4xl text-[#fafafa] italic leading-relaxed mb-12">
            &ldquo;Wear the frequency.<br />Become the resonance.&rdquo;
          </blockquote>
          
          <Link 
            href="/collection/all" 
            className="inline-flex items-center gap-2 bg-[#fafafa] text-[#0a0a0a] px-8 py-4 text-sm font-medium tracking-[0.05em] uppercase hover:bg-[#f5f5f0] transition-colors"
          >
            Shop the Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      
    </div>
  );
}
