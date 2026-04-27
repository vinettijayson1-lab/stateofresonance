'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

export default function ScrollReveal({ children, className = '' }: { children: ReactNode, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
