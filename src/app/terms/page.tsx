import ContentPageLayout from '@/components/layout/ContentPageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for State of Resonance. Read our policies regarding purchases, returns, and use of our website.',
  alternates: { canonical: 'https://stateofresonance.ca/terms' },
};

export default function TermsPage() {
  return (
    <ContentPageLayout 
      title="Terms of Service" 
      subtitle="Please read these terms carefully before using our services."
      lastUpdated="January 2025"
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using stateofresonance.ca, you accept and agree to be bound by the terms 
        and provisions of this agreement. If you do not agree to abide by these terms, please do 
        not use this website.
      </p>

      <h2>2. Products and Pricing</h2>
      <p>
        All products are sold as-is. Prices are listed in Canadian dollars (CAD) unless otherwise 
        specified. We reserve the right to modify prices at any time without prior notice. We also 
        reserve the right to limit quantities on any order.
      </p>

      <h2>3. Payment</h2>
      <p>
        We accept all major credit cards, Shop Pay, Apple Pay, Google Pay, and PayPal through our 
        secure Shopify checkout. All transactions are processed securely and your payment information 
        is never stored on our servers.
      </p>

      <h2>4. Shipping</h2>
      <p>
        Orders are typically processed within 3-5 business days. Shipping times vary based on 
        destination. We are not responsible for delays caused by customs, weather, or carrier issues. 
        Once a package is marked as delivered by the carrier, we are not responsible for lost or 
        stolen packages.
      </p>

      <h2>5. Returns and Exchanges</h2>
      <p>
        We offer a 14-day return window for unworn items with original tags attached. Items marked 
        as final sale are non-returnable. To initiate a return, please contact us at 
        support@stateofresonance.ca with your order number.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All designs, logos, brand assets, and intellectual property displayed on this website are 
        the sole property of State of Resonance. Unauthorized reproduction, distribution, or use 
        of our intellectual property is strictly prohibited.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        State of Resonance shall not be liable for any indirect, incidental, special, consequential, 
        or punitive damages arising from your use of our products or services.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        We reserve the right to update these terms at any time. Changes will be posted on this page 
        with an updated revision date. Continued use of the website after changes constitutes 
        acceptance of the new terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions regarding these terms, please contact us at support@stateofresonance.ca.
      </p>
    </ContentPageLayout>
  );
}
