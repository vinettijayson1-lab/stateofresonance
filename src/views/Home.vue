<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { klaviyoService } from '../services/klaviyo'

const FaqSection = defineAsyncComponent(() => import('../components/FaqSection.vue'))

interface Product { id: string; title: string; price: string; category: string; image: string; handle: string }

const attireProducts = ref<Product[]>([])
const loading = ref(true)
const seekerEmail = ref('')
const subscribeStatus = ref<'idle'|'loading'|'success'|'error'>('idle')

// Live clock
const clockTime = ref('')
const updateClock = () => {
  const now = new Date()
  const h = String(now.getHours()).padStart(2,'0')
  const m = String(now.getMinutes()).padStart(2,'0')
  const s = String(now.getSeconds()).padStart(2,'0')
  clockTime.value = `${h}:${m}:${s}`
}

onMounted(async () => {
  updateClock()
  setInterval(updateClock, 1000)
  try {
    const res = await fetch('/api/products?limit=24')
    const data = await res.json()
    attireProducts.value = Array.isArray(data) ? data : []
  } catch (e) { console.error('Failed to fetch products:', e) }
  finally { loading.value = false }
})

const handleEmailSync = async () => {
  if (!seekerEmail.value) return
  subscribeStatus.value = 'loading'
  try {
    await klaviyoService.identify(seekerEmail.value, { source: 'Homepage Newsletter' })
    subscribeStatus.value = 'success'
    seekerEmail.value = ''
  } catch { subscribeStatus.value = 'error' }
}

const archiveLogs = [
  { id: 'C-01', type: 'ATTIRE DESIGN LOG', title: 'Protocol 01 — Aesthetic Dissolution', body: 'The Alchemist tier represents the pinnacle of our design ethos. Woven with 450gsm organic materials and structured for modern brutalism, our garments serve as a canvas for occult exploration. Every stitch represents a departure from the mundane, designed and finished in Canada.' },
  { id: 'C-02', type: 'SANCTUARY DESIGN LOG', title: 'Protocol 02 — The Occult Canvas', body: 'True luxury lies in the details. State of Resonance ritual tools and heavy-weight garments act as passive emitters of artistic intent — sustained aesthetic immersion through cryptic symbolism and premium material construction.' },
  { id: 'C-03', type: 'GARMENT FIELD NOTE', title: 'Protocol 03 — Natural Tuning', body: 'Mathematical foundations of the natural world serve as our blueprint — from the spiral of a nautilus shell to architectural silhouettes. Products designed under this mandate serve as anchors.' },
]
</script>

