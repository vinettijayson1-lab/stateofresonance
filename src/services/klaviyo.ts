/**
 * Klaviyo Marketing Intelligence Service (Omniscience Protocol)
 * 
 * Unified tracking for all esoteric interactions across the State of Resonance.
 * Ensures high-vibration data synchronization for "Orion" marketing automation.
 */

export interface KlaviyoProduct {
  Name: string;
  ProductID: string;
  Categories: string[];
  ImageURL: string;
  URL: string;
  Brand: string;
  Price: number | string;
  [key: string]: any;
}

class KlaviyoService {
  private get _learnq() {
    if (typeof window === 'undefined') return null;
    const win = (window as any);
    win._learnq = win._learnq || [];
    return win._learnq;
  }

  private get klaviyo() {
    if (typeof window === 'undefined') return null;
    return (window as any).klaviyo;
  }

  /**
   * Identifies the seeker in the Klaviyo field.
   */
  identify(email: string, properties: Record<string, any> = {}) {
    if (!this._learnq) return;

    // Identify via onsite API
    if (this.klaviyo) {
      this.klaviyo.identify({
        '$email': email,
        ...properties
      });
    }

    // Identify via legacy _learnq push (for redundancy)
    this._learnq.push(['identify', {
      '$email': email,
      ...properties
    }]);
  }

  /**
   * Tracks a Viewed Product event.
   */
  trackViewedProduct(product: KlaviyoProduct) {
    if (!this._learnq) return;

    // Standard Klaviyo 'Viewed Product' event
    this._learnq.push(['track', 'Viewed Product', product]);

    // Enhanced 'trackViewedItem' for onsite personalization
    this._learnq.push(['trackViewedItem', {
      "Title": product.Name,
      "ItemId": product.ProductID,
      "Categories": product.Categories,
      "ImageUrl": product.ImageURL,
      "Url": product.URL,
      "Metadata": {
        "Brand": product.Brand,
        "Price": product.Price
      }
    }]);
  }

  /**
   * Tracks an Added to Cart event.
   */
  trackAddedToCart(product: KlaviyoProduct) {
    if (!this._learnq) return;

    this._learnq.push(['track', 'Added to Cart', {
      ...product,
      // Optional: Add timestamp or cart session ID if needed
      "Timestamp": new Date().toISOString()
    }]);
  }

  /**
   * Tracks a Started Checkout event.
   */
  trackStartedCheckout(data: {
    $value: number;
    Currency: string;
    ItemNames: string[];
    CheckoutURL: string;
    Items: any[];
  }) {
    if (!this._learnq) return;

    this._learnq.push(['track', 'Started Checkout', data]);
  }

  /**
   * Tracks a specialized Frequency Quiz completion event.
   */
  trackCompletedQuiz(results: {
    vibrational_tier: string;
    detected_frequency: string;
    aligned_artifact: string;
    status: string;
  }) {
    if (!this._learnq) return;

    this._learnq.push(['track', 'Completed Frequency Quiz', results]);
  }

  /**
   * Tracks a seeker's rank ascension (Tier change).
   */
  trackTierAscension(newTier: string, points: number) {
    if (!this._learnq) return;

    this._learnq.push(['track', 'Tier Ascension', {
      "NewTier": newTier,
      "ResonancePoints": points,
      "AscensionDate": new Date().toISOString()
    }]);
    
    // Also identify the profile with the new tier immediately
    this.identify('', { 'vibrational_tier': newTier });
  }

  /**
   * Tracks viral referral milestones (e.g., "First Resonance Sync", "Circle Catalyst").
   */
  trackReferralMilestone(milestoneName: string, count: number) {
    if (!this._learnq) return;

    this._learnq.push(['track', 'Referral Milestone', {
      "Milestone": milestoneName,
      "ReferralCount": count,
      "Timestamp": new Date().toISOString()
    }]);
  }

  /**
   * Tracks a high-fidelity Cart Sync for periodic reservoir calibration.
   */
  trackCartSync(data: {
    CartID: string;
    Items: any[];
    TotalValue: number;
    Currency: string;
  }) {
    if (!this._learnq) return;

    this._learnq.push(['track', 'Cart Sync', {
      ...data,
      "Timestamp": new Date().toISOString()
    }]);
  }

  /**
   * Synchronizes viral referral metadata to the seeker's profile.
   */
  syncReferralMetadata(referralId: string, referralCount: number) {
    if (!this._learnq) return;

    this.identify('', {
      'referral_id': referralId,
      'referral_count': referralCount
    });
  }

  /**
   * Subscribes a seeker to SMS transmissions with mandatory consent.
   * This is required for carrier compliance (Toll-Free verification).
   */
  async subscribeToSms(email: string, phone: string) {
    if (!this.klaviyo) return;

    // Standard Klaviyo onsite subscription protocol
    this.klaviyo.push(['track', 'Subscribed to SMS', {
      '$email': email,
      '$phone_number': phone,
      'sms_consent': true,
      'timestamp': new Date().toISOString(),
      'source': 'Home Page - Join the Sanctuary'
    }]);

    // Also identify the profile with the phone number
    this.identify(email, { '$phone_number': phone });
  }

  /**
   * Tracks a general ritual/event synchronization.
   */
  trackEvent(eventName: string, properties: Record<string, any> = {}) {
    if (!this._learnq) return;
    this._learnq.push(['track', eventName, properties]);
  }
}

export const klaviyoService = new KlaviyoService();
