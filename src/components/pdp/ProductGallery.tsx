'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageObj { 
  url: string; 
  alt: string; 
}

interface ProductGalleryProps {
  images: ImageObj[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayImages = images.length > 0 ? images : [{ url: '/placeholder.jpg', alt: title }];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div 
        className="relative aspect-[3/4] bg-[#111] overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
      >
        <Image 
          src={displayImages[activeIndex].url} 
          alt={displayImages[activeIndex].alt || title}
          fill 
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        
        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 bg-[#0a0a0a]/80 backdrop-blur-sm px-3 py-1.5 text-xs text-[#a3a3a3]">
          Click to zoom
        </div>
      </div>
      
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-20 h-24 flex-shrink-0 bg-[#111] overflow-hidden transition-all ${
                index === activeIndex 
                  ? 'ring-1 ring-[#fafafa]' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image 
                src={img.url} 
                alt={img.alt || `${title} - Image ${index + 1}`}
                fill 
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen zoom modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-[#fafafa] hover:text-[#737373] transition-colors"
            aria-label="Close zoom"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full max-w-4xl aspect-[3/4]">
            <Image 
              src={displayImages[activeIndex].url} 
              alt={displayImages[activeIndex].alt || title}
              fill 
              sizes="100vw"
              className="object-contain"
              quality={100}
            />
          </div>
          
          {/* Navigation arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(prev => (prev - 1 + displayImages.length) % displayImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-[#fafafa] hover:text-[#737373] transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(prev => (prev + 1) % displayImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#fafafa] hover:text-[#737373] transition-colors"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
