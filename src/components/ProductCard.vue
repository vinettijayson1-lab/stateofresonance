<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { cart } from '../store/cart'
import { useResonanceStore } from '../store/resonance'
import { currencyStore } from '../store/currency'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
  variants?: any[]
  metadata?: any
}

const { t } = useI18n()
const resonance = useResonanceStore()

const props = defineProps<{
  product: Product
}>()

const onImgError = (e: any) => {
  e.target.src = '/assets/placeholder.png'
}

// Shopify CDN image resizing — adds ?width=600 to serve appropriately sized images
// This cuts product image payload from ~9.6MB down to ~400KB per page
const optimizedImage = computed(() => {
  return props.product.image
})

// Derive a frequency from price (reproduction of logic in Product.vue)
const priceValue = computed(() => {
  return parseFloat(props.product.price.replace(/[^0-9.]/g, ''))
})

const isUnlocked = computed(() => !!localStorage.getItem('sor_inner_circle') && localStorage.getItem('sor_inner_circle') === 'true')

const memberPrice = computed(() => {
  if (resonance.memberDiscount > 0 && isUnlocked.value) {
    const discountedValue = priceValue.value * (1 - resonance.memberDiscount)
    return currencyStore.formatPrice(discountedValue)
  }
  return null
})


const alignmentScore = computed(() => {
  // Semi-randomized alignment score for "Laboratory" feel
  return (85 + (props.product.id.charCodeAt(0) % 15)).toFixed(1) + '%'
})

const liveViewers = computed(() => {
  // Randomized live viewers for social proof (3-12)
  return 3 + (props.product.id.charCodeAt(props.product.id.length - 1) % 10)
})


const remainingStock = computed(() => {
  // Matches logic in Product.vue
  return 4 + (props.product.id.charCodeAt(props.product.id.length - 1) % 11)
})

const isClothing = computed(() => {
  const title = props.product.title.toLowerCase()
  const cat = (props.product.category || '').toLowerCase()
  const type = (props.product.variants?.[0]?.product_type || '').toLowerCase() // Try to find type in variants if top level fails
  
  const clothingTerms = ['hoodie', 'tee', 'shirt', 'crewneck', 'sweatshirt', 'attire', 'apparel', 'layer', 'garment']
  const specificCollections = ['the ghost and bones', 'urban esoterica', 'natural alignment']
  
  return clothingTerms.some(term => title.includes(term) || cat.includes(term) || type.includes(term)) || 
         specificCollections.some(col => cat.includes(col))
})

const cardRef = ref(null)

onMounted(() => {
  if (cardRef.value) {
    gsap.from((cardRef.value as any).$el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: (cardRef.value as any).$el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    })
  }
})
</script>

<template>
  <router-link ref="cardRef" :to="'/product/' + product.handle" class="product-card">
    <div class="product-img-wrapper">
      <img
        :src="optimizedImage"
        :alt="`${product.title} — Esoteric Streetwear | State of Resonance Canada`"
        class="product-img"
        loading="lazy"
        decoding="async"
        width="600"
        height="600"
        @error="onImgError"
      />
      
  <!-- Premium Overlay (No Pseudoscience) -->
      <div class="construction-overlay">
        <div class="construction-data">
          <p class="data-label" v-html="$t('product.live', { n: `<span class=\'gold-text\'>${liveViewers}</span>` })"></p>
          <p class="data-status" :class="{ 'gold-border': product.metadata?.isMembersOnly }">
            {{ product.metadata?.isMembersOnly ? $t('product.inner_circle') : 'ESOTERIC ARTIFACT' }}
          </p>
        </div>
      </div>

      <!-- Product Badges -->
      <div class="product-badges">
        <span v-if="product.metadata?.isMembersOnly" class="badge members-only">{{ $t('product.inner_circle') }}</span>
        <span class="badge scarcity">LIMITED DROP</span>
        <span v-if="product.id.charCodeAt(product.id.length - 1) % 7 === 0" class="badge trending">{{ $t('product.trending') }}</span>
      </div>
    </div>
    <div class="product-info">
      <div class="product-meta">{{ product.category }}</div>
      <h3 class="product-name">
        {{ product.title }}
      </h3>
      <div class="product-price">
        <span v-if="memberPrice" class="original-price" style="text-decoration: line-through; opacity: 0.4; font-size: 0.8rem; margin-right: 0.5rem;">{{ currencyStore.formatPrice(priceValue) }}</span>
        <span :class="{ 'gold-text': memberPrice }">{{ memberPrice || currencyStore.formatPrice(priceValue) }}</span>
        <span v-if="memberPrice" class="member-tag" style="margin-left: 0.5rem; font-size: 0.5rem; letter-spacing: 0.1em; opacity: 0.6; vertical-align: middle;">{{ $t('membership.member_price') }}</span>
      </div>

      <div class="product-footer">
        <span v-if="product.variants && product.variants.length > 1" class="variant-count">
          {{ $t('product.variants', { n: product.variants.length }) }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.product-card {
  position: relative;
  background: transparent;
  border: none;
  overflow: hidden;
  transition: var(--transition-premium);
  box-shadow: none;
}

@media (hover: hover) and (pointer: fine) {
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0,0,0,0.7);
  }
}

