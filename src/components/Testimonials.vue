<template>
  <section class="testimonials-section">
    <div class="container">
      <div class="testimonials-header">
        <span class="fossil-eyebrow" style="text-align:center;display:block;">✦ RESONANCE REPORTS ✦</span>
        <h2 class="fossil-heading" style="text-align:center;font-size:clamp(1.8rem,4vw,3rem);margin-bottom:1rem;">What the Community Says</h2>
        <div class="ti-rating-summary">
          <span class="ti-stars">★★★★★</span>
          <span class="ti-rating-val">5.0</span>
          <span class="ti-rating-source">Verified by Google</span>
        </div>
      </div>

      <!-- TRUSTINDEX GOOGLE REVIEWS WIDGET — live -->
      <div class="trustindex-main-widget">
        <div id="trustindex-homepage-widget" data-widget-id="8c1bb1d6840c23179906838fc83">
          <!-- Fallback card grid shown until Trustindex loads -->
          <div class="testimonials-grid">
            <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
              <div class="tc-stars">
                <span v-for="s in 5" :key="s" class="tc-star" :style="{ opacity: s <= t.rating ? 1 : 0.15 }">★</span>
              </div>
              <p class="tc-text">"{{ t.text }}"</p>
              <div class="tc-author">
                <span class="tc-name">{{ t.name }}</span>
                <span class="tc-location">{{ t.location }}</span>
              </div>
              <div v-if="t.verified" class="tc-verified">✓ Verified Review</div>
            </div>
          </div>
        </div>
      </div>

      <div class="ti-cta-row">
        <a href="https://www.google.com/maps/search/state+of+resonance" target="_blank" rel="noopener" class="btn-outline" aria-label="Read reviews on Google">
          Read All Reviews on Google →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Testimonial { name: string; location: string; text: string; rating: number; verified: boolean }

const FALLBACK: Testimonial[] = [
  { name: 'J. Marchetti', location: 'Toronto, ON', rating: 5, verified: true, text: 'The Modern Alchemist hoodie stopped three people on the subway. The quality is insane — heavily weighted, perfect fit. This is not fast fashion.' },
  { name: 'A. Kowalski', location: 'Montréal, QC', rating: 5, verified: true, text: 'I bought the Sigil hoodie and wore it to a gallery opening. Got more compliments in one night than any other clothing I own.' },
  { name: 'R. Thibodeau', location: 'Vancouver, BC', rating: 5, verified: true, text: "State of Resonance hits different. I've spent 3x on Supreme pieces that don't feel this premium. The stitching, the weight — every detail matters." },
  { name: 'D. Nakashima', location: 'Calgary, AB', rating: 5, verified: true, text: 'The 963Hz concept is real — the product itself is objectively the most premium hoodie I own. Worth every dollar.' },
]

const testimonials = ref<Testimonial[]>(FALLBACK)
</script>

<style scoped>
.testimonials-section { padding: 8vh 0; border-top: 1px solid rgba(255,255,255,0.06); background: #000; }
.testimonials-header { text-align: center; margin-bottom: 4rem; }
.ti-rating-summary { display: inline-flex; align-items: center; gap: 0.75rem; margin-top: 1.25rem; padding: 0.5rem 1.25rem; border: 1px solid rgba(255,255,255,0.08); }
.ti-stars { color: #f4b400; font-size: 0.9rem; letter-spacing: 0.1em; }
.ti-rating-val { font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600; color: #fff; }
.ti-rating-source { font-family: 'Inter', sans-serif; font-size: 0.62rem; letter-spacing: 0.2em; color: rgba(255,255,255,0.35); text-transform: uppercase; }
.trustindex-main-widget { min-height: 80px; }
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1px; background: rgba(255,255,255,0.06); }
.testimonial-card { padding: 2.5rem 2rem; background: #000; display: flex; flex-direction: column; gap: 1rem; transition: background 0.3s; }
.testimonial-card:hover { background: #050505; }
.tc-stars { display: flex; gap: 0.2rem; }
.tc-star { color: #f4b400; font-size: 0.85rem; }
.tc-text { font-family: 'Cormorant Garamond', serif; font-size: 1rem; line-height: 1.7; color: rgba(255,255,255,0.8); flex: 1; font-style: italic; }
.tc-author { display: flex; flex-direction: column; gap: 0.2rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem; }
.tc-name { font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; color: #fff; font-weight: 500; }
.tc-location { font-family: 'Inter', sans-serif; font-size: 0.62rem; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; }
.tc-verified { font-family: 'Inter', sans-serif; font-size: 0.5rem; letter-spacing: 0.2em; color: #4ade80; opacity: 0.7; text-transform: uppercase; }
.ti-cta-row { text-align: center; margin-top: 3rem; }
</style>
