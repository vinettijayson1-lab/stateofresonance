'use client';

import { useState } from 'react';

export default function EmailCaptureForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="py-8 text-center">
        <p className="font-serif italic text-[var(--color-gold-muted)] text-xl tracking-wide">&quot;The frequency has been received.&quot;</p>
        <p className="text-gray-500 text-xs mt-2 tracking-widest uppercase font-mono">Check your inbox for your symbol guide.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="YOUR EMAIL" required disabled={status === 'loading'}
        className="bg-black border border-[rgba(255,255,255,0.1)] text-white px-6 py-4 outline-none font-mono text-sm tracking-widest w-full sm:w-auto min-w-[280px] focus:border-[var(--color-gold-muted)] transition-colors disabled:opacity-50" />
      <button type="submit" disabled={status === 'loading'}
        className="bg-[var(--color-gold-muted)] text-black px-8 py-4 font-bold tracking-widest text-xs uppercase hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50">
        {status === 'loading' ? 'Transmitting...' : 'Unlock the Guide'}
      </button>
      {status === 'error' && <p className="w-full text-center text-xs text-red-400 tracking-widest uppercase font-mono mt-2">Transmission failed. Try again.</p>}
    </form>
  );
}
