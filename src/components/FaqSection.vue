<template>
  <section class="faq-section">
    <div class="container">
      <div class="faq-header">
        <span class="section-eyebrow">— DECRYPTING THE SIGNAL —</span>
        <h2 class="hero-title" style="font-size: clamp(1.6rem, 2.5vw, 2.2rem);">Frequently Asked</h2>
      </div>

      <div class="faq-list">
        <div
          v-for="(faq, idx) in faqs"
          :key="idx"
          class="faq-item"
          :class="{ open: openIdx === idx }"
          @click="toggle(idx)"
        >
          <div class="faq-question">
            <span>{{ faq.q }}</span>
            <span class="faq-chevron">{{ openIdx === idx ? '−' : '+' }}</span>
          </div>
          <div class="faq-answer" v-show="openIdx === idx">
            <p>{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const openIdx = ref<number | null>(0)

const toggle = (idx: number) => {
  openIdx.value = openIdx.value === idx ? null : idx
}

const faqs = [
  {
    q: 'What makes State of Resonance different from other streetwear brands?',
    a: 'State of Resonance operates at the intersection of esoteric philosophy and premium streetwear. Each piece (garment) is assigned a Solfeggio frequency that aligns with its vibrational intent — 963 Hz for divine consciousness, 528 Hz for transformation. This is not decoration. It is a design system rooted in sacred geometry and field resonance theory.'
  },
  {
    q: 'What is the quality of the materials?',
    a: 'Every piece in the laboratory is heavyweight premium construction — 400GSM cotton-fleece for hoodies, 210GSM ringspun for tees. We refuse fast-fashion timelines. Limited production runs mean each garment receives individual attention. Once a run is complete, it does not return.'
  },
  {
    q: 'Do you ship to Canada?',
    a: 'Yes. State of Resonance ships across Canada. Orders over $110 CAD qualify for free shipping. Standard delivery is 3–7 business days. All orders are tracked from the laboratory to your threshold.'
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day no-questions-asked return window. If an piece does not resonate with your field, we will exchange or refund it. Contact us via the Transmissions page to initiate.'
  },
  {
    q: 'How do I get early access to new drops?',
    a: 'Subscribe through the Transmissions page to receive signals before the general public. Early Access members receive the access code 48 hours before each drop goes live, along with an exclusive 20% discount.'
  },
  {
    q: 'What sizes are available?',
    a: 'All garments are available in XS through 3XL. Size charts are included on each product page. If you are between sizes, we recommend sizing up — our garments are intentionally substantial.'
  }
]

// Inject FAQ structured data for Google rich results
onMounted(() => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = 'ld-faq'
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
})
</script>

<style scoped>
.faq-section {
  padding: 10vh 0;
  border-top: 1px solid rgba(255,255,255,0.04);
}

.faq-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-eyebrow {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.faq-list {
  max-width: 700px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  transition: border-color 0.2s;
}

.faq-item.open {
  border-color: rgba(212,175,55,0.2);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  gap: 1rem;
}

.faq-chevron {
  font-size: 1.2rem;
  color: var(--color-gold-muted);
  flex-shrink: 0;
  font-weight: 300;
}

.faq-answer {
  padding-bottom: 1.5rem;
}

.faq-answer p {
  font-size: 0.82rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.55);
}
</style>
