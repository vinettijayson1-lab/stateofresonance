<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { cart } from '../store/cart'
import ProductCard from '../components/ProductCard.vue'

interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
}

const products = ref<Product[]>([])
const loading = ref(true)
const activeTab = ref('all')

const tabs = [
  { id: 'all', label: 'All Artifacts' },
  { id: 'Alchemical Elixirs', label: 'Elixirs' },
  { id: 'Alchemical Botanicals', label: 'Botanicals' },
  { id: 'Illuminations', label: 'Illuminations' },
  { id: 'Ritual Tools', label: 'Ritual Tools' }
]

const fetchAlchemyItems = async () => {
  loading.value = true
  try {
    const res = await fetch('/api/products?category=Alchemy&limit=250')
    products.value = await res.json()
  } catch (e) {
    console.error('Failed to fetch alchemy items:', e)
  } finally {
    loading.value = false
  }
}

const filteredProducts = computed(() => {
  if (activeTab.value === 'all') return products.value
  return products.value.filter(p => p.category === activeTab.value)
})

onMounted(fetchAlchemyItems)

import { computed } from 'vue'
</script>

<template>
  <div class="alchemy-view">
    <!-- Atmospheric Alchemy Hero -->
    <section class="alchemy-hero">
      <div class="alchemy-bg-svg">
        <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M300 80 L300 220 L200 400 L400 400 Z" stroke="var(--color-gold-muted)" stroke-width="0.6" fill="none"/>
          <ellipse cx="300" cy="400" rx="100" ry="20" stroke="var(--color-gold-muted)" stroke-width="0.5"/>
          <circle cx="300" cy="80" r="30" stroke="var(--color-gold-muted)" stroke-width="0.5"/>
          <path d="M270 80 L240 140" stroke="var(--color-gold-muted)" stroke-width="0.5"/>
          <circle cx="300" cy="240" r="120" stroke="var(--color-gold-muted)" stroke-width="0.2" opacity="0.3" stroke-dasharray="4 8"/>
        </svg>
      </div>
      <div class="hero-overlay"></div>
      
      <div class="container hero-content">
        <p class="section-eyebrow">⚗ THE ALCHEMICAL LABORATORY</p>
        <h1 class="hero-title alchemy-title">Alchemical Botanicals</h1>
        <p class="hero-subtitle alchemy-description">
          Sacred botanicals, alchemical elixirs, and aromatic transmitters — tools for the 
          transformation of the self and the sanctification of space.
        </p>
      </div>
    </section>

    <main class="container alchemy-main">
      <!-- Filter Tabs -->
      <div class="filter-tabs glass">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="loading" class="loading-state">
        <p>Distilling frequencies...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <p>The laboratory is being prepared for this synchronization.</p>
        <router-link to="/sanctuary" class="btn-premium">Return to Sanctuary</router-link>
      </div>

      <div v-else class="product-grid">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.alchemy-hero {
  height: 70vh;
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse 80% 80% at 50% 80%, rgba(14, 42, 26, 0.3) 0%, var(--color-obsidian) 80%);
}

.alchemy-bg-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.15;
  pointer-events: none;
  animation: sacred-rotate 180s linear infinite;
  transform-origin: center;
}

@keyframes sacred-rotate {
  from { transform: rotate(0deg) scale(1.1); }
  to { transform: rotate(360deg) scale(1.1); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--color-obsidian) 0%, rgba(5,5,8,0.1) 60%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 10;
  padding-bottom: 80px;
}

.alchemy-title {
  font-family: var(--font-ritual);
  font-size: clamp(3rem, 7vw, 6rem) !important;
  letter-spacing: 0.1em;
  margin: 1rem 0;
  text-shadow: 0 0 60px rgba(14,42,26,0.8);
}

.alchemy-description {
  max-width: 500px;
  font-style: italic;
  font-size: 1.1rem;
  opacity: 0.6;
}

.alchemy-main {
  padding: 80px 0 120px;
}

.filter-tabs {
  display: inline-flex;
  gap: 1rem;
  padding: 0.75rem;
  margin-bottom: 4rem;
  border-radius: 2px;
}

.tab-btn {
  background: none;
  border: none;
  color: var(--color-foreground);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.3s ease;
}

.tab-btn:hover { opacity: 0.8; }
.tab-btn.active {
  opacity: 1;
  color: var(--color-gold);
  background: rgba(212, 175, 55, 0.05);
}

.product-card-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.product-card-actions .small {
  padding: 0.5rem 1rem;
  font-size: 0.6rem;
}

.loading-state, .empty-state {
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0.5;
  font-style: italic;
}
</style>