<template>
  <div class="home-view">

    <!-- SECTION 1: FOSSIL HERO -->
    <section class="fossil-hero">
      <div class="fossil-hero-bg">
        <img src="/images/upgraded/ps-edit-2.jpg" alt="State of Resonance" class="fossil-hero-img" fetchpriority="high" />
        <div class="fossil-hero-overlay"></div>
      </div>

      <!-- Centered Vertical Nav (Fossil style) -->
      <div class="fossil-hero-center">
        <h1 class="fossil-brand-wordmark">STATE OF RESONANCE</h1>
        <nav class="fossil-center-nav" aria-label="Primary navigation">
          <router-link to="/best-sellers" class="fossil-nav-item">Shop</router-link>
          <router-link to="/best-sellers" class="fossil-nav-item">New Arrivals</router-link>
          <router-link to="/lookbook" class="fossil-nav-item">Lookbook</router-link>
          <router-link to="/transmissions" class="fossil-nav-item">Archives</router-link>
          <router-link to="/contact" class="fossil-nav-item">Contact</router-link>
        </nav>
      </div>

      <!-- City Clock -->
      <div class="fossil-city-clock">
        <span class="fossil-city-label">MONTRÉAL:</span>
        <span class="fossil-clock-time">{{ clockTime }}</span>
      </div>
    </section>

    <!-- SECTION 2: TICKER -->
    <div class="fossil-ticker" aria-hidden="true">
      <div class="fossil-ticker-inner">
        <span class="fossil-ticker-item">✦ 450GSM HEAVYWEIGHT COTTON</span>
        <span class="fossil-ticker-item">✦ DESIGNED IN CANADA</span>
        <span class="fossil-ticker-item">✦ LIMITED-RUN DROPS</span>
        <span class="fossil-ticker-item">✦ FREQUENCY-CALIBRATED</span>
        <span class="fossil-ticker-item">✦ LOCALLY EMBROIDERED</span>
        <span class="fossil-ticker-item">✦ FREE SHIPPING $110+</span>
        <span class="fossil-ticker-item">✦ 450GSM HEAVYWEIGHT COTTON</span>
        <span class="fossil-ticker-item">✦ DESIGNED IN CANADA</span>
        <span class="fossil-ticker-item">✦ LIMITED-RUN DROPS</span>
        <span class="fossil-ticker-item">✦ FREQUENCY-CALIBRATED</span>
        <span class="fossil-ticker-item">✦ LOCALLY EMBROIDERED</span>
        <span class="fossil-ticker-item">✦ FREE SHIPPING $110+</span>
      </div>
    </div>

    <!-- SECTION 3: SHOP GRID -->
    <section class="fossil-shop-section">
      <div class="container">
        <div class="fossil-shop-header">
          <div>
            <span class="fossil-eyebrow">The Collection</span>
            <h2 class="fossil-heading">Shop</h2>
          </div>
          <router-link to="/best-sellers" class="fossil-view-all">View all →</router-link>
        </div>
      </div>
      <div v-if="loading" class="skeleton-grid" style="margin-top:1px;">
        <div v-for="n in 6" :key="n" class="skeleton-card"></div>
      </div>
      <div v-else-if="attireProducts.length === 0" style="text-align:center;padding:6rem 0;opacity:0.4;">
        <p style="font-size:0.75rem;letter-spacing:0.2em;margin-bottom:2rem;">COLLECTION LOADING...</p>
        <router-link to="/best-sellers" class="btn-outline">Browse Collection</router-link>
      </div>
      <div v-else class="product-grid">
        <ProductCard v-for="product in attireProducts.slice(0,6)" :key="product.id" :product="product" />
      </div>
      <div style="text-align:center;padding:4rem 0 2rem;">
        <router-link to="/collections/all" class="btn-outline">View Full Collection</router-link>
      </div>
    </section>

    <!-- SECTION 5: BRAND STORY -->
    <section class="fossil-brand-story">
      <div class="container">
        <div class="fossil-brand-story-inner">
          <span class="fossil-eyebrow">The Origin</span>
          <blockquote class="fossil-founder-quote">
            "Through a profound personal journey, I learned a visceral truth: Matter must serve Spirit, and healing must come from within."
          </blockquote>
          <div class="fossil-founder-meta">
            <span>— Jayson Vinetti, Founder</span>
            <router-link to="/about" class="fossil-story-link">Read the Full Story →</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: CRAFT PILLARS -->
    <section class="fossil-pillars">
      <div class="container">
        <div class="fossil-pillars-header">
          <span class="fossil-eyebrow">The Difference</span>
          <h2 class="fossil-heading" style="font-size:clamp(1.8rem,4vw,3rem);">Crafted for Presence.</h2>
        </div>
        <div class="fossil-pillars-grid">
          <div class="fossil-pillar-item">
            <span class="fossil-pillar-num">01</span>
            <h3>450gsm Heavyweight</h3>
            <p>Structured weight you can feel the moment you hold it.</p>
          </div>
          <div class="fossil-pillar-item">
            <span class="fossil-pillar-num">02</span>
            <h3>Designed in Canada</h3>
            <p>Each piece designed and inspected locally before it reaches you.</p>
          </div>
          <div class="fossil-pillar-item">
            <span class="fossil-pillar-num">03</span>
            <h3>Sacred Geometry</h3>
            <p>Ancient symbols calibrated to solfeggio frequencies: 432Hz, 528Hz, 963Hz.</p>
          </div>
          <div class="fossil-pillar-item">
            <span class="fossil-pillar-num">04</span>
            <h3>Small-Batch Only</h3>
            <p>Limited production runs. Once gone, they're gone.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6.5: ARCHIVES PREVIEW -->
    <section class="fossil-archives-section">
      <div class="container">
        <div class="fossil-shop-header">
          <div>
            <span class="fossil-eyebrow">From the Laboratory</span>
            <h2 class="fossil-heading" style="font-size:clamp(2rem,4vw,3.5rem);">Construction Logs</h2>
          </div>
          <router-link to="/transmissions" class="fossil-view-all">View all archives →</router-link>
        </div>
        <div class="fossil-archives-grid">
          <router-link to="/transmissions" class="fossil-archive-card" v-for="(log, i) in archiveLogs" :key="i">
            <span class="fossil-archive-num">{{ log.id }}</span>
            <span class="fossil-eyebrow" style="margin-bottom:0.75rem;">{{ log.type }}</span>
            <h3 class="fossil-archive-title">{{ log.title }}</h3>
            <p class="fossil-archive-body">{{ log.body.substring(0, 120) }}…</p>
            <span class="fossil-archive-link">Read protocol →</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SECTION 7: TRUST STRIP -->
    <div class="homepage-trust-strip">
      <div class="trust-strip-inner">
        <div class="trust-strip-item"><span class="trust-icon">⭐</span><span>5.0 Google Verified</span></div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item"><span class="trust-icon">🚚</span><span>Free Shipping $110+</span></div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item"><span class="trust-icon">↩️</span><span>30-Day Returns</span></div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item"><span class="trust-icon">🔒</span><span>Secure Checkout</span></div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item"><span class="trust-icon">🇨🇦</span><span>Ships from Canada</span></div>
      </div>
    </div>


    <!-- SECTION 9: EMAIL CAPTURE -->
    <section class="fossil-email-section">
      <div class="container">
        <div class="fossil-email-inner">
          <div class="fossil-email-text">
            <span class="fossil-eyebrow">Decode Your Symbol</span>
            <h2 class="fossil-heading" style="font-size:clamp(2rem,5vw,3.5rem);">Enter the<br/>Frequency.</h2>
          </div>
          <div class="fossil-email-form">
            <p class="fossil-subtext" style="margin-bottom:2rem;">Get your free symbol guide + early drop access.</p>
            <div v-if="subscribeStatus !== 'success'" class="fossil-email-input-group">
              <input v-model="seekerEmail" type="email" placeholder="YOUR EMAIL ADDRESS" class="fossil-email-input" id="home-email-input" />
              <button @click="handleEmailSync" class="btn-premium animate-glint" :disabled="subscribeStatus === 'loading'" id="home-email-submit">
                {{ subscribeStatus === 'loading' ? 'Sending...' : 'Unlock Guide' }}
              </button>
            </div>
            <p v-else class="gold-text" style="font-size:0.75rem;letter-spacing:0.2em;">✦ GUIDE SENT. CHECK YOUR INBOX.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* FOSSIL HERO */
