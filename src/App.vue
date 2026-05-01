<script setup lang="ts">
import { ref, onMounted, computed, watch, provide, defineAsyncComponent } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CSSPlugin } from 'gsap/CSSPlugin'
import Lenis from 'lenis/dist/lenis.mjs'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import CurrencySwitcher from './components/CurrencySwitcher.vue'
import TrustindexWidget from './components/TrustindexWidget.vue'
const CartSidebar = defineAsyncComponent(() => import('./components/CartSidebar.vue'))
const ExitIntentGate = defineAsyncComponent(() => import('./components/ExitIntentGate.vue'))
import { cart } from './store/cart'
import { useResonanceStore } from './store/resonance'
import { klaviyoService } from './services/klaviyo'
import { Instagram, Facebook, Twitter, Music2, Compass, ChevronUp, Globe } from 'lucide-vue-next'

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger, CSSPlugin) }

const resonance = useResonanceStore()
const barVisible = ref(true)
provide('barVisible', barVisible)
const navVisible = ref(true)
const headerExpanded = ref(true)
const mobileMenuOpen = ref(false)
const splashDone = ref(true)
let lastScroll = 0

const toggleHeader = () => { headerExpanded.value = !headerExpanded.value }
const toggleMobileMenu = () => { mobileMenuOpen.value = !mobileMenuOpen.value }
const handleToolsSelect = () => { if (headerExpanded.value) headerExpanded.value = false }

onMounted(() => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get('ref')
    if (ref) localStorage.setItem('sor_active_affiliate', ref.toUpperCase())
  }
  const saved = sessionStorage.getItem('sor_bar_dismissed')
  if (saved) barVisible.value = false

  // Splash entry sequence (Hardened Sync)
  const seen = sessionStorage.getItem('sor_entered')
  if (seen) {
    splashDone.value = true
  } else if (document.querySelector('.splash-screen')) {
    sessionStorage.setItem('sor_entered', '1')
    animateSafe('.splash-wordmark', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'expo.out',
      delay: 0.1
    })
    animateSafe('.splash-tagline', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'expo.out',
      delay: 0.3
    })
    animateSafe('.splash-sub', {
      opacity: 0.8,
      duration: 0.6,
      delay: 0.3
    })
    // Auto-dismiss rapidly to reduce bounce rate
    setTimeout(dismissSplash, 800)
  } else {
    splashDone.value = true
  }

  // Initialize Lenis Smooth Scroll — deferred to idle to avoid blocking LCP/TTI
  const initLenis = () => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
    if (isTouch) {
      document.documentElement.classList.remove('lenis')
      return // Bypass custom scrolling on iOS/Mobile to rely on native momentum speed
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initLenis, { timeout: 2000 })
  } else {
    setTimeout(initLenis, 500)
  }


  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset
    if (currentScroll > 80 && headerExpanded.value) headerExpanded.value = false
    else if (currentScroll < 30 && !headerExpanded.value) headerExpanded.value = true
    if (currentScroll <= 0) { navVisible.value = true; return }
    const delta = currentScroll - lastScroll
    if (Math.abs(delta) > 8) {
      if (delta > 0 && navVisible.value && currentScroll > 150) navVisible.value = false
      else if (delta < 0 && !navVisible.value) navVisible.value = true
      lastScroll = currentScroll
    }
  }, { passive: true })

  const cursor = document.querySelector('.custom-cursor') as HTMLElement
  if (cursor) {
    window.addEventListener('mousemove', (e) => { gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none' }) })
    window.addEventListener('mouseover', (e: MouseEvent) => { if ((e.target as Element)?.closest('a, button, .interactive')) cursor.classList.add('cursor-hover') })
    window.addEventListener('mouseout', (e: MouseEvent) => { if ((e.target as Element)?.closest('a, button, .interactive')) cursor.classList.remove('cursor-hover') })
  }

  setTimeout(() => { klaviyoService && klaviyoService.identify && (() => { const e = localStorage.getItem('sor_seeker_email'); if (e) klaviyoService.identify(e, { vibrational_tier: resonance.tier }) })() }, 1500)
})

