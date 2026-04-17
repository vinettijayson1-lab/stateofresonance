<script setup lang="ts">
// Social proof + trust signals component for conversions
</script>

<template>
  <section class="social-proof-section container">
    <!-- Trust Badges Row -->
    <div class="trust-row">
      <div class="trust-item">
        <span class="trust-icon">⊕</span>
        <span class="trust-label">WORLDWIDE SHIPPING</span>
      </div>
      <div class="trust-item">
        <span class="trust-icon">◈</span>
        <span class="trust-label">SECURE CHECKOUT</span>
      </div>
      <div class="trust-item">
        <span class="trust-icon">✦</span>
        <span class="trust-label">FREQUENCY GUARANTEED</span>
      </div>
      <div class="trust-item">
        <span class="trust-icon">⋄</span>
        <span class="trust-label">ESOTERIC CURATION</span>
      </div>
    </div>
    
    <!-- Social Trust Badges -->
    <div class="social-trust-row glass">
      <div class="social-trust-item">
        <span class="social-icon">📸</span>
        <div class="social-details">
          <span class="social-count">24.8K+</span>
          <span class="social-label">INSTAGRAM SEEKERS</span>
        </div>
      </div>
      <div class="social-trust-item">
        <span class="social-icon">🎬</span>
        <div class="social-details">
          <span class="social-count">VERIFIED</span>
          <span class="social-label">TIKTOK RESONANCE</span>
        </div>
      </div>
      <div class="social-trust-item">
        <span class="social-icon">📱</span>
        <div class="social-details">
          <span class="social-count">DIRECT</span>
          <span class="social-label">WHATSAPP SUPPORT</span>
        </div>
      </div>
      <div class="social-trust-item">
        <span class="social-icon">🌍</span>
        <div class="social-details">
          <span class="social-count">GLOBAL</span>
          <span class="social-label">SYNCHRONIZATION</span>
        </div>
      </div>
    </div>

    <!-- Social proof quotes -->
    <div class="proof-grid">
      <div class="proof-card glass">
        <p class="proof-quote">"I've never felt energy from clothing before. The Ghost and Bones hoodie changed that. There's something in this fabric."</p>
        <div class="proof-author">
          <span class="proof-name">A.M. — Toronto, ON</span>
          <span class="proof-stars">★★★★★</span>
        </div>
        <span class="proof-badge">VERIFIED ACQUISITION</span>
      </div>
      <div class="proof-card glass">
        <p class="proof-quote">"My altar finally has a center piece. The obsidian scrying mirror arrived perfectly wrapped. The energy was immediate."</p>
        <div class="proof-author">
          <span class="proof-name">J.R. — Vancouver, BC</span>
          <span class="proof-stars">★★★★★</span>
        </div>
        <span class="proof-badge">VERIFIED ACQUISITION</span>
      </div>
      <div class="proof-card glass">
        <p class="proof-quote">"The Her Resonance collection is simply the most beautiful spiritual clothing I've ever worn. Orders arrived within a week."</p>
        <div class="proof-author">
          <span class="proof-name">L.T. — Montréal, QC</span>
          <span class="proof-stars">★★★★★</span>
        </div>
        <span class="proof-badge">VERIFIED ACQUISITION</span>
      </div>
    </div>

    <!-- Urgency / FOMO signal -->
    <div class="fomo-bar glass">
      <span class="fomo-dot"></span>
      <span class="fomo-text">
        <strong>147 seekers</strong> have synchronized with an piece in the last 24 hours
      </span>
    </div>
  </section>
</template>

<style scoped>
.social-proof-section {
  padding: 8vh 0 6vh;
}

/* Trust row */
.trust-row {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-bottom: 6rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(212, 175, 55, 0.08);
  border-bottom: 1px solid rgba(212, 175, 55, 0.08);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.trust-icon {
  font-size: 1rem;
  color: var(--color-gold-muted);
  opacity: 0.6;
}

.trust-label {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}

/* Social Trust Row */
.social-trust-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.12);
  margin-bottom: 6rem;
  overflow: hidden;
}

.social-trust-item {
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: rgba(10, 10, 10, 0.4);
  transition: background 0.3s;
}

.social-trust-item:hover {
  background: rgba(212, 175, 55, 0.03);
}

.social-icon {
  font-size: 1.25rem;
  opacity: 0.8;
}

.social-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.social-count {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  color: var(--color-gold-muted);
}

.social-label {
  font-size: 0.45rem;
  letter-spacing: 0.25em;
  color: rgba(255, 255, 255, 0.4);
}

/* Proof cards */
.proof-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.proof-card {
  padding: 2.5rem;
  border: 1px solid rgba(212, 175, 55, 0.08);
  position: relative;
  transition: border-color 0.4s ease;
}

.proof-card:hover {
  border-color: rgba(212, 175, 55, 0.2);
}

.proof-quote {
  font-size: 0.9rem;
  line-height: 1.8;
  font-style: italic;
  opacity: 0.75;
  margin-bottom: 1.5rem;
}

.proof-author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.proof-name {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.5;
}

.proof-stars {
  color: var(--color-gold-muted);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
}

.proof-badge {
  font-size: 0.45rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.4;
}

/* FOMO bar */
.fomo-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  padding: 1rem 2rem;
  border: 1px solid rgba(212, 175, 55, 0.12);
  max-width: 520px;
  margin: 0 auto;
}

.fomo-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: pulse-dot 2s ease infinite;
  flex-shrink: 0;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.fomo-text {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.5);
}

.fomo-text strong {
  color: var(--color-gold-muted);
}

@media (max-width: 768px) {
  .trust-row { gap: 1.5rem; }
  .social-trust-row { grid-template-columns: 1fr 1fr; }
  .proof-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .social-trust-row { grid-template-columns: 1fr; }
}
</style>
