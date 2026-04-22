'use client';

import { useState } from 'react';

export default function FrequencySignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="border border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.02)] p-6 mt-10">
      <p className="text-[var(--color-gold-muted)] text-[0.6rem] uppercase tracking-[0.3em] font-sans mb-1">
        Join The Frequency
      </p>
      <p className="text-gray-500 text-[0.65rem] font-sans tracking-wide leading-relaxed mb-4">
        Early access to new drops. No noise — only signal.
      </p>

      {status === 'success' ? (
        <p className="text-[var(--color-gold)] text-[0.6rem] uppercase tracking-widest font-mono">
          ✓ You&apos;re in the frequency.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="YOUR EMAIL"
            required
            className="flex-1 min-w-0 bg-black border border-[rgba(255,255,255,0.08)] border-r-0 px-4 py-3 text-[0.65rem] font-sans tracking-widest text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-gold-muted)]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 bg-transparent border border-[rgba(212,175,55,0.25)] text-[var(--color-gold-muted)] hover:bg-[var(--color-gold)] hover:text-black hover:border-[var(--color-gold)] transition-colors px-5 text-[0.55rem] font-bold uppercase tracking-widest disabled:opacity-40"
          >
            {status === 'loading' ? '…' : 'Join'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-[0.6rem] mt-2 font-sans tracking-wide">
          Something went wrong — please try again.
        </p>
      )}
    </div>
  );
}
