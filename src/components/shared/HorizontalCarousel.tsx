'use client';

import { ReactNode } from 'react';

export default function HorizontalCarousel({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden my-8">
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 gap-4 px-4">
        {children}
      </div>
    </div>
  );
}