.product-img-wrapper {
  position: relative;
  display: block;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: transparent;
  border: none;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* Soft bottom vignette to blend product into card — no hard lines */
.product-img-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.35) 100%);
  pointer-events: none;
  z-index: 2;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.5s ease;
  filter: none;
  mix-blend-mode: lighten;
}

@media (hover: hover) and (pointer: fine) {
  .product-card:hover .product-img {
    transform: scale(1.05);
    filter: brightness(1.08);
  }
}

/* Construction Overlay */
.construction-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 4;
}

@media (hover: hover) and (pointer: fine) {
  .product-card:hover .construction-overlay {
    opacity: 1;
  }
}

.construction-data {
  text-align: center;
  z-index: 6;
}

.data-label {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: rgba(255,255,255,0.7);
}

.data-status {
  font-size: 0.5rem;
  letter-spacing: 0.5em;
  color: var(--color-gold-muted);
  margin-top: 1rem;
  border: 1px solid var(--color-gold-muted);
  padding: 0.2rem 0.5rem;
}

.product-info {
  padding: 1.5rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.product-meta {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-gold-muted);
  margin-bottom: 0.5rem;
}

.product-name .nav-link {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  padding: 0;
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-price {
  font-size: 0.875rem;
  font-weight: 300;
  opacity: 0.8;
  color: var(--color-gold-muted);
}

@media (max-width: 768px) {
  .product-img-wrapper {
    aspect-ratio: 4/5;
  }
  .product-info {
    padding: 0.75rem 0.5rem 1rem;
  }
  .product-meta {
    font-size: 0.5rem;
    margin-bottom: 0.3rem;
  }
  .product-name {
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
    line-height: 1.3;
  }
  .product-price {
    font-size: 0.7rem;
  }
  .product-badges {
    top: 0.5rem;
    right: 0.5rem;
    gap: 0.25rem;
  }
  .badge {
    font-size: 0.4rem;
    padding: 0.2rem 0.4rem;
  }
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.variant-count {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.4;
  border-left: 1px solid rgba(255,255,255,0.1);
  padding-left: 0.75rem;
}

/* Product Badges */
.product-badges {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
}

.badge {
  font-size: 0.5rem;
  font-weight: bold;
  letter-spacing: 0.2em;
  padding: 0.35rem 0.6rem;
  border-radius: 2px;
}

.badge.trending {
  background: var(--color-gold);
  color: var(--color-obsidian);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
}

.badge.new {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
}

.badge.scarcity {
  background: var(--color-gold);
  color: #000;
  font-weight: 800;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.4);
}

.badge.members-only {
  background: #000;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
}

.gold-border {
  border-color: var(--color-gold) !important;
  color: var(--color-gold) !important;
}


</style>
