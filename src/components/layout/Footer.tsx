import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        
        {/* Simple single row footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo and tagline */}
          <div className="flex items-center gap-6">
            <Link href="/" className="font-serif text-lg text-[#fafafa]">
              State of Resonance
            </Link>
            <span className="hidden md:block text-[#737373]">|</span>
            <span className="text-sm text-[#737373]">Premium Heavyweight Streetwear</span>
          </div>

          {/* Essential links */}
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-[#737373] hover:text-[#fafafa] transition-colors uppercase tracking-wider">
              About
            </Link>
            <Link href="/faq" className="text-xs text-[#737373] hover:text-[#fafafa] transition-colors uppercase tracking-wider">
              FAQ
            </Link>
            <Link href="/privacy" className="text-xs text-[#737373] hover:text-[#fafafa] transition-colors uppercase tracking-wider">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-[#737373] hover:text-[#fafafa] transition-colors uppercase tracking-wider">
              Terms
            </Link>
            <a 
              href="mailto:support@stateofresonance.ca" 
              className="text-xs text-[#737373] hover:text-[#fafafa] transition-colors uppercase tracking-wider"
            >
              Contact
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com/stateofresonance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#737373] hover:text-[#fafafa] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://tiktok.com/@stateofresonance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#737373] hover:text-[#fafafa] transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#1a1a1a] text-center">
          <p className="text-xs text-[#525252]">
            © {new Date().getFullYear()} State of Resonance. Designed in Canada.
          </p>
        </div>
      </div>
    </footer>
  );
}
