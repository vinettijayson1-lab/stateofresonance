'use client';

import { useState, useEffect, useRef } from 'react';

const PERKS = [
  {
    icon: '◈',
    title: 'Your Own Discount Code',
    body: 'A custom code tied to you. Your audience saves, you earn — every single time.',
  },
  {
    icon: '◉',
    title: 'Real Commission. Real Cash.',
    body: 'Earn a percentage on every sale your code generates. Paid out automatically through Shopify Collabs.',
  },
  {
    icon: '◇',
    title: 'Early Access to Every Drop',
    body: 'You see new pieces before they go public. First pick on a 10-unit run is a serious advantage.',
  },
  {
    icon: '△',
    title: 'Free Artifact to Wear & Shoot',
    body: 'Qualifying creators receive a piece to wear. We don\'t ask you to fake it — we want you to feel it.',
  },
];

const VIBES = [
  'You create content rooted in identity, growth, or self-expression',
  'You move with intention — not trend-chasing',
  'Your audience trusts your taste, not just your follower count',
  'You\'d wear this regardless of the partnership',
  'You\'re into the occult, sacred geometry, esoteric philosophy, or luxury streetwear',
  'You\'re building something real',
];

const FAQS = [
  {
    q: 'Do I need a minimum follower count?',
    a: 'No. We care about resonance over reach. A 500-follower account with the right energy will always outperform a 500K account that doesn\'t align.',
  },
  {
    q: 'How does the commission work?',
    a: 'Through Shopify Collabs. When someone uses your unique code or link to purchase, you earn a commission. Payouts are handled directly by Shopify — no middleman.',
  },
  {
    q: 'What platforms count?',
    a: 'Instagram, TikTok, YouTube, Pinterest, X, Substack — anywhere you have a real presence and an audience that listens.',
  },
  {
    q: 'How long does it take to hear back?',
    a: 'We review every application personally. Expect a response within 3–5 business days. If you\'re a fit, you\'ll know.',
  },
  {
    q: 'Is this exclusive?',
    a: 'We keep the circle tight on purpose. Not to gatekeep, but because the artifacts mean more when they\'re carried by people who genuinely resonate with the mission.',
  },
];

