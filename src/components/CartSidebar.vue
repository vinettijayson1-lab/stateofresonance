<script setup lang="ts">
import { cart } from '../store/cart'
import gsap from 'gsap'
import { watch, computed } from 'vue'
import TrustPulse from './TrustPulse.vue'
import { ShieldCheck, Lock, CreditCard, ShoppingCart } from 'lucide-vue-next'
import { currencyStore } from '../store/currency'

const getFrequency = (price: string) => {
  const val = parseFloat(price.replace(/[^0-9.]/g, ''))
  if (val >= 90) return '963 Hz'
  if (val >= 50) return '528 Hz'
  if (val >= 35) return '432 Hz'
  return '396 Hz'
}

const potentialAddons = [
  {
    id: 'gid://shopify/ProductVariant/44477839634720',
    title: '9 Herbs Poster',
    price: '$2.83',
    image: 'https://www.azuregreen.net/images/EP9HE.JPG',
    handle: 'ep9he-9-herbs-poster'
  },
  {
    id: 'gid://shopify/ProductVariant/44477839667488',
    title: 'Rosemary Ritual Oil',
    price: '$8.50',
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/ritual-oil.jpg?v=1772136626',
    handle: 'rosemary-ritual-oil'
  },
  {
    id: 'gid://shopify/ProductVariant/44477839700256',
    title: 'Amethyst Cluster',
    price: '$12.00',
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/amethyst.jpg?v=1772136626',
    handle: 'amethyst-cluster'
  }
]

const suggestedAddon = computed(() => {
  return potentialAddons.find(addon => !cart.items.some(item => item.handle === addon.handle)) || potentialAddons[0]
})

const isAddonInCart = computed(() => {
  return cart.items.length > 0 && cart.items.every(item => potentialAddons.some(addon => addon.handle === item.handle)) && potentialAddons.every(addon => cart.items.some(item => item.handle === addon.handle))
})

// Simpler check: are all potential addons in the cart?
const allAddonsInCart = computed(() => {
  return potentialAddons.every(addon => cart.items.some(item => item.handle === addon.handle))
})

const addSuggested = () => {
  const addon = suggestedAddon.value
  if (addon) {
    cart.add({
      id: addon.id,
      title: addon.title,
      price: addon.price,
      image: addon.image,
      handle: addon.handle,
      quantity: 1
    })
  }
}

const closeCart = () => cart.isOpen = false

