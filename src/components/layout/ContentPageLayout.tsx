import ScrollReveal from '@/components/shared/ScrollReveal';
import Link from 'next/link';

interface ContentPageLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function ContentPageLayout({ 
  title, 
  subtitle, 
  lastUpdated,
  children 
}: ContentPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="px-6 py-4 border-b border-border" aria-label="Breadcrumb">
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </div>
      </nav>
      
      {/* Header */}
      <header className="pt-16 pb-12 md:pt-24 md:pb-16 px-6 border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-4">
                Last updated: {lastUpdated}
              </p>
            )}
          </ScrollReveal>
        </div>
      </header>
      
      {/* Content */}
      <main className="py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="prose prose-sm prose-invert max-w-none
              prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-gold
              prose-ul:text-muted-foreground prose-ul:my-4
              prose-li:my-1
              prose-strong:text-foreground prose-strong:font-medium
            ">
              {children}
            </div>
          </ScrollReveal>
        </div>
      </main>
      
      {/* Contact CTA */}
      <section className="py-12 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Have questions? We&apos;re here to help.
          </p>
          <a 
            href="mailto:support@stateofresonance.ca" 
            className="text-sm text-foreground underline underline-offset-4 hover:text-gold transition-colors"
          >
            support@stateofresonance.ca
          </a>
        </div>
      </section>
    </div>
  );
}
