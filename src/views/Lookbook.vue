<script setup lang="ts">
import { onMounted, ref } from 'vue'

const loaded = ref(false)

const shots = [
  { src: '/images/lookbook/20260426_152121-edit-20260429171606.jpg', label: 'THE SEER', piece: 'Urban Hoodie', handle: 'urban-hoodie-1', size: 'tall' },
  { src: '/images/lookbook/20260426_152219-edit-20260429171820.jpg', label: 'RESONANCE', piece: 'OG Crewneck', handle: 'og-crewnwck', size: 'wide' },
  { src: '/images/lookbook/20260426_152340-edit-20260429171747.jpg', label: 'VOID FREQUENCY', piece: 'Urban Hoodie', handle: 'urban-hoodie-1', size: 'square' },
  { src: '/images/lookbook/20260426_151256-edit-20260429172132.jpg', label: 'THE SIGNAL', piece: 'Urban Hoodie', handle: 'urban-hoodie-1', size: 'square' },
  { src: '/images/lookbook/20260426_151529-edit-20260429171533.jpg', label: 'THE CHANNEL', piece: 'Urban Hoodie', handle: 'urban-hoodie-1', size: 'tall' },
  { src: '/images/lookbook/hero_pose.jpg', label: 'EARTH FREQUENCY', piece: 'Garment Dyed Hoodie', handle: 'urban-garment-dyed-hoodie-1', size: 'wide' },
  { src: '/images/lookbook/hero_pose_0.jpg', label: 'HERMETIC ORDER', piece: 'Hermetic Scales Pullover', handle: 'the-hermetic-scales-pullover', size: 'square' },
  { src: '/images/lookbook/lookbook-hero.jpg', label: 'HAND OF MYSTERIES', piece: 'Hand of Mysteries Pullover', handle: 'the-hand-of-mysteries-pullover', size: 'tall' },
  { src: '/images/lookbook/20260426_150335.jpg', label: 'THE AWAKENED', piece: 'Awakened Hand Pullover', handle: 'the-awakened-hand-pullover-1', size: 'square' },
  { src: '/images/lookbook/20260426_150343.jpg', label: 'SACRED HEART', piece: 'Sacred Heart', handle: 'sacred-heart', size: 'wide' },
  { src: '/images/lookbook/20260426_150444.jpg', label: 'RESONANCE', piece: 'Resonace Tee', handle: 'resonace', size: 'tall' },
  { src: '/images/lookbook/20260426_150530.jpg', label: 'FADED SIGNAL', piece: 'Oversized Faded Tee', handle: 'oversized-faded-t-shirt', size: 'square' },
  { src: '/images/lookbook/20260426_150732.jpg', label: 'FREQUENCY WASH', piece: 'Oversized Faded Tee', handle: 'oversized-faded-t-shirt', size: 'square' },
  { src: '/images/lookbook/20260426_150747.jpg', label: 'THE ORIGINAL', piece: 'OG Crewneck', handle: 'og-crewnwck', size: 'wide' },
  { src: '/images/lookbook/20260426_151256.jpg', label: 'BOX GEOMETRY', piece: "Men's Box Hoodie", handle: 'men-s-box-hoodie', size: 'tall' },
  { src: '/images/lookbook/20260426_151344.jpg', label: 'HER FREQUENCY', piece: 'Her Resonance Hoodie', handle: 'her-resonance-hoodie', size: 'square' },
  { src: '/images/lookbook/20260426_151349.jpg', label: 'CROPPED RITUAL', piece: 'Crop Hoodie', handle: 'crop-hoodie', size: 'wide' },
  { src: '/images/lookbook/20260426_151450.jpg', label: 'CELESTIAL', piece: 'Celestial Alignment', handle: 'celestial-alignment', size: 'tall' },
  { src: '/images/lookbook/20260426_151529.jpg', label: 'PREMIUM WEIGHT', piece: 'Unisex Premium Sweatshirt', handle: 'unisex-premium-sweatshirt', size: 'square' },
  { src: '/images/lookbook/20260426_151538.jpg', label: 'MID WEIGHT', piece: 'Premium Mid-Weight Hoodie', handle: 'unisex-premium-mid-weight-hoodie-1', size: 'square' },
  { src: '/images/lookbook/20260426_152138.jpg', label: 'OVERSIZE FORM', piece: 'Unisex Oversized Hoodie', handle: 'unisex-oversized-hoodie', size: 'wide' },
  { src: '/images/lookbook/20260426_152314.jpg', label: '450 GSM', piece: 'Heavyweight Tee', handle: 'unisex-garment-dyed-heavyweight-t-shirt', size: 'tall' },
  { src: '/images/lookbook/20260426_152405.jpg', label: 'GARMENT DYED', piece: 'Heavyweight Tee', handle: 'unisex-garment-dyed-heavyweight-t-shirt', size: 'square' },
  { src: '/images/lookbook/20260426_152411.jpg', label: 'EARTH PIGMENT', piece: 'Heavyweight Tee', handle: 'unisex-garment-dyed-heavyweight-t-shirt', size: 'square' },
  { src: '/images/lookbook/20260426_152525.jpg', label: 'FEMININE SIGNAL', piece: "Women's V-Neck", handle: 'women-s-relaxed-v-neck-t-shirt', size: 'wide' },
]

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)

  // Intersection observer for scroll reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).style.opacity = '1'
        ;(e.target as HTMLElement).style.transform = 'translateY(0)'
        obs.unobserve(e.target)
      }
    })
  }, { threshold: 0.08 })

  document.querySelectorAll('.lb-item').forEach(el => obs.observe(el))
})
</script>

