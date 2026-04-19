'use client';

/**
 * E-commerce event tracking — fires to Meta Pixel + GA4 simultaneously.
 * All tokens are injected via the Analytics component; this module just calls the globals.
 */

type ProductData = {
  id: string;
  title: string;
  price: string;
  category?: string;
};

const win = () => window as unknown as Record<string, unknown>;
const hasFbq = () => typeof window !== 'undefined' && typeof win().fbq === 'function';
const hasGtag = () => typeof window !== 'undefined' && typeof win().gtag === 'function';
const fbq = () => win().fbq as (...a: unknown[]) => void;
const gtag = () => win().gtag as (...a: unknown[]) => void;
const price = (p: string) => parseFloat(p.replace(/[^0-9.]/g, '')) || 0;

export function trackViewContent(product: ProductData) {
  const v = price(product.price);
  if (hasFbq()) fbq()('track', 'ViewContent', { content_name: product.title, content_ids: [product.id], content_type: 'product', value: v, currency: 'CAD' });
  if (hasGtag()) gtag()('event', 'view_item', { currency: 'CAD', value: v, items: [{ item_id: product.id, item_name: product.title, item_category: product.category || 'Streetwear', price: v }] });
}

export function trackAddToCart(product: ProductData, quantity = 1) {
  const v = price(product.price) * quantity;
  if (hasFbq()) fbq()('track', 'AddToCart', { content_name: product.title, content_ids: [product.id], content_type: 'product', value: v, currency: 'CAD' });
  if (hasGtag()) gtag()('event', 'add_to_cart', { currency: 'CAD', value: v, items: [{ item_id: product.id, item_name: product.title, price: price(product.price), quantity }] });
}

export function trackInitiateCheckout(items: ProductData[]) {
  const v = items.reduce((s, p) => s + price(p.price), 0);
  if (hasFbq()) fbq()('track', 'InitiateCheckout', { content_ids: items.map(p => p.id), num_items: items.length, value: v, currency: 'CAD' });
  if (hasGtag()) gtag()('event', 'begin_checkout', { currency: 'CAD', value: v, items: items.map(p => ({ item_id: p.id, item_name: p.title, price: price(p.price) })) });
}
