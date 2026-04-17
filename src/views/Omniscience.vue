<script setup lang="ts">
import { nextTick, ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { cart } from '../store/cart';
import { useI18n } from 'vue-i18n';
import { currencyStore } from '../store/currency';
import { useResonanceStore } from '../store/resonance';
import { ArrowLeft, Volume2 } from 'lucide-vue-next';
import SocialShare from '../components/SocialShare.vue';
// Lazy-load Three.js — 532KB only loads if user visits this route
const Omniscience3D = defineAsyncComponent(() => import('../components/Omniscience3D.vue'));
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();
const router = useRouter();
const resonance = useResonanceStore();

const block1 = ref<HTMLElement | null>(null);
const block2 = ref<HTMLElement | null>(null);
const block3 = ref<HTMLElement | null>(null);

// Audio Context (963Hz)
const isAudioPlaying = ref(false);
let audioCtx: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

const toggleAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  if (isAudioPlaying.value) {
    oscillator?.stop();
    isAudioPlaying.value = false;
  } else {
    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(963, audioCtx.currentTime); 
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    isAudioPlaying.value = true;
  }
};

const synchronize = () => {
  const piece = {
    id: 'omni-963',
    title: t('products.omni-963.title') || 'The Omniscience Piece',
    handle: 'the-omniscience-piece',
    price: '963.00', 
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/resonance_piece_a_high_fashion_streetwear_noir_1774960188309.png',
    category: 'Garments',
    variantId: 'o963'
  };
  cart.add(piece);
  resonance.addPoints(500); // Massive resonance gain for acquiring the Singularity
};

onMounted(async () => {
  await nextTick();
  // Hero Entrance
  gsap.from('.piece-title', { opacity: 0, y: 20, duration: 1.5, delay: 0.5 });
  gsap.from('.merkabah-ritual-container', { opacity: 0, scale: 0.8, duration: 2, ease: 'expo.out' });

  // Scroll Animations
  [block1.value, block2.value, block3.value].forEach((el, i) => {
    if (!el) return;
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Footer reveal
  gsap.from('.ritual-footer', {
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: '.story-sections',
      start: 'bottom 100%',
      toggleActions: 'play none none reverse'
    }
  });
});

onUnmounted(() => {
  oscillator?.stop();
  audioCtx?.close();
});
</script>

<template>
  <div class="omniscience-ritual custom-scroll">
    <!-- Immersive Background -->
    <div class="void-background">
      <div class="stars-layer"></div>
      <div class="resonance-glow"></div>
    </div>

    <!-- Navigation -->
    <nav class="ritual-nav">
      <router-link to="/shop" class="back-link">
        <ArrowLeft :size="16" />
        <span>{{ $t('omniscience.back_to_sanctuary') }}</span>
      </router-link>
      <div class="nav-branding gold-text">OMNISCIENCE PROTOCOL</div>
    </nav>

    <!-- Hero Section -->
    <header class="ritual-hero">
      <div class="merkabah-ritual-container">
        <Omniscience3D />
      </div>
      <h1 class="piece-title gold-text">{{ $t('products.omni-963.title') || 'The Omniscience Piece' }}</h1>
      <p class="subtitle">{{ $t('omniscience.step1_title') }}</p>
    </header>

    <!-- Audio Toggle (963Hz) -->
    <button @click="toggleAudio" class="audio-control" :class="{ 'is-active': isAudioPlaying }">
      <div class="audio-waves" v-if="isAudioPlaying">
        <span></span><span></span><span></span>
      </div>
      <Volume2 :size="18" v-else />
      <span>{{ $t('omniscience.audio_toggle') }}</span>
    </button>

    <!-- Storytelling Flux -->
    <section class="story-sections">
      <div class="story-block" ref="block1">
        <h2 class="gold-text">{{ $t('omniscience.step1_title') }}</h2>
        <p>{{ $t('omniscience.step1_body') }}</p>
      </div>

      <div class="story-block" ref="block2">
        <h2 class="gold-text">{{ $t('omniscience.step2_title') }}</h2>
        <p>{{ $t('omniscience.step2_body') }}</p>
      </div>

      <div class="story-block" ref="block3">
        <h2 class="gold-text">{{ $t('omniscience.step3_title') }}</h2>
        <p>{{ $t('omniscience.step3_body') }}</p>
      </div>
    </section>

    <!-- The Call to Source -->
    <footer class="ritual-footer">
      <div class="piece-preview glass">
        <div class="footer-meta">
          <span class="meta-vibe">{{ $t('products.omni-963.type') || 'Singularity' }}</span>
          <span class="price-val">{{ currencyStore.formatPrice(96.3) }}</span>
        </div>
        <button @click="synchronize" class="btn-premium sync-btn interactive">
          {{ $t('omniscience.action_button') }}
        </button>
        <SocialShare 
          :title="t('products.omni-963.title')" 
          image="https://cdn.shopify.com/s/files/1/0787/0808/0663/files/resonance_piece_a_high_fashion_streetwear_noir_1774960188309.png" 
        />
      </div>
    </footer>
  </div>
</template>

<style scoped>
.omniscience-ritual {
  min-height: 100dvh;
  background: #050505;
  color: #fff;
  position: relative;
  overflow-x: hidden;
  font-family: var(--font-body);
}

.void-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
}

.stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 100px 150px, #fff, rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 200px 300px, var(--color-gold), rgba(0,0,0,0));
  background-size: 300px 300px;
  opacity: 0.1;
}

.ritual-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(5px);
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 0.75rem;
  font-family: var(--font-heading);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.back-link:hover {
  color: #fff;
  transform: translateX(-5px);
}

.nav-branding {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  opacity: 0.8;
}

.ritual-hero {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
}

.merkabah-container {
  width: 300px;
  height: 300px;
  margin-bottom: 3rem;
  position: relative;
}

.merkabah-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.2));
}

.geometry-path {
  fill: none;
  stroke: var(--color-gold);
  stroke-width: 0.5;
  opacity: 0.4;
}

.geometry-core {
  fill: var(--color-gold);
  opacity: 0.8;
  filter: drop-shadow(0 0 10px var(--color-gold));
}

.core-orbit {
  fill: none;
  stroke: rgba(255,255,255,0.1);
  stroke-width: 0.3;
  stroke-dasharray: 4 4;
}

.piece-title {
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.subtitle {
  font-size: 0.8rem;
  opacity: 0.6;
  letter-spacing: 0.3em;
  font-family: var(--font-heading);
}

.audio-control {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.75rem 1.25rem;
  border-radius: 99px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.65rem;
  font-family: var(--font-heading);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}

.audio-control:hover {
  background: rgba(255,255,255,0.08);
  border-color: var(--color-gold);
}

.audio-control.is-active {
  color: var(--color-gold);
  border-color: var(--color-gold);
  background: rgba(212, 175, 55, 0.05);
}

.audio-waves {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}

.audio-waves span {
  width: 2px;
  background: var(--color-gold);
  border-radius: 1px;
  animation: wave 1s ease-in-out infinite;
}

.audio-waves span:nth-child(2) { animation-delay: 0.2s; height: 100%; }
.audio-waves span:nth-child(1) { animation-delay: 0s; height: 60%; }
.audio-waves span:nth-child(3) { animation-delay: 0.4s; height: 80%; }

@keyframes wave {
  0%, 100% { height: 4px; }
  50% { height: 14px; }
}

.story-sections {
  max-width: 800px;
  margin: 0 auto;
  padding: 10rem 2rem;
  position: relative;
  z-index: 1;
}

.story-block {
  margin-bottom: 15rem;
  text-align: center;
}

.story-block h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.story-block p {
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.7;
  max-width: 600px;
  margin: 0 auto;
}

.ritual-footer {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15rem;
  position: relative;
  z-index: 1;
}

.piece-preview {
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 4px;
}

.footer-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.meta-vibe {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  opacity: 0.5;
  text-transform: uppercase;
}

.price-val {
  font-size: 2rem;
  font-family: var(--font-heading);
  color: var(--color-gold-muted);
}

.sync-btn {
  width: 100%;
  padding: 1.25rem;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
}

@media (max-width: 768px) {
  .piece-title { font-size: 2rem; }
  .merkabah-container { width: 200px; height: 200px; }
  .story-block { margin-bottom: 10rem; }
}
</style>
