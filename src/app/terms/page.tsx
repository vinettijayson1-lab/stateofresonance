import type { Metadata } from 'next';
import ContentLayout, { ContentSection } from '@/components/layout/ContentLayout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for State of Resonance - the conditions for using our website and purchasing our products.',
};

export default function TermsPage() {
  return (
    <ContentLayout 
      title="Terms of Service" 
      eyebrow="Legal"
      lastUpdated="April 2025"
      breadcrumb={[{ label: 'Terms of Service', href: '/terms' }]}
    >
      <ContentSection title="Agreement">
        <p>
          By using stateofresonance.ca, you agree to the following terms and conditions. 
          Please read them carefully before making a purchase.
        </p>
      </ContentSection>

      <ContentSection title="Products & Pricing">
        <p>
          All products are sold as-is. Prices are displayed in Canadian dollars (CAD). 
          We reserve the right to limit quantities and modify prices without prior notice.
        </p>
        <p>
          Due to the limited nature of our drops (10 units per design), all sales are 
          considered final once inventory is exhausted.
        </p>
      </ContentSection>

      <ContentSection title="Returns & Refunds">
        <p>
          Returns are accepted within 14 days of delivery for unworn items in original 
          condition with tags attached. Items must be free of any signs of wear, damage, 
          or alteration.
        </p>
        <p>
          Final sale items are not eligible for returns. Shipping costs for returns are 
          the responsibility of the customer unless the return is due to our error.
        </p>
      </ContentSection>

      <ContentSection title="Shipping">
        <p>
          We are not responsible for lost packages once confirmed delivered by the carrier. 
          If your package is marked as delivered but you haven&apos;t received it, please contact 
          your local carrier.
        </p>
        <p>
          Shipping times are estimates only and may vary based on carrier delays, customs 
          processing, and other factors outside our control.
        </p>
      </ContentSection>

      <ContentSection title="Intellectual Property">
        <p>
          All intellectual property, designs, logos, and brand assets remain the sole 
          property of State of Resonance. Reproduction or use without written permission 
          is prohibited.
        </p>
      </ContentSection>

      <ContentSection title="Contact">
        <p>
          For any questions regarding these terms, contact us at{' '}
          <a href="mailto:support@stateofresonance.ca" className="text-[#c4a077] hover:text-[#fafafa] transition-colors">
            support@stateofresonance.ca
          </a>
        </p>
      </ContentSection>
    </ContentLayout>
  );
}
