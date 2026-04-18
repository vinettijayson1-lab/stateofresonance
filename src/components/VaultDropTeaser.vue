<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import { klaviyoService } from '../services/klaviyo'

const email = ref('')
const hasSubscribed = ref(false)

// Fixed Target Date: April 17, 2026 at 20:00 UTC
const TARGET_DATE = ref(new Date('2026-04-17T20:00:00Z').getTime())

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timerInterval: ReturnType<typeof setInterval>

const updateTimer = () => {
  const now = Date.now()
  const diff = TARGET_DATE.value - now

  if (diff <= 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    if (timerInterval) clearInterval(timerInterval)
    return
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
  minutes.value = Math.floor((diff / 1000 / 60) % 60)
  seconds.value = Math.floor((diff / 1000) % 60)
}

onMounted(() => {
  updateTimer()
  timerInterval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const dropItems = [
  {
    id: 'arcane',
    name: 'ARCANE ILLUMINATION',
    frequency: '528Hz',
    imageFront: '/assets/drops/arcane-illumination-sandshell-front.png',
    imageBack: '/assets/drops/arcane-illumination-sandshell-back.png',
    description: 'A conduit of light in the void. Heavyweight protection tailored for elevated biological fields.'
  },
  {
    id: 'rebirth',
    name: 'REBIRTH AND DEATH',
    frequency: '963Hz',
    imageFront: '/assets/drops/death-and-rebirth-black-front.png',
    imageBack: '/assets/drops/death-and-rebirth-black-back.png',
    description: 'Total synchronization through destruction and renewal. The ultimate piece for shadow integration.'
  }
]

const handleSubscribe = () => {
  if (email.value.includes('@')) {
    // Inject user into the network
    klaviyoService.identify(email.value, { source: 'Vault Drop - Phase 2 Teaser' })
    klaviyoService.trackEvent('Subscribed to Vault Drop', { dropName: 'Arcane and Rebirth' })
    
    hasSubscribed.value = true
  }
}
</script>

<template>
  <section class="vault-drop-teaser">
    <div class="container">
      <div class="teaser-header text-center">
        <span class="meta-vibe gold-text pulse-glow">INCOMING TRANSMISSION</span>
        <h2 class="section-title">THE NEXT ARTIFACTS</h2>
        <p class="section-subtitle">A highly restricted materialization is occurring. Only the synchronized will gain early access.</p>
        
        <div class="countdown-wrapper">
          <div class="time-block">
            <span class="time-val">{{ days < 10 ? '0' + days : days }}</span>
            <span class="time-label">DAYS</span>
          </div>
          <span class="time-sep">:</span>
          <div class="time-block">
            <span class="time-val">{{ hours < 10 ? '0' + hours : hours }}</span>
            <span class="time-label">HRS</span>
          </div>
          <span class="time-sep">:</span>
          <div class="time-block">
            <span class="time-val">{{ minutes < 10 ? '0' + minutes : minutes }}</span>
            <span class="time-label">MIN</span>
          </div>
          <span class="time-sep">:</span>
          <div class="time-block">
            <span class="time-val glow-text">{{ seconds < 10 ? '0' + seconds : seconds }}</span>
            <span class="time-label">SEC</span>
          </div>
        </div>
      </div>

      <div class="drop-grid">
        <div v-for="item in dropItems" :key="item.id" class="drop-card glass hover-lift">
          <div class="image-showcase">
            <img :src="item.imageFront" :alt="item.name + ' Front - Esoteric Luxury Streetwear Solfeggio Frequency Piece'" class="front-img" />
            <img :src="item.imageBack" :alt="item.name + ' Back - Occult Aesthetic Graphic Hoodie Construction Tool'" class="back-img" />
            <div class="construction-badge">{{ item.frequency }}</div>
          </div>
          <div class="drop-info">
            <h3 class="drop-title">{{ item.name }}</h3>
            <p class="drop-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <div class="early-access-cta glass glow-edge">
        <h3>SECURE EARLY ACCESS</h3>
        <p>Enter your frequency node (email) to bypass the public line when the portal opens.</p>
        <div v-if="!hasSubscribed" class="capture-form">
          <input type="email" v-model="email" placeholder="YOUR EMAIL" class="ritual-input" />
          <button @click="handleSubscribe" class="btn-premium animate-glint">SYNC NOW</button>
        </div>
        <div v-else class="success-msg">
          <span class="gold-text">✓ SIGNAL LOCKED. AWAIT INSTRUCTIONS.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vault-drop-teaser {
  padding: 8vh 0;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  background: radial-gradient(circle at center, rgba(10,10,12,1) 0%, rgba(5,5,5,1) 100%);
}

.teaser-header {
  margin-bottom: 4rem;
}
.section-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: 0.15em;
  color: #fff;
  margin: 1rem 0;
}
.section-subtitle {
  color: rgba(255,255,255,0.6);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.countdown-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
  padding: 1.5rem 3rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.05);
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}

.time-val {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: var(--color-gold);
  line-height: 1;
  letter-spacing: 0.05em;
  text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

.time-label {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;
}

.time-sep {
  font-size: 2rem;
  color: rgba(212, 175, 55, 0.3);
  transform: translateY(-8px);
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.drop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.drop-card {
  padding: 1.5rem;
  border: 1px solid rgba(212, 175, 55, 0.1);
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
}

.image-showcase {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 4px;
  background: transparent;
  margin-bottom: 1.5rem;
}

.front-img, .back-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.back-img {
  opacity: 0;
  transform: scale(1.05);
}

.image-showcase:hover .front-img {
  opacity: 0;
}
.image-showcase:hover .back-img {
  opacity: 1;
  transform: scale(1);
}

.construction-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.8);
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  backdrop-filter: blur(4px);
}

.drop-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: var(--color-gold);
  margin-bottom: 0.5rem;
}
.drop-desc {
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  line-height: 1.5;
}

.early-access-cta {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 2rem;
  text-align: center;
  border: 1px solid var(--color-gold-muted);
}
.early-access-cta h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}
.early-access-cta p {
  color: rgba(255,255,255,0.6);
  margin-bottom: 2rem;
}
.capture-form {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.ritual-input {
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  outline: none;
  font-family: var(--font-body);
  letter-spacing: 0.1em;
  transition: border-color 0.3s;
}
.ritual-input:focus {
  border-color: var(--color-gold);
}

@media (max-width: 768px) {
  .capture-form {
    flex-direction: column;
  }
}
</style>
