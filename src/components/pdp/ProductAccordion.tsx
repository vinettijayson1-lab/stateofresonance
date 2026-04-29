'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-[#1a1a1a]">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left"
      >
        <span className="text-sm font-medium text-[#fafafa]">{title}</span>
        <ChevronDown 
          className={`w-4 h-4 text-[#737373] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <div className="text-sm text-[#a3a3a3] leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProductAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    {
      title: 'Fabric & Construction',
      content: (
        <>
          <p><strong className="text-[#fafafa]">Material:</strong> 450gsm heavyweight cotton</p>
          <p><strong className="text-[#fafafa]">Construction:</strong> Double-stitched seams throughout</p>
          <p><strong className="text-[#fafafa]">Details:</strong> Ribbed collar, reinforced shoulders</p>
          <p>Our heavyweight cotton is sourced for its exceptional weight and durability. Each piece is constructed to last years, not seasons.</p>
        </>
      ),
    },
    {
      title: 'Sizing Guide',
      content: (
        <>
          <p className="mb-4">All pieces feature an oversized, structured fit. We recommend your true size for the intended oversized look, or size down for a more fitted appearance.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#262626]">
                  <th className="py-2 pr-4 text-[#fafafa]">Size</th>
                  <th className="py-2 pr-4 text-[#fafafa]">Chest</th>
                  <th className="py-2 pr-4 text-[#fafafa]">Length</th>
                  <th className="py-2 text-[#fafafa]">Shoulder</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#1a1a1a]">
                  <td className="py-2 pr-4">S</td>
                  <td className="py-2 pr-4">52cm</td>
                  <td className="py-2 pr-4">70cm</td>
                  <td className="py-2">50cm</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]">
                  <td className="py-2 pr-4">M</td>
                  <td className="py-2 pr-4">56cm</td>
                  <td className="py-2 pr-4">72cm</td>
                  <td className="py-2">52cm</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]">
                  <td className="py-2 pr-4">L</td>
                  <td className="py-2 pr-4">60cm</td>
                  <td className="py-2 pr-4">74cm</td>
                  <td className="py-2">54cm</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">XL</td>
                  <td className="py-2 pr-4">64cm</td>
                  <td className="py-2 pr-4">76cm</td>
                  <td className="py-2">56cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <>
          <p><strong className="text-[#fafafa]">Free shipping</strong> on orders over $100 CAD</p>
          <p><strong className="text-[#fafafa]">Processing time:</strong> 2-3 business days</p>
          <p><strong className="text-[#fafafa]">Delivery:</strong> 5-10 business days (Canada & US)</p>
          <p className="mt-4">We accept returns within 14 days of delivery for unworn items in original condition with tags attached. Final sale items are not eligible for returns.</p>
        </>
      ),
    },
    {
      title: 'Care Instructions',
      content: (
        <>
          <p>To preserve the quality and longevity of your piece:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Machine wash cold, inside out</li>
            <li>Do not bleach</li>
            <li>Tumble dry low or hang dry</li>
            <li>Iron on low heat if needed</li>
            <li>Do not dry clean</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
