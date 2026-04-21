const REVIEW_URL = 'https://admin.trustindex.io/card/346d715602cd314';

export default function ReviewQR() {
  return (
    <section className="py-20 px-6 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.4)]">
      <div className="max-w-sm mx-auto text-center flex flex-col items-center gap-6">
        <div>
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-3 font-mono">Speak Your Truth</p>
          <h2 className="font-serif text-2xl text-white tracking-widest uppercase mb-2">Leave a Review</h2>
          <p className="text-gray-500 text-xs font-sans tracking-wide leading-relaxed">
            Worn it? Felt it? Share your experience.
          </p>
        </div>

        {/* QR Code — visible on desktop/tablet only */}
        <div className="hidden md:block relative p-4 border border-[var(--color-gold-muted)] bg-white shadow-[0_0_30px_rgba(212,175,55,0.12)]">
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[var(--color-gold)]" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[var(--color-gold)]" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[var(--color-gold)]" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[var(--color-gold)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/review-qr.png"
            alt="Scan to leave a review for State of Resonance"
            width={160}
            height={160}
            className="block"
          />
        </div>
        <p className="hidden md:block text-[10px] text-gray-700 uppercase tracking-widest font-mono">Point your camera at the code</p>

        {/* Tap button — mobile only */}
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden w-full max-w-xs bg-[var(--color-gold)] text-black font-bold uppercase tracking-[0.2em] text-sm py-4 px-8 text-center hover:bg-white transition-colors"
        >
          ★ Write a Review
        </a>
      </div>
    </section>
  );
}