<template>
  <div class="lb-view" :class="{ 'is-loaded': loaded }">

    <!-- HERO -->
    <div class="lb-hero">
      <div class="lb-hero-bg">
        <img src="/images/lookbook/lookbook-hero.jpg" alt="State of Resonance — The Lookbook" class="lb-hero-img" />
        <div class="lb-hero-overlay"></div>
      </div>
      <div class="lb-hero-content">
        <span class="lb-eyebrow">✦ SS 2025 COLLECTION ✦</span>
        <h1 class="lb-hero-title">The<br/><em>Lookbook</em></h1>
        <p class="lb-hero-sub">Frequency-calibrated garments photographed in Canada.<br/>Each piece a ritual. Each image an artifact.</p>
        <router-link to="/best-sellers" class="lb-hero-cta">SHOP THE COLLECTION →</router-link>
      </div>
      <div class="lb-hero-scroll">
        <span>SCROLL</span>
        <div class="lb-scroll-line"></div>
      </div>
    </div>

    <!-- INTRO ROW -->
    <div class="lb-intro container">
      <p class="lb-intro-text">25 pieces. One editorial vision. Esoteric luxury built for seekers who dress with intention.</p>
      <div class="lb-intro-meta">
        <span>State of Resonance</span>
        <span>·</span>
        <span>Saint-Jean-sur-Richelieu, QC</span>
        <span>·</span>
        <span>Limited Production Runs</span>
      </div>
    </div>

    <!-- MASONRY GRID -->
    <div class="lb-grid">
      <router-link
        v-for="(shot, i) in shots"
        :key="i"
        :to="`/product/${shot.handle}`"
        class="lb-item"
        :class="`lb-item--${shot.size}`"
        :style="{ transitionDelay: `${(i % 6) * 0.06}s` }"
      >
        <div class="lb-item-img-wrap">
          <img
            :src="shot.src"
            :alt="shot.label"
            class="lb-item-img"
            loading="lazy"
            @error="(e: any) => e.target.src = '/images/lookbook/20260426_152314.jpg'"
          />
          <div class="lb-item-overlay">
            <div class="lb-item-info">
              <span class="lb-item-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="lb-item-label">{{ shot.label }}</span>
              <span class="lb-item-piece">{{ shot.piece }}</span>
              <span class="lb-item-cta">Shop →</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- FOOTER CTA -->
    <div class="lb-footer-cta">
      <div class="container" style="text-align:center;">
        <span class="lb-eyebrow" style="margin-bottom:1.5rem; display:block;">✦ WEAR YOUR FREQUENCY ✦</span>
        <h2 class="lb-footer-heading">Every Piece.<br/>Every Frequency.</h2>
        <p class="lb-footer-sub">Limited runs. Designed and finished in Canada. Ships worldwide.</p>
        <div class="lb-footer-btns">
          <router-link to="/best-sellers" class="btn-premium" style="padding:1rem 2.5rem; font-size:0.8rem; letter-spacing:0.2em;">SHOP ALL PIECES</router-link>
          <router-link to="/about" class="lb-footer-link">Our story →</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ===== VIEW ===== */
