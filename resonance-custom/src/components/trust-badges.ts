
export function initTrustBadges() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  
  let container = footer.querySelector('.container');
  if (!container) {
    // If no container, just use the footer itself
    container = footer;
  }

  const badges = document.createElement('div');
  badges.className = 'trust-badges';
  badges.innerHTML = `
    <div class="badge-label">Secured & Encrypted Payments</div>
    <div class="badge-icons">
      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.svg" alt="Visa" />
      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/mastercard.svg" alt="Mastercard" />
      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/amex.svg" alt="Amex" />
      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/apple-pay.svg" alt="Apple Pay" />
      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/google-pay.svg" alt="Google Pay" />
    </div>
  `;
  
  const footerText = container.querySelector('p');
  if (footerText) {
    container.insertBefore(badges, footerText);
  } else {
    container.appendChild(badges);
  }
}