const auraStyle = computed(() => {
  const f = resonance.detectedFrequency
  let color = 'rgba(0,0,0,0)'
  if (f === '963') color = 'rgba(212,175,55,0.08)'
  if (f === '528') color = 'rgba(74,222,128,0.05)'
  return { background: `radial-gradient(circle at 50% 30%, ${color} 0%, transparent 70%)` }
})
</script>

<template>
  <div class="app-container" :class="{ 'header-is-collapsed': !headerExpanded }">
    <div class="custom-cursor"></div>
    <div class="global-aura" :style="auraStyle"></div>

    <div class="collapsible-header-wrapper" :class="{ 'is-expanded': headerExpanded }">
      <nav class="nav-bar" :class="{ 'nav-hidden': !navVisible, 'mobile-nav-active': mobileMenuOpen }">

        <div class="mobile-toggle" @click="toggleMobileMenu">
          <span class="bar"></span>
          <span class="bar"></span>
        </div>

        <router-link to="/" class="nav-logo" @click="mobileMenuOpen = false">
          RESONANCE
          <div class="live-signal-mini">
            <span class="pulse-dot"></span>
            <span class="signal-count">{{ resonance.detectedFrequency }}</span>
          </div>
        </router-link>

        <div class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <button v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="mobile-close-btn gold-text" aria-label="Close navigation menu">✕</button>
          <div v-if="mobileMenuOpen" class="mobile-drawer-header">
            <span class="meta-vibe gold-text">STATE OF RESONANCE</span>
            <div class="resonance-trace"></div>
          </div>

          <router-link to="/collections/all" class="nav-link" @click="mobileMenuOpen = false">
            <span class="label-primary" style="font-weight:500;letter-spacing:0.1em;">SHOP</span>
            <span class="label-hover">SHOP</span>
          </router-link>
          <router-link to="/lookbook" class="nav-link" @click="mobileMenuOpen = false">
            <span class="label-primary" style="font-weight:500;letter-spacing:0.1em;">LOOKBOOK</span>
            <span class="label-hover">LOOKBOOK</span>
          </router-link>
          <router-link to="/about" class="nav-link" @click="mobileMenuOpen = false">
            <span class="label-primary" style="font-weight:500;letter-spacing:0.1em;">ABOUT</span>
            <span class="label-hover">ABOUT</span>
          </router-link>
          <router-link to="/transmissions" class="nav-link" @click="mobileMenuOpen = false">
            <span class="label-primary" style="font-weight:500;letter-spacing:0.1em;">ARCHIVES</span>
            <span class="label-hover">ARCHIVES</span>
          </router-link>
          <router-link to="/contact" class="nav-link" @click="mobileMenuOpen = false">
            <span class="label-primary" style="font-weight:500;letter-spacing:0.1em;">CONTACT</span>
            <span class="label-hover">CONTACT</span>
          </router-link>
          <router-link to="/inner-circle" class="nav-link inner-circle-link" @click="mobileMenuOpen = false">
            <span class="label-primary">✦ INNER CIRCLE</span>
            <span class="label-hover">MEMBERS</span>
          </router-link>

          <div v-show="mobileMenuOpen" class="mobile-calibration-hub glass" :class="{ 'is-revealed': mobileMenuOpen }">
            <div class="calibration-row">
              <div class="calibration-section">
                <span class="util-label">VALUATION</span>
                <CurrencySwitcher @select="mobileMenuOpen = false" />
              </div>
              <div class="calibration-section">
                <span class="util-label">DIALECT</span>
                <LanguageSwitcher @select="barVisible = false; mobileMenuOpen = false" />
              </div>
            </div>
          </div>
        </div>

        <div class="nav-actions">
          <router-link to="/quiz" class="sync-icon-link interactive mobile-only" title="Sync Your Field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-dasharray="2 4"/>
              <path d="M12 8V12L14 14" stroke-linecap="round"/>
            </svg>
          </router-link>

          <div class="desktop-only header-tools-sector">
            <div class="flex items-center gap-8">
              <div class="flex flex-col items-end"><CurrencySwitcher @select="handleToolsSelect" /></div>
              <div class="flex flex-col items-end"><LanguageSwitcher @select="barVisible = false; handleToolsSelect()" /></div>
            </div>
          </div>

          <button @click="toggleHeader" class="calibration-toggle desktop-only interactive" :class="{ 'is-active': headerExpanded }" :title="headerExpanded ? 'Close' : 'Open'">
            <div class="flex flex-col items-center justify-center">
              <ChevronUp :size="14" v-if="headerExpanded" />
              <Globe :size="16" v-else />
            </div>
          </button>

          <button @click="cart.isOpen = true; mobileMenuOpen = false" class="reservoir-btn interactive" aria-label="Open shopping cart">
            <span class="desktop-only">{{ $t('nav.reservoir') }}</span>
            <svg class="mobile-only cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="reservoir-count" v-if="cart.items.length > 0">{{ cart.items.length }}</span>
          </button>
        </div>
      </nav>

      <!-- Trust Badges Section -->
      <div class="header-trust-badges" v-show="headerExpanded">
        <TrustindexWidget src="https://cdn.trustindex.io/loader-cert.js?1703b7e689202141f136d18372e" />
        <TrustindexWidget src="https://cdn.trustindex.io/loader-cert.js?ea9bfdd7014018072776609e74f" />
        <TrustindexWidget src="https://cdn.trustindex.io/loader-cert.js?6e7277670e8c181e27066a48ca1" />
        <TrustindexWidget src="https://cdn.trustindex.io/loader-cert.js?ef204277027f181fb316fe34015" />
      </div>
    </div>

    <CartSidebar />
    <ExitIntentGate />
    <div class="toast-container"></div>
    <div id="teleport-target"></div>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- FOSSIL FOOTER -->
    <footer class="fossil-footer">
      <div class="fossil-footer-top">
        <div class="container">
          <div class="fossil-footer-grid">
            <div class="fossil-footer-col">
              <h4 class="fossil-footer-col-title">Navigate</h4>
              <nav class="fossil-footer-nav">
                <router-link to="/collections/all" class="fossil-footer-link">Shop</router-link>
                <router-link to="/lookbook" class="fossil-footer-link">Lookbook</router-link>
                <router-link to="/about" class="fossil-footer-link">About</router-link>
                <router-link to="/transmissions" class="fossil-footer-link">Archives</router-link>
                <router-link to="/contact" class="fossil-footer-link">Contact</router-link>
                <router-link to="/collaborate" class="fossil-footer-link">Collaborate</router-link>
              </nav>
            </div>
            <div class="fossil-footer-col">
              <h4 class="fossil-footer-col-title">Customer Care</h4>
              <nav class="fossil-footer-nav">
                <router-link to="/faq" class="fossil-footer-link">FAQ</router-link>
                <router-link to="/shipping" class="fossil-footer-link">Shipping & Returns</router-link>
                <router-link to="/size-guide" class="fossil-footer-link">Size Guide</router-link>
                <router-link to="/contact" class="fossil-footer-link">Contact Us</router-link>
                <router-link to="/privacy" class="fossil-footer-link">Privacy Policy</router-link>
                <router-link to="/terms" class="fossil-footer-link">Terms of Service</router-link>
              </nav>
            </div>
            <div class="fossil-footer-col">
              <h4 class="fossil-footer-col-title">Connect</h4>
              <div class="fossil-footer-social">
                <a href="https://instagram.com/resonancestateof" target="_blank" class="fossil-social-link" aria-label="Instagram"><Instagram :size="16" /></a>
                <a href="https://facebook.com/stateofresonance" target="_blank" class="fossil-social-link" aria-label="Facebook"><Facebook :size="16" /></a>
                <a href="https://twitter.com/stateofresonance" target="_blank" class="fossil-social-link" aria-label="Twitter"><Twitter :size="16" /></a>
                <a href="https://tiktok.com/@stateofresonance" target="_blank" class="fossil-social-link" aria-label="TikTok"><Music2 :size="16" /></a>
                <a href="https://pinterest.com/stateofresonance" target="_blank" class="fossil-social-link" aria-label="Pinterest"><Compass :size="16" /></a>
              </div>

              <div class="fossil-footer-language" style="margin-top:2rem;">
                <span class="fossil-footer-col-title">Language</span>
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          <!-- Trustindex Reviews Widget -->
          <div class="fossil-footer-reviews">
            <span class="fossil-eyebrow" style="text-align:center;display:block;margin-bottom:2rem;">✦ VERIFIED CUSTOMER REVIEWS</span>
            <!-- TRUSTINDEX WIDGET: Replace data-widget-id with your actual Trustindex widget ID from trustindex.io dashboard -->
            <div class="trustindex-widget-container">
              <!-- Main reviews widget -->
              <TrustindexWidget src="https://cdn.trustindex.io/loader.js?8c1bb1d6840c23179906838fc83" />
              <!-- Feed widget -->
              <TrustindexWidget src="https://cdn.trustindex.io/loader-feed.js?b0f2da868a2e12699466c6e2535" />
            </div>
          </div>
        </div>
      </div>

      <!-- Massive Wordmark -->
      <div class="fossil-footer-wordmark-wrap">
        <div class="fossil-footer-wordmark" aria-hidden="true">STATE OF RESONANCE</div>
      </div>

      <div class="container fossil-footer-bottom">
        <p class="fossil-footer-copy">© State of Resonance — All Rights Reserved</p>
        <div class="fossil-footer-trust-mini">
          <span>🚚 Free Shipping $110+</span>
          <span>↩️ Free 30-Day Returns</span>
          <span>🔒 Secure Checkout</span>
        </div>
        <p class="fossil-footer-tagline">Symbolic streetwear for the spiritually awakened.</p>
      </div>
    </footer>
  </div>
