"use client";

import { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock, Award, ChevronDown } from 'lucide-react';

export default function TrustBadges() {
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  const toggleBadge = (badgeName: string) => {
    setActiveBadge(prev => prev === badgeName ? null : badgeName);
  };

  return (
    <div className="flex flex-col gap-0 w-full">
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
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4">
        <button 
          onClick={() => toggleBadge('shipping')}
          className={`flex items-center justify-between py-2 text-left text-[0.6rem] font-sans tracking-widest uppercase transition-colors ${activeBadge === 'shipping' ? 'text-white' : 'text-[#7a7a7a] hover:text-white'}`}
        >
          <div className="flex items-center gap-2.5">
            <Truck className="w-3.5 h-3.5 text-[var(--color-gold-muted)] flex-shrink-0" />
            <span>Free Shipping 110+</span>
          </div>
          <ChevronDown className={`w-3 h-3 transition-transform ${activeBadge === 'shipping' ? 'rotate-180 text-white' : 'text-gray-600'}`} />
        </button>

        <button 
          onClick={() => toggleBadge('returns')}
          className={`flex items-center justify-between py-2 text-left text-[0.6rem] font-sans tracking-widest uppercase transition-colors ${activeBadge === 'returns' ? 'text-white' : 'text-[#7a7a7a] hover:text-white'}`}
        >
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-3.5 h-3.5 text-[var(--color-gold-muted)] flex-shrink-0" />
            <span>30-Day Returns</span>
          </div>
          <ChevronDown className={`w-3 h-3 transition-transform ${activeBadge === 'returns' ? 'rotate-180 text-white' : 'text-gray-600'}`} />
        </button>

        <button 
          onClick={() => toggleBadge('secure')}
          className={`flex items-center justify-between py-2 text-left text-[0.6rem] font-sans tracking-widest uppercase transition-colors ${activeBadge === 'secure' ? 'text-white' : 'text-[#7a7a7a] hover:text-white'}`}
        >
          <div className="flex items-center gap-2.5">
            <Lock className="w-3.5 h-3.5 text-[var(--color-gold-muted)] flex-shrink-0" />
            <span>Secure Checkout</span>
          </div>
          <ChevronDown className={`w-3 h-3 transition-transform ${activeBadge === 'secure' ? 'rotate-180 text-white' : 'text-gray-600'}`} />
        </button>

        <button 
          onClick={() => toggleBadge('canada')}
          className={`flex items-center justify-between py-2 text-left text-[0.6rem] font-sans tracking-widest uppercase transition-colors ${activeBadge === 'canada' ? 'text-white' : 'text-[#7a7a7a] hover:text-white'}`}
        >
          <div className="flex items-center gap-2.5">
            <Award className="w-3.5 h-3.5 text-[var(--color-gold-muted)] flex-shrink-0" />
            <span>Made in Canada</span>
          </div>
          <ChevronDown className={`w-3 h-3 transition-transform ${activeBadge === 'canada' ? 'rotate-180 text-white' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Active Badge Content */}
      {activeBadge && (
        <div className="mt-2 p-3 bg-[rgba(212,175,55,0.03)] border-l-2 border-[var(--color-gold-muted)]">
          <p className="text-[0.65rem] text-gray-400 font-sans tracking-wide leading-relaxed">
            {activeBadge === 'shipping' && "We offer complimentary tracked shipping on all orders over $110 CAD. Your artifact will be securely packaged to ensure pristine arrival."}
            {activeBadge === 'returns' && "If you don't feel the resonance, return the piece unworn within 30 days for a full refund. Simply contact support to begin the return process."}
            {activeBadge === 'secure' && "Your payment is processed with bank-grade encryption via Shopify Payments. We accept all major credit cards, Apple Pay, and Shop Pay."}
            {activeBadge === 'canada' && "Each piece is conceptualized and finished right here in Canada, ensuring ethical labor, fair wages, and premium quality control."}
          </p>
        </div>
      )}
    </div>
  );
}