const trackCheckout = () => {
  const priceVal = cart.total
  const currency = currencyStore.active
  const eventId = 'chk_' + Math.random().toString(36).substring(2, 16)
  
  const getRawId = (id: string | null | undefined) => {
    if (!id) return '';
    return id.includes('gid://') ? (id.split('/').pop() || id) : id;
  }

  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      value: priceVal * (currencyStore.rates[currency] || 1),
      currency: currency,
      content_ids: cart.items.map(i => getRawId(i.variantId || i.id)),
      num_items: cart.items.reduce((s, i) => s + i.quantity, 0),
      contents: cart.items.map(i => ({
        id: getRawId(i.variantId || i.id),
        quantity: i.quantity
      }))
    }, { eventID: eventId })
  }

  // TikTok Pixel
  if ((window as any).ttq) {
    (window as any).ttq.track('InitiateCheckout', {
      contents: cart.items.map(i => ({
        content_id: getRawId(i.variantId || i.id),
        content_name: i.title,
        quantity: i.quantity,
        price: parseFloat(i.price.replace(/[^0-9.]/g, '')) * (currencyStore.rates[currency] || 1)
      })),
      value: priceVal * (currencyStore.rates[currency] || 1),
      currency: currency,
      event_id: eventId
    });
  }

  // GA4
  if ((window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      currency: currency,
      value: priceVal * (currencyStore.rates[currency] || 1),
      items: cart.items.map(i => ({
        item_id: getRawId(i.variantId || i.id),
        item_name: i.title,
        price: parseFloat(i.price.replace(/[^0-9.]/g, '')) * (currencyStore.rates[currency] || 1),
        quantity: i.quantity
      }))
    });
  }

  // Klaviyo
  if (window._learnq) {
    window._learnq.push(['track', 'Started Checkout', {
      "$value": priceVal,
      "ItemNames": cart.items.map(i => i.title),
      "CheckoutURL": cart.checkoutUrl,
      "Items": cart.items.map(i => ({
        "ProductID": i.id,
        "SKU": i.id,
        "ProductName": i.title,
        "Quantity": i.quantity,
        "ItemPrice": parseFloat(i.price.replace(/[^0-9.]/g, '')),
        "RowTotal": parseFloat(i.price.replace(/[^0-9.]/g, '')) * i.quantity,
        "ImageURL": i.image,
        "ProductURL": window.location.origin + '/product/' + i.handle
      }))
    }]);
  }

  // Server-Side CAPI Sync
  try {
    fetch('/api/marketing/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'InitiateCheckout',
        eventId: eventId,
        eventSourceUrl: window.location.href,
        user: { email: localStorage.getItem('sor_seeker_email') || undefined },
        customData: {
          currency: currency,
          value: priceVal * (currencyStore.rates[currency] || 1),
          contents: cart.items.map(i => ({
            id: getRawId(i.variantId || i.id),
            name: i.title,
            quantity: i.quantity,
            price: parseFloat(i.price.replace(/[^0-9.]/g, '')) * (currencyStore.rates[currency] || 1)
          }))
        }
      })
    })
  } catch (e) {
    console.error('CAPI Intercept Failed')
  }
}

watch(() => cart.isOpen, (val) => {
  if (val) {
    gsap.to('.cart-overlay', { opacity: 1, display: 'block', duration: 0.3 })
    gsap.to('.cart-panel', { x: 0, duration: 0.6, ease: 'expo.out' })
  } else {
    gsap.to('.cart-overlay', { opacity: 0, display: 'none', duration: 0.3 })
    gsap.to('.cart-panel', { x: '100%', duration: 0.6, ease: 'expo.in' })
  }
})
</script>