export default function CollabPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Shopify Collabs affiliate application URL
  const COLLABS_URL =
    'https://api.collabs.shopify.com/creator/signup/community_application/f02d4683be03cfbf';

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden"
      >
        {/* radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />
        {/* bg texture */}
        <div
          className="absolute inset-0 bg-[url('/luxury-occult-bg.webp')] bg-cover bg-center opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        {/* animated sigil ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[rgba(212,175,55,0.06)] pointer-events-none"
          style={{ animation: 'spin 60s linear infinite' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[rgba(212,175,55,0.04)] pointer-events-none"
          style={{ animation: 'spin 40s linear infinite reverse' }}
        />

        <div
          className="relative z-10 max-w-3xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <p
            className="text-[var(--color-gold)] uppercase tracking-[0.45em] text-xs mb-8 inline-block border-b border-[var(--color-gold-muted)] pb-2"
          >
            The Circle ∴ Open Enrollment
          </p>

          <h1
            className="font-serif text-5xl md:text-7xl text-white uppercase leading-tight tracking-wide mb-8"
          >
            Carry&nbsp;the&nbsp;Signal.<br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-gold) 0%, #f0d060 50%, var(--color-gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Get Paid&nbsp;to&nbsp;Resonate.
            </span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base font-sans tracking-wide leading-relaxed max-w-xl mx-auto mb-12">
            No gatekeeping. No follower minimums. No fake energy.
            If your aesthetic, your audience, and your intention align with what we&apos;re building — you belong in this circle.
          </p>

          <a
            href={COLLABS_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="collab-hero-cta"
            className="collab-btn"
          >
            Apply Through Shopify Collabs
            <span className="collab-btn-arrow">→</span>
          </a>

          <p className="text-[var(--color-gold-muted)] text-xs mt-5 tracking-widest uppercase">
            Powered by Shopify Collabs · Secure · Free to Join
          </p>
        </div>

        {/* scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          style={{ animation: 'bob 2.5s ease-in-out infinite' }}
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--color-gold-muted)] to-transparent" />
          <span className="text-[var(--color-gold-muted)] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-4">The Exchange</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest">What You Actually Get</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PERKS.map((p, i) => (
            <div
              key={i}
              className="perk-card group"
              style={{
                opacity: 0,
                animation: `fadeUp 0.6s ease forwards`,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              <span className="perk-icon">{p.icon}</span>
              <h3 className="font-serif text-xl text-white uppercase tracking-widest mb-3">{p.title}</h3>
              <p className="text-gray-400 text-sm font-sans leading-relaxed tracking-wide">{p.body}</p>
              <div className="perk-glow" />
            </div>
          ))}
        </div>
      </section>

      {/* ── THE VIBE CHECK ── */}
      <section
        className="py-28 px-6 relative"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="border border-[rgba(212,175,55,0.15)] p-10 md:p-16 relative overflow-hidden">
            {/* corner accents */}
            <span className="corner-tl" />
            <span className="corner-br" />

            <div className="text-center mb-12">
              <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-4">No Application Needed for This Part</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest">The Vibe Check</h2>
              <p className="text-gray-500 text-sm mt-4 font-sans">
                We don&apos;t have a rigid checklist. But if these land for you — you&apos;re already in.
              </p>
            </div>

            <ul className="space-y-5">
              {VIBES.map((v, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span
                    className="mt-0.5 text-[var(--color-gold)] text-lg flex-shrink-0"
                    style={{ transition: 'transform 0.3s ease' }}
                  >
                    ◈
                  </span>
                  <span className="text-gray-300 font-sans text-sm md:text-base leading-relaxed tracking-wide group-hover:text-white transition-colors duration-300">
                    {v}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-14 text-center">
              <p className="text-[var(--color-gold-muted)] font-serif italic text-xl md:text-2xl mb-8">
                &quot;Style is an extension of spirit.&quot;
              </p>
              <a
                href={COLLABS_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="collab-vibe-cta"
                className="collab-btn"
              >
                I Resonate — Let Me In
                <span className="collab-btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-4">The Process</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            {
              num: '01',
              title: 'Apply via Shopify Collabs',
              body: 'Hit the button. Fill out your profile on Shopify Collabs — takes under 5 minutes. Tell us who you are and what you create.',
            },
            {
              num: '02',
              title: 'We Review & Welcome You',
              body: 'We personally look at every application. If the resonance is there, you\'ll get access to your unique affiliate code and dashboard.',
            },
            {
              num: '03',
              title: 'Share, Earn, Grow',
              body: 'Post authentically. Your audience uses your code. You earn commission on every sale. Shopify pays you out directly.',
            },
          ].map((step, i) => (
            <div key={i} className="step-card group">
              <div className="step-num">{step.num}</div>
              {i < 2 && <div className="step-connector" />}
              <h3 className="font-serif text-lg text-white uppercase tracking-widest mb-3 mt-6">{step.title}</h3>
              <p className="text-gray-400 text-sm font-sans leading-relaxed tracking-wide">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 px-6 max-w-3xl mx-auto border-t border-[rgba(255,255,255,0.05)]">
        <div className="text-center mb-16">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.4em] text-xs mb-4">Answered</p>
          <h2 className="font-serif text-4xl text-white uppercase tracking-widest">Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="faq-item"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq-header">
                <span className="faq-q">{faq.q}</span>
                <span
                  className="faq-icon"
                  style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </div>
              <div
                className="faq-body"
                style={{
                  maxHeight: openFaq === i ? '200px' : '0',
                  opacity: openFaq === i ? 1 : 0,
                }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-36 px-6 text-center relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, black 70%)',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[rgba(212,175,55,0.04)] pointer-events-none"
          style={{ animation: 'spin 90s linear infinite' }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.45em] text-xs mb-6">The Synchronization Point</p>
          <h2 className="font-serif text-4xl md:text-6xl text-white uppercase tracking-wide leading-tight mb-8">
            Be Part of<br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-gold) 0%, #f0d060 50%, var(--color-gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Something Real.
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-sans tracking-wide leading-relaxed mb-12 max-w-lg mx-auto">
            Not a brand deal. Not an ad campaign. A genuine circle of creators who carry the signal and share in what it builds.
          </p>
          <a
            href={COLLABS_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="collab-final-cta"
            className="collab-btn collab-btn--large"
          >
            Apply Now via Shopify Collabs
            <span className="collab-btn-arrow">→</span>
          </a>
          <p className="text-gray-600 text-xs mt-6 tracking-widest uppercase">
            Free to apply · No follower minimum · Paid via Shopify
          </p>
        </div>
      </section>

      <style>{`
        /* ── Animations ── */
        @keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes bob { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

        /* ── CTA Button ── */
        .collab-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, var(--color-gold) 0%, #c8a020 100%);
          color: #000;
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 0 30px rgba(212,175,55,0.2);
        }
        .collab-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.35s ease;
        }
        .collab-btn:hover::before { transform: translateX(0); }
        .collab-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(212,175,55,0.4); }
        .collab-btn--large { padding: 18px 44px; font-size: 0.85rem; }
        .collab-btn-arrow { font-size: 1.1em; transition: transform 0.25s ease; }
        .collab-btn:hover .collab-btn-arrow { transform: translateX(4px); }

        /* ── Perk Cards ── */
        .perk-card {
          position: relative;
          padding: 36px;
          border: 1px solid rgba(212,175,55,0.12);
          background: rgba(10,10,12,0.8);
          overflow: hidden;
          transition: border-color 0.35s ease, transform 0.35s ease;
          cursor: default;
        }
        .perk-card:hover { border-color: rgba(212,175,55,0.35); transform: translateY(-4px); }
        .perk-icon {
          display: block;
          color: var(--color-gold);
          font-size: 1.8rem;
          margin-bottom: 20px;
          transition: transform 0.4s ease;
        }
        .perk-card:hover .perk-icon { transform: rotate(90deg) scale(1.1); }
        .perk-glow {
          position: absolute;
          bottom: -40px; right: -40px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: rgba(212,175,55,0.04);
          transition: transform 0.5s ease, opacity 0.5s ease;
          pointer-events: none;
        }
        .perk-card:hover .perk-glow { transform: scale(2.5); opacity: 0.6; }

        /* ── Corner Accents ── */
        .corner-tl, .corner-br {
          position: absolute;
          width: 32px; height: 32px;
          border-color: rgba(212,175,55,0.3);
          border-style: solid;
          pointer-events: none;
        }
        .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        /* ── Steps ── */
        .step-card {
          position: relative;
          padding: 40px 32px;
          border-top: 1px solid rgba(212,175,55,0.1);
          transition: background 0.3s ease;
        }
        .step-card:hover { background: rgba(212,175,55,0.02); }
        .step-num {
          font-family: var(--font-serif), serif;
          font-size: 3rem;
          color: rgba(212,175,55,0.15);
          line-height: 1;
          letter-spacing: 0.05em;
        }
        .step-connector {
          display: none;
        }
        @media (min-width: 768px) {
          .step-card { border-top: none; border-left: 1px solid rgba(212,175,55,0.1); }
          .step-card:first-child { border-left: none; }
        }

        /* ── FAQ ── */
        .faq-item {
          border: 1px solid rgba(212,175,55,0.1);
          padding: 0;
          cursor: pointer;
          transition: border-color 0.25s ease;
          overflow: hidden;
        }
        .faq-item:hover { border-color: rgba(212,175,55,0.3); }
        .faq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          gap: 16px;
        }
        .faq-q {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 0.85rem;
          color: #fff;
          letter-spacing: 0.05em;
          flex: 1;
        }
        .faq-icon {
          color: var(--color-gold);
          font-size: 1.3rem;
          font-weight: 300;
          flex-shrink: 0;
          transition: transform 0.3s ease;
          line-height: 1;
        }
        .faq-body {
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
        }
        .faq-body p {
          padding: 0 24px 24px;
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 0.82rem;
          color: #888;
          line-height: 1.8;
          letter-spacing: 0.04em;
        }
      `}</style>
    </div>
  );
}
