<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ProductCard from '../components/ProductCard.vue'

interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
}

const modernAlchemistProduct = ref<Product | null>(null)
const loading = ref(true)

onMounted(async () => {
  // Glitch entry animation
  gsap.from('.resonance-title', {
    opacity: 0,
    y: 20,
    duration: 1.5,
    ease: 'expo.out',
    delay: 0.5
  })
  
  gsap.from('.resonance-card', {
    opacity: 0,
    scale: 0.95,
    duration: 2,
    ease: 'expo.out',
    delay: 0.8
  })

  try {
    // Specifically fetch the Modern Alchemist hoodie
    const res = await fetch('/api/products?collection=the-ghost-and-bones&limit=20')
    const products = await res.json()
    modernAlchemistProduct.value = products.find((p: any) => p.handle.includes('modern-alchemist')) || products[0]
  } catch (e) {
    console.error('Failed to fetch product:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="resonance-view">
    <div class="resonance-overlay"></div>
    
    <div class="container resonance-content">
      <div class="resonance-header">
        <p class="resonance-eyebrow">ACCESS GRANTED · SIGNAL DETECTED</p>
        <h1 class="resonance-title">SIGNAL<br>SYNCHRONIZED</h1>
      </div>

      <div class="resonance-card glass glow-edge">
        <div class="card-left">
          <div v-if="loading" class="loading-spinner">Calibrating...</div>
          <div v-else-if="modernAlchemistProduct" class="product-preview">
            <ProductCard :product="modernAlchemistProduct" />
          </div>
        </div>
        
        <div class="card-right">
          <p class="access-label">COMMUNITY EARLY ACCESS</p>
          <h2 class="access-title">The Void Awakens.</h2>
          <p class="access-body">
            You have located the hidden frequency. As a result, your field has been synchronized with the 
            upcoming <span class="gold-text">Modern Alchemist</span> drop. Secure your artifact before 
            the laboratory enters total lockdown.
          </p>
          
          <div class="access-key-box">
            <span class="key-label">DISCOUNT KEY</span>
            <div class="key-value">VOID_AWAKEN</div>
            <p class="key-sub">20% REDUCTION APPLIED TO ALL ARTIFACTS</p>
          </div>

          <router-link to="/collections/the-ghost-and-bones" class="btn-premium">
            SECURE YOUR PIECE →
          </router-link>
        </div>
      </div>

      <div class="resonance-footer">
        <p>12 HOURS REMAINING UNTIL SECTOR LOCKDOWN</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resonance-view {
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 15vh 0;
  position: relative;
  overflow: hidden;
}

.resonance-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.resonance-content {
  position: relative;
  z-index: 2;
  max-width: 1000px;
}

.resonance-header {
  text-align: center;
  margin-bottom: 5rem;
}

.resonance-eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.6em;
  color: var(--color-gold-muted);
  margin-bottom: 1.5rem;
}

.resonance-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1;
  color: #fff;
  text-transform: uppercase;
}

.resonance-card {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(212, 175, 55, 0.1);
  overflow: hidden;
}

.card-left {
  padding: 3rem;
  border-right: 1px solid rgba(212, 175, 55, 0.1);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-right {
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.access-label {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  margin-bottom: 1rem;
}

.access-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.access-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 3rem;
}

.access-key-box {
  background: rgba(212, 175, 55, 0.05);
  border: 1px dashed rgba(212, 175, 55, 0.3);
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
}

.key-label {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-muted);
  display: block;
  margin-bottom: 0.5rem;
}

.key-value {
  font-family: monospace;
  font-size: 2rem;
  letter-spacing: 0.2em;
  color: #fff;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.key-sub {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  opacity: 0.4;
}

.resonance-footer {
  text-align: center;
  margin-top: 5rem;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .resonance-card {
    grid-template-columns: 1fr;
  }
  .card-left {
    border-right: none;
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  }
  .card-right {
    padding: 3rem 2rem;
  }
}
</style>