.lb-view {
  min-height: 100dvh;
  background: #000;
  color: #fff;
}

/* ===== HERO ===== */
.lb-hero {
  position: relative;
  height: 100dvh;
  min-height: 600px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.lb-hero-bg {
  position: absolute;
  inset: 0;
}
.lb-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  filter: contrast(1.08) brightness(0.95);
  transform: scale(1.04);
  transition: transform 8s ease;
}
.lb-view.is-loaded .lb-hero-img { transform: scale(1); }
.lb-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.85) 100%);
}
.lb-hero-content {
  position: relative;
  z-index: 2;
  padding: 0 5vw 8vh;
  max-width: 700px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease 0.3s, transform 1s ease 0.3s;
}
.lb-view.is-loaded .lb-hero-content { opacity: 1; transform: translateY(0); }
.lb-eyebrow {
  display: block;
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  color: rgba(212,175,55,0.7);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}
.lb-hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-weight: 700;
  line-height: 0.95;
  color: #fff;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}
.lb-hero-title em {
  font-style: italic;
  font-weight: 400;
  color: rgba(255,255,255,0.75);
}
.lb-hero-sub {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 420px;
}
.lb-hero-cta {
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 0.25rem;
  transition: border-color 0.3s, color 0.3s;
}
.lb-hero-cta:hover { border-color: #d4af37; color: #d4af37; }
.lb-hero-scroll {
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.5rem;
  letter-spacing: 0.4em;
  color: rgba(255,255,255,0.3);
}
.lb-scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
  animation: scroll-pulse 2s ease infinite;
}
@keyframes scroll-pulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.15); }
}

/* ===== INTRO ===== */
.lb-intro {
  padding: 6vh 5vw;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap;
}
.lb-intro-text {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 400;
  color: rgba(255,255,255,0.7);
  max-width: 540px;
  line-height: 1.5;
}
.lb-intro-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.25);
  text-transform: uppercase;
  flex-wrap: wrap;
}

/* ===== MASONRY GRID ===== */
.lb-grid {
  columns: 3;
  column-gap: 3px;
  padding: 3px;
}
@media (max-width: 900px) { .lb-grid { columns: 2; } }
@media (max-width: 540px) { .lb-grid { columns: 1; } }

.lb-item {
  display: block;
  break-inside: avoid;
  margin-bottom: 3px;
  text-decoration: none;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  overflow: hidden;
}

/* Size variants — control aspect ratio */
.lb-item--tall .lb-item-img-wrap  { aspect-ratio: 3/4; }
.lb-item--wide .lb-item-img-wrap  { aspect-ratio: 4/3; }
.lb-item--square .lb-item-img-wrap { aspect-ratio: 1/1; }

/* Every 7th item spans full width (editorial break) */
.lb-item:nth-child(7n) {
  column-span: all;
}
.lb-item:nth-child(7n) .lb-item-img-wrap { aspect-ratio: 21/9; }

.lb-item-img-wrap {
  position: relative;
  overflow: hidden;
  background: #050505;
}
.lb-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.5s ease;
  filter: grayscale(0.15);
}
.lb-item:hover .lb-item-img {
  transform: scale(1.06);
  filter: grayscale(0);
}
.lb-item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.lb-item:hover .lb-item-overlay { opacity: 1; }
.lb-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.lb-item-num {
  font-size: 0.5rem;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.3);
}
.lb-item-label {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: #fff;
  line-height: 1.1;
}
.lb-item-piece {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: rgba(212,175,55,0.7);
  text-transform: uppercase;
}
.lb-item-cta {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.5);
  margin-top: 0.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  width: fit-content;
  padding-bottom: 2px;
  transition: color 0.2s;
}
.lb-item:hover .lb-item-cta { color: #fff; }

/* ===== FOOTER CTA ===== */
.lb-footer-cta {
  padding: 12vh 0;
  background: #000;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.lb-footer-heading {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  color: #fff;
  line-height: 1;
  margin-bottom: 1.5rem;
}
.lb-footer-sub {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 3rem;
}
.lb-footer-btns {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.lb-footer-link {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  padding-bottom: 2px;
  transition: color 0.3s;
}
.lb-footer-link:hover { color: rgba(255,255,255,0.8); }

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .lb-hero-scroll { display: none; }
  .lb-intro { flex-direction: column; gap: 1rem; }
}
</style>