<template>
  <div class="cart-system">
    <div class="cart-overlay" @click="closeCart"></div>
    <div class="cart-panel glass">
      <div class="cart-layout-pines">
        <!-- Visual Resonance Side (Desktop) -->
        <div class="reservoir-visual-side">
          <img src="/images/reservoir_split.png" alt="Reservoir Vibe" class="vibe-side-img" />
          <div class="vibe-side-overlay"></div>
          <div class="collection-float-text">GHOST & BONES</div>
          <div class="singularity-point"></div>
        </div>

        <!-- Content Side -->
        <div class="reservoir-content-side custom-scroll">
          <header class="cart-header">
            <div>
              <h2 class="cart-title" style="display: flex; align-items: center; gap: 1rem;">
                <ShoppingCart :size="32" class="gold-text" />
                <span v-html="$t('cart.title').replace('\n', '<br/>')"></span>
              </h2>
            </div>
            <button @click="closeCart" class="close-btn">✕</button>
          </header>

          <p v-if="cart.items.length > 0" class="meta-vibe" style="margin-top:0.25rem; opacity:0.5; display: block;">
            {{ $t('cart.resonance_level', { n: cart.items.reduce((s, i) => s + i.quantity, 0), count: cart.items.length }) }}
          </p>
          <p v-if="cart.items.length > 0" class="meta-vibe" style="font-size: 0.55rem; color: var(--color-gold-muted);">
            {{ $t('cart.alignment_calibrated') }}
          </p>

      <!-- Free Shipping Bar (Subtle) -->
      <div class="shipping-portal">
        <div class="shipping-info">
          <span v-if="cart.total < 110" class="meta-vibe" v-html="$t('cart.shipping.threshold', { amount: `<span class='gold-text'>$${(110 - cart.total).toFixed(2)}</span>` })">
          </span>
          <span v-else class="gold-text status-vibe">{{ $t('cart.shipping.unlocked') }}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: cart.shippingProgress + '%' }"></div>
        </div>
      </div>

      <!-- Alignment Discount Bar -->
      <div class="shipping-portal" style="margin-top: -1.5rem; margin-bottom: 2rem;">
        <div class="shipping-info">
          <span class="meta-vibe gold-text" style="font-size: 0.55rem; letter-spacing: 0.3em;">
            {{ cart.syncMessage }}
          </span>
        </div>
        <div class="progress-track" style="height: 2px;">
          <div class="progress-fill" :style="{ width: cart.nextTierProgress + '%', background: 'var(--color-gold-muted)' }"></div>
        </div>
      </div>

      <div class="cart-items custom-scroll">
        <div v-if="cart.items.length === 0" class="empty-reservoir">
          <p>{{ $t('cart.empty') }}</p>
        </div>
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="item-img-container">
            <img :src="item.image" :alt="item.title" class="cart-item-img" />
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">{{ item.title }}</h4>
            <p class="cart-item-price">{{ item.price }}</p>
            <div class="item-actions">
              <div class="quantity-controls">
                <button @click="cart.updateQuantity(item.id, -1, item.variantId)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="cart.updateQuantity(item.id, 1, item.variantId)">+</button>
              </div>
              <button @click="cart.remove(item.id, item.variantId)" class="remove-btn">{{ $t('cart.release') }}</button>
            </div>
          </div>
        </div>

        <!-- Ritual Add-on Suggestion -->
        <div v-if="cart.items.length > 0 && !allAddonsInCart" class="addon-suggestion glass">
          <div class="addon-header">
            <span class="meta-vibe">{{ $t('cart.complete_ritual') }}</span>
          </div>
          <div class="addon-body">
            <img :src="suggestedAddon.image" :alt="suggestedAddon.title" class="addon-img" />
            <div class="addon-info">
              <span class="addon-name">{{ suggestedAddon.title }}</span>
              <span class="addon-price">{{ suggestedAddon.price }}</span>
            </div>
            <button @click="addSuggested" class="addon-add-btn">{{ $t('cart.add') }}</button>
          </div>
        </div>
        
        <TrustPulse />
      </div>

      <footer v-if="cart.items.length > 0" class="cart-footer sticky-footer">

        <div class="billing-details">
          <div class="total-row">
            <span class="meta-vibe">{{ $t('cart.subtotal') }}</span>
            <span>{{ currencyStore.formatPrice(cart.total) }}</span>
          </div>
          <div v-if="cart.savings > 0" class="total-row gold-text">
            <span class="meta-vibe">{{ cart.discountTier.code && cart.discountTier.code.startsWith('MEMBER_') ? $t('membership.member_price') : $t('cart.alignment_reward', { n: cart.discountTier.percent }) }}</span>
            <span>-{{ currencyStore.formatPrice(cart.savings) }}</span>
          </div>
          
          <!-- Province Selector & Tax -->
          <div class="tax-alignment">
            <div class="tax-selector-row">
              <span class="meta-vibe">{{ $t('cart.region_alignment') }}</span>
              <select v-model="cart.selectedProvince" class="province-select">
                <option value="International">International (Tax Included)</option>
                <optgroup label="Canada">
                  <option value="ON">Ontario (13% HST)</option>
                  <option value="QC">Quebec (14.975% GST/QST)</option>
                  <option value="BC">British Columbia (12% GST/PST)</option>
                  <option value="AB">Alberta (5% GST)</option>
                  <option value="MB">Manitoba (12% GST/RST)</option>
                  <option value="SK">Saskatchewan (11% GST/PST)</option>
                  <option value="NB">New Brunswick (15% HST)</option>
                  <option value="NS">Nova Scotia (15% HST)</option>
                  <option value="NL">Newfoundland (15% HST)</option>
                  <option value="PE">PEI (15% HST)</option>
                  <option value="YT">Yukon (5% GST)</option>
                  <option value="NT">NWT (5% GST)</option>
                  <option value="NU">Nunavut (5% GST)</option>
                </optgroup>
              </select>
            </div>
            <div class="total-row tax-info">
              <span v-if="cart.selectedProvince === 'International'" class="meta-vibe gold-text">{{ $t('cart.tax_included') }}</span>
              <template v-else>
                <span class="meta-vibe">{{ $t('cart.estimated_tax', { rate: (cart.taxRate * 100).toFixed(1) }) }}</span>
                <span>${{ cart.taxAmount.toFixed(2) }}</span>
              </template>
            </div>
          </div>
        </div>
        
        <div class="checkout-trust glass">
          <div class="checkout-trust-badge">
            <Lock :size="12" />
            <span>{{ $t('cart.secure_checkout') }}</span>
          </div>
          <div class="checkout-trust-badge">
            <ShieldCheck :size="12" />
            <span>{{ $t('cart.aligned_by_resonance') }}</span>
          </div>
          <div class="checkout-trust-badge">
            <CreditCard :size="12" />
            <span>{{ $t('cart.encrypted_payments') }}</span>
          </div>
        </div>

        <p style="font-size: 0.55rem; letter-spacing: 0.1em; text-align: center; color: rgba(255,255,255,0.3); margin-bottom: 1rem;">Have a discount code? Enter it at checkout →</p>
        <a :href="cart.checkoutUrl" class="btn-premium checkout-btn" @click="trackCheckout">{{ $t('cart.initiate_alignment') }}</a>
      </footer>
    </div><!-- End reservoir-content-side -->
  </div><!-- End cart-layout-pines -->
