export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5 py-20 px-8 text-center mt-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl tracking-[0.2em] text-white">RESONANCE</h2>
        <p className="text-[0.7rem] tracking-[0.5em] text-muted uppercase">
          © 2024 STATE OF RESONANCE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex justify-center gap-6 text-[0.6rem] tracking-[0.2em] uppercase text-muted">
          <a href="#" className="hover:text-gold transition-colors">Privacy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms</a>
          <a href="#" className="hover:text-gold transition-colors">Shipping</a>
        </div>
      </div>
    </footer>
  );
}
