'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImgObj { url: string; alt: string; }

export default function ProductGallery({ mainImage, images }: { mainImage: ImgObj; images?: ImgObj[] }) {
  const allImages = images && images.length > 0 ? images : [mainImage];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[4/5] relative border border-[rgba(255,255,255,0.05)] overflow-hidden bg-[url('/esoteric-backdrop.png')] bg-cover bg-center flex items-center justify-center">
        <Image src={allImages[active].url} alt={allImages[active].alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-4 drop-shadow-2xl" priority />
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-16 h-16 relative border flex-shrink-0 ${i === active ? 'border-[var(--color-gold)]' : 'border-[rgba(255,255,255,0.05)] opacity-50 hover:opacity-100'} transition-all`}>
              <Image src={img.url} alt={img.alt} fill className="object-contain p-1" sizes="64px" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
