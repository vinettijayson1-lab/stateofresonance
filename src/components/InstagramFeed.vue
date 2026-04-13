<template>
  <section id="instagram-feed" class="instagram-feed section-top">
    <div class="container text-center">
      <div style="margin-bottom: 60px;">
        <h2 class="hero-title" style="font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 1rem;">As Seen In The Void</h2>
        <p class="product-meta" style="opacity: 0.4; letter-spacing: 0.3em;">@STATEOFRESONANCE</p>
      </div>
      
      <!-- TrustIndex Widget -->
      <div class="ti-widget" data-widget-id="23e85926815b0989143629301fc"></div>

      <!-- Fallback / Static Feed -->
      <div class="insta-grid section-top">
        <div v-for="(img, index) in images" :key="index" class="insta-item glass glow-hover">
          <img :src="img" alt="Sanctuary Artifact" loading="lazy">
          <div class="insta-overlay">
            <Instagram :size="24" />
          </div>
        </div>
      </div>

      <div class="section-top" style="text-align: center;">
        <a href="https://instagram.com/resonancestateof" target="_blank" class="btn-gold" style="padding: 1rem 3rem;">
          FOLLOW THE SANCTUARY →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Instagram } from 'lucide-vue-next'

const images = [
  '/assets/ritual_candles_photoshoot_trio.png',
  '/assets/lavender_oil_photoshoot.png',
  '/assets/obsidian_scrying_mirror_ritual.png',
  '/assets/ritual_cauldron_photoshoot.png',
  '/assets/frankincense_tears_photoshoot.png',
  '/assets/pentacle_amulet_photoshoot.png'
]
</script>

<style scoped>
.instagram-feed {
  padding: 15vh 0;
  background: var(--color-obsidian);
  border-top: 1px solid var(--glass-border);
}

.insta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.insta-item {
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--glass-border);
}

.insta-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s var(--ease-out-expo);
  filter: contrast(1.1) brightness(0.9);
}

.insta-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  color: var(--color-gold);
}

.insta-item:hover img {
  transform: scale(1.1);
  filter: contrast(1.2) brightness(1.1);
}

.insta-item:hover .insta-overlay {
  opacity: 1;
}

@media (max-width: 768px) {
  .insta-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
}
</style>