</div> <!-- End cart-panel -->
</div> <!-- End cart-system -->
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: none;
  opacity: 0;
}

.cart-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 960px; /* Slightly wider for better editorial balance */
  height: 100dvh; /* Mobile Safari Fix */
  background: var(--color-obsidian);
  z-index: 1001;
  color: #fff;
  transform: translateX(100%);
  display: flex;
  flex-direction: column;
  padding: 0; /* Removing padding to allow full-bleed split */
  overflow: hidden;
}

.cart-layout-pines {
  display: flex;
  width: 100%;
  height: 100%;
}

.reservoir-visual-side {
  flex: 1;
  position: relative;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255,255,255,0.05);
}

.reservoir-content-side {
  width: 100%;
  height: 100%;
  padding: 4rem;
  padding-bottom: calc(4rem + env(safe-area-inset-bottom)); /* iOS Notch Fix */
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden; /* Control scroll at item container level */
}

.vibe-side-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.vibe-side-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(70deg, rgba(0,0,0,0.6), transparent);
}

.singularity-point {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4);
  z-index: 5;
  top: 50%;
  right: -7px; /* Positioned on the split line */
  transform: translateY(-50%);
  animation: pulse-singularity 4s infinite ease-in-out;
}

.collection-float-text {
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-heading);
  font-size: 8rem;
  color: #fff;
  opacity: 1;
  letter-spacing: 0.1em;
  pointer-events: none;
  z-index: 2;
  white-space: nowrap;
  font-weight: 800;
  mix-blend-mode: overlay;
}

@keyframes pulse-singularity {
  0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.8; }
  50% { transform: translateY(-50%) scale(1.3); opacity: 1; }
}

.cart-header {
  margin-bottom: 4rem;
}

.cart-title {
  font-size: 3.5rem;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  font-family: var(--font-heading);
  line-height: 0.9;
  font-weight: 800;
}

.close-btn {
  background: none;
  border: none;
  color: #fff; /* Force white to resolve blue chromatic aberration */
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  z-index: 100;
}

