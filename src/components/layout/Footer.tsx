import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(255,255,255,0.05)] bg-black py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4 max-w-sm">
          <h2 className="font-serif text-2xl text-white tracking-widest uppercase">State of Resonance</h2>
          <p className="text-sm font-sans tracking-widest text-gray-400 uppercase leading-relaxed text-center">Symbolic streetwear for the spiritually awakened.</p>
        </div>
        <nav className="flex flex-col sm:flex-row sm:flex-wrap gap-y-5 gap-x-8 items-center justify-center">
          {[
            { label: 'Shop', href: '/collection/all' },
            { label: 'About', href: '/about' },
            { label: 'Symbols', href: '/symbols' },
            { label: 'Social Proof', href: '/social-proof' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-sans tracking-widest text-gray-400 uppercase hover:text-[var(--color-gold)] transition-colors py-1">
              {link.label}
            </Link>
          ))}
          {/* mailto must be a plain <a> — Next.js <Link> silently drops mailto: hrefs */}
          <a href="mailto:support@stateofresonance.ca" className="text-sm font-sans tracking-widest text-gray-400 uppercase hover:text-[var(--color-gold)] transition-colors py-1">
            Contact
          </a>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[rgba(255,255,255,0.05)] text-center">
        <p className="text-xs text-gray-600 uppercase tracking-widest">© {new Date().getFullYear()} State of Resonance — All Rights Reserved</p>
      </div>
    </footer>
  );
}
