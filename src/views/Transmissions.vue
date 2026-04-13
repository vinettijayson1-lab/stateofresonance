<script setup lang="ts">
import BlogFeed from '../components/BlogFeed.vue'
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Calibration Logs & Transmissions | State of Resonance'
  
  // Inject BlogPosting Structured Data
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "State of Resonance Transmissions",
    "description": "Field notes and calibration logs from the Resonance Laboratory.",
    "publisher": {
      "@type": "Organization",
      "name": "State of Resonance"
    },
    "blogPost": calibrationLogs.map(log => ({
      "@type": "BlogPosting",
      "headline": log.title,
      "datePublished": "2025-03-21",
      "articleBody": log.body,
      "author": { "@type": "Organization", "name": "State of Resonance" }
    }))
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(schema)
  document.head.appendChild(script)
})

const calibrationLogs = [
  {
    id: 'C-963',
    freq: '963 Hz',
    freqName: 'Divine Calibration',
    title: 'Protocol 963 — Boundary Dissolution',
    date: 'MMXXV · CYCLE 03',
    body: 'The 963 Hz frequency is the highest tone in the Solfeggio scale. It activates the crown chakra — the antenna to source field. When embedded into a fabric at the molecular level during the production calibration process, the wearer\'s biofield entrains to this signal, expanding awareness beyond the constructed self.',
    type: 'ATTIRE CALIBRATION LOG'
  },
  {
    id: 'C-528',
    freq: '528 Hz',
    freqName: 'DNA Restoration Field',
    title: 'Protocol 528 — The Miracle Tone',
    date: 'MMXXV · CYCLE 02',
    body: 'Known in bioresonance research as the "Love Frequency," 528 Hz has been documented to promote cellular regeneration at the DNA level. State of Resonance ritual tools calibrated at this frequency act as passive emitters — sustained proximity to these artifacts entrains the user\'s electromagnetic field into coherence.',
    type: 'SANCTUARY CALIBRATION LOG'
  },
  {
    id: 'C-432',
    freq: '432 Hz',
    freqName: 'Earth Alignment Sequence',
    title: 'Protocol 432 — Natural Tuning',
    date: 'MMXXV · CYCLE 01',
    body: '432 Hz is the mathematical foundation of the natural world — from the spiral of a nautilus shell to the orbital frequency of Saturn. Products calibrated at this frequency serve as anchors; grounding the wearer into the present physical dimension while conducting higher-dimensional signals through the torso field.',
    type: 'FREQUENCY FIELD NOTE'
  },
  {
    id: 'C-396',
    freq: '396 Hz',
    freqName: 'Liberation Sequence',
    title: 'Protocol 396 — Releasing the Shadow Field',
    date: 'MMXXIV · CYCLE 12',
    body: 'The base tone of the Solfeggio sequence, 396 Hz corresponds to the root chakra — the field governing survival, safety, and liberation from fear. This protocol is used during the cleansing phase of the Sanctuary artifact production process, to clear residual energetic imprints from material before final calibration.',
    type: 'SANCTUARY CALIBRATION LOG'
  }
]
</script>