</template>

<style>
.global-aura { position: fixed; inset: 0; pointer-events: none; z-index: 0; }

/* FOSSIL FOOTER */
.fossil-footer {
  background: #000;
  border-top: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  margin-top: 0;
}
.fossil-footer-top { padding: 6rem 0 4rem; }
.fossil-footer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; }
@media (max-width: 768px) { .fossil-footer-grid { grid-template-columns: 1fr; gap: 3rem; } }
.fossil-footer-col-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1.5rem;
  display: block;
}
.fossil-footer-nav { display: flex; flex-direction: column; gap: 0.75rem; }
.fossil-footer-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.3s;
}
.fossil-footer-link:hover { color: #fff; }
.fossil-footer-social { display: flex; gap: 1.25rem; margin-bottom: 2rem; }
.fossil-social-link {
  color: rgba(255,255,255,0.4);
  transition: color 0.3s;
  display: flex;
  align-items: center;
}
.fossil-social-link:hover { color: #fff; }
.fossil-trust-badge { margin-top: 0.5rem; }
.trustindex-badge-wrapper { display: inline-block; }
.ti-badge-fallback {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  width: fit-content;
}
.ti-badge-stars { color: #f4b400; font-size: 0.8rem; }
.ti-badge-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.08em;
}
.fossil-footer-reviews {
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.trustindex-widget-container { min-height: 100px; }

/* MASSIVE WORDMARK */
.fossil-footer-wordmark-wrap {
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.04);
  padding: 2rem 0 0;
}
.fossil-footer-wordmark {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(4rem, 12vw, 14rem);
  color: rgba(255,255,255,0.04);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  white-space: nowrap;
  line-height: 0.85;
  text-align: center;
  user-select: none;
  padding-bottom: 0;
}
.fossil-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  padding-bottom: max(2rem, calc(1rem + var(--safe-bottom)));
  gap: 1rem;
  flex-wrap: wrap;
}

.mobile-lang-label {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-muted);
  opacity: 0.6;
}
/* === SACRED DRAWER (MOBILE) === */
.nav-links.mobile-open {
  position: fixed;
  inset: 0;
  display: flex !important;
  flex-direction: column;
  background: rgba(5, 5, 5, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform: translateZ(0);
  will-change: transform;
  padding: 8rem 3rem 4rem;
  z-index: 2000;
  gap: 2rem;
  overflow-y: auto;
  align-items: flex-start;
  text-align: left;
}

.mobile-close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-drawer-header {
  margin-bottom: 2rem;
  width: 100%;
}

.resonance-trace {
  height: 1px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
  margin-top: 0.5rem;
  width: 80%;
}

.nav-links.mobile-open .nav-link {
  font-size: 1.6rem;
  height: auto;
  min-height: 2rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
  opacity: 0;
  transform: translateY(20px);
  animation: slide-up-fade 0.6s var(--ease-out-expo) forwards;
}

.nav-links.mobile-open .nav-link .label-hover {
  display: none !important; /* Touch devices don't need the hover split text */
}

.nav-links.mobile-open .nav-link:nth-child(2) { animation-delay: 0.1s; }
.nav-links.mobile-open .nav-link:nth-child(3) { animation-delay: 0.15s; }
.nav-links.mobile-open .nav-link:nth-child(4) { animation-delay: 0.2s; }
.nav-links.mobile-open .nav-link:nth-child(5) { animation-delay: 0.25s; }
.nav-links.mobile-open .nav-link:nth-child(6) { animation-delay: 0.3s; }
.nav-links.mobile-open .nav-link:nth-child(7) { animation-delay: 0.35s; }
.nav-links.mobile-open .nav-link:nth-child(8) { animation-delay: 0.4s; }

@keyframes slide-up-fade {
  to { opacity: 1; transform: translateY(0); }
}

.mobile-calibration-hub {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem 1.5rem 8rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  background: rgba(10, 10, 12, 0.4);
  backdrop-filter: blur(20px);
  z-index: 2001;
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  transition: all 0.6s var(--ease-out-expo);
}

.mobile-calibration-hub.is-revealed {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateY(0) !important;
  pointer-events: all !important;
}

/* Header Trust Badges */
.header-trust-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  opacity: 0;
  transform: translateY(-10px);
  animation: fade-in-down 0.6s ease-out 0.2s forwards;
  flex-wrap: wrap;
}

