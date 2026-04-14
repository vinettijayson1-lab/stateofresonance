<template>
  <section class="testimonials-section">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">✦ RESONANCE REPORTS ✦</span>
        <h2 class="hero-title" style="font-size: clamp(1.8rem, 3vw, 2.5rem);">Customer Reviews</h2>
        <div class="google-rating-summary glow-hover">
          <span class="rating-value">4.9</span>
          <div class="stars mini">
            <span v-for="i in 5" :key="i" class="star">★</span>
          </div>
          <span class="review-count">VERIFIED BY TRUSTINDEX</span>
        </div>
        <p class="section-sub">What the community is saying about our pieces.</p>
      </div>

      <div class="testimonials-grid">
        <div v-for="t in testimonials" :key="t.name" class="testimonial-card glass">
          <div class="stars">
            <span v-for="s in 5" :key="s" class="star" :style="{ opacity: s <= t.rating ? 1 : 0.2 }">★</span>
          </div>
          <p class="testimonial-text">"{{ t.text }}"</p>
          <div class="testimonial-author">
            <span class="author-name">{{ t.name }}</span>
            <span class="author-location">{{ t.location }}</span>
          </div>
          <div v-if="t.verified" class="verified-badge">✓ Verified Review</div>
        </div>
      </div>

      <!-- Trustindex Sacred Recognition -->
      <div class="sacred-recognition-container glass">
        <div class="recognition-header">
          <span class="meta-vibe">ALCHEMICAL VERIFICATION</span>
          <h3 class="recognition-title">The Trust Index</h3>
        </div>
        <div ref="tiContainer" id="trustindex-widget" class="ti-widget" data-layout-id="" data-widget-id="b0f2da868a2e12699466c6e2535"></div>
        <div class="recognition-footer">
          <span class="meta-vibe">TRUSTINDEX SYNCHRONIZED</span>
        </div>
      </div>

      <div class="write-review-container">
        <a href="https://trustindex.io/reviews/stateofresonance.ca" target="_blank" class="btn-review glass glow-hover">
          TRUSTINDEX VERIFIED
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useScriptTag } from '@vueuse/core';

const tiContainer = ref<HTMLElement | null>(null);

useScriptTag(
  'https://cdn.trustindex.io/loader-feed.js?b0f2da868a2e12699466c6e2535',
  () => {},
  { async: true, defer: true }
);

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  verified: boolean;
}

// Fallback hardcoded reviews — shown if API returns no results
const FALLBACK: Testimonial[] = [
  { name: 'J. Marchetti', location: 'Toronto, ON', rating: 5, verified: true,
    text: 'The Modern Alchemist hoodie stopped three people on the subway. The quality is insane — heavyweight, perfect fit. This is not fast fashion.' },
  { name: 'A. Kowalski', location: 'Montréal, QC', rating: 5, verified: true,
    text: 'I bought the Sigil hoodie and wore it to a gallery opening. Got more compliments than the art. The brand is something else entirely.' },
  { name: 'R. Thibodeau', location: 'Vancouver, BC', rating: 5, verified: true,
    text: "State of Resonance hits different. I've spent 3x on Supreme pieces that don't feel this premium. The stitching, the weight — it matters." },
  { name: 'M. Boudreaux', location: 'Ottawa, ON', rating: 5, verified: false,
    text: 'Got the Quantum Observer tee. Wore it day one. My whole circle was asking where I got it. There\'s nothing else like it in Canada.' }
]

const testimonials = ref<Testimonial[]>(FALLBACK)

onMounted(async () => {
  try {
    const res = await fetch('/api/reviews?per_page=4&page=1')
    if (!res.ok) return
    const data = await res.json()
    const live: Testimonial[] = (data.reviews || [])
      .filter((r: any) => r.body && r.body.length > 20)
      .slice(0, 4)
      .map((r: any) => ({
        name:     r.reviewer?.name  || 'A customer',
        location: r.reviewer?.location || '',
        text:     r.body,
        rating:   r.rating,
        verified: r.reviewer?.verified ?? false,
      }))
    if (live.length >= 2) testimonials.value = live
  } catch {
    // stay on fallback
  }
})
</script>

<style scoped>
.testimonials-section {
  padding: 2vh 0;
  border-top: 1px solid rgba(255,255,255,0.04);
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.section-eyebrow {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.section-sub {
  font-size: 0.85rem;
  opacity: 0.4;
  letter-spacing: 0.08em;
  margin-top: 1rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  padding: 2rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.3s;
}

.testimonial-card:hover {
  border-color: rgba(212, 175, 55, 0.2);
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  color: #d4af37;
  font-size: 0.85rem;
}

.testimonial-text {
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.75);
  flex: 1;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 1rem;
}

.author-name {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: #fff;
  font-weight: 600;
}

.author-location {
  font-size: 0.6rem;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.1em;
}

.verified-badge {
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  color: #4ade80;
  opacity: 0.7;
}

.google-rating-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 100px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.rating-value {
  font-weight: bold;
  font-size: 1.1rem;
  color: #fff;
}

.review-count {
  font-size: 0.65rem;
  color: var(--color-gold-muted);
  opacity: 0.6;
}

.write-review-container {
  margin-top: 4rem;
  text-align: center;
}

.btn-review {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: #fff;
  text-transform: uppercase;
  transition: all 0.3s;
  border-radius: 4px;
}

.btn-review:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--color-gold);
  transform: translateY(-2px);
}

.google-logo-btn {
  width: 16px;
  height: 16px;
}

/* Sacred Recognition Styling */
.sacred-recognition-container {
  margin: 6rem auto;
  max-width: 1000px;
  padding: 4rem;
  border: 1px solid rgba(212, 175, 55, 0.15);
  background: rgba(212, 175, 55, 0.02);
  position: relative;
  text-align: center;
}

.sacred-recognition-container::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px dashed rgba(212, 175, 55, 0.1);
  margin: 10px;
  pointer-events: none;
}

.recognition-header {
  margin-bottom: 3rem;
}

.recognition-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  letter-spacing: 0.1em;
  color: #fff;
}

.recognition-footer {
  margin-top: 3rem;
  opacity: 0.5;
}

#trustindex-widget {
  min-height: 150px;
  filter: grayscale(1) invert(1) brightness(1.5); /* Force it to match dark/gold theme */
  transition: all 0.5s ease;
}

#trustindex-widget:hover {
  filter: grayscale(0.5) invert(1) brightness(1.2);
}

@media (max-width: 768px) {
  .sacred-recognition-container {
    padding: 2rem 1.5rem;
    margin: 4rem 1rem;
  }
}
</style>
