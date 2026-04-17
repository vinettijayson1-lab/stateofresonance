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
  <div class="privacy-view container section-top">
    <div class="legal-header">
      <p class="section-eyebrow">PROTOCOL №012 — PRIVACY ARCHIVE</p>
      <h1 class="hero-title">Privacy Policy</h1>
      <p class="product-meta">LAST SYNCHRONIZATION: MARCH 31, 2026</p>
    </div>

    <div class="legal-content glass">
      <section>
        <h2>1. The Sacred Trust</h2>
        <p>
          At <strong>State of Resonance</strong>, we recognize that your data is a reflection of your digital frequency. 
          We are committed to protecting the sanctity of your information with the same rigor we apply to our alchemical 
          calibrations. This policy details how your personal essence (data) is collected and utilized within the Shop.
        </p>
      </section>

      <section>
        <h2>2. Data Collection (The Gathering)</h2>
        <p>
          We collect information you provide directly to us when you synchronize your field (create an account), 
          acquire garments (make a purchase), or subscribe to our Transmissions (newsletter and SMS). 
          This may include your name, email address, shipping coordinates, and mobile number.
        </p>
      </section>

      <section class="compliance-highlight">
        <h2>3. SMS & Mobile Data Privacy</h2>
        <p>
          <strong>State of Resonance</strong> values your privacy above all. Mobile information will not be shared 
          with third parties or affiliates for marketing or promotional purposes. 
        </p>
        <p>
          All the above categories exclude text messaging originator opt-in data and consent; this information 
          will not be shared with any third parties under any circumstances.
        </p>
      </section>

      <section>
        <h2>4. Use of Information</h2>
        <p>
          Your data is used to facilitate the manifestation of your orders, provide seeker support via the 
          WhatsApp Resonance button, and send frequency-calibrated marketing transmissions if you have opted in.
        </p>
      </section>

      <section>
        <h2>5. Your Rights (Field Construction)</h2>
        <p>
          You have the right to access, correct, or delete your personal data at any time. To request a 
          data purge or construction, contact the Alchemist at <strong>support@stateofresonance.ca</strong>.
        </p>
      </section>

      <section>
        <h2>6. Business Identity</h2>
        <p>
          State of Resonance<br />
          Jayson Vinetti<br />
          26 rue Grégoire<br />
          Saint-Jean-sur-Richelieu, QC J3B6C8<br />
          Canada
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.privacy-view {
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
