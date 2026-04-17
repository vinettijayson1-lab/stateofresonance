<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard.vue'
import SocialProof from '../components/SocialProof.vue'
import VaultDropTeaser from '../components/VaultDropTeaser.vue'
import { Instagram, Music2 } from 'lucide-vue-next'
import { klaviyoService } from '../services/klaviyo'

const InstagramFeed = defineAsyncComponent(() => import('../components/InstagramFeed.vue'))
const Testimonials = defineAsyncComponent(() => import('../components/Testimonials.vue'))
const FaqSection = defineAsyncComponent(() => import('../components/FaqSection.vue'))

gsap.registerPlugin(ScrollTrigger)

interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
}

const attireProducts = ref<Product[]>([])
const esotericProducts = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {


  // Laboratory Manifesto Entrance - DOM paint safety delay
  setTimeout(() => {
    try {
      // Temporarily bypass strict opacity entrances to prevent Apple ITP execution lockouts
      ScrollTrigger.refresh()
    } catch (e) {
      console.warn("GSAP suppressed:", e)
    }
  }, 150)

  try {
    // Use working API filters — ghost-and-bones maps to category 'Ghost'/'Attire'
    // attire maps to category 'Attire'/'Apparel' for the second grid
    const [attireRes, esotericRes] = await Promise.all([
      fetch('/api/products?collection=the-ghost-and-bones&limit=8'),
      fetch('/api/products?category=Attire&limit=8')
    ])
    const attireData = await attireRes.json()
    const esotericData = await esotericRes.json()
    attireProducts.value = Array.isArray(attireData) ? attireData : []
    esotericProducts.value = Array.isArray(esotericData) ? esotericData : []
    // Fallback: if ghost collection is empty, show all apparel
    if (attireProducts.value.length === 0) {
      const fallbackRes = await fetch('/api/products?category=Apparel&limit=8')
      const fallbackData = await fallbackRes.json()
      attireProducts.value = Array.isArray(fallbackData) ? fallbackData : []
    }
  } catch (e) {
    console.error('Failed to fetch products:', e)
  } finally {
    loading.value = false
  }
})


const seekerEmail = ref('')
const seekerPhone = ref('')
const subscribeStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

const handleSmsSync = async () => {
  if (!seekerEmail.value || !seekerPhone.value) return
  subscribeStatus.value = 'loading'
  try {
    await klaviyoService.subscribeToSms(seekerEmail.value, seekerPhone.value)
    subscribeStatus.value = 'success'
    seekerEmail.value = ''
    seekerPhone.value = ''
  } catch (e) {
    console.error('Sync failed:', e)
    subscribeStatus.value = 'error'
  }
}
</script>

