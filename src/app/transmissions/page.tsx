import { getSortedTransmissionsData } from '@/lib/transmissions';
import Link from 'next/link';

export const metadata = {
  title: 'Transmissions | State of Resonance',
  description: 'Cryptographic artifacts, occult luxury philosophy, and esoteric streetwear insights.',
};

export default function TransmissionsPage() {
  const allTransmissions = getSortedTransmissionsData();

  return (
    <div className="min-h-screen pt-48 pb-24 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16 w-full">
        <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs mb-4">
          The Archive
        </p>
        <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-white mb-6">
          Transmissions
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm tracking-wider font-mono px-4 leading-relaxed">
          Exploring the philosophy, frequency, and hidden artifacts behind our occult luxury garments.
        </p>
      </div>

      <div className="w-full flex flex-col gap-12 mt-12">
        {allTransmissions.map(({ slug, title, date, excerpt }) => (
          <article 
            key={slug} 
            className="group block border-b border-[rgba(255,255,255,0.05)] pb-12 transition-all hover:border-[var(--color-gold-muted)]"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
              <Link href={`/transmissions/${slug}`} className="block">
                <h2 className="text-2xl font-serif tracking-wide text-white group-hover:text-[var(--color-gold)] transition-colors mb-2 md:mb-0">
                  {title}
                </h2>
              </Link>
              <time className="text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase font-mono mt-1 md:mt-0">
                {date}
              </time>
            </div>
            
            <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-6 font-sans">
              {excerpt}
            </p>

            <Link 
              href={`/transmissions/${slug}`} 
              className="inline-flex items-center text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold-muted)] font-bold hover:text-[var(--color-gold)] transition-colors"
            >
              Decode Signal <span className="ml-2">→</span>
            </Link>
          </article>
        ))}
        {allTransmissions.length === 0 && (
          <p className="text-center text-gray-500 tracking-widest text-sm font-mono uppercase mt-12">No transmissions intercepted.</p>
        )}
      </div>
    </div>
  );
}
