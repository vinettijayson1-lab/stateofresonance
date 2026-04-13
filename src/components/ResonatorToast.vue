<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

interface Manifestation {
  id: number
  location: string
  artifact: string
  type: 'ACQUISITION' | 'SYNCHRONIZATION'
}

const manifestations: Manifestation[] = [
  { id: 1, location: 'BERLIN', artifact: 'THE TAN SOUNDWAVE HOODIE', type: 'ACQUISITION' },
  { id: 2, location: 'TOKYO', artifact: 'THE MANDALA HOODIE', type: 'ACQUISITION' },
  { id: 3, location: 'NEW YORK', artifact: 'THE BLACK CREWNECK', type: 'ACQUISITION' },
  { id: 4, location: 'LONDON', artifact: 'THE WINGED SERAPHIM PRINT', type: 'ACQUISITION' },
  { id: 5, location: 'PARIS', artifact: 'INNER CIRCLE', type: 'SYNCHRONIZATION' },
  { id: 6, location: 'SEOUL', artifact: 'THE ATOMIC OBSERVER HOODIE', type: 'ACQUISITION' },
  { id: 7, location: 'LOS ANGELES', artifact: 'THE TAN SOUNDWAVE HOODIE', type: 'ACQUISITION' },
  { id: 8, location: 'AMSTERDAM', artifact: 'THE PHANTOM TEE', type: 'ACQUISITION' }
]

const current = ref<Manifestation | null>(null)
const isVisible = ref(false)

const showNext = () => {
  const randomIndex = Math.floor(Math.random() * manifestations.length)
  current.value = manifestations[randomIndex]
  
  isVisible.value = true
  
  gsap.fromTo('.toast-container', 
    { x: 100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
  )

  // Auto-hide after 6 seconds
  setTimeout(() => {
    hide()
  }, 6000)
}

const hide = () => {
  gsap.to('.toast-container', { 
    x: 100, 
    opacity: 0, 
    duration: 1, 
    ease: 'expo.in',
    onComplete: () => {
      isVisible.value = false
      // Schedule next one in 15-30 seconds
      const nextDelay = Math.random() * 15000 + 15000
      setTimeout(showNext, nextDelay)
    }
  })
}

onMounted(() => {
  // Initial delay of 10 seconds
  setTimeout(showNext, 10000)
})
</script>

<template>
  <div v-if="isVisible && current" class="toast-container glass">
    <div class="toast-indicator glow-gold"></div>
    <div class="toast-content">
      <div class="toast-label">
        <span class="type-tag">{{ current.type }}</span>
        <span class="location-tag">SIGNAL FROM {{ current.location }}</span>
      </div>
      <div class="toast-body">
        A Seeker has {{ current.type === 'ACQUISITION' ? 'manifested' : 'synchronized with' }} 
        <span class="artifact-name gold-text">{{ current.artifact }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  background: rgba(5, 5, 5, 0.9);
  padding: 1.2rem 1.5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  display: flex;
  align-items: center;
  gap: 1.2rem;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.toast-indicator {
  width: 4px;
  height: 40px;
  background: var(--color-gold);
  border-radius: 2px;
}

.toast-content {
  flex: 1;
}

.toast-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.type-tag {
  font-size: 0.55rem;
  font-family: var(--font-heading);
  letter-spacing: 0.2em;
  color: var(--color-gold);
  background: rgba(212, 175, 55, 0.1);
  padding: 0.15rem 0.4rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.location-tag {
  font-size: 0.5rem;
  font-family: var(--font-mono);
  opacity: 0.4;
  letter-spacing: 0.1em;
}

.toast-body {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  line-height: 1.4;
  color: #eee;
}

.artifact-name {
  font-weight: bold;
}

@media (max-width: 768px) {
  .toast-container {
    bottom: 20px;
    right: 20px;
    left: 20px;
    min-width: 0;
  }
}
</style>
