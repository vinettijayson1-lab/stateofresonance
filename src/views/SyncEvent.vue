<script setup lang="ts">
import FrequencyQuiz from '../components/FrequencyQuiz.vue'
import SocialProof from '../components/SocialProof.vue'
import Testimonials from '../components/Testimonials.vue'
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from('.event-hero h1', { opacity: 0, y: 30, duration: 1, delay: 0.2 })
  gsap.from('.event-hero p', { opacity: 0, y: 20, duration: 1, delay: 0.5 })
  gsap.from('.quiz-section', { opacity: 0, scale: 0.98, duration: 1.2, delay: 0.8, ease: 'expo.out' })
  
  // Set event flag for auto-discount
  localStorage.setItem('sor_active_event', 'sync_event_2026')
  localStorage.setItem('sor_event_discount', 'SYNC15')
})

const startCalibration = () => {
  document.querySelector('.quiz-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="sync-event-page">
    <!-- Campaign Hero -->
    <section class="event-hero">
      <div class="hero-bg"></div>
      <div class="container relative glass glow-edge" style="padding: 4rem; max-width: 800px; border-radius: 12px; margin: 0 auto; z-index: 10;">
        <span class="meta-vibe gold-text animate-pulse">✦ ONGOING SYNCHRONIZATION EVENT ✦</span>
        <div style="margin-bottom: 2rem; margin-top: 1rem; display: inline-flex; background: rgba(255,107,107,0.1); border: 1px dashed rgba(255,107,107,0.4); padding: 0.5rem 1rem; align-items: center; justify-content: center;">
          <span style="font-size: 0.6rem; letter-spacing: 0.3em; color: #ff6b6b; text-transform: uppercase; font-weight: bold;">86% OF ARTIFACTS CLAIMED THIS CYCLE</span>
        </div>
        <h1>ALIGNED BY RESONANCE</h1>
        <p class="hero-subtitle">
          The window of opportunity is open. Identify your frequency, align your field, 
          and acquire your sacred garments with a <span class="gold-text">15% Event Reward</span>.
        </p>

        <div style="margin-top: 3.5rem;">
            <button class="btn-premium" @click="startCalibration" style="font-size: 0.85rem; padding: 1.2rem 3rem; letter-spacing: 0.3em;">
              INITIATE CALIBRATION
            </button>
        </div>

        <div style="margin-top: 2.5rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; opacity: 0.6;">
            <span style="font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;">✦ Encrypted Checkout</span>
            <span style="font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;">✦ Worldwide Dispatch</span>
            <span style="font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;">✦ Solfeggio Verified</span>
        </div>
      </div>
    </section>

    <!-- Main Funnel: The Quiz -->
    <section class="quiz-section container">
      <div class="section-badge">PHASE 1: CALIBRATION</div>
      <FrequencyQuiz />
    </section>

    <!-- Trust & Social Proof -->
    <section class="proof-section">
      <div class="container">
        <div class="section-badge">PHASE 2: VERIFICATION</div>
        <h2 class="section-title">SEEKERS ALREADY SYNCHRONIZED</h2>
        <SocialProof />
      </div>
    </section>

    <!-- Detailed Experiences -->
    <Testimonials />

    <!-- Event Footer -->
    <section class="event-footer glass">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-stat">
            <span class="stat-value">963Hz</span>
            <span class="stat-label">MAX RESONANCE</span>
          </div>
          <div class="footer-stat">
            <span class="stat-value">1:1</span>
            <span class="stat-label">FIELD ALIGNMENT</span>
          </div>
          <div class="footer-stat">
            <span class="stat-value">∞</span>
            <span class="stat-label">GHOST & BONES</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sync-event-page {
  background: var(--color-obsidian);
  color: white;
  min-height: 100vh;
}

.event-hero {
  position: relative;
  padding: 12vh 0 8vh;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
  filter: blur(40px);
  z-index: 0;
}

.event-hero h1 {
  font-size: clamp(3rem, 10vw, 6rem);
  font-family: var(--font-heading);
  letter-spacing: 0.15em;
  line-height: 0.9;
  margin: 2rem 0;
}

.hero-subtitle {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.7;
  line-height: 1.6;
}

.section-badge {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.quiz-section {
  padding-bottom: 10vh;
}

.proof-section {
  padding: 10vh 0;
  background: rgba(0,0,0,0.3);
}

.section-title {
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 0.2em;
  margin-bottom: 4rem;
}

.event-footer {
  padding: 4rem 0;
  border-top: 1px solid var(--glass-border);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
}

.footer-stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-family: var(--font-heading);
  color: var(--color-gold-muted);
}

.stat-label {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  opacity: 0.4;
  text-transform: uppercase;
}

.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.98); }
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 3rem; }
  .event-hero h1 { font-size: 3rem; }
}
</style>
