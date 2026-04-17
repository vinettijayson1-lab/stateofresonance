<script setup lang="ts">
import { onMounted } from 'vue'
import { cart } from '../store/cart'
import { currencyStore } from '../store/currency'
import { klaviyoService } from '../services/klaviyo'


onMounted(() => {
  // --- KLAVIYO TRACKING (Orion) ---
  if (cart.items.length > 0) {
    klaviyoService.trackStartedCheckout({
      "$value": cart.subtotal * (currencyStore.rates[currencyStore.active] || 1),
      "Currency": currencyStore.active,
      "ItemNames": cart.items.map(item => item.title),
      "CheckoutURL": cart.checkoutUrl,
      "Items": cart.items.map(item => ({
        "ProductID": item.id,
        "SKU": item.variantId || item.id,
        "ProductName": item.title,
        "Quantity": item.quantity,
        "ItemPrice": item.priceValue * (currencyStore.rates[currencyStore.active] || 1),
        "RowTotal": item.priceValue * item.quantity * (currencyStore.rates[currencyStore.active] || 1),
        "ImageURL": item.image,
        "ProductURL": `${window.location.origin}/sanctuary/${item.handle}`
      }))
    });
    
    // --- LOCAL ABANDONED RESERVOIR SYNC ---
    cart.syncToAbandonedReservoir();
  }
})
</script>

<template>
  <div class="checkout-view">
    <!-- Clean, Pitch-Black Authentic Esoteric Background -->
    <div class="alchemy-bg-svg">
      <svg viewBox="0 0 100 100" fill="none" stroke="var(--color-gold-muted)" stroke-width="0.3" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="20"/>
        <circle cx="50" cy="30" r="20"/>
        <circle cx="32.68" cy="40" r="20"/>
        <circle cx="32.68" cy="60" r="20"/>
        <circle cx="50" cy="70" r="20"/>
        <circle cx="67.32" cy="60" r="20"/>
        <circle cx="67.32" cy="40" r="20"/>
      </svg>
    </div>
    
    <div class="container section-top" style="padding: 12vh 0 8vh 0; position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center;">
      <div class="checkout-container">
        
        <div style="text-align: center; margin-bottom: 4rem;">
          <p class="section-eyebrow">{{ $t('checkout.initiation_sequence') }}</p>
          <h1 class="hero-title" style="font-size: 2.5rem; margin-bottom: 0;">{{ $t('checkout.crossing_title') }}</h1>
        </div>
        
        <div class="order-summary">
          <h3 class="product-meta" style="margin-bottom: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; text-align: center;">{{ $t('checkout.artifact_summary') }}</h3>
          
          <div v-if="cart.items.length === 0" style="text-align: center; opacity: 0.3; padding: 4rem 0; font-family: var(--font-heading); font-size: 1.2rem;">
            {{ $t('checkout.empty_threshold') }}
          </div>
          
          <div v-for="item in cart.items" :key="item.id" class="summary-item">
            <div class="item-img-container">
              <img :src="item.image" :alt="item.title" class="cart-item-img" />
            </div>
            <div class="item-details">
              <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                <span class="item-title">{{ item.title }}</span>
                <span class="item-qty gold-text">x{{ item.quantity }}</span>
              </div>
              <span class="item-price">{{ currencyStore.formatPrice(item.priceValue * item.quantity) }}</span>
            </div>
          </div>
          
          <!-- Summary Totals -->
          <div class="summary-total" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2.5rem; margin-top: 2rem;">
            <div style="width: 100%;">
              <div class="total-row">
                <span class="meta-vibe">{{ $t('cart.frequency_total') }}</span>
                <span class="price-val">{{ currencyStore.formatPrice(cart.total) }}</span>
              </div>
              <div v-if="cart.savings > 0" class="total-row" style="color: var(--color-gold-muted);">
                <span class="meta-vibe">{{ $t('cart.alignment_reward', { n: cart.discountTier.percent }) }}</span>
                <span class="price-val">-{{ currencyStore.formatPrice(cart.savings) }}</span>
              </div>
              <div class="total-row" style="margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem;">
                <span class="meta-vibe" style="opacity: 1; font-weight: 500; letter-spacing: 0.4em;">{{ $t('checkout.final_calibration') }}</span>
                <span class="gold-text total-price">{{ currencyStore.formatPrice(cart.subtotal) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 4rem; text-align: center;">
          <a :href="cart.checkoutUrl" class="btn-premium checkout-btn interactive">{{ $t('checkout.cross_threshold') }}</a>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-view {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #000000;
}

.alchemy-bg-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120vw;
  height: 120vh;
  transform: translate(-50%, -50%);
  opacity: 0.03;
  pointer-events: none;
  animation: sacred-rotate 240s linear infinite;
  z-index: 1;
}

@keyframes sacred-rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.checkout-container {
  max-width: 550px;
  width: 100%;
  margin: 0 auto;
}

.section-eyebrow {
  font-size: 0.55rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.6;
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.item-img-container {
  width: 60px;
  height: 60px;
  background: var(--color-onyx);
  border: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}

.cart-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: luminosity;
  opacity: 0.8;
}

.item-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-size: 0.85rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.item-qty {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.item-price {
  font-size: 0.85rem;
  font-family: var(--font-mono);
  opacity: 0.5;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  align-items: center;
}

.price-val {
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.meta-vibe {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  opacity: 0.5;
}

.total-price {
  font-size: 1.4rem;
  font-family: var(--font-heading);
}

.checkout-btn {
  width: 100%;
  display: block;
  text-decoration: none;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  padding: 1.2rem;
  background: var(--color-gold);
  color: #000;
}

@media (max-width: 768px) {
  .checkout-container { padding: 0 2rem; }
  .item-title { font-size: 0.75rem; }
}
</style>
