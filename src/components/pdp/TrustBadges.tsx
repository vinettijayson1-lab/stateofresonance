import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="flex flex-col gap-4 text-[0.65rem] font-sans tracking-widest text-[#7a7a7a] uppercase border border-[rgba(255,255,255,0.05)] p-5 bg-[rgba(255,255,255,0.01)]">
      <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-[var(--color-gold-muted)]" /> Authentic State of Resonance Artifact</div>
      <div className="flex items-center gap-3"><RotateCcw className="w-4 h-4 text-[var(--color-gold-muted)]" /> 30-Day Return Guarantee</div>
      <div className="flex items-center gap-3"><Truck className="w-4 h-4 text-[var(--color-gold-muted)]" /> Free Shipping over $110 / Ships in 2-4 days</div>
    </div>
  );
}
