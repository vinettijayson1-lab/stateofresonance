<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cart } from '../store/cart'
import { currencyStore } from '../store/currency'
import { Star, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-vue-next'

interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
  type: string
  description: string
  variantId: string | null
  available: boolean
  variants: any[]
}

const router = useRouter()
const products = ref<Product[]>([])
const loading = ref(true)
const addingId = ref<string | null>(null)

// Size picker state
const pickerProduct = ref<Product | null>(null)
const pickerSelectedSize = ref<string>('')
const showSizePicker = ref(false)

const RANK_LABELS: Record<number, string> = {
  1: 'Best Seller',
  2: 'Top Rated',
  3: 'Fan Favourite',
}

onMounted(async () => {
  try {
    // Fetch all attire products
    const res = await fetch('/api/products?limit=40')
    if (!res.ok) throw new Error('Fetch failed')
    const data: Product[] = await res.json()

    // Identify hoodies/pullovers/crewnecks by title keywords
    const hoodieKeywords = ['hoodie', 'pullover', 'crewneck', 'sweatshirt']
    const isHoodie = (p: Product) =>
      hoodieKeywords.some(kw => (p.title || '').toLowerCase().includes(kw))

    const hoodies = data.filter(isHoodie)
    const others  = data.filter(p => !isHoodie(p))

    // Build ranked list: 5 hoodies first, then 5 other products
    const ordered: Product[] = [
      ...hoodies.slice(0, 5),
      ...others.slice(0, 5)
    ]

    products.value = ordered.slice(0, 10)
  } catch (e) {
    // Fallback: fetch broadly
    try {
      const res = await fetch('/api/products?limit=10')
      if (res.ok) products.value = await res.json()
    } catch {}
  } finally {
    loading.value = false
  }
})

const quickAdd = (product: Product) => {
  // Clothing: must pick a size first
  const hasSizeOption = product.variants && product.variants.length > 1
  const isClothing = ['hoodie', 'tee', 'shirt', 'crewneck', 'sweatshirt'].some(t =>
    product.title.toLowerCase().includes(t)
  )
  if (hasSizeOption && isClothing) {
    pickerProduct.value = product
    pickerSelectedSize.value = product.variants?.find(v => v.available)?.id || ''
    showSizePicker.value = true
    return
  }
  // Non-clothing or single variant: add directly
  addingId.value = product.id
  cart.add({ ...product })
  setTimeout(() => { addingId.value = null }, 1200)
}

const confirmSizePicker = () => {
  if (!pickerProduct.value || !pickerSelectedSize.value) return
  const variant = pickerProduct.value.variants?.find(v => v.id === pickerSelectedSize.value)
  addingId.value = pickerProduct.value.id
  cart.add({
    ...pickerProduct.value,
    variantId: variant?.id || pickerProduct.value.variantId,
    price: variant?.price || pickerProduct.value.price
  })
  showSizePicker.value = false
  pickerProduct.value = null
  setTimeout(() => { addingId.value = null }, 1200)
}

const closePicker = () => {
  showSizePicker.value = false
  pickerProduct.value = null
}

const goToProduct = (handle: string) => {
  router.push(`/product/${handle}`)
}
</script>

