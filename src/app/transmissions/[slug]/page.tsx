export default function TransmissionView({ params }: { params: { slug: string } }) {
  return (
    <main className="flex-grow pt-32 pb-20 px-6 md:px-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-16">
          <Link href="/transmissions" className="text-gold text-[0.7rem] tracking-widest uppercase mb-8 inline-block hover:opacity-70 transition-opacity">
            ← Back to Transmissions
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-6 leading-tight">
            Transmission: {params.slug.replace(/-/g, ' ')}
          </h1>
          <div className="flex gap-6 text-muted text-[0.7rem] tracking-widest uppercase">
            <span>March 2026</span>
            <span>Knowledge</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-muted font-body leading-relaxed space-y-8 text-lg">
          <p>
            This transmission is currently being decrypted from the void. The knowledge contained within is being prepared for your alignment.
          </p>
          <p>
            Ancient principles dictate that true understanding comes to those who wait for the right frequency. The resonance is building.
          </p>
          <div className="w-full h-px bg-white/5 my-12" />
          <p className="italic">
            Check back soon for the full transmission.
          </p>
        </div>
      </article>
    </main>
  );
}

import Link from "next/link";
