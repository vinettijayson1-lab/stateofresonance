import ContentPageLayout from '@/components/layout/ContentPageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for State of Resonance. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://stateofresonance.ca/privacy' },
};

export default function PrivacyPage() {
  return (
    <ContentPageLayout 
      title="Privacy Policy" 
      subtitle="Your privacy is important to us. This policy explains how we handle your information."
      lastUpdated="January 2025"
    >
      <h2>1. Information We Collect</h2>
      <p>
        When you make a purchase or interact with our website, we may collect the following information:
      </p>
      <ul>
        <li>Name and contact information (email, phone, shipping address)</li>
        <li>Payment information (processed securely through Shopify)</li>
        <li>Order history and preferences</li>
        <li>Device and browser information for analytics purposes</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use the information we collect to:
      </p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Send order confirmations and shipping updates</li>
        <li>Respond to customer service inquiries</li>
        <li>Send promotional emails (with your consent)</li>
        <li>Improve our website and customer experience</li>
        <li>Prevent fraud and maintain security</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>
        We do not sell your personal information. We may share your information with:
      </p>
      <ul>
        <li>Shopify (our e-commerce platform)</li>
        <li>Shipping carriers to deliver your orders</li>
        <li>Payment processors for secure transactions</li>
        <li>Analytics providers to improve our services</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your personal information. 
        All payment information is encrypted and processed through secure channels. We do not 
        store your complete payment card information on our servers.
      </p>

      <h2>5. Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies to enhance your browsing experience, remember 
        your preferences, and collect analytics data. We use Google Analytics 4, Meta Pixel, 
        and Microsoft Clarity to understand site usage patterns. You can control cookie 
        preferences through your browser settings.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to:
      </p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your personal information</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <h2>7. Email Communications</h2>
      <p>
        We use Klaviyo to manage email marketing. If you subscribe to our newsletter, you will 
        receive occasional emails about new products, promotions, and updates. You can 
        unsubscribe at any time by clicking the unsubscribe link in any email.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Changes will be posted on this page 
        with an updated revision date.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have questions about this privacy policy or your personal information, please 
        contact us at support@stateofresonance.ca.
      </p>
    </ContentPageLayout>
  );
}
