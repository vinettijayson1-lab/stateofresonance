"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ChoicePanel = ({ 
  title, 
  subtitle, 
  href, 
  image 
}: { 
  title: string; 
  subtitle: string; 
  href: string; 
  image: string;
}) => (
  <Link href={href} className="group relative flex-1 h-[60vh] md:h-screen overflow-hidden flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:flex-[1.5]">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700 z-10" />
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
      </motion.div>
    </div>
    
    <div className="relative z-20 text-center px-6 py-8 glass border-white/10 group-hover:border-gold transition-all duration-700 backdrop-blur-md">
      <span className="block text-[0.6rem] md:text-[0.7rem] tracking-[0.5em] text-gold uppercase mb-2">
        {subtitle}
      </span>
      <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] text-white uppercase transition-all duration-700 font-heading">
        {title}
      </h2>
    </div>
    
    <div className="absolute right-0 top-[10%] bottom-[10%] w-[1px] bg-gold/20 hidden md:block" />
  </Link>
);

export default function Home() {
  return (
    <main className="flex-grow">
      {/* The Void Choice Interface */}
      <section className="flex flex-col md:flex-row min-h-screen">
        <ChoicePanel
          title="Attire"
          subtitle="Shroud Yourself"
          href="/attire"
          image="https://files.cdn.printful.com/products/420/mockup_1707512102_420208515.png"
        />
        <ChoicePanel
          title="Tools"
          subtitle="Manifest Reality"
          href="/sanctuary"
          image="https://images.unsplash.com/photo-1515023115689-589c3971c22d?q=80&w=2070&auto=format&fit=crop"
        />
      </section>

      {/* Manifesto Section */}
      <section className="bg-emerald-deep py-32 px-6 flex items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-5xl text-gold mb-10 leading-relaxed font-heading">
            The Alignment is Occurring
          </h2>
          <p className="text-muted text-lg md:text-xl leading-relaxed font-body">
            You are receiving this transmission because your frequency aligns with ours. 
            The masses consume blindly, but you recognize the sacred geometry in what you wear. 
            You understand that true power is held by those who know the secret.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
