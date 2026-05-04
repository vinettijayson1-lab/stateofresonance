<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProductCard from '../components/ProductCard.vue'
import { useResonanceStore } from '../store/resonance'

interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
  variantId: string | null
  metadata?: {
    tier?: string
  }
}

const resonance = useResonanceStore()
const route = useRoute()
const { t } = useI18n()
const sortBy = ref<'resonant' | 'hz-asc' | 'hz-desc'>('resonant')
const products = ref<Product[]>([])
const loading = ref(true)

const getFrequency = (p: Product) => {
  // Extract frequency from price formula: price = Hz / 10 (or similar)
  // Or look at specific Solfeggio matches
  const price = parseFloat(p.price.replace(/[^0-9.]/g, ''))
  
  if (price === 52.80) return 528
  if (price === 96.30) return 963
  if (price === 43.20) return 432
  if (price === 63.90) return 639
  if (price === 85.20) return 852
  if (price === 17.40) return 174
  if (price === 28.50) return 285
  if (price === 39.60) return 396
  if (price === 74.10) return 741
  
  // Default to a mystical "Natural Tuning" if no match
  return 432 
}

const sortedProducts = computed(() => {
  const base = [...products.value]
  
  if (sortBy.value === 'hz-asc') {
    return base.sort((a, b) => getFrequency(a) - getFrequency(b))
  }
  if (sortBy.value === 'hz-desc') {
    return base.sort((a, b) => getFrequency(b) - getFrequency(a))
  }

  // Default 'resonant' sorting (by tier match)
  if (!resonance.isCalibrated) return base
  
  return base.sort((a, b) => {
    const aMatch = a.metadata?.tier === resonance.tier ? 1 : 0
    const bMatch = b.metadata?.tier === resonance.tier ? 1 : 0
    return bMatch - aMatch
  })
})

