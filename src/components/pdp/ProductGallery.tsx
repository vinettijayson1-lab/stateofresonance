'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImgObj { url: string; alt: string; }

export default function ProductGallery({ mainImage, images }: { mainImage: ImgObj; images?: ImgObj[] }) {
  const allImages = images && images.length > 0 ? images : [mainImage];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    containerRef.current.style.setProperty('--zoom-x', `${x}%`);
    containerRef.current.style.setProperty('--zoom-y', `${y}%`);
  };

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-24">
      {/* Main Image */}
      <div 
        ref={containerRef}
        className="aspect-[3/4] relative bg-secondary overflow-hidden cursor-zoom-in group"
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
        style={{
          '--zoom-x': '50%',
          '--zoom-y': '50%',
        } as React.CSSProperties}
      >
        <Image 
          src={allImages[activeIndex].url} 
          alt={allImages[activeIndex].alt} 
          fill 
          sizes="(max-width: 1024px) 100vw, 50vw" 
          className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
          style={isZoomed ? { transformOrigin: 'var(--zoom-x) var(--zoom-y)' } : undefined}
          priority 
        />
        
        {/* Image counter */}
        <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground">
          {String(activeIndex + 1).padStart(2, '0')} / {String(allImages.length).padStart(2, '0')}
        </div>

        {/* Navigation arrows */}
        {allImages.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {allImages.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setActiveIndex(i)}
              className={`w-16 h-20 lg:w-20 lg:h-24 relative flex-shrink-0 transition-all duration-300 ${
                i === activeIndex 
                  ? 'ring-1 ring-foreground' 
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <Image 
                src={img.url} 
                alt={img.alt} 
                fill 
                className="object-cover" 
                sizes="80px" 
                loading="lazy" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