<template>
  <div class="home-view">
    <!-- Removed visually hidden H1 in favor of visible Manifesto H1 -->
    <!-- Hero / Void Choice Interface -->
    <section class="void-choice">
      <!-- Cinematic Hero Background — WebP, preloaded in <head> -->
      <div class="hero-bg" aria-hidden="true"></div>
      <!-- LCP anchor: explicit img tag so Lighthouse tracks the preloaded WebP as LCP -->
      <img
        src="/hero_banner.webp"
        fetchpriority="high"
        decoding="async"
        alt=""
        aria-hidden="true"
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;pointer-events:none;z-index:0;"
      />
      <div class="hero-bg-overlay" aria-hidden="true"></div>



      <!-- Hero Content — Centered, Full Impact -->
      <div class="hero-center" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;text-align:center;width:90%;max-width:820px;">
        <p class="hero-eyebrow">LIMITED-EDITION STREETWEAR · CANADA · EST. 2024</p>
        <h1 class="hero-wordmark">Wear the Symbols<br/><span style="color:var(--color-gold);">That Shape You</span></h1>
        <p class="hero-tagline">Premium, limited-edition streetwear designed for inner alignment.</p>
        <div class="hero-cta-group">
          <router-link to="/best-sellers" class="btn-premium animate-glint" id="hero-shop-btn">
            Shop the Collection
          </router-link>
          <router-link to="/about" class="btn-ghost" id="hero-decode-btn">
            Decode the Symbols
          </router-link>
        </div>
        <div class="hero-trust-mini">
          <span>✦ 450gsm heavyweight cotton</span>
          <span>|</span>
          <span>✦ Free shipping $110+</span>
          <span>|</span>
          <span>✦ 30-day returns</span>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>

    <!-- Trust Strip -->
    <div class="homepage-trust-strip">
      <div class="trust-strip-inner">
        <div class="trust-strip-item">
          <span class="trust-icon">⭐</span>
          <span>5.0 Google Reviews</span>
        </div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item">
          <span class="trust-icon">🚚</span>
          <span>Free shipping $110+</span>
        </div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item">
          <span class="trust-icon">↩️</span>
          <span>30-day returns</span>
        </div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item">
          <span class="trust-icon">🔒</span>
          <span>Shopify Secured</span>
        </div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item">
          <span class="trust-icon">📦</span>
          <span>Ships from Canada</span>
        </div>
      </div>
    </div>

    <!-- ===== PRODUCTS: RIGHT UNDER THE HERO ===== -->
    <!-- The State Collection -->
    <section class="products-section container section-top">
      <div class="section-header">
        <div class="section-eyebrow">THE STATE COLLECTION · LIMITED DROPS · PREMIUM MATERIALS</div>
        <h2 class="hero-title" style="font-size: 2.5rem; text-align: left;">THE STATE COLLECTION</h2>
        <p class="product-meta">HEAVYWEIGHT COTTON — OVERSIZED FIT — LIMITED QUANTITIES</p>
      </div>
      <div v-if="loading" class="skeleton-grid section-top">
        <div v-for="n in 8" :key="n" class="skeleton-card"></div>
      </div>
      <div v-else-if="attireProducts.length === 0" class="loading-state" style="text-align:center;padding:4rem;opacity:0.5;">
        <p style="font-size:0.75rem;letter-spacing:0.2em;margin-bottom:1.5rem;">COLLECTION INITIALIZING...</p>
        <router-link to="/best-sellers" class="btn-gold">VIEW ALL CLOTHING →</router-link>
      </div>
      <div v-else class="product-grid section-top">
        <ProductCard v-for="product in attireProducts" :key="product.id" :product="product" />
      </div>
      <div style="text-align: center; margin-top: 4rem;">
        <router-link to="/best-sellers" class="btn-gold">SHOP THE COLLECTION →</router-link>
      </div>
    </section>

    <!-- All Apparel / Garments -->
    <section class="products-section container section-top">
      <div class="section-header">
        <div class="section-eyebrow">THE FREQUENCY ARCHIVE · WEARABLE ARTIFACTS</div>
        <h2 class="hero-title" style="font-size: 2.5rem; text-align: left;">ALL ARTIFACTS</h2>
        <p class="product-meta">ESOTERIC APPAREL — FREQUENCY-CALIBRATED — LIMITED PRODUCTION</p>
      </div>
      <div v-if="loading" class="skeleton-grid section-top">
        <div v-for="n in 8" :key="n" class="skeleton-card"></div>
      </div>
      <div v-else-if="esotericProducts.length === 0" class="loading-state" style="text-align:center;padding:4rem;opacity:0.5;">
        <p style="font-size:0.75rem;letter-spacing:0.2em;margin-bottom:1.5rem;">ARTIFACTS LOADING...</p>
        <router-link to="/best-sellers" class="btn-gold">SHOP ALL CLOTHING →</router-link>
      </div>
      <div v-else class="product-grid section-top">
        <ProductCard v-for="product in esotericProducts" :key="product.id" :product="product" />
      </div>
      <div style="text-align: center; margin-top: 4rem;">
        <router-link to="/best-sellers" class="btn-gold">SHOP THE FULL COLLECTION →</router-link>
      </div>
    </section>
    <!-- ===== END PRODUCTS ===== -->

    <VaultDropTeaser />

    <!-- WHY OUR PIECES FEEL DIFFERENT -->
    <section class="craftsmanship-section">
      <div class="container">
        <div class="craftsmanship-header">
          <p class="section-eyebrow-text">THE DIFFERENCE</p>
          <h2 class="craftsmanship-title">Why Our Pieces<br/>Feel Different</h2>
          <p class="craftsmanship-sub">We didn't set out to make streetwear. We set out to make objects you keep forever.</p>
        </div>
        <div class="craftsmanship-grid">
          <div class="craft-card">
            <div class="craft-icon">⚖️</div>
            <h3>450gsm Heavyweight Cotton</h3>
            <p>Our fleece is 450 grams per square meter — nearly double the weight of typical streetwear. It drapes with authority and feels substantial from the first wear.</p>
          </div>
          <div class="craft-card">
            <div class="craft-icon">🧵</div>
            <h3>Double-Needle Construction</h3>
            <p>Every seam is double-stitched for structural integrity. Where cheap brands save on thread, we reinforce for longevity. These pieces are built to outlast trends.</p>
          </div>
          <div class="craft-card">
            <div class="craft-icon">📦</div>
            <h3>Limited Production Runs</h3>
            <p>We produce in small batches of 50–150 pieces. No mass production, ever. When a run ends, it rarely comes back. Scarcity isn't a tactic — it's a commitment to craft.</p>
          </div>
          <div class="craft-card">
            <div class="craft-icon">🎨</div>
            <h3>Oversized Boxy Silhouette</h3>
            <p>Pre-shrunk, structured, and cut with an intentional oversized drop. The fit is architectural — designed to look as deliberate on day 100 as it does on day one.</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 4rem;">
          <router-link to="/best-sellers" class="btn-gold">SHOP THE COLLECTION →</router-link>
        </div>
      </div>
    </section>

    <!-- SYMBOL MEANINGS -->
    <section class="symbols-section">
      <div class="container">
        <div style="text-align: center; margin-bottom: 4rem;">
          <p class="section-eyebrow-text">THE LANGUAGE</p>
          <h2 class="symbols-title">What the Symbols Mean</h2>
          <p class="symbols-sub">Every garment carries a symbol. Here's what they represent — and why it matters.</p>
        </div>
        <div class="symbols-grid">
          <div class="symbol-card glass">
            <div class="symbol-glyph">✦</div>
            <h3>The Resonance Sigil</h3>
            <p>A four-pointed star representing the four states of matter — and the fifth element of consciousness that bridges them. Found on our signature pieces.</p>
          </div>
          <div class="symbol-card glass">
            <div class="symbol-glyph">◯</div>
            <h3>Sacred Geometry Circles</h3>
            <p>The circle has no beginning and no end. Our circular motifs reference the Flower of Life — a geometric template underlying all matter and energy.</p>
          </div>
          <div class="symbol-card glass">
            <div class="symbol-glyph">963</div>
            <h3>The 963 Hz Frequency</h3>
            <p>The highest Solfeggio frequency. Associated with crown chakra activation and direct connection to universal consciousness. Our signature vibration.</p>
          </div>
          <div class="symbol-card glass">
            <div class="symbol-glyph">⊕</div>
            <h3>Earth Cross</h3>
            <p>The cross within the circle — an ancient symbol for the material world grounded in four directions. Wearing it is a reminder: you are rooted and sovereign.</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 3rem;">
          <router-link to="/about" class="btn-outline">Full Symbol Guide →</router-link>
        </div>
      </div>
    </section>


    <section class="bio-brand-identity" style="position: relative; z-index: 20; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 8vh 5vw; background: linear-gradient(180deg, var(--color-emerald-deep) 0%, rgba(10,10,12,1) 100%); box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.05); border-top: 1px solid rgba(212, 175, 55, 0.2); border-bottom: 2px solid rgba(212, 175, 55, 0.1);">
      <h1 style="font-family: var(--font-heading); color: white; letter-spacing: 0.2em; font-size: clamp(2rem, 4vw, 3rem); text-transform: uppercase; margin-bottom: 2rem; text-shadow: 0 4px 15px rgba(0,0,0,0.8);">
        State of <span style="color: var(--color-gold);">Resonance</span>
      </h1>
      <div style="max-width: 800px; text-align: center; padding: 3rem; border-radius: 16px; border: 1px solid rgba(212,175,55,0.2); background: rgba(0,0,0,0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.6), inset 0 0 30px rgba(212,175,55,0.03); backdrop-filter: blur(10px);">
        <p style="font-family: 'Cormorant Garamond', serif; font-size: clamp(1.2rem, 1.8vw, 1.5rem); line-height: 1.7; color: rgba(255,255,255,0.95); margin-bottom: 1.5rem; text-shadow: 0 2px 5px rgba(0,0,0,0.9);">
          Through a profound personal journey battling the void of addiction, I learned a visceral truth: <strong style="color: var(--color-gold);">Matter must serve Spirit, and healing must come from within.</strong>
        </p>
        <p style="font-family: 'Cormorant Garamond', serif; font-size: clamp(1.1rem, 1.5vw, 1.3rem); line-height: 1.6; color: rgba(255,255,255,0.85); margin-bottom: 2.5rem;">
          This shop bridges ancient esoteric wisdom with modern reality. Every piece is calibrated to mathematical frequencies like 432Hz and 963Hz. I didn't want to just make clothes; I wanted to create a modern uniform—a sacred shroud to cleanse the soul and keep negative energy at bay.
        </p>
        <div style="display: flex; justify-content: center; align-items: center; gap: 1.5rem;">
          <p style="font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 0.3em; color: var(--color-gold-muted); text-transform: uppercase;">
            — Jayson Vinetti, Creator
          </p>
          <span style="color: rgba(212,175,55,0.3);">|</span>
          <router-link to="/about" class="bio-link glow-hover" style="font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 0.2em; color: white; text-transform: uppercase; text-decoration: none; border-bottom: 1px solid var(--color-gold); padding-bottom: 4px; transition: all 0.3s; font-weight: bold;">
            Read The Full Story
          </router-link>
        </div>
      </div>
    </section>

    <!-- LIFESTYLE PHOTOGRAPHY GALLERY -->
    <section class="lifestyle-gallery" style="padding: 8vh 0; background: var(--color-bg);">
      <div class="container">
        <div style="text-align: center; margin-bottom: 4rem;">
          <p class="section-eyebrow-text">THE LOOKBOOK</p>
          <h2 class="hero-title" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #fff; letter-spacing: 0.05em; text-transform: uppercase;">Worn in the Real World</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          <div class="lifestyle-img-wrap" style="aspect-ratio: 4/5; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
            <img src="/images/lifestyle_urban.png" alt="Editorial Streetwear Lifestyle" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out-expo);" class="lifestyle-zoom" />
          </div>
          <div class="lifestyle-img-wrap" style="aspect-ratio: 4/5; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
            <img src="/images/lifestyle_model_fit.png" alt="Model wearing Boxy Crewneck" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out-expo);" class="lifestyle-zoom" />
          </div>
          <div class="lifestyle-img-wrap" style="aspect-ratio: 4/5; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
            <img src="/images/lifestyle_stitching.png" alt="Heavyweight Material Drop Macro" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out-expo);" class="lifestyle-zoom" />
          </div>
        </div>
        <component :is="'style'">
          .lifestyle-img-wrap:hover .lifestyle-zoom { transform: scale(1.05); }
        </component>
      </div>
    </section>

    <!-- Social Growth Section: Join the Shop -->
    <section class="social-growth-shop section-top">
      <div class="container">
        <div class="growth-grid">
          <div class="growth-text">
            <div class="section-eyebrow">{{ $t('shop.eyebrow') }}</div>
            <h2 class="hero-title" style="font-size: clamp(2rem, 5vw, 4rem); text-align: left; line-height: 1.1;" v-html="$t('shop.title').replace('\n', '<br/>')"></h2>
            <p class="product-meta" style="margin-top: 2rem; opacity: 0.6; font-size: 1rem; line-height: 1.8; max-width: 500px;">
              {{ $t('shop.body') }}
            </p>
            <div class="sms-sync-field section-top" v-if="subscribeStatus !== 'success'">
              <div class="field-group glass">
                <input 
                  v-model="seekerEmail" 
                  type="email" 
                  placeholder="SYNC EMAIL" 
                  class="sync-input"
                />
                <input 
                  v-model="seekerPhone" 
                  type="tel" 
                  placeholder="SYNC PHONE (SMS)" 
                  class="sync-input"
                />
                <button 
                  @click="handleSmsSync" 
                  class="btn-gold sync-btn"
                  :disabled="subscribeStatus === 'loading'"
                >
                  {{ subscribeStatus === 'loading' ? 'JOINING...' : 'JOIN THE SANCTUARY' }}
                </button>
              </div>
              <p class="sms-disclosure">
                By providing your phone number, you agree to receive recurring automated marketing text messages (e.g. cart reminders) from State of Resonance at the mobile number used when signing up. Consent is not a condition of any purchase. Reply STOP to cancel, HELP for help. Msg & data rates may apply. View our <router-link to="/privacy">Privacy Policy</router-link> and <router-link to="/terms">Terms of Service</router-link>.
              </p>
            </div>
            <div v-else class="status-message success section-top">
              <p class="gold-text">FIELD SYNCHRONIZED. WELCOME TO THE SANCTUARY.</p>
            </div>

            <div class="social-actions section-top" style="display: flex; gap: 2rem; flex-wrap: wrap;">
              <a href="https://instagram.com/resonancestateof" target="_blank" class="glow-hover btn-gold-outline" style="display: flex; align-items: center; gap: 1rem; padding: 0.8rem 1.5rem; font-size: 0.7rem;">
                <Instagram :size="16" /> {{ $t('shop.instagram') }}
              </a>
              <a href="https://tiktok.com/@stateofresonance" target="_blank" class="glow-hover btn-gold-outline" style="display: flex; align-items: center; gap: 1rem; padding: 0.8rem 1.5rem; font-size: 0.7rem;">
                <Music2 :size="16" /> {{ $t('shop.tiktok') }}
              </a>
            </div>
          </div>
          <div class="growth-visual desktop-only glass" style="padding: 3rem; border-color: rgba(212,175,55,0.2); background: radial-gradient(circle at center, rgba(212,175,55,0.05) 0%, transparent 100%);">
            <div class="visual-stack">
              <div class="visual-card-glow"></div>
              <div class="visual-meta">
                <span class="meta-label">SIGNAL SOURCE</span>
                <span class="meta-value">963 HERTZ</span>
              </div>
              <div class="visual-meta" style="top: auto; bottom: 2rem;">
                <span class="meta-label">EST. SAINT-JEAN-SUR-RICHELIEU</span>
                <span class="meta-value">CANADA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Manifesto Section -->
    <section class="manifesto">
      <div class="container manifesto-content">
        <p class="manifesto-eyebrow">— The Word of Resonance —</p>
        <h2 class="manifesto-title">State of Resonance: Esoteric Luxury Streetwear</h2>
        <p class="manifesto-text">
          This is not a trend label. This is a design world built around symbolic codes, esoteric motifs, and the belief that what you wear carries weight beyond fabric.
        </p>
        <p class="manifesto-text" style="margin-top: 2rem;">
          Every piece is produced in limited quantities, built from premium materials, and designed to function as a lasting part of your personal uniform — not a disposable fast-fashion moment.
        </p>
        <p class="manifesto-text" style="margin-top: 2rem; font-size: 1.1rem; color: var(--color-gold); font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;">
          Wear your frequency. Let your vibes Resonate. State of Resonance.
        </p>
        <div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 3rem; flex-wrap: wrap;">
          <router-link to="/best-sellers" class="btn-gold">Shop Best Sellers</router-link>
          <router-link to="/about" class="btn-outline">Read the Manifesto</router-link>
        </div>
      </div>
    </section>

    <!-- The Void Access — Inner Circle CTA -->
    <section class="void-access-section container" style="margin-top: -5vh; position: relative; z-index: 10;">
      <div class="va-card glass glow-hover">
        <div class="va-left">
          <p class="va-id">RESTRICTED · INNER CIRCLE</p>
          <h2 class="va-title">The Vault</h2>
          <p class="va-subtitle">Access is not given. It is recognized.</p>
        </div>
        <div class="va-right">
          <p class="va-body">
            The Vault is the inner circle of the State of Resonance Laboratory. Members receive priority 
            access to Vault Drops, 1-of-10 limited runs, and physical-to-digital alignment protocols.
          </p>
          <div class="va-badges" style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 1.5rem 0;">
            <span class="va-badge gold-text" style="font-size: 0.6rem; letter-spacing: 0.2em; border: 1px solid var(--color-gold); padding: 0.4rem 0.8rem;">EARLY ACCESS</span>
            <span class="va-badge gold-text" style="font-size: 0.6rem; letter-spacing: 0.2em; border: 1px solid var(--color-gold); padding: 0.4rem 0.8rem;">PHYSICAL DROPS</span>
            <span class="va-badge gold-text" style="font-size: 0.6rem; letter-spacing: 0.2em; border: 1px solid var(--color-gold); padding: 0.4rem 0.8rem;">SANCTUARY PRIORITY</span>
          </div>
          <router-link to="/inner-circle" class="btn-gold" style="margin-top: 1rem; display: inline-block; text-align:center;">
            ENTER THE INNER CIRCLE →
          </router-link>
        </div>
      </div>
    </section>


    <SocialProof />

    <InstagramFeed />
    

    <FaqSection />

  </div>