<template>
  <div class="bestsellers-page">
    <!-- Hero Banner -->
    <section class="bs-hero">
      <div class="bs-hero-bg"></div>
      <div class="bs-hero-inner container">
        <span class="bs-eyebrow">
          <Award :size="14" class="gold-text" />
          COMMUNITY RANKED
        </span>
        <h1 class="bs-title">Top 10<br/><span class="gold-text">Best Sellers</span></h1>
        <p class="bs-subtitle">
          Limited-run garments, ranked by the community. Each piece is produced in small batches — once a release sells out, it may not return.
        </p>
        <div class="bs-trust-row">
          <div class="bs-trust-item">
            <Star :size="13" class="gold-text" />
            <span>5.0 Google Reviews</span>
          </div>
          <div class="bs-trust-item">
            <Truck :size="13" class="gold-text" />
            <span>Free shipping $110+</span>
          </div>
          <div class="bs-trust-item">
            <RotateCcw :size="13" class="gold-text" />
            <span>30-day returns</span>
          </div>
          <div class="bs-trust-item">
            <ShieldCheck :size="13" class="gold-text" />
            <span>Shopify Secured</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading -->
    <div v-if="loading" class="bs-loading container">
      <div class="bs-skeleton" v-for="i in 5" :key="i"></div>
    </div>

    <!-- Products List -->
    <div v-else class="bs-list container">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="bs-item"
        :class="{ 'bs-item--top3': index < 3 }"
        @click="goToProduct(product.handle)"
      >
        <!-- Rank Badge -->
        <div class="bs-rank" :class="{ 'rank-gold': index === 0, 'rank-silver': index === 1, 'rank-bronze': index === 2 }">
          <span class="rank-number">{{ index + 1 }}</span>
        </div>

        <!-- Product Image -->
        <div class="bs-img-wrap">
          <img :src="product.image" :alt="product.title" class="bs-img" @error="(e: any) => e.target.src = '/assets/placeholder.png'" />
          <div class="bs-img-overlay"></div>
          <span v-if="RANK_LABELS[index + 1]" class="bs-badge">{{ RANK_LABELS[index + 1] }}</span>
        </div>

        <!-- Info -->
        <div class="bs-info">
          <div class="bs-info-top">
            <p class="bs-category">{{ product.category || product.type || 'Apparel' }}</p>
            <h2 class="bs-name">{{ product.title }}</h2>
            <p class="bs-desc">{{ (product.description || '').replace(/<[^>]*>/g, '').substring(0, 110) }}{{ product.description && product.description.length > 110 ? '…' : '' }}</p>
          </div>

          <div class="bs-commerce">
            <div class="bs-price-row">
              <span class="bs-price">{{ currencyStore.formatPrice ? currencyStore.formatPrice(parseFloat((product.price || '0').replace(/[^0-9.]/g, ''))) : product.price }}</span>
              <span class="bs-edition">Limited edition</span>
            </div>
            <!-- Available sizes display -->
            <div v-if="product.variants && product.variants.length > 1" class="bs-sizes-available">
              <span v-for="v in product.variants.filter(v => v.available)" :key="v.id" class="bs-size-chip">
                {{ v.options?.[0] || v.title }}
              </span>
            </div>

            <div class="bs-cta-row" @click.stop>
              <button
                v-if="product.available !== false"
                class="bs-add-btn btn-premium"
                :class="{ 'bs-adding': addingId === product.id }"
                @click="quickAdd(product)"
                :id="`bestseller-add-${index + 1}`"
              >
                {{ addingId === product.id ? '✓ Added' : 'Add to Bag' }}
              </button>
              <span v-else class="bs-sold-out">Sold Out</span>

              <router-link :to="`/product/${product.handle}`" class="bs-view-btn" @click.stop>
                View Details
              </router-link>
            </div>
          </div>
        </div>

        <!-- Edition Tag -->
        <div class="bs-edition-corner">
          <span class="edition-text">PRODUCED IN LIMITED QUANTITIES</span>
        </div>
      </div>
    </div>

    <!-- SIZE PICKER MODAL -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showSizePicker && pickerProduct" class="bs-picker-overlay" @click.self="closePicker">
          <div class="bs-picker-modal">
            <button class="bs-picker-close" @click="closePicker">✕</button>
            <div class="bs-picker-img-wrap">
              <img :src="pickerProduct.image" :alt="pickerProduct.title" class="bs-picker-img" />
            </div>
            <div class="bs-picker-info">
              <p class="bs-picker-name">{{ pickerProduct.title }}</p>
              <p class="bs-picker-price gold-text">{{ currencyStore.formatPrice(parseFloat((pickerProduct.price || '0').replace(/[^0-9.]/g, ''))) }}</p>
              <p class="bs-picker-label">SELECT SIZE</p>
              <div class="bs-picker-sizes">
                <button
                  v-for="v in pickerProduct.variants"
                  :key="v.id"
                  class="bs-picker-size-btn"
                  :class="{ active: pickerSelectedSize === v.id, 'oos': !v.available }"
                  :disabled="!v.available"
                  @click="pickerSelectedSize = v.id"
                >
                  {{ v.options?.[0] || v.title }}
                </button>
              </div>
              <button
                class="btn-premium bs-picker-confirm"
                :disabled="!pickerSelectedSize"
                @click="confirmSizePicker"
              >
                {{ addingId === pickerProduct.id ? '✓ Added to Bag!' : 'Add to Bag' }}
              </button>
              <router-link :to="`/product/${pickerProduct.handle}`" class="bs-picker-view" @click="closePicker">
                View full details →
              </router-link>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Bottom Trust Section -->
    <section class="bs-footer-trust container">
      <div class="bs-trust-grid">
        <div class="bs-trust-card glass">
          <ShieldCheck :size="24" class="gold-text" />
          <h4>Secure Checkout</h4>
          <p>All transactions are processed securely through Shopify. Your payment details are never stored.</p>
        </div>
        <div class="bs-trust-card glass">
          <Truck :size="24" class="gold-text" />
          <h4>Ships from Canada</h4>
          <p>Orders ship within 1–3 business days. Free shipping on all orders over $110 CAD.</p>
        </div>
        <div class="bs-trust-card glass">
          <RotateCcw :size="24" class="gold-text" />
          <h4>30-Day Returns</h4>
          <p>Not satisfied? Return within 30 days for a full refund. No questions asked.</p>
        </div>
        <div class="bs-trust-card glass">
          <Star :size="24" class="gold-text" />
          <h4>5.0 Star Reviews</h4>
          <p>Verified Google reviews from our community. Quality and craftsmanship you can trust.</p>
        </div>
      </div>

      <div class="bs-cta-section">
        <p class="bs-cta-eyebrow">Looking for more?</p>
        <h3 class="bs-cta-title">Explore the full archive</h3>
        <div class="bs-cta-buttons">
          <router-link to="/collections/all" class="btn-gold">SHOP ALL CLOTHING</router-link>
          <router-link to="/quiz" class="btn-outline">Find Your Frequency</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== HERO ===== */