@keyframes fade-in-down {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Style Trustindex certification badges */
.header-trust-badges :deep(.trustindex-widget),
.header-trust-badges :deep([class*="trustindex"]) {
  max-width: 150px;
}

/* Mobile responsiveness for trust badges */
@media (max-width: 768px) {
  .header-trust-badges {
    gap: 1rem;
    padding: 1.25rem 1rem;
  }
  
  .header-trust-badges :deep(.trustindex-widget),
  .header-trust-badges :deep([class*="trustindex"]) {
    max-width: 120px;
  }
}

@media (max-width: 480px) {
  .header-trust-badges {
    gap: 0.75rem;
    padding: 1rem;
  }
  
  .header-trust-badges :deep(.trustindex-widget),
  .header-trust-badges :deep([class*="trustindex"]) {
    max-width: 100px;
  }
}

/* Native Teaser Aesthetics (Vertical Fast-Tab) */
.ritual-teaser {
  position: fixed;
  top: 50%;
  left: 0;
  background: rgba(10, 10, 12, 0.95);
  border: 1px solid var(--color-gold);
  border-left: none; /* Flush to edge */
  color: var(--color-gold);
  padding: 1.5rem 0.6rem;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;

  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.2);
  text-transform: uppercase;
}
.fossil-footer-tagline {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.08em;
}
.fossil-footer-trust-mini {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.fossil-footer-trust-mini span {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
}
</style>