</template>

<style scoped>
/* === HERO IMAGE (CSS background — WebP served, preloaded in <head>) === */
.hero-bg {
  position: absolute;
  inset: 0;
  background: url('/hero_banner.webp') center top / cover no-repeat;
  z-index: 0;
}

.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(5,5,7,0.82) 60%, #050507 100%);
  z-index: 1;
}

/* === HOMEPAGE TRUST STRIP === */
.homepage-trust-strip {
  background: rgba(212, 175, 55, 0.04);
  border-top: 1px solid rgba(212, 175, 55, 0.12);
  border-bottom: 1px solid rgba(212, 175, 55, 0.12);
  padding: 1rem 2rem;
}

.trust-strip-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}

.trust-strip-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.65);
}

.trust-icon {
  font-size: 0.85rem;
}

.trust-strip-divider {
  width: 1px;
  height: 16px;
  background: rgba(212, 175, 55, 0.2);
  flex-shrink: 0;
}

/* === BRAND PREMISE CARDS === */
.premise-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.premise-card {
  padding: 2.5rem 2rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  text-align: center;
  transition: border-color 0.4s ease, transform 0.4s ease;
}

.premise-card:hover {
  border-color: rgba(212, 175, 55, 0.25);
  transform: translateY(-4px);
}

.premise-icon {
  display: block;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

.premise-card h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.premise-card p {
  font-size: 0.82rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
}

@media (max-width: 768px) {
  .premise-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .trust-strip-inner {
    gap: 1rem;
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    flex-wrap: nowrap;
  }

  .trust-strip-divider {
    display: none;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.void-choice {
  height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: #050507;
}

/* === SKELETON LOADERS === */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .skeleton-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .skeleton-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
}

.skeleton-card {
  aspect-ratio: 3/4;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 25%,
    rgba(212,175,55,0.06) 50%,
    rgba(255,255,255,0.03) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.8s infinite;
  border: 1px solid rgba(212,175,55,0.08);
  border-radius: 2px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}



/* === NEW CINEMATIC HERO STYLES === */
.hero-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  margin-bottom: 2rem;
  display: block;
}

.hero-wordmark {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3.5rem, 10vw, 7rem);
  line-height: 0.95;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 0 4px 40px rgba(0,0,0,0.8);
}