.bestsellers-page {
  min-height: 100dvh;
  padding-top: 80px;
}

.bs-hero {
  position: relative;
  padding: 8vh 0 6vh;
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(212, 175, 55, 0.12);
}

.bs-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 65%);
  pointer-events: none;
}

.bs-hero-inner {
  position: relative;
  z-index: 1;
}

.bs-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  margin-bottom: 1.5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 100px;
}

.bs-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 1.5rem;
}

.bs-subtitle {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
  max-width: 560px;
  margin: 0 auto 2.5rem;
}

.bs-trust-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.bs-trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.6);
}

/* ===== LOADING ===== */
.bs-loading {
  padding: 6vh 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.bs-skeleton {
  height: 200px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 4px;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

/* ===== PRODUCT LIST ===== */
.bs-list {
  padding: 6vh 0 4vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.bs-item {
  display: grid;
  grid-template-columns: 60px 220px 1fr;
  gap: 0;
  align-items: stretch;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}

.bs-item:hover {
  border-color: rgba(212, 175, 55, 0.25);
  background: rgba(212, 175, 55, 0.03);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.bs-item--top3 {
  border-color: rgba(212, 175, 55, 0.15);
}

/* Rank */
.bs-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.rank-number {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.2);
  line-height: 1;
}

.rank-gold .rank-number { color: #d4af37; text-shadow: 0 0 15px rgba(212, 175, 55, 0.5); }
.rank-silver .rank-number { color: #c0bec0; }
.rank-bronze .rank-number { color: #cd7f32; }

/* Image */
.bs-img-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: transparent;
  flex-shrink: 0;
}

.bs-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.6s ease;
  filter: brightness(1);
}

.bs-item:hover .bs-img {
  transform: scale(1.05);
  filter: brightness(1);
}

.bs-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 70%, rgba(0,0,0,0.5));
}

.bs-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--color-gold);
  color: #000;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
}

/* Info */
.bs-info {
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
}

.bs-category {
  font-size: 0.55rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

.bs-name {
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 1.15;
  letter-spacing: 0.02em;
}

.bs-desc {
  font-size: 0.82rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.5);
  max-width: 480px;
}

/* Commerce */
.bs-commerce {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.bs-price-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.bs-price {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
}

.bs-edition {
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.6;
}

.bs-cta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.bs-add-btn {
  padding: 0.85rem 2rem;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  transition: all 0.3s;
  white-space: nowrap;
}

.bs-add-btn.bs-adding {
  background: rgba(212, 175, 55, 0.9) !important;
  color: #000;
}

.bs-sold-out {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.85rem 1.5rem;
}

.bs-view-btn {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 2px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.bs-view-btn:hover {
  color: var(--color-gold);
  border-color: var(--color-gold);
}

/* Edition Corner Stamp */
.bs-edition-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  padding: 0.3rem 0.8rem;
  border-top: 1px solid rgba(212,175,55,0.1);
  border-left: 1px solid rgba(212,175,55,0.1);
}

.edition-text {
  font-size: 0.4rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.5;
}

/* ===== FOOTER TRUST ===== */
.bs-footer-trust {
  padding: 8vh 0 10vh;
  border-top: 1px solid rgba(212, 175, 55, 0.08);
}

.bs-trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 6vh;
}