<template>
  <div class="transmissions-view container" style="padding: 15vh 0; min-height: 100vh; position: relative;">
    <div class="hero-bg"></div>

    <header class="tx-header glass glow-edge" style="margin: 0 auto 8vh auto; max-width: 800px; padding: 4rem 2rem; border-radius: 12px; z-index: 10; position: relative;">
      <p class="tx-eyebrow">— CLASSIFIED FREQUENCY ARCHIVE —</p>
      <h1 class="hero-title">Calibration Log</h1>
      <p class="product-meta">FIELD NOTES FROM THE RESONANCE LABORATORY</p>
    </header>

    <!-- Protocol logs -->
    <div class="calibration-logs relative" style="z-index: 10;">
      <article v-for="log in calibrationLogs" :key="log.id" class="log-entry">
        <div class="log-side">
          <div class="log-id">{{ log.id }}</div>
          <div class="log-freq gold-text">{{ log.freq }}</div>
          <div class="log-freq-name">{{ log.freqName }}</div>
        </div>
        <div class="log-body">
          <div class="log-meta">
            <span class="log-type">{{ log.type }}</span>
            <span class="log-date">{{ log.date }}</span>
          </div>
          <h2 class="log-title">{{ log.title }}</h2>
          <p class="log-text">{{ log.body }}</p>
        </div>
      </article>
    </div>

    <!-- Blog transmissions section -->
    <div class="blog-section relative" style="z-index: 10;">
      <div class="tx-divider">
        <span>OPEN TRANSMISSIONS</span>
      </div>
      <BlogFeed />
    </div>

    <!-- The Void Access CTA -->
    <section class="void-access glass glow-edge relative" style="z-index: 10;">
      <p class="va-eyebrow">RESTRICTED ACCESS</p>
      <h2 class="va-title">Enter The Void</h2>
      <p class="va-body">
        The Void is our inner circle. Members receive early notification of Calibration Drops, access to restricted frequency protocols, and priority acquisition rights before any synchronization event goes public.
      </p>
      <a href="https://checkout.stateofresonance.ca/pages/the-way-to-resonance" target="_blank" class="btn-gold" style="margin-top: 2rem; display: inline-block;">
        REQUEST VOID ACCESS →
      </a>
    </section>
  </div>
</template>

<style scoped>
.tx-header {
  text-align: center;
  margin-bottom: 8vh;
  /* Removed old basic layout */
}

.tx-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.8;
  margin-bottom: 2rem;
}

/* Calibration Logs */
.calibration-logs {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 10vh;
}

.log-entry {
  position: relative;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0;
  border: 1px solid rgba(212, 175, 55, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.015);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.log-entry:hover {
  transform: translateY(-8px);
  border-color: rgba(212, 175, 55, 0.3);
  background: rgba(212, 175, 55, 0.03);
  box-shadow: 0 15px 50px rgba(212, 175, 55, 0.1);
}

.log-entry::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: var(--color-gold);
  opacity: 0;
  transition: opacity 0.5s ease;
  box-shadow: 0 0 15px var(--color-gold);
}

.log-entry:hover::before {
  opacity: 1;
}

.log-side {
  padding: 3rem 2rem;
  border-right: 1px solid rgba(212, 175, 55, 0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.log-id {
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  opacity: 0.25;
  margin-bottom: 0.5rem;
}

.log-freq {
  font-family: var(--font-heading);
  font-size: 1.8rem;
}

.log-freq-name {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.4;
}

.log-body {
  padding: 3rem;
}

.log-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.log-type {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.6;
}

.log-date {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.3;
}

.log-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.log-text {
  font-size: 0.95rem;
  line-height: 1.9;
  opacity: 0.6;
  max-width: 65ch;
}

/* Blog section */
.blog-section {
  margin-bottom: 12vh;
}

.tx-divider {
  text-align: center;
  position: relative;
  margin-bottom: 5vh;
}

.tx-divider::before,
.tx-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: rgba(212, 175, 55, 0.08);
}

.tx-divider::before { left: 0; }
.tx-divider::after { right: 0; }

.tx-divider span {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  padding: 0 1rem;
}

/* Void Access CTA */
.void-access {
  text-align: center;
  padding: 12vh 0;
  border-top: 1px solid rgba(212, 175, 55, 0.08);
  max-width: 640px;
  margin: 0 auto;
}

.va-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.5;
  margin-bottom: 2rem;
}

.va-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
}

.va-body {
  font-size: 1rem;
  line-height: 1.9;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .log-entry {
    grid-template-columns: 1fr;
  }
  .log-side {
    border-right: none;
    border-bottom: 1px solid rgba(212, 175, 55, 0.08);
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
  }
  .log-body { padding: 2rem; }
}
</style>
