import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
      <div className="max-w-xl w-full text-center space-y-12">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-heading text-white tracking-tight">
            Artifact Not Found
          </h1>
          <p className="text-xl text-muted font-body leading-relaxed">
            The requested frequency could not be located. This artifact may have been archived or displaced during a resonance shift.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/sanctuary" 
            className="inline-block py-4 px-12 border border-gold/30 text-gold text-[0.8rem] tracking-[0.3em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500"
          >
            ← Return to Sanctuary
          </Link>
        </div>

        <div className="w-24 h-px bg-gold/20 mx-auto mt-12" />
        
        <p className="text-[0.6rem] tracking-[0.4em] uppercase text-muted/40">
          State of Resonance | Alignment Required
        </p>
      </div>
    </main>
  );
}