.fossil-hero {
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}
.fossil-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.fossil-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
}
.fossil-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.35) 0%,
    rgba(0,0,0,0.1) 40%,
    rgba(0,0,0,0.5) 80%,
    rgba(0,0,0,0.85) 100%
  );
}
.fossil-hero-center {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  text-align: center;
}
.fossil-brand-wordmark {
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  letter-spacing: 0.55em;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
}
.fossil-center-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.fossil-nav-item {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 400;
  color: rgba(255,255,255,0.88);
  text-decoration: none;
  letter-spacing: 0.02em;
  line-height: 1.2;
  transition: color 0.3s ease, transform 0.3s ease;
}
@media (hover: hover) and (pointer: fine) {
  .fossil-nav-item:hover { color: #fff; transform: translateX(6px); }
}
.fossil-city-clock {
  position: absolute;
  bottom: 2rem;
  left: 5vw;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}
.fossil-city-label { color: rgba(255,255,255,0.3); }
.fossil-clock-time { color: rgba(255,255,255,0.7); font-variant-numeric: tabular-nums; }

/* SHOP SECTION */
.fossil-shop-section { padding: 6rem 0 0; background: #000; }
.fossil-shop-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3rem;
}
.fossil-view-all {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.3s;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.fossil-view-all:hover { color: #fff; border-color: rgba(255,255,255,0.5); }

/* LOOKBOOK */
.fossil-lookbook { background: #000; padding: 0; overflow: hidden; }
.fossil-lookbook-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2px;
  min-height: 80vh;
  position: relative;
}
.fossil-lookbook-main { overflow: hidden; }
.fossil-lookbook-side { display: grid; grid-template-rows: 1fr 1fr; gap: 2px; }
.fossil-lookbook-top, .fossil-lookbook-bottom { overflow: hidden; }
.fossil-lookbook-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
.fossil-lookbook-main:hover .fossil-lookbook-img,
.fossil-lookbook-top:hover .fossil-lookbook-img,
.fossil-lookbook-bottom:hover .fossil-lookbook-img { transform: scale(1.04); }
.fossil-lookbook-text-overlay {
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  z-index: 10;
  max-width: 380px;
}
.fossil-lookbook-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  color: #fff;
  line-height: 1.05;
  margin-bottom: 1rem;
  text-shadow: 0 2px 20px rgba(0,0,0,0.5);
}
.fossil-lookbook-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.65);
  letter-spacing: 0.05em;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.fossil-lookbook-cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 0.2rem;
  transition: color 0.3s, border-color 0.3s;
}
.fossil-lookbook-cta:hover { color: #fff; border-color: rgba(255,255,255,0.7); }
@media (max-width: 768px) {
  .fossil-lookbook-grid { grid-template-columns: 1fr; min-height: auto; }
  .fossil-lookbook-side { grid-template-rows: 260px 260px; }
  .fossil-lookbook-text-overlay { position: relative; bottom: auto; left: auto; padding: 2.5rem 5vw; max-width: 100%; }
}

/* BRAND STORY */
.fossil-brand-story { padding: 10vh 0; background: #000; border-top: 1px solid rgba(255,255,255,0.06); }
.fossil-brand-story-inner { max-width: 800px; margin: 0 auto; }
.fossil-founder-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-style: italic;
  font-weight: 300;
  color: rgba(255,255,255,0.9);
  line-height: 1.5;
  margin-bottom: 2.5rem;
  border-left: 2px solid rgba(212,175,55,0.4);
  padding-left: 2rem;
}
.fossil-founder-meta {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
}
.fossil-story-link {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 0.15rem;
  transition: color 0.3s, border-color 0.3s;
}
.fossil-story-link:hover { color: #fff; border-color: rgba(255,255,255,0.6); }

/* PILLARS */
.fossil-pillars { padding: 8vh 0; background: #000; border-top: 1px solid rgba(255,255,255,0.06); }
.fossil-pillars-header { margin-bottom: 4rem; }
.fossil-pillars-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3rem; }
@media (max-width: 1024px) { .fossil-pillars-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .fossil-pillars-grid { grid-template-columns: 1fr; gap: 2rem; } }
.fossil-pillar-item { padding: 2rem 0; border-top: 1px solid rgba(255,255,255,0.08); }
.fossil-pillar-num {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.25);
  margin-bottom: 1.25rem;
}
.fossil-pillar-item h3 {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.04em;
  margin-bottom: 0.75rem;
}
.fossil-pillar-item p {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.65;
}

/* EMAIL SECTION */
.fossil-email-section {
  padding: 8vh 0;
  background: #000;
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.fossil-email-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
@media (max-width: 768px) { .fossil-email-inner { grid-template-columns: 1fr; gap: 3rem; } }
.fossil-email-input-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.fossil-email-input {
  flex: 1;
  min-width: 200px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.85rem 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  outline: none;
  transition: border-color 0.3s;
}
.fossil-email-input:focus { border-color: rgba(255,255,255,0.6); }
.fossil-email-input::placeholder { color: rgba(255,255,255,0.3); letter-spacing: 0.2em; font-size: 0.72rem; }

/* HERO MOBILE */
@media (max-width: 768px) {
  .fossil-brand-wordmark { font-size: 0.75rem; letter-spacing: 0.4em; }
  .fossil-nav-item { font-size: clamp(1.8rem, 8vw, 2.5rem); }
  .fossil-city-clock { font-size: 0.6rem; bottom: 1.5rem; }
  .fossil-shop-header { flex-direction: column; align-items: flex-start; gap: 1rem; margin-bottom: 2rem; }
}

/* ARCHIVES SECTION */
.fossil-archives-section { padding: 8vh 0; background: #000; border-top: 1px solid rgba(255,255,255,0.06); }
.fossil-archives-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.06); margin-top: 3rem; }
@media (max-width: 900px) { .fossil-archives-grid { grid-template-columns: 1fr; } }
.fossil-archive-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2.5rem 2rem;
  background: #000;
  text-decoration: none;
  transition: background 0.3s ease;
  cursor: pointer;
}
.fossil-archive-card:hover { background: #070707; }
.fossil-archive-num { font-family: 'Inter', sans-serif; font-size: 0.55rem; letter-spacing: 0.4em; color: rgba(255,255,255,0.2); }
.fossil-archive-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 400; color: #fff; line-height: 1.25; }
.fossil-archive-body { font-family: 'Inter', sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.4); line-height: 1.6; flex: 1; }
.fossil-archive-link { font-family: 'Inter', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.35); border-bottom: 1px solid rgba(255,255,255,0.12); width: fit-content; padding-bottom: 0.15rem; transition: color 0.3s, border-color 0.3s; }
.fossil-archive-card:hover .fossil-archive-link { color: #fff; border-color: rgba(255,255,255,0.5); }
</style>