.hero-tagline {
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.6);
  margin-bottom: 3rem;
  text-transform: uppercase;
}

.hero-cta-group {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn-ghost {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  text-decoration: none;
  transition: all 0.4s ease;
  cursor: pointer;
  backdrop-filter: blur(8px);
}

.btn-ghost:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.hero-trust-mini {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  flex-wrap: wrap;
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  opacity: 0.4;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, var(--color-gold));
  animation: scroll-pulse 2s infinite;
}

@keyframes scroll-pulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
  50% { opacity: 1; transform: scaleY(1); }
}

.scroll-indicator span {
  font-size: 0.45rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
}

@media (max-width: 768px) {
  .hero-cta-group { flex-direction: column; align-items: center; }
  .hero-trust-mini { display: none; }
  .scroll-indicator { display: none; }
}

.choice-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.freq-explainer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.freq-item {
  padding: 2rem;
  text-align: left;
  border: 1px solid rgba(212,175,55,0.1);
  background: rgba(212,175,55,0.02);
}

.freq-hz {
  display: block;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
  font-family: var(--font-heading);
}

.freq-def {
  font-size: 0.85rem;
  line-height: 1.6;
  opacity: 0.6;
}

.freq-def strong {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .freq-explainer-grid {
    grid-template-columns: 1fr;
  }
}
.choice-panel {
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding: 10vh 5vw;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: flex 0.8s cubic-bezier(0.77, 0, 0.175, 1);
  background-size: cover;
  background-position: center;
}

