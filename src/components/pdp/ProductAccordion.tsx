'use client';

import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface ProductAccordionProps {
  items: AccordionItem[];
}

function AccordionSection({ item, isOpen, onToggle }: { item: AccordionItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium tracking-wide uppercase">{item.title}</span>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-sm text-muted-foreground leading-relaxed">
          {item.content}
        </div>
      </div>
    </div>
  );
}

export default function ProductAccordion({ items }: ProductAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-border border-t border-border">
      {items.map((item, index) => (
        <AccordionSection
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
