import type { Metadata } from 'next';
import ContentLayout, { ContentSection } from '@/components/layout/ContentLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for State of Resonance - how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <ContentLayout 
      title="Privacy Policy" 
      eyebrow="Legal"
      lastUpdated="April 2025"
      breadcrumb={[{ label: 'Privacy Policy', href: '/privacy' }]}
    >
      <ContentSection title="Information We Collect">
        <p>
          State of Resonance (stateofresonance.ca) collects personal information 
          including your email, shipping address, and payment details solely to 
          fulfill orders and improve your shopping experience.
        </p>
        <p>
          We use Shopify to process transactions securely. Your payment information 
          is encrypted and handled directly by Shopify&apos;s payment processors.
        </p>
      </ContentSection>

      <ContentSection title="Analytics & Cookies">
        <p>
          We use analytics tools including Google Analytics 4, Meta Pixel, and 
          Microsoft Clarity to understand site usage patterns. These tools may 
          use cookies to track your browsing behavior.
        </p>
        <p>
          You may disable cookies via your browser settings at any time. This may 
          affect some functionality of the site.
        </p>
      </ContentSection>

      <ContentSection title="Email Marketing">
        <p>
          We use Klaviyo to manage email marketing. By subscribing to our newsletter, 
          you consent to receive promotional communications about new drops, exclusive 
          offers, and brand updates.
        </p>
        <p>
          You may unsubscribe at any time by clicking the unsubscribe link in any email.
        </p>
      </ContentSection>

      <ContentSection title="Your Data Rights">
        <p>
          We do not sell your personal information to third parties. We only share 
          data with service providers necessary to fulfill your orders.
        </p>
        <p>
          For data requests or deletion, contact us at{' '}
          <a href="mailto:support@stateofresonance.ca" className="text-[#c4a077] hover:text-[#fafafa] transition-colors">
            support@stateofresonance.ca
          </a>
        </p>
      </ContentSection>
    </ContentLayout>
  );
}