.choice-panel:hover {
  flex: 1.5;
}

.her-panel {
  background-image: linear-gradient(to top, rgba(0,0,0,0.65), transparent), url('/assets/her_resonance_hero.png');
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.ghost-panel {
  background-image: linear-gradient(to top, rgba(0,0,0,0.65), transparent), url('/assets/ghost_and_bones_hero.png');
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.tools-panel {
  background-image: linear-gradient(to top, rgba(0,0,0,0.65), transparent), url('/assets/sanctuary_hero.png');
}

.choice-subtitle {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  margin-bottom: 1rem;
}

.choice-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
  color: white;
}

/* Rolling frequency ticker strip */
.freq-strip {
  display: flex;
  gap: 5vw;
  overflow: hidden;
  white-space: nowrap;
  padding: 1.25rem 4rem;
  border-top: 1px solid rgba(212, 175, 55, 0.12);
  border-bottom: 1px solid rgba(212, 175, 55, 0.12);
  background: rgba(212, 175, 55, 0.03);
  animation: ticker 22s linear infinite;
  font-size: 0.6rem;
  letter-spacing: 0.35em;
  color: var(--color-gold-muted);
  text-transform: uppercase;
  opacity: 0.7;
}
@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Manifesto */
.manifesto {
  background: var(--color-emerald-deep);
  padding: 15vh 0;
  text-align: center;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.manifesto-content {
  max-width: 800px;
}

.manifesto-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  margin-bottom: 2rem;
}

.manifesto-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--color-gold-muted);
  margin-bottom: 3rem;
}

