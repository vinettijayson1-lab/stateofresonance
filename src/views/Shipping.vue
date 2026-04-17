<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Shipping & Returns | State of Resonance'
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.setAttribute('content', 'State of Resonance shipping information: free shipping on orders over $110 CAD, ships from Canada within 1–3 business days, 30-day no-questions-asked returns.')
})
</script>

<template>
  <div class="shipping-page container" style="padding: 18vh 0 12vh; max-width: 800px; margin: 0 auto;">

    <!-- Hero -->
    <div style="text-align: center; margin-bottom: 6rem;">
      <p style="font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--color-gold-muted); margin-bottom: 1.5rem;">POLICIES</p>
      <h1 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; margin-bottom: 1.5rem;">
        Shipping &amp; <span style="color: var(--color-gold);">Returns</span>
      </h1>
      <p style="font-size: 1rem; color: rgba(255,255,255,0.55); line-height: 1.7; max-width: 520px; margin: 0 auto;">
        We ship fast, pack carefully, and stand behind every piece we send out.
      </p>
    </div>

    <!-- Shipping Info -->
    <div class="policy-section glass" style="padding: 3rem; margin-bottom: 2rem; border: 1px solid rgba(212,175,55,0.15);">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <span style="font-size: 1.5rem;">🚚</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #fff; margin: 0;">Shipping</h2>
      </div>

      <div class="policy-grid">
        <div class="policy-item">
          <p class="policy-label">Processing Time</p>
          <p class="policy-value">1–3 business days</p>
          <p class="policy-note">Orders are processed Monday–Friday, excluding Canadian holidays.</p>
        </div>
        <div class="policy-item">
          <p class="policy-label">Ships From</p>
          <p class="policy-value">Québec, Canada</p>
          <p class="policy-note">All orders are fulfilled through our Printful partnership and ship from the nearest facility.</p>
        </div>
        <div class="policy-item">
          <p class="policy-label">Free Shipping</p>
          <p class="policy-value gold-text">Orders over $110 CAD</p>
          <p class="policy-note">Free standard shipping automatically applied at checkout when your order meets the threshold.</p>
        </div>
        <div class="policy-item">
          <p class="policy-label">Standard Delivery</p>
          <p class="policy-value">5–10 business days</p>
          <p class="policy-note">Canada & USA. International orders may take 10–20 business days depending on destination and customs.</p>
        </div>
      </div>

      <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.06);">
        <p style="font-size: 0.8rem; line-height: 1.7; color: rgba(255,255,255,0.55);">
          ✦ A tracking number will be emailed to you as soon as your order ships.<br/>
          ✦ International orders may be subject to customs duties and taxes — these are the buyer's responsibility.<br/>
          ✦ Orders cannot be modified or cancelled after processing begins.
        </p>
      </div>
    </div>

    <!-- Returns Info -->
    <div class="policy-section glass" style="padding: 3rem; margin-bottom: 2rem; border: 1px solid rgba(212,175,55,0.15);">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <span style="font-size: 1.5rem;">↩️</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #fff; margin: 0;">Returns &amp; Exchanges</h2>
      </div>

      <div class="policy-grid">
        <div class="policy-item">
          <p class="policy-label">Return Window</p>
          <p class="policy-value">30 days</p>
          <p class="policy-note">Return any unworn, unwashed item in original condition within 30 days of delivery — no questions asked.</p>
        </div>
        <div class="policy-item">
          <p class="policy-label">Condition</p>
          <p class="policy-value">Unworn &amp; original packaging</p>
          <p class="policy-note">Items must be free of wear, washing, and odour. Tags must be attached.</p>
        </div>
        <div class="policy-item">
          <p class="policy-label">Refund Method</p>
          <p class="policy-value">Original payment method</p>
          <p class="policy-note">Refunds are processed within 5–7 business days of receiving your return.</p>
        </div>
        <div class="policy-item">
          <p class="policy-label">Exchanges</p>
          <p class="policy-value">Size exchanges welcome</p>
          <p class="policy-note">Email us and we'll sort a size exchange where stock allows. See our <router-link to="/size-guide" class="gold-text" style="text-decoration: underline;">Size Guide</router-link> before ordering.</p>
        </div>
      </div>

      <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.06);">
        <p style="font-size: 0.8rem; line-height: 1.7; color: rgba(255,255,255,0.55);">
          ✦ To initiate a return, email us at <a href="mailto:support@stateofresonance.ca" class="gold-text" style="text-decoration: underline;">support@stateofresonance.ca</a> with your order number and reason.<br/>
          ✦ Return shipping costs are the buyer's responsibility unless the item arrived defective.<br/>
          ✦ Sale items are final sale and not eligible for return.
        </p>
      </div>
    </div>

    <!-- Defective / Wrong Item -->
    <div class="policy-section glass" style="padding: 2.5rem 3rem; margin-bottom: 4rem; border: 1px solid rgba(255,255,255,0.06);">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
        <span style="font-size: 1.5rem;">🛡️</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #fff; margin: 0;">Defective or Wrong Item?</h2>
      </div>
      <p style="font-size: 0.85rem; line-height: 1.8; color: rgba(255,255,255,0.65);">
        If your order arrived damaged, defective, or incorrect — we will make it right at no cost to you. Email us a photo of the issue within 7 days of delivery and we will send a replacement or issue a full refund.
      </p>
    </div>

    <!-- CTA -->
    <div style="text-align: center;">
      <p style="font-size: 0.7rem; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin-bottom: 2rem; text-transform: uppercase;">Still have questions?</p>
      <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
        <router-link to="/contact" class="btn-gold">Contact Support</router-link>
        <router-link to="/best-sellers" class="btn-outline">Shop the Collection</router-link>
      </div>
    </div>

  </div>
</template>

<style scoped>
.shipping-page {
  min-height: 100dvh;
}

.policy-section {
  border-radius: 2px;
}

.policy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.policy-item {
  padding: 1.5rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
}

.policy-label {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

.policy-value {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: 0.03em;
}

.policy-note {
  font-size: 0.78rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.45);
}

@media (max-width: 640px) {
  .policy-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