.bs-trust-card {
  padding: 2rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  text-align: center;
  transition: border-color 0.3s;
}

.bs-trust-card:hover {
  border-color: rgba(212, 175, 55, 0.2);
}

.bs-trust-card svg {
  margin: 0 auto 1rem;
  display: block;
}

.bs-trust-card h4 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.bs-trust-card p {
  font-size: 0.78rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.45);
}

/* Bottom CTA */
.bs-cta-section {
  text-align: center;
  padding: 4rem 0 0;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.bs-cta-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.6;
  margin-bottom: 1rem;
}

.bs-cta-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bs-cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .bs-item {
    grid-template-columns: 50px 160px 1fr;
  }

  .bs-info {
    padding: 1.5rem;
  }

  .bs-trust-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .bs-item {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .bs-rank {
    display: none;
  }

  .bs-img-wrap {
    height: 240px;
    aspect-ratio: unset;
  }

  .bs-commerce {
    flex-direction: column;
    align-items: flex-start;
  }

  .bs-trust-grid {
    grid-template-columns: 1fr 1fr;
  }

  .bs-trust-row {
    gap: 1rem;
  }
}
</style>

<style>
/* Size chips on product list */
.bs-sizes-available { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.5rem 0 0.75rem; }
.bs-size-chip { font-size: 0.5rem; letter-spacing: 0.15em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.12); padding: 0.2rem 0.5rem; color: rgba(255,255,255,0.45); }

/* Size picker overlay */
.bs-picker-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
  display: flex; align-items: flex-end; justify-content: center;
}
@media (min-width: 640px) { .bs-picker-overlay { align-items: center; } }

.bs-picker-modal {
  background: #0a0a0a; border: 1px solid rgba(255,255,255,0.08);
  width: 100%; max-width: 520px; border-radius: 0;
  display: grid; grid-template-columns: 160px 1fr;
  position: relative; overflow: hidden;
  max-height: 90dvh;
}
@media (max-width: 480px) { .bs-picker-modal { grid-template-columns: 1fr; } }

.bs-picker-close {
  position: absolute; top: 1rem; right: 1rem;
  background: none; border: none; color: rgba(255,255,255,0.4);
  font-size: 1.2rem; cursor: pointer; z-index: 10;
  transition: color 0.2s; width: 32px; height: 32px;
}
.bs-picker-close:hover { color: #fff; }

.bs-picker-img-wrap { background: #050505; aspect-ratio: 3/4; overflow: hidden; }
.bs-picker-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }

.bs-picker-info { padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.bs-picker-name { font-family: 'Playfair Display', serif; font-size: 1rem; color: #fff; line-height: 1.2; }
.bs-picker-price { font-size: 0.9rem; font-weight: 600; }
.bs-picker-label { font-size: 0.55rem; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-top: 0.5rem; }

.bs-picker-sizes { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.bs-picker-size-btn {
  font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.5rem 0.9rem; background: transparent;
  border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.6);
  cursor: pointer; transition: all 0.2s;
}
.bs-picker-size-btn:hover:not(:disabled) { border-color: rgba(255,255,255,0.5); color: #fff; }
.bs-picker-size-btn.active { border-color: #d4af37; color: #d4af37; background: rgba(212,175,55,0.05); }
.bs-picker-size-btn.oos { opacity: 0.25; cursor: not-allowed; text-decoration: line-through; }

.bs-picker-confirm { width: 100%; padding: 1rem; font-size: 0.8rem; margin-top: 0.5rem; }
.bs-picker-confirm:disabled { opacity: 0.4; cursor: not-allowed; }

.bs-picker-view { font-size: 0.6rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); text-decoration: none; text-align: center; transition: color 0.2s; }
.bs-picker-view:hover { color: rgba(255,255,255,0.7); }

/* Transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