.manifesto-text {
  font-size: 1.2rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.65);
  font-family: var(--font-body);
}

.live-signal {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 3rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 100px;
}

.signal-dot {
  width: 6px;
  height: 6px;
  background: var(--color-gold);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-gold);
  animation: pulse-dot 2s infinite;
}

.signal-text {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-muted);
  text-transform: uppercase;
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

/* Products */
.products-section {
  padding: 10vh 0;
}
.section-header {
  margin-bottom: 4rem;
}
.section-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.85;
  margin-bottom: 1.25rem;
}

/* Lab Banner / Manifesto */
.lab-banner {
  margin-top: 0;
  padding: 5vh 0 2vh 0;
  border-top: 1px solid rgba(212, 175, 55, 0.08);
  border-bottom: 1px transparent;
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.03) 0%, transparent 70%);
}

.manifesto-header {
  text-align: center;
  margin-bottom: 8vh;
}

.lab-banner-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.6em;
  text-transform: uppercase;
  color: var(--color-gold);
  opacity: 0.5;
  margin-bottom: 2rem;
}

.lab-banner-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.manifesto-split-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  margin-bottom: 10vh;
  text-align: left;
}

.column-title {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  margin-bottom: 1.5rem;
}

.column-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.5);
  max-width: 45ch;
}