.close-btn:hover {
  transform: rotate(90deg);
  color: var(--color-gold);
}

.shipping-portal {
  margin-bottom: 3rem;
}

.meta-vibe {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.6;
}

.status-vibe {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.progress-track {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin-top: 1rem;
}

.progress-fill {
  height: 100%;
  background: var(--color-gold);
  box-shadow: 0 0 15px var(--color-gold-muted);
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  margin-right: -1rem;
  padding-right: 1rem;
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: center;
}

.item-img-container {
  width: 90px;
  height: 90px;
  background: var(--color-onyx);
  border: 1px solid rgba(212, 175, 55, 0.2);
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.cart-item:hover .item-img-container {
  border-color: var(--color-gold);
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.15);
}

.cart-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  filter: brightness(0.9);
}

.cart-item:hover .cart-item-img {
  transform: scale(1.1);
  filter: brightness(1.1);
}

.cart-item-title {
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  font-family: var(--font-body);
  font-weight: 500;
}

.cart-item-price {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-bottom: 1rem;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
}

.quantity-controls button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.3;
}

.quantity-controls button:hover { opacity: 1; }

.remove-btn {
  background: none;
  border: none;
  color: white;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
  cursor: pointer;
}

.remove-btn:hover { opacity: 0.8; }

.cart-footer {
  margin-top: auto;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 2rem;
  background: var(--color-obsidian);
  z-index: 10;
}

.sticky-footer {
  position: sticky;
  bottom: 0;
  background: var(--color-obsidian);
  padding-bottom: 1rem;
}

.resonance-breakdown {
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(212, 175, 55, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.1);
}

.breakdown-title {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1rem;
  text-align: center;
}

.freq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.freq-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  opacity: 0.7;
}

.billing-details {
  margin-bottom: 2rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.total-row.gold-text {
  color: var(--color-gold-muted);
}

.total-price {
  font-size: 1.25rem;
  font-family: var(--font-heading);
}

.tax-alignment {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}

.tax-selector-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.province-select {
  background: #000;
  color: #fff;
  border: 1px solid var(--color-gold-muted);
  font-size: 0.65rem;
  padding: 0.4rem;
  cursor: pointer;
  outline: none;
}

.tax-info {
  opacity: 0.6;
  font-size: 0.55rem;
  margin-bottom: 0;
}

.checkout-btn {
  width: 100%;
  text-align: center;
  padding: 1.25rem;
  font-size: 0.9rem;
  background: var(--color-gold);
  color: var(--color-obsidian);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.checkout-trust {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px dashed rgba(212, 175, 55, 0.2);
  background: rgba(212, 175, 55, 0.02);
}

.checkout-trust-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  opacity: 0.7;
  color: var(--color-gold-muted);
}

.empty-reservoir {
  text-align: center;
  padding: 5vh 0;
  opacity: 0.4;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.addon-suggestion {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px dashed rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.02);
}

.addon-header {
  margin-bottom: 0.75rem;
}

.addon-body {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.addon-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,0.05);
}

.addon-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.addon-name {
  font-size: 0.7rem;
  font-weight: 500;
}

.addon-price {
  font-size: 0.6rem;
  opacity: 0.5;
}

.addon-add-btn {
  background: none;
  border: 1px solid var(--color-gold-muted);
  color: var(--color-gold-muted);
  padding: 0.4rem 0.8rem;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.addon-add-btn:hover {
  background: var(--color-gold-muted);
  color: var(--color-obsidian);
}

.custom-scroll::-webkit-scrollbar { width: 2px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--glass-border); }

@media (max-width: 880px) {
  .cart-panel { width: 100%; }
  .reservoir-visual-side { display: none; }
  .cart-layout-pines { flex-direction: column; }
}

@media (max-width: 480px) {
  .cart-title { font-size: 1.8rem; }
  .reservoir-content-side { padding: 1.5rem 1rem; }
}
</style>
