'use client';

import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cart';

type Step = 'intro' | 'form' | 'success';
type Mode = 'email' | 'phone';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<Step>('intro');
  const [mode, setMode] = useState<Mode>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerPopup = () => {
    if (localStorage.getItem('sor_exit_intent_seen') === 'true') return;
    const { isOpen, lastCartOpenedAt } = useCartStore.getState();
    if (isOpen) return;
    if (lastCartOpenedAt && Date.now() - lastCartOpenedAt < 60_000) return;
    setShow(true);
    localStorage.setItem('sor_exit_intent_seen', 'true');
  };

  useEffect(() => {
    if (localStorage.getItem('sor_exit_intent_seen')) return;

    let canExitIntent = false;
    const safetyTimer = setTimeout(() => { canExitIntent = true; }, 10000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (canExitIntent && e.clientY <= 0) triggerPopup();
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Auto-focus input when form step appears
  useEffect(() => {
    if (step === 'form') setTimeout(() => inputRef.current?.focus(), 100);
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const body = mode === 'email' ? { email } : { phone };
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) setStep('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const dismiss = () => setShow(false);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={dismiss} />

      <div
        className="relative w-full sm:max-w-lg mx-auto overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0a0a0a 0%, #0f0d08 60%, #0a0a0a 100%)',
          border: '1px solid rgba(212,175,55,0.2)',
          boxShadow: '0 0 80px rgba(212,175,55,0.08), 0 0 0 1px rgba(255,255,255,0.03)',
          borderRadius: '2px',
          animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Gold top border accent */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }} />

        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* ─── INTRO STEP ─── */}
        {step === 'intro' && (
          <div className="flex flex-col sm:flex-row">
            {/* Left — sigil / visual */}
            <div
              className="hidden sm:flex w-48 shrink-0 items-center justify-center p-8"
              style={{ background: 'rgba(212,175,55,0.03)', borderRight: '1px solid rgba(212,175,55,0.1)' }}
            >
              <svg viewBox="0 0 80 80" className="w-24 h-24 opacity-60" fill="none">
                {/* Metatron's Cube simplified sigil */}
                <circle cx="40" cy="40" r="38" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
                <circle cx="40" cy="40" r="22" stroke="rgba(212,175,55,0.5)" strokeWidth="0.5" />
                <circle cx="40" cy="18" r="22" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                <circle cx="40" cy="62" r="22" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                <circle cx="59" cy="29" r="22" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                <circle cx="21" cy="29" r="22" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                <circle cx="59" cy="51" r="22" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                <circle cx="21" cy="51" r="22" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                <circle cx="40" cy="40" r="3" fill="rgba(212,175,55,0.7)" />
              </svg>
            </div>

            {/* Right — copy */}
            <div className="flex-1 p-8 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.4em] font-mono mb-4" style={{ color: 'rgba(212,175,55,0.7)' }}>
                Before You Go
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-white leading-tight mb-3" style={{ letterSpacing: '0.03em' }}>
                The Frequency<br />
                <span style={{ color: 'rgba(212,175,55,0.9)' }}>Rewards the Bold.</span>
              </h2>
              <p className="text-sm font-sans leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>
                Get <strong className="text-white">10% off your first artifact</strong> + early access to drops before they go public.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setMode('email'); setStep('form'); }}
                  className="w-full py-4 font-bold uppercase text-xs tracking-[0.25em] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #d4af37, #b8961f)', color: '#000' }}
                >
                  ✦ Claim with Email
                </button>
                <button
                  onClick={() => { setMode('phone'); setStep('form'); }}
                  className="w-full py-4 font-bold uppercase text-xs tracking-[0.25em] transition-all duration-300 hover:bg-white/5 active:scale-[0.98]"
                  style={{ border: '1px solid rgba(212,175,55,0.3)', color: 'rgba(212,175,55,0.8)' }}
                >
                  ✦ Claim with SMS
                </button>
                <button
                  onClick={dismiss}
                  className="text-[10px] text-center uppercase tracking-widest font-mono pt-1 transition-colors hover:text-gray-400"
                  style={{ color: 'rgba(255,255,255,0.18)' }}
                >
                  I prefer to pay full price
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── FORM STEP ─── */}
        {step === 'form' && (
          <div className="p-8 sm:p-12">
            <button
              onClick={() => setStep('intro')}
              className="text-[10px] uppercase tracking-widest font-mono mb-6 flex items-center gap-2 transition-colors hover:text-gray-300"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              ← Back
            </button>

            <p className="text-[10px] uppercase tracking-[0.4em] font-mono mb-3" style={{ color: 'rgba(212,175,55,0.7)' }}>
              {mode === 'email' ? 'Enter Your Email' : 'Enter Your Phone'}
            </p>
            <h2 className="font-serif text-2xl text-white mb-2" style={{ letterSpacing: '0.03em' }}>
              {mode === 'email' ? 'Tune Into The Signal.' : 'Get Texts That Matter.'}
            </h2>
            <p className="text-xs font-sans mb-8" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
              {mode === 'email'
                ? 'Your 10% code arrives instantly. Unsubscribe anytime.'
                : 'SMS only. No spam — only drops, restocks, and sacred discounts.'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === 'email' ? (
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="YOUR@EMAIL.COM"
                  required
                  className="w-full bg-black px-5 py-4 text-white text-sm font-mono tracking-widest text-center focus:outline-none transition-colors"
                  style={{ border: '1px solid rgba(212,175,55,0.25)', caretColor: '#d4af37' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.7)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(212,175,55,0.25)')}
                />
              ) : (
                <input
                  ref={inputRef}
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (000) 000-0000"
                  required
                  className="w-full bg-black px-5 py-4 text-white text-sm font-mono tracking-widest text-center focus:outline-none transition-colors"
                  style={{ border: '1px solid rgba(212,175,55,0.25)', caretColor: '#d4af37' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.7)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(212,175,55,0.25)')}
                />
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 font-bold uppercase text-xs tracking-[0.25em] transition-all duration-300 hover:brightness-110 disabled:opacity-40 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #d4af37, #b8961f)', color: '#000' }}
              >
                {status === 'loading' ? 'Transmitting…' : 'Unlock My 10% Off'}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-[10px] text-center uppercase tracking-widest font-mono">
                  Transmission failed — try again
                </p>
              )}

              {/* Toggle mode */}
              <button
                type="button"
                onClick={() => setMode(mode === 'email' ? 'phone' : 'email')}
                className="text-[10px] text-center uppercase tracking-widest font-mono transition-colors hover:text-gray-300"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                Use {mode === 'email' ? 'phone number' : 'email'} instead
              </button>
            </form>
          </div>
        )}

        {/* ─── SUCCESS STEP ─── */}
        {step === 'success' && (
          <div className="p-12 flex flex-col items-center text-center">
            {/* Animated checkmark */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.06)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.9)" strokeWidth="1.5" className="w-7 h-7">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-mono mb-3" style={{ color: 'rgba(212,175,55,0.7)' }}>
              Frequency Received
            </p>
            <h2 className="font-serif text-2xl text-white mb-3" style={{ letterSpacing: '0.03em' }}>
              You&apos;re In the Circle.
            </h2>
            <p className="text-sm font-sans mb-8" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', lineHeight: '1.7' }}>
              Your 10% code is on its way.<br />
              Check your {mode === 'email' ? 'inbox' : 'messages'}.
            </p>
            <button
              onClick={dismiss}
              className="text-[10px] uppercase tracking-[0.3em] font-mono transition-colors hover:text-white"
              style={{ color: 'rgba(212,175,55,0.6)' }}
            >
              Continue Shopping →
            </button>
          </div>
        )}

        {/* Bottom gold line */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