.freq-hz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.hz-card {
  padding: 2.5rem;
  text-align: left;
  border: 1px solid rgba(212, 175, 55, 0.1);
  transition: all 0.5s var(--ease-out-expo);
}

.hz-card:hover {
  border-color: var(--color-gold);
  background: rgba(212, 175, 55, 0.05);
  transform: translateY(-5px);
}

.hz-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
}

.hz-value {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-gold);
  letter-spacing: 0.1em;
}

.hz-status {
  font-size: 0.5rem;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.3);
}

.hz-divider {
  height: 1px;
  background: linear-gradient(90deg, var(--color-gold-muted), transparent);
  margin-bottom: 2rem;
  width: 50px;
}

.hz-def {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.7);
}

@media (max-width: 968px) {
  .manifesto-split-content, .freq-hz-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
.lab-banner-body {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.5);
  max-width: 680px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .choice-container {
    flex-direction: column;
  }
}

/* Void Access — Inner Circle */
.void-access-section {
  padding: 10vh 0;
}
.va-card {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 0;
  border: 1px solid rgba(212, 175, 55, 0.12);
}
.va-left {
  padding: 5rem 4rem;
  border-right: 1px solid rgba(212, 175, 55, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(212, 175, 55, 0.02);
}
.va-right {
  padding: 5rem 4rem;
}
.va-id {
  font-size: 0.55rem;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.5;
  margin-bottom: 1.5rem;
}
.va-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 6vw, 5rem);
  color: var(--color-gold-muted);
  margin-bottom: 0.75rem;
  line-height: 1;
}
.va-subtitle {
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  opacity: 0.4;
  font-style: italic;
}
.va-body {
  font-size: 0.95rem;
  line-height: 1.9;
  opacity: 0.55;
  margin-bottom: 2rem;
}
.va-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.va-badge {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  padding: 0.4rem 0.9rem;
  border: 1px solid rgba(212, 175, 55, 0.25);
  color: var(--color-gold-muted);
  opacity: 0.7;
}
@media (max-width: 768px) {
  .va-card {
    grid-template-columns: 1fr;
  }
  .va-left {
    border-right: none;
    border-bottom: 1px solid rgba(212, 175, 55, 0.08);
    padding: 3rem 2rem;
  }
  .va-right {
    padding: 3rem 2rem;
  }
}
</style>

