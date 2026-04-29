"use client";

import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="space-y-4">
      {/* Risk-Free Guarantee Banner */}
      <div className="border border-[#c4a077]/20 bg-[#c4a077]/5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#c4a077]/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#c4a077]" />
          </div>
          <div>
            <h4 className="text-[#fafafa] font-serif text-sm tracking-wide mb-1">
              Risk-Free Guarantee
            </h4>
            <p className="text-[11px] text-[#737373] leading-relaxed">
              Don&apos;t love it? <span className="text-[#fafafa]">Full refund within 30 days.</span> No questions asked.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Points Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-[#1a1a1a] flex items-center justify-center">
            <Truck className="w-4 h-4 text-[#c4a077]" />
          </div>
          <p className="text-[10px] text-[#737373] tracking-[0.1em] uppercase">
            Free Ship $100+
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-[#1a1a1a] flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-[#c4a077]" />
          </div>
          <p className="text-[10px] text-[#737373] tracking-[0.1em] uppercase">
            30-Day Returns
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-[#1a1a1a] flex items-center justify-center">
            <Lock className="w-4 h-4 text-[#c4a077]" />
          </div>
          <p className="text-[10px] text-[#737373] tracking-[0.1em] uppercase">
            Secure Checkout
          </p>
        </div>
      </div>
    </div>
  );
}