const COLLECTION_META = computed<Record<string, { title: string; subtitle: string; categories: string[]; image?: string }>>(() => ({
  'all': {
    title: t('collections.all.title', 'The Complete Archive').replace('\n', ' '),
    subtitle: t('collections.all.subtitle', 'All Artifacts & Attire'),
    categories: [],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'the-ghost-and-bones': {
    title: t('collections.ghost_bones.title', 'The GHOST and BONES').replace('\n', ' '),
    subtitle: t('collections.ghost_bones.subtitle', 'Premium Resonance Attire'),
    categories: ['Apparel', 'The GHOST and BONES', 'Urban Esoterica'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'her-resonance': {
    title: t('hero.her_resonance', 'Her Resonance').replace('\n', ' '),
    subtitle: t('hero.her_collection', 'For the Divine Feminine'),
    categories: ['Apparel', 'The GHOST and BONES'],
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/womens-relaxed-v-neck-t-shirt-solid-black-blend-front-69a0a8a271e46.jpg?v=1772136626'
  },
  hoodies: {
    title: 'Hoodies',
    subtitle: 'Premium Heavyweight Pullovers',
    categories: ['Attire', 'Apparel'],
    image: '/images/lookbook/20260426_150530.jpg'
  },
  tees: {
    title: 'Graphic Tees',
    subtitle: 'Oversized Garment-Dyed Shirts',
    categories: ['Attire', 'Apparel'],
    image: '/images/lookbook/20260426_150747.jpg'
  },
  crewnecks: {
    title: 'Crewnecks',
    subtitle: 'Structured Heavyweight Sweaters',
    categories: ['Attire', 'Apparel'],
    image: '/images/lookbook/20260426_152340-edit-20260429171747.jpg'
  },
  accessories: {
    title: 'Accessories',
    subtitle: 'Symbolic Adornments & Artifacts',
    categories: ['Sacred Adornments', 'Mystic Curiosities', 'Earth Relics'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  attire: {
    title: 'Attire',
    subtitle: 'The Attire Shop',
    categories: ['Apparel', 'The GHOST and BONES', 'Urban Esoterica'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'ritual-tools': {
    title: 'Ritual Tools',
    subtitle: 'Instruments of Sacred Practice',
    categories: ['Ritual Tools'],
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/twisted-rosewood-healing-wand-8-2356934.jpg?v=1773838927'
  },
  'shrine-garments': {
    title: 'Shrine Garments',
    subtitle: 'Objects of Sacred Veneration',
    categories: ['Shrine Garments'],
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/6-34-broom-pentagram-6944322.jpg?v=1773841208'
  },
  'mystic-curiosities': {
    title: 'Mystic Curiosities',
    subtitle: 'Rare Esoteric Discoveries',
    categories: ['Mystic Curiosities'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'divination-tools': {
    title: 'Divination Tools',
    subtitle: 'Instruments of Sight & Knowing',
    categories: ['Divination Tools'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'sacred-adornments': {
    title: 'Sacred Adornments',
    subtitle: 'Jewelry & Wearable Talismans',
    categories: ['Sacred Adornments'],
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/womens-relaxed-v-neck-t-shirt-solid-black-blend-front-69a0a8a271e46.jpg?v=1772136626'
  },
  'sacred-smoke': {
    title: 'Sacred Smoke',
    subtitle: 'Cleansing & Ceremonial Botanicals',
    categories: ['Sacred Smoke', 'Alchemical Botanicals'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'earth-relics': {
    title: 'Earth Minerals',
    subtitle: 'Crystals, Stones & Earth Relics',
    categories: ['Earth Relics'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'alchemical-botanicals': {
    title: 'Alchemical Botanicals',
    subtitle: 'Sacred Plant Medicine & Herbs',
    categories: ['Alchemical Botanicals'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'alchemical-elixirs': {
    title: 'Alchemical Elixirs',
    subtitle: 'Oils, Mists & Vibrational Elixirs',
    categories: ['Alchemical Elixirs'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'illuminations': {
    title: 'Illuminations',
    subtitle: 'Candles, Lamps & Sacred Light',
    categories: ['Illuminations'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'esoteric-protection': {
    title: 'Esoteric Protection',
    subtitle: 'Shields, Wards & Protective Garments',
    categories: ['Esoteric Protection'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'esoteric-manuscripts': {
    title: 'Esoteric Manuscripts',
    subtitle: 'Books, Grimoires & Sacred Texts',
    categories: ['Esoteric Manuscripts'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  'sacred-geometry': {
    title: 'Sacred Geometry',
    subtitle: 'Symbols, Mandalas & Geometric Garments',
    categories: ['Sacred Geometry'],
    image: '/images/lookbook/lookbook-hero.jpg'
  },
  vault: {
    title: 'The Vault',
    subtitle: 'Members-Only Singularities',
    categories: ['Vault'],
    image: '/images/lookbook/lookbook-hero.jpg'
  }
}))

const collectionHandle = String(route.params.handle || 'the-ghost-and-bones')

const formatHandle = (handle: string) => {
  return handle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const meta = computed(() => COLLECTION_META.value[collectionHandle] || {
  title: formatHandle(collectionHandle),
  subtitle: 'Esoteric Piece Collection',
  categories: [],
  image: '/images/lookbook/lookbook-hero.jpg'
})

const onImgError = (e: any) => {
  e.target.style.opacity = '0.3'
}

const fetchProducts = async () => {
  loading.value = true
  document.title = `${meta.value.title} | State of Resonance`
  try {
    // Try fetching by collection handle first
    const res = await fetch(`/api/products?collection=${collectionHandle}&limit=250`)
    const data = await res.json()
    
    if (data.length > 0) {
      products.value = data
    } else {
      // Fallback: Fetch by categories
      const all: Product[] = []
      for (const cat of meta.value.categories) {
        try {
          const r2 = await fetch(`/api/products?category=${cat}&limit=250`)
          const d = await r2.json()
          all.push(...d)
        } catch {}
      }
      // Deduplicate by handle
      const seen = new Set<string>()
      products.value = all.filter(p => {
        if (seen.has(p.handle)) return false
        seen.add(p.handle)
        return true
      })
    }
  } catch (e) {
    console.error('Failed to fetch collection:', e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)
</script>

<template>
  <div class="collection-view">
    <header class="collection-hero" :style="{ '--bg-img': `url(${meta.image})` }">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <p class="collection-eyebrow">State of Resonance</p>
        <h1 class="visually-hidden" v-html="`Sacred Attire and Esoteric Garments: ${meta.title}`"></h1>
        <div class="hero-title" style="font-size: 4rem;" v-html="meta.title"></div>
        <p class="product-meta" style="color: var(--color-foreground);">{{ meta.subtitle }}</p>
      </div>
    </header>

    <div class="container main-content">
      <div class="collection-controls">
        <p class="piece-count">{{ products.length }} garments synchronized</p>
        
        <div class="sort-wrapper">
          <label for="sort">{{ t('common.sort_by', 'Harmonize by') }}:</label>
          <select id="sort" v-model="sortBy" class="resonance-select">
            <option value="resonant">{{ t('common.resonant', 'Resonant Alignment') }}</option>
            <option value="hz-asc">{{ t('common.hz_asc', 'Ascending Frequency (Hz)') }}</option>
            <option value="hz-desc">{{ t('common.hz_desc', 'Descending Frequency (Hz)') }}</option>
          </select>
        </div>
      </div>

    <div v-if="loading" class="loading-state">
      <p>Synchronizing with the Archives...</p>
    </div>

    <div v-else-if="products.length === 0" class="empty-state">
      <p>No garments found in this synchronization.</p>
      <router-link
        to="/shop"
        class="btn-premium"
      >Browse the Full Shop →</router-link>
    </div>

    <div v-else class="product-grid">
      <ProductCard v-for="product in sortedProducts" :key="product.id" :product="product" />
    </div>
    </div>
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.collection-hero {
  height: 60vh;
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  background-image: var(--bg-img);
  background-size: cover;
  background-position: center;
  background-color: var(--color-obsidian);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--color-obsidian) 0%, rgba(5,5,8,0.1) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-bottom: 80px;
}

.main-content {
  padding: 40px 0 120px;
}

.collection-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.piece-count {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 0.9rem;
  opacity: 0.7;
}

.sort-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-wrapper label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.resonance-select {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-gold-muted);
  color: var(--color-foreground);
  font-family: var(--font-heading);
  font-size: 0.9rem;
  padding: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

.resonance-select:focus {
  border-bottom-color: var(--color-gold);
  color: var(--color-gold);
}

.resonance-select option {
  background: var(--color-obsidian);
  color: var(--color-foreground);
}

.collection-eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  margin-bottom: 1rem;
  opacity: 0.8;
}

.loading-state, .empty-state {
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-family: var(--font-heading);
  font-style: italic;
  opacity: 0.6;
}
</style>