<style scoped>
.social-growth-shop {
  padding: 15vh 0;
  position: relative;
  overflow: hidden;
}

.growth-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 6rem;
}

.growth-visual {
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.visual-card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--color-gold) 0%, transparent 70%);
  opacity: 0.15;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.visual-meta {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-label {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-muted);
  text-transform: uppercase;
}

.meta-value {
  font-size: 1rem;
  letter-spacing: 0.15em;
  color: #fff;
}

@media (max-width: 968px) {
  .growth-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 4rem;
  }
  .growth-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hero-title {
    text-align: center !important;
  }
  .social-actions {
    justify-content: center;
  }
}

.sms-sync-field {
  max-width: 500px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  margin-bottom: 1rem;
}

.sync-input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.1);
  padding: 1rem;
  color: white;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  outline: none;
  transition: border-color 0.3s;
}

.sync-input:focus {
  border-color: var(--color-gold);
}

.sync-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  cursor: pointer;
}

.sms-disclosure {
  font-size: 0.65rem;
  line-height: 1.6;
  opacity: 0.4;
  color: #fff;
}

.sms-disclosure a {
  color: var(--color-gold);
  text-decoration: underline;
}

.btn-gold-outline {
  background: none;
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: var(--color-gold);
  text-decoration: none;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: all 0.3s;
}

.btn-gold-outline:hover {
  background: rgba(212, 175, 55, 0.05);
  border-color: var(--color-gold);
}

/* ===== CRAFTSMANSHIP SECTION ===== */
.craftsmanship-section {
  padding: 10vh 0;
  border-top: 1px solid rgba(212, 175, 55, 0.08);
  border-bottom: 1px solid rgba(212, 175, 55, 0.06);
}

.craftsmanship-header {
  text-align: center;
  margin-bottom: 5rem;
}

.section-eyebrow-text {
  display: block;
  font-size: 0.55rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.7;
  margin-bottom: 1.5rem;
}

.craftsmanship-title {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.craftsmanship-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}

.craftsmanship-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.craft-card {
  padding: 2.5rem 2rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  transition: border-color 0.4s ease, transform 0.4s ease, background 0.4s ease;
}

.craft-card:hover {
  border-color: rgba(212, 175, 55, 0.3);
  transform: translateY(-4px);
  background: rgba(212, 175, 55, 0.03);
}

.craft-icon {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.craft-card h3 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: 0.03em;
}

.craft-card p {
  font-size: 0.82rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.5);
}

@media (max-width: 1024px) {
  .craftsmanship-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .craftsmanship-grid { grid-template-columns: 1fr; }
}

/* ===== SYMBOLS SECTION ===== */
.symbols-section {
  padding: 10vh 0;
  background: rgba(212, 175, 55, 0.015);
  border-top: 1px solid rgba(212, 175, 55, 0.08);
}

.symbols-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

.symbols-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}

.symbols-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.symbol-card {
  padding: 2.5rem 2rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  text-align: center;
  transition: all 0.4s ease;
}

.symbol-card:hover {
  border-color: rgba(212, 175, 55, 0.3);
  transform: translateY(-4px);
}

.symbol-glyph {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: var(--color-gold);
  margin-bottom: 1.5rem;
  display: block;
  letter-spacing: 0.05em;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}

.symbol-card h3 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.symbol-card p {
  font-size: 0.82rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
}

@media (max-width: 1024px) {
  .symbols-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .symbols-grid { grid-template-columns: 1fr; }
}
</style>
