<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const seers = [
  {
    id: 1,
    name: 'THE ATOMIC OBSERVER',
    piece: 'TAN SOUNDWAVE HOODIE',
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/resonance_piece_a_high_fashion_streetwear_noir_1774960188309.png',
    description: 'A manifestation of biological symmetry and urban armor. Calibrated at 432Hz.'
  },
  {
    id: 2,
    name: 'THE MANDALA SEER',
    piece: 'MANDALA ZIP HOODIE',
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/resonance_piece_b_mandala_model_noir_1774960036525.png',
    description: 'Sacred geometry woven into the fabric of the void. A portal in motion.'
  },
  {
    id: 3,
    name: 'THE NOIR ALCHEMIST',
    piece: 'BLACK CREWNECK',
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/resonance_piece_c_high_fashion_streetwear_noir_1774960221883.png',
    description: 'The fundamental frequency of silence. Minimalist authority.'
  }
]

onMounted(() => {
  gsap.from('.lookbook-title', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'expo.out'
  })

  const cards = document.querySelectorAll('.seer-card')
  cards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: 'expo.out',
      delay: i * 0.1
    })
  })
})
</script>

<template>
  <div class="lookbook-view">
    <div class="lookbook-hero">
      <h1 class="lookbook-title">THE SEERS</h1>
      <p class="lookbook-subtitle">MANIFESTATIONS OF HIGH-FREQUENCY ATTIRE</p>
    </div>

    <div class="seer-grid">
      <div v-for="seer in seers" :key="seer.id" class="seer-card">
        <div class="seer-image-wrapper">
          <img :src="seer.image" :alt="seer.name" class="seer-image" />
          <div class="seer-overlay"></div>
        </div>
        <div class="seer-info">
          <span class="seer-piece-label">{{ seer.piece }}</span>
          <h2 class="seer-name">{{ seer.name }}</h2>
          <p class="seer-desc">{{ seer.description }}</p>
          <router-link :to="`/product/${seer.piece.toLowerCase().replace(/ /g, '-')}`" class="seer-link interactive">
            SYNCHRONIZE ARTIFACT
          </router-link>
        </div>
      </div>
    </div>

    <div class="lookbook-footer">
      <p>BEYOND THE VEIL · BUILT IN THE VOID</p>
    </div>
  </div>
</template>

<style scoped>
.lookbook-view {
  min-height: 100vh;
  background: var(--color-bg);
  padding-top: 15vh;
  padding-bottom: 10vh;
  color: #fff;
}

.lookbook-hero {
  text-align: center;
  margin-bottom: 15vh;
}

.lookbook-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}

.lookbook-subtitle {
  font-size: 0.7rem;
  letter-spacing: 0.5em;
  opacity: 0.4;
  text-transform: uppercase;
}

.seer-grid {
  display: flex;
  flex-direction: column;
  gap: 20vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5vw;
}

.seer-card {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 5vw;
  align-items: center;
}

.seer-card:nth-child(even) {
  grid-template-columns: 0.8fr 1.2fr;
}

.seer-card:nth-child(even) .seer-image-wrapper {
  order: 2;
}

.seer-image-wrapper {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
  background: #0a0a0c;
}

.seer-image {
  width: 100%;
  height: auto;
  display: block;
  filter: grayscale(1) contrast(1.1);
  transition: transform 1.5s var(--ease-out-expo);
}

.seer-card:hover .seer-image {
  transform: scale(1.05);
}

.seer-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8));
  pointer-events: none;
}

.seer-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.seer-piece-label {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  text-transform: uppercase;
}

.seer-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  letter-spacing: 0.1em;
  line-height: 1.1;
}

.seer-desc {
  font-size: 0.9rem;
  line-height: 1.8;
  opacity: 0.6;
  max-width: 400px;
}

.seer-link {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #fff;
  text-decoration: none;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  width: fit-content;
  transition: all 0.3s;
  margin-top: 1rem;
}

.seer-link:hover {
  border-bottom-color: var(--color-gold);
  color: var(--color-gold);
}

.lookbook-footer {
  text-align: center;
  margin-top: 20vh;
  opacity: 0.2;
  font-size: 0.6rem;
  letter-spacing: 0.8em;
}

@media (max-width: 768px) {
  .seer-card, .seer-card:nth-child(even) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .seer-card:nth-child(even) .seer-image-wrapper {
    order: 0;
  }
}
</style>
