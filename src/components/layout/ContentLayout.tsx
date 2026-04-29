import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ContentLayoutProps {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  breadcrumb?: { label: string; href: string }[];
  lastUpdated?: string;
}

export default function ContentLayout({ 
  title, 
  eyebrow, 
  children, 
  breadcrumb,
  lastUpdated 
}: ContentLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 md:pt-32 pb-24">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#737373]">
              <li>
                <Link href="/" className="hover:text-[#fafafa] transition-colors">Home</Link>
              </li>
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3" />
                  {index === breadcrumb.length - 1 ? (
                    <span className="text-[#fafafa]">{item.label}</span>
                  ) : (
                    <Link href={item.href} className="hover:text-[#fafafa] transition-colors">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Header */}
        <header className="mb-12 md:mb-16">
          {eyebrow && (
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#c4a077] mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl text-[#fafafa]">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-[#737373] mt-4">
              Last updated: {lastUpdated}
            </p>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-sm max-w-none">
          <div className="space-y-6 text-[#a3a3a3] leading-relaxed">
            {children}
          </div>
        </div>
        
      </div>
    </div>
  );
}

// For structured content sections
export function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="font-serif text-xl md:text-2xl text-[#fafafa] mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
