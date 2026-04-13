<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { cart } from '../store/cart'
import gsap from 'gsap'
import { ShieldCheck, Star, Users, Award } from 'lucide-vue-next'

const pulseVisible = ref(false)

watch(() => cart.lastManifestation, async (newVal) => {
  if (newVal) {
    pulseVisible.value = true
    await nextTick()
    
    const target = document.querySelector('.manifestation-pulse')
    if (target) {
      gsap.fromTo(target, 
        { opacity: 0, x: 20 }, 
        { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' }
      )
      
      // Auto-hide after 8 seconds
      setTimeout(() => {
        if (target) {
          gsap.to(target, {
            opacity: 0,
            x: -20,
            duration: 0.8,
            ease: 'expo.in',
            onComplete: () => { pulseVisible.value = false }
          })
        }
      }, 8000)
    }
  }
}, { immediate: true })

</script>

<template>
  <div class="trust-pulse-container">
    <!-- Dynamic Social Proof Pulse -->
    <transition name="pulse-fade">
      <div v-if="pulseVisible && cart.lastManifestation" class="manifestation-pulse glass">
        <div class="pulse-indicator" :class="{ 'premium-pulse': cart.lastManifestation.isPremium }"></div>
        <div class="pulse-content">
          <p class="pulse-header">{{ cart.lastManifestation.name }}</p>
          <p class="pulse-action">{{ cart.lastManifestation.action }}</p>
          <span class="pulse-time">{{ cart.lastManifestation.time }}</span>
        </div>
      </div>
    </transition>

    <!-- Verified Trust Badges -->
    <div class="static-trust-grid">
      <div class="trust-item">
        <ShieldCheck class="trust-icon" :size="20" />
        <div class="trust-text">
          <span class="trust-label">SECURE CALIBRATION</span>
          <span class="trust-sub">256-bit AES Encryption</span>
        </div>
      </div>
      <div class="trust-item">
        <Star class="trust-icon gold-text" :size="20" />
        <div class="trust-text">
          <span class="trust-label">GOOGLE VERIFIED</span>
          <span class="trust-sub">4.9/5 Resonance (124+ Reviews)</span>
        </div>
      </div>
      <div class="trust-item">
        <Users class="trust-icon" :size="20" />
        <div class="trust-text">
          <span class="trust-label">GLOBAL COLLECTIVE</span>
          <span class="trust-sub">{{ cart.globalResonanceCount }} Active Seekers</span>
        </div>
      </div>
      <div class="trust-item">
        <Award class="trust-icon" :size="20" />
        <div class="trust-text">
          <span class="trust-label">AUTHENTIC ARTIFACTS</span>
          <span class="trust-sub">963Hz Solfeggio Verified</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trust-pulse-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.manifestation-pulse {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  background: rgba(212, 175, 55, 0.03);
  align-items: center;
  position: relative;
  overflow: hidden;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  background: var(--color-gold);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-gold);
  animation: pulse-ring 2s infinite;
  flex-shrink: 0;
}

.premium-pulse {
  background: #fff;
  box-shadow: 0 0 15px #fff, 0 0 30px var(--color-gold);
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.8); opacity: 0.4; }
  100% { transform: scale(1); opacity: 1; }
}

.pulse-header {
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  margin: 0;
}

.pulse-action {
  font-size: 0.65rem;
  opacity: 0.6;
  margin: 0.2rem 0;
}

.pulse-time {
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
}

.static-trust-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.03);
  background: rgba(255,255,255,0.01);
}

.trust-icon {
  color: var(--color-gold-muted);
  opacity: 0.8;
}

.trust-text {
  display: flex;
  flex-direction: column;
}

.trust-label {
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  font-weight: 700;
  color: #fff;
}

.trust-sub {
  font-size: 0.5rem;
  opacity: 0.4;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.gold-text {
  color: var(--color-gold);
}

@media (max-width: 480px) {
  .static-trust-grid {
    grid-template-columns: 1fr;
  }
}
</style>
