<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from('.legal-content', {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'expo.out'
  })
})
</script>

<template>
  <div class="terms-view container section-top">
    <div class="legal-header">
      <p class="section-eyebrow">PROTOCOL №013 — OPERATIONAL TERMS</p>
      <h1 class="hero-title">Terms of Service</h1>
      <p class="product-meta">LAST SYNCHRONIZATION: MARCH 31, 2026</p>
    </div>

    <div class="legal-content glass">
      <section>
        <h2>1. The Shop Protocol</h2>
        <p>
          By accessing the <strong>State of Resonance</strong> Shop, you agree to abide by these terms. 
          This is an agreement between you (the seeker) and Jayson Vinetti, operating as State of Resonance. 
          We provide frequency-calibrated garments and alchemical services.
        </p>
      </section>

      <section class="compliance-highlight">
        <h2>2. SMS Terms (Mobile Transmissions)</h2>
        <p>
          By subscribing to our mobile alerts, you agree to receive recurring automated marketing messages 
          at the phone number provided. Consent is not a condition of purchase. 
        </p>
        <ul style="margin-left: 1.5rem; margin-top: 1rem;">
          <li><strong>Message frequency varies.</strong></li>
          <li><strong>Message and data rates may apply.</strong></li>
          <li><strong>Text STOP to unsubscribe</strong> from our transmissions at any time.</li>
          <li><strong>Text HELP for help</strong> or email support@stateofresonance.ca.</li>
        </ul>
      </section>

      <section>
        <h2>3. Field Construction & Orders</h2>
        <p>
          Prices for garments are based on their vibrational intent and frequency construction. 
          We reserve the right to sync or desync piece availability at any time.
        </p>
      </section>

      <section>
        <h2>4. Returns & Synchronizations</h2>
        <p>
          Due to the energetic nature of our garments, returns are only accepted if the physical 
          shell of the piece is damaged upon arrival. Contact us within 48 hours of 
          synchronization (delivery) to initiate a repair protocol.
        </p>
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        <p>
          State of Resonance and Jayson Vinetti are not responsible for any metaphysical shifts, 
          dimensional anomalies, or physical mishaps resulting from the use of our garments. 
          Seeker discretion is advised.
        </p>
      </section>

      <section>
        <h2>6. Jurisdiction</h2>
        <p>
          These terms are governed by the laws of Québec, Canada.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.terms-view {
  max-width: 900px;
  padding-bottom: 10vh;
}

.legal-header {
  margin-bottom: 4rem;
  text-align: center;
}

.legal-content {
  padding: 4rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
}

section {
  margin-bottom: 3rem;
}

h2 {
  font-family: var(--font-heading);
  color: var(--color-gold);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
}

.compliance-highlight {
  border-left: 2px solid var(--color-gold);
  padding-left: 2rem;
  background: rgba(212, 175, 55, 0.03);
  padding-top: 1rem;
  padding-bottom: 1rem;
}

@media (max-width: 768px) {
  .legal-content {
    padding: 2rem;
  }
}
</style>
