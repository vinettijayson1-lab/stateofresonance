import { ShieldCheck, Truck, RotateCcw, Lock, Award } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="flex flex-col gap-0">
      {/* Guarantee Banner */}
      <div className="border border-[rgba(212,175,55,0.25)] bg-[rgba(212,175,55,0.03)] p-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[var(--color-gold-muted)] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[var(--color-gold)]" />
          </div>
          <div>
            <h4 className="text-white font-serif text-sm tracking-widest uppercase mb-1">Risk-Free Guarantee</h4>
            <p className="text-[0.65rem] text-gray-400 font-sans leading-relaxed tracking-wide">
              Don&apos;t love it? <span className="text-white font-semibold">Full refund within 30 days.</span> No questions asked, no hoops to jump through. 
              We believe in the quality of every piece — if you don&apos;t feel the resonance, we&apos;ll make it right.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Points */}
      <div className="grid grid-cols-2 gap-0">
        <div className="flex items-center gap-2.5 p-3 border border-[rgba(255,255,255,0.05)] border-t-0 text-[0.6rem] font-sans tracking-widest text-[#7a7a7a] uppercase">
          <Truck className="w-3.5 h-3.5 text-[var(--color-gold-muted)] flex-shrink-0" />
          <span>Free Shipping 110+</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 border border-[rgba(255,255,255,0.05)] border-t-0 border-l-0 text-[0.6rem] font-sans tracking-widest text-[#7a7a7a] uppercase">
          <RotateCcw className="w-3.5 h-3.5 text-[var(--color-gold-muted)] flex-shrink-0" />
          <span>30-Day Returns</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 border border-[rgba(255,255,255,0.05)] border-t-0 text-[0.6rem] font-sans tracking-widest text-[#7a7a7a] uppercase">
          <Lock className="w-3.5 h-3.5 text-[var(--color-gold-muted)] flex-shrink-0" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 border border-[rgba(255,255,255,0.05)] border-t-0 border-l-0 text-[0.6rem] font-sans tracking-widest text-[#7a7a7a] uppercase">
          <Award className="w-3.5 h-3.5 text-[var(--color-gold-muted)] flex-shrink-0" />
          <span>Made in Canada</span>
        </div>
      </div>
    </div>
  );
}
