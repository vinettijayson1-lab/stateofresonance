<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { cart } from '../store/cart'
import { currencyStore } from '../store/currency'
import { useResonanceStore } from '../store/resonance'
import PostPurchaseTeaser from '../components/PostPurchaseTeaser.vue'
import gsap from 'gsap'
import { Sparkles, Share2 } from 'lucide-vue-next'

const resonance = useResonanceStore()
const pulseCount = ref(963) // Base resonance count
const rawId = `TR-${Math.floor(Math.random() * 900000) + 100000}`
const displayId = ref('')

const recordManifestation = async () => {
  if (cart.items.length === 0) return
  
  try {
    const payload = {
      transmissionId: rawId,
      totalRevenue: cart.subtotal,
      currency: currencyStore.active,
      tier: resonance.tier || 'NEOPHYTE',
      items: cart.items.map(item => ({
        id: item.id,
        title: item.title,
        priceValue: item.priceValue,
        quantity: item.quantity
      }))
    }

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      console.log('Order Synchronized with Alchemical Ledger.')
      cart.clear()
    }
  } catch (err) {
    console.error('Manifestation recording failed:', err)
  }
}

const animateId = () => {
  let iterations = 0;
  const interval = setInterval(() => {
    displayId.value = rawId
      .split("")
      .map((char, index) => {
        if (index < iterations) return rawId[index];
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
      })
      .join("");

    if (iterations >= rawId.length) clearInterval(interval);
    iterations += 1 / 3;
  }, 30);
}

onMounted(() => {
  recordManifestation()
  animateId()

  const tl = gsap.timeline();
  tl.from('.success-icon-wrapper', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.7)' })
    .from('.section-eyebrow', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero-title', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.tier-ascension-banner', { scaleX: 0, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.4')
    .from('.global-pulse', { opacity: 0, duration: 1 }, '-=0.5')
    .from('.success-body', { y: 20, opacity: 0, duration: 1 }, '-=0.7')
    .from('.order-id', { opacity: 0, duration: 1 }, '-=0.5')
    .from('.action-row', { y: 20, opacity: 0, duration: 1 }, '-=0.5');

  // Pulse increment animation
  const pulseInterval = setInterval(() => {
    if (Math.random() > 0.7) {
      pulseCount.value++
    }
  }, 3000)

  onUnmounted(() => {
    clearInterval(pulseInterval)
  })
})

const shareSignal = () => {
  const text = encodeURIComponent("My frequency has been synchronized with @stateofresonance. The ritual is complete. 👁️ #stateofresonance #techwear #esoteric")
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
}
</script>

<template>
  <div class="success-view">
    <div class="container content-wrapper">
      
      <!-- Confirmation Header -->
      <header class="success-header">
        <div class="success-icon-wrapper">
          <svg class="success-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-gold)" stroke-width="0.5" stroke-dasharray="4 4" />
            <path d="M30 50 L45 65 L70 35" fill="none" stroke="var(--color-gold)" stroke-width="2" class="check-path" />
          </svg>
        </div>
        
        <p class="section-eyebrow">— ALIGNMENT CONFIRMED —</p>
        <h1 class="hero-title">Artifact Manifested</h1>

        <!-- Tier Ascension Visual -->
        <div class="tier-ascension-banner glass">
           <Sparkles :size="16" class="gold-text" />
           <span class="ascension-text">FIELD STATUS: <span class="gold-text highlight">{{ resonance.tier || 'NEOPHYTE' }}</span></span>
        </div>
        
        <!-- Global Pulse Metric -->
        <div class="global-pulse">
          <div class="pulse-dot"></div>
          <span class="pulse-text">GLOBAL RESONANCE: <span class="gold-text">{{ pulseCount }}</span> MANIFESTATIONS IN 24H</span>
        </div>

        <p class="success-body">
          Your frequency has been synchronized with the Void. The laboratory has received your intent and is currently calibrating your artifacts for physical extraction.
        </p>
        <p class="order-id">TRANSMISSION ID: <span class="mono">#{{ displayId }}</span></p>
      </header>

      <!-- Post-Purchase Retention Block -->
      <div class="retention-area">
        <PostPurchaseTeaser />
      </div>

      <!-- Action Footer -->
      <footer class="success-footer">
        <div class="action-row">
          <router-link to="/" class="back-link glow-hover">
            RETURN TO SANCTUARY
          </router-link>
          <button @click="shareSignal" class="share-btn glow-hover">
            <Share2 :size="16" /> BROADCAST SIGNAL
          </button>
        </div>
      </footer>

    </div>
  </div>
</template>

<style scoped>
.success-view {
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 15vh 0 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-wrapper {
  max-width: 900px;
  width: 100%;
  text-align: center;
}

.success-header {
  margin-bottom: 5rem;
}

.success-icon-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 2.5rem;
}

.success-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
}

.section-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.5em;
  color: var(--color-gold-muted);
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 2rem;
  font-family: var(--font-heading);
  letter-spacing: 0.05em;
}

.tier-ascension-banner {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 2rem;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.2);
  margin-bottom: 2.5rem;
  border-radius: 4px;
}

.ascension-text {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  font-weight: 600;
}

.highlight {
  text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

.global-pulse {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: var(--color-gold);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-gold);
  animation: pulse-glow 2s infinite;
}

.pulse-text {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  font-family: var(--font-mono);
}

@keyframes pulse-glow {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.success-body {
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.6;
  max-width: 60ch;
  margin: 0 auto 2rem;
}

.order-id {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  opacity: 0.8;
}

.mono {
  color: var(--color-gold);
  font-weight: bold;
}

.check-path {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: draw-check 0.8s ease forwards 0.5s;
}

@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}

.retention-area {
  margin: 4rem 0;
}

.success-footer {
  margin-top: 5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

.action-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.back-link, .share-btn {
  color: #fff;
  text-decoration: none;
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1.25rem 3.5rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.glow-hover:hover {
  background: rgba(212, 175, 55, 0.05);
  border-color: var(--color-gold);
  color: var(--color-gold);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .success-view { padding-top: 10vh; }
  .hero-title { font-size: 2.2rem; }
  .success-body { font-size: 0.95rem; }
  .action-row { flex-direction: column; width: 100%; }
  .back-link, .share-btn { width: 100%; }
}
</style>
