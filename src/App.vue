<script setup lang="ts">
import { ref, onMounted, computed, watch, provide, defineAsyncComponent } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CSSPlugin } from 'gsap/CSSPlugin'
import Lenis from 'lenis/dist/lenis.mjs'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import CurrencySwitcher from './components/CurrencySwitcher.vue'

const CartSidebar = defineAsyncComponent(() => import('./components/CartSidebar.vue'))
const ExitIntentGate = defineAsyncComponent(() => import('./components/ExitIntentGate.vue'))
import { cart } from './store/cart'
import { useResonanceStore } from './store/resonance'
import { klaviyoService } from './services/klaviyo'

import {
  Instagram,
  Facebook,
  Twitter,
  Music2,
  Compass,
  ChevronUp,
  Globe
} from 'lucide-vue-next'

// --- OMNISCIENCE ANIMATION ENGINE ---
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CSSPlugin)
}

// --- SANCTUARY INITIALIZATION ---
const resonance = useResonanceStore()
const barVisible = ref(true)
provide('barVisible', barVisible)

const navVisible = ref(true)
const headerExpanded = ref(true)
const mobileMenuOpen = ref(false)
const splashDone = ref(false)
let lastScroll = 0

const toggleHeader = () => {
  headerExpanded.value = !headerExpanded.value
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleToolsSelect = () => {
  // Snappy collapse after calibration
  if (headerExpanded.value) {
    headerExpanded.value = false
  }
}

const dismissSplash = () => {
  if (document.querySelector('.splash-screen')) {
    gsap.to('.splash-screen', {
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      onComplete: () => { 
        splashDone.value = true
        // Trigger entrance of main content
        if (document.querySelector('.home-view')) {
          gsap.from('.home-view', { opacity: 0, duration: 1 })
        }
      }
    })
  } else {
    splashDone.value = true
  }
}

// --- OMNISCIENCE LIFECYCLE PROTOCOL ---
const onMountedHandler = () => {
  // Capture Inbound Affiliate Traffic
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get('ref')
    if (ref) {
      localStorage.setItem('sor_active_affiliate', ref.toUpperCase())
    }
  }

  const animateSafe = (target: string | Element, vars: any) => {
    if (typeof target === 'string') {
      const el = document.querySelector(target)
      if (el) {
        return gsap.to(target, vars)
      }
    } else if (target) {
      return gsap.to(target, vars)
    }
    return null
  }

  // Sync the bar visibility with the child
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

  // Initialize Lenis Smooth Scroll
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

  // Scroll logic for Navbar (Omniscience UI Protocol)
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset
    
    // Snappier auto-collapse at 80px for better responsive feel
    if (currentScroll > 80 && headerExpanded.value) {
      headerExpanded.value = false
    } else if (currentScroll < 30 && !headerExpanded.value) {
      headerExpanded.value = true
    }

    // Navbar visibility (hide on scroll down, show on scroll up)
    if (currentScroll <= 0) {
      navVisible.value = true
      return
    }
    
    const delta = currentScroll - lastScroll
    if (Math.abs(delta) > 8) { // Tighter threshold for visibility change
      if (delta > 0 && navVisible.value && currentScroll > 150) {
        navVisible.value = false
      } else if (delta < 0 && !navVisible.value) {
        navVisible.value = true
      }
      lastScroll = currentScroll
    }
  }, { passive: true })

  // Initial Visibility Pulse
  animateSafe('.collapsible-header-wrapper', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'expo.out'
  })

  // Track Frequency Changes for Visual Pulse
  watch(() => resonance.detectedFrequency, (newFreq, oldFreq) => {
    if (newFreq !== oldFreq) {
      animateSafe('.resonance-hud', {
        scale: 1.05,
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }
  })

  // Klaviyo Identification (Orion Sync)
  setTimeout(() => {
    const seekerEmail = localStorage.getItem('sor_seeker_email')
    if (seekerEmail) {
      klaviyoService.identify(seekerEmail, {
        'vibrational_tier': resonance.tier,
        'last_sync': new Date().toISOString()
      });
    }
  }, 1500);

  // Initial Entrance Animation
  animateSafe('.nav-bar', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'expo.out',
    delay: 0.5
  })

  // Custom Cursor (High-Performance Tracking)
  const cursor = document.querySelector('.custom-cursor') as HTMLElement
  if (cursor) {
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'none'
      })
    })

    window.addEventListener('mouseover', (e: MouseEvent) => {
      if ((e.target as Element)?.closest('a, button, .interactive')) {
        cursor.classList.add('cursor-hover')
      }
    })
    window.addEventListener('mouseout', (e: MouseEvent) => {
      if ((e.target as Element)?.closest('a, button, .interactive')) {
        cursor.classList.remove('cursor-hover')
      }
    })
  }
}

onMounted(onMountedHandler)

// --- FREQUENCY AURA PROTOCOL ---
const auraStyle = computed(() => {
  const f = resonance.detectedFrequency;
  let color = 'rgba(0,0,0,0)';
  if (f === '963') color = 'rgba(212, 175, 55, 0.12)';
  if (f === '528') color = 'rgba(74, 222, 128, 0.08)';
  if (f === '432') color = 'rgba(184, 151, 58, 0.06)';
  if (f === '396') color = 'rgba(239, 68, 68, 0.06)';

  return {
    background: `radial-gradient(circle at 50% 30%, ${color} 0%, transparent 70%)`
  }
})

</script>

<template>
  <div class="app-container" :class="{ 'header-is-collapsed': !headerExpanded }">
    <div class="custom-cursor"></div>
    <div class="global-aura" :style="auraStyle"></div>
    
    <div class="collapsible-header-wrapper" :class="{ 'is-expanded': headerExpanded }">

      <nav class="nav-bar glass" :class="{ 'nav-hidden': !navVisible, 'mobile-nav-active': mobileMenuOpen }">
      <div class="mobile-toggle" @click="toggleMobileMenu">
        <span class="bar"></span>
        <span class="bar"></span>
      </div>

      <router-link to="/" class="nav-logo" @click="mobileMenuOpen = false">
        RESONANCE
        <div class="live-signal-mini v-sync-2174">
          <span class="pulse-dot"></span>
          <span class="signal-count">{{ resonance.detectedFrequency }}</span>
        </div>
      </router-link>

      <div class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
        <!-- Close Button (Mobile) -->
        <button v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="mobile-close-btn gold-text" aria-label="Close navigation menu">✕</button>

        <div v-if="mobileMenuOpen" class="mobile-drawer-header">
           <span class="meta-vibe gold-text">STATE OF RESONANCE</span>
           <div class="resonance-trace"></div>
        </div>

        <!-- PRIMARY SHOPPING NAV -->
        <router-link to="/best-sellers" class="nav-link" @click="mobileMenuOpen = false" style="font-weight: 500; letter-spacing: 0.1em;">
          SHOP
        </router-link>

        <router-link to="/about" class="nav-link" @click="mobileMenuOpen = false" style="font-weight: 500; letter-spacing: 0.1em;">
          SYMBOLS
        </router-link>

        <router-link to="/about" class="nav-link" @click="mobileMenuOpen = false" style="font-weight: 500; letter-spacing: 0.1em;">
          ABOUT
        </router-link>

        <router-link to="/faq" class="nav-link" @click="mobileMenuOpen = false" style="font-weight: 500; letter-spacing: 0.1em;">
          FAQ
        </router-link>

        <router-link to="/inner-circle" class="nav-link inner-circle-link" @click="mobileMenuOpen = false">
          <span class="label-primary">✦ INNER CIRCLE</span>
          <span class="label-hover">MEMBERS</span>
        </router-link>
        
        <!-- Mobile Calibration Hub (Orion Parity) -->
        <div 
          v-show="mobileMenuOpen" 
          class="mobile-calibration-hub glass"
          :class="{ 'is-revealed': mobileMenuOpen }"
        >
           <div class="calibration-section">
             <span class="util-label">RESONANCE</span>
           </div>
           
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
            <div class="flex flex-col items-end">
              <CurrencySwitcher @select="handleToolsSelect" />
            </div>
            <div class="flex flex-col items-end">
              <LanguageSwitcher @select="barVisible = false; handleToolsSelect()" />
            </div>
          </div>
        </div>

        <button 
          @click="toggleHeader" 
          class="calibration-toggle desktop-only interactive" 
          :class="{ 'is-active': headerExpanded }"
          :title="headerExpanded ? 'Close Calibration' : 'Open Calibration'"
        >
          <div class="flex flex-col items-center justify-center">
             <ChevronUp :size="14" v-if="headerExpanded" />
             <Globe :size="16" v-else />
          </div>
        </button>

        <button @click="cart.isOpen = true; mobileMenuOpen = false" class="nav-link reservoir-btn" style="background: none; border: none; cursor: pointer;" aria-label="Open shopping cart">
          <span class="desktop-only text-label">
            <span class="label-primary">{{ $t('nav.reservoir') }}</span>
            <span class="label-hover">VIEW CART</span>
          </span>
          <svg class="mobile-only cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="reservoir-count" v-if="cart.items.length > 0" aria-label="{{ cart.items.length }} items in cart">{{ cart.items.length }}</span>
        </button>
      </div>
    </nav>
    </div>

    <CartSidebar />

    <ExitIntentGate />
    <div class="toast-container"></div>
    <div id="teleport-target"></div>
    
    <!-- WhatsApp support link removed — placeholder number was set, will re-add with real number -->


    <main>
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="glass">
      <div class="container footer-content">
        <!-- JudgeMe Reviews Widget -->
        <div class="judgeme-reviews-section">
          <p class="badge-label">✦ VERIFIED CUSTOMER REVIEWS</p>
          <div class="jdgm-widget jdgm-preview-badge" data-id="stateofresonance"></div>
        </div>
          <div class="footer-social-resonance">
            <span class="meta-vibe gold-text" style="display: block; margin-bottom: 1rem; margin-top: 2rem;">CONNECT WITH RESONANCE</span>
            <div class="social-icons-grid">
              <a href="https://instagram.com/resonancestateof" target="_blank" class="social-icon-link" aria-label="State of Resonance on Instagram"><Instagram :size="18" /></a>
              <a href="https://facebook.com/stateofresonance" target="_blank" class="social-icon-link" aria-label="State of Resonance on Facebook"><Facebook :size="18" /></a>
              <a href="https://twitter.com/stateofresonance" target="_blank" class="social-icon-link" aria-label="State of Resonance on X (Twitter)"><Twitter :size="18" /></a>
              <a href="https://tiktok.com/@stateofresonance" target="_blank" class="social-icon-link" aria-label="State of Resonance on TikTok"><Music2 :size="18" /></a>
              <a href="https://pinterest.com/stateofresonance" target="_blank" class="social-icon-link" aria-label="State of Resonance on Pinterest"><Compass :size="18" /></a>
            </div>
          </div>
        <p class="footer-sup" style="text-transform: none; font-size: 1.1rem; opacity: 0.9;">Symbolic streetwear for the spiritually awakened.</p>
        <div class="footer-trust-links">
          <router-link to="/best-sellers" class="footer-trust-link">Shop</router-link>
          <span class="footer-divider">•</span>
          <router-link to="/about" class="footer-trust-link">About</router-link>
          <span class="footer-divider">•</span>
          <router-link to="/about" class="footer-trust-link">Symbols</router-link>
          <span class="footer-divider">•</span>
          <router-link to="/faq" class="footer-trust-link">FAQ</router-link>
          <span class="footer-divider">•</span>
          <router-link to="/contact" class="footer-trust-link">Contact</router-link>
        </div>
        <p class="footer-copy" style="margin-top: 2rem;">&copy; State of Resonance — All Rights Reserved</p>
        
        <div class="footer-dialect-control desktop-only" style="margin-top: 3rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; opacity: 0.8;">
          <span style="font-size: 0.55rem; letter-spacing: 0.3em; color: var(--color-gold-muted); text-transform: uppercase;">{{ $t('nav.language') || 'SELECT FREQUENCY' }}</span>
          <LanguageSwitcher />
        </div>

        <span class="easter-egg" style="opacity: 0.05; font-size: 0.4rem; letter-spacing: 0.8em; position: absolute; bottom: 5px; right: 10px; pointer-events: none; user-select: none; color: var(--color-gold-muted);">RESONANCE</span>
      </div>
    </footer>
  </div>
</template>

<style>
/* === SPLASH SCREEN === */
.splash-screen {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.splash-inner {
  text-align: center;
  max-width: 700px;
  padding: 2rem;
}
.splash-tagline {
  font-size: 0.65rem;
  letter-spacing: 0.5em;
  color: var(--color-gold-muted, #b8973a);
  margin-bottom: 2.5rem;
  opacity: 0.7;
}
.splash-wordmark {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 8vw, 6rem);
  letter-spacing: 0.15em;
  color: #fff;
  margin-bottom: 2rem;
  line-height: 1;
}
.splash-sub {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
}

/* === LIVE SIGNAL === */
.nav-logo {
  position: relative;
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
}

.live-signal-mini {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(212,175,55,0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  margin-left: 0.5rem;
}

.pulse-dot {
  width: 4px;
  height: 4px;
  background: var(--color-gold);
  border-radius: 50%;
  box-shadow: 0 0 5px var(--color-gold);
  animation: pulse-glow 2s infinite;
}

.signal-count {
  font-size: 0.5rem;
  font-family: var(--font-mono);
  color: var(--color-gold-muted);
  letter-spacing: 0.1em;
}

/* === COMPACT HEADER PHASE 9 === */
.collapsible-header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.5s var(--ease-out-expo);
}

.collapsible-sector {
  overflow: hidden;
  height: 24px;
  transition: height 0.6s var(--ease-out-expo), opacity 0.4s ease;
  opacity: 1;
  position: relative;
  z-index: 2;
}

.sector-collapsed {
  height: 0 !important;
  opacity: 0;
  pointer-events: none;
}

.header-tools-sector {
  width: 0;
  max-width: 0;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  margin-right: 0 !important;
  padding: 0 !important;
  pointer-events: none;
  transition: all 0.8s var(--ease-out-expo);
  z-index: 5;
}

/* Expanded State for Smart Header Tools */
.is-expanded .header-tools-sector {
  width: auto;
  max-width: 800px;
  opacity: 1;
  visibility: visible;
  pointer-events: all;
  margin-right: 2rem !important;
}

.calibration-toggle {
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.1);
  color: var(--color-gold);
  width: 32px;
  height: 32px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 1rem;
}

.calibration-toggle:hover, .calibration-toggle.is-active {
  background: rgba(212, 175, 55, 0.15);
  border-color: rgba(212, 175, 55, 0.4);
  color: #fff;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
}

.calibration-toggle.is-active {
  transform: rotate(180deg);
}

.nav-bar {
  padding: 0.2rem 5vw;
  background: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: none !important;
  box-shadow: none !important;
  transition: all 0.5s var(--ease-out-expo);
}

.nav-link {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all 0.4s var(--ease-out-expo);
  display: flex;
  flex-direction: column;
  height: 1.1rem;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
  padding-right: 0.15em;
}

.nav-link span {
  transition: transform 0.5s var(--ease-out-expo);
}

.nav-link:hover span {
  transform: translateY(-100%);
}

.label-hover {
  color: var(--color-gold);
  font-weight: 700;
  opacity: 1;
}

.nav-dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
  background: rgba(8, 8, 10, 0.95);
  border: 1px solid rgba(212, 175, 55, 0.2);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s var(--ease-out-expo);
  z-index: 100;
}

.nav-dropdown-container:hover .nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-link {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: #fff;
  text-decoration: none;
  font-family: var(--font-heading);
  text-align: center;
  transition: color 0.3s;
}

.dropdown-link:hover {
  color: var(--color-gold);
}

.nav-link--highlight {
  color: var(--color-gold) !important;
}

.nav-link--highlight .label-primary {
  color: var(--color-gold);
}

.reservoir-btn .text-label {
  display: flex;
  flex-direction: column;
  height: 1.1rem;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 0.15em;
}

.reservoir-btn:hover .text-label span {
  transform: translateY(-100%);
}

.nav-logo {
  font-size: 1.1rem;
  transition: all 0.5s var(--ease-out-expo);
  white-space: nowrap;
  flex-shrink: 0;
}

.header-is-collapsed .nav-bar {
  padding: 0.15rem 5vw;
  background: rgba(8, 8, 10, 0.95) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1) !important;
}

.header-is-collapsed .nav-logo {
  font-size: 0.95rem;
  letter-spacing: 0.25em;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* === NAV === */
.nav-hidden {
  transform: translateY(-100%);
}
.reservoir-btn {
  position: relative;
}
.reservoir-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: var(--color-gold, #d4af37);
  color: #000;
  border-radius: 50%;
  font-size: 0.6rem;
  font-weight: 700;
  margin-left: 6px;
  vertical-align: middle;
}

/* === PAGE TRANSITIONS === */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

footer {
  position: relative;
  padding: 5rem 0;
  margin-top: 10vh;
  text-align: center;
  border-top: 1px solid var(--glass-border);
}

.trust-badges {
  margin-bottom: 3rem;
  opacity: 0.6;
}

.badge-label {
  font-size: 0.5rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-muted);
  margin-bottom: 1rem;
}

.badge-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  opacity: 0.55;
}

.badge-icons img, .payment-icon {
  height: 28px;
  width: auto;
  color: var(--color-gold-muted);
}

.footer-sup {
  font-size: 0.55rem;
  letter-spacing: 0.5em;
  color: rgba(255,255,255,0.15);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.footer-copy {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-muted);
}

.footer-trust-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.6;
}

.footer-trust-link {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  color: rgba(255,255,255,0.4);
  transition: all 0.3s;
}

.footer-trust-link:hover {
  color: #fff;
  opacity: 1;
}

.footer-social-resonance {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-icons-grid {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.social-icon-link {
  color: rgba(255,255,255,0.4);
  transition: all 0.3s ease;
}

.social-icon-link:hover {
  color: var(--color-gold);
  transform: translateY(-3px);
}

.footer-social-resonance {
  margin-top: 1rem;
}

.social-icons-grid {
  display: flex;
  gap: 1.5rem;
}

.social-icon-link {
  color: rgba(255,255,255,0.3);
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.02);
}

.social-icons-grid {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 1.5rem;
}

.social-icon-link:hover {
  color: var(--color-gold);
  border-color: rgba(212, 175, 55, 0.3);
  background: rgba(212, 175, 55, 0.05);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4), 0 0 15px rgba(212, 175, 55, 0.1);
}

.whatsapp-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 54px;
  height: 54px;
  background: #000;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.whatsapp-btn svg {
  width: 24px;
  height: 24px;
}

.whatsapp-btn:hover {
  transform: scale(1.1) translateY(-5px);
  background: var(--color-gold);
  color: #000;
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
}

.glow-gold {
  animation: glow-pulse 3s infinite;
}

@keyframes glow-pulse {
  0% { box-shadow: 0 0 5px rgba(212,175,55,0.2); }
  50% { box-shadow: 0 0 20px rgba(212,175,55,0.5); }
  100% { box-shadow: 0 0 5px rgba(212,175,55,0.2); }
}

.resonance-hud {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(212, 175, 55, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 4px;
  margin-right: 1rem;
}

.hud-monitor {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.hud-freq {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-gold);
  letter-spacing: 0.1em;
}

.hud-tier {
  font-size: 0.45rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.5;
}

.hud-waves {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
}

.hud-waves .wave {
  width: 2px;
  background: var(--color-gold);
  opacity: 0.3;
  border-radius: 1px;
}

.hud-waves .wave:nth-child(1) { height: 40%; animation: wave-pulse 1.2s infinite ease-in-out; }
.hud-waves .wave:nth-child(2) { height: 100%; animation: wave-pulse 1.2s infinite ease-in-out 0.2s; }
.hud-waves .wave:nth-child(3) { height: 60%; animation: wave-pulse 1.2s infinite ease-in-out 0.4s; }

@keyframes wave-pulse {
  0%, 100% { transform: scaleY(1); opacity: 0.3; }
  50% { transform: scaleY(1.5); opacity: 0.7; }
}

@media (max-width: 1024px) {
  .resonance-hud.desktop-only { display: none; }
}

.mobile-lang-row {
  margin-top: 2rem;
  padding: 1.5rem 1rem;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
  backdrop-filter: blur(40px);
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
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  transition: all 0.4s var(--ease-out-expo);
  backdrop-filter: blur(20px);
  box-shadow: 10px 0 30px rgba(0,0,0,0.5);
  writing-mode: vertical-rl;
  transform: translateY(-50%) rotate(180deg);
}

.ritual-teaser:hover {
  background: var(--color-gold);
  color: #000;
  transform: translateY(-50%) rotate(180deg) translateX(-5px);
  box-shadow: 15px 0 40px rgba(212, 175, 55, 0.3);
}

.teaser-icon {
  animation: pulse-gold 2s infinite;
}

@keyframes pulse-gold {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@media (max-width: 768px) {
  .ritual-teaser {
    bottom: 20px;
    left: 20px;
    padding: 0.6rem 1rem;
    font-size: 0.55rem;
  }
}

.calibration-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.util-label {
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  text-transform: uppercase;
}

.calibration-row {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

/* Ensure Switchers are visible on dark mobile bg */
.mobile-calibration-hub select {
  background: rgba(255,255,255,0.05) !important;
  border-color: rgba(212,175,55,0.2) !important;
  color: #fff !important;
}

/* === KLAVIYO AESTHETIC HIJACK (RITUAL LOCKDOWN) === */
/* These overrides force the third-party Klaviyo widgets into the 'Esoteric Luxury' theme. */

/* Main Forms */
div[id^="klaviyo-forms-"] .kl-private-reset-css-root,
div[id^="klaviyo-forms-"] div[role="dialog"] {
  background-color: rgba(10, 10, 12, 0.98) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid var(--color-gold) !important;
  border-radius: 0 !important;
  box-shadow: 0 30px 60px rgba(0,0,0,0.95), 0 0 20px rgba(212, 175, 55, 0.1) !important;
}

/* Teaser / Tab styling (Bottom Left/Right) */
div[class*="kl-teaser-"] button,
.klaviyo-form button,
[data-testid="form-component"] button {
  background: rgba(10, 10, 12, 0.95) !important;
  border: 1px solid var(--color-gold) !important;
  color: var(--color-gold) !important;
  font-family: var(--font-heading) !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  padding: 1rem 1.5rem !important;
  transition: all 0.4s var(--ease-out-expo) !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}

/* Specific Klaviyo Content Blocks */
div[data-testid="form-component"] {
  background: transparent !important;
}

/* Force dark text to white and serif */
.kl-private-reset-css-root *,
div[id^="klaviyo-forms-"] * {
  color: #fff !important;
  font-family: var(--font-body) !important;
}

/* Buttons (Sync with gold) */
.kl-private-reset-css-root button:not([class*="close"]),
div[id^="klaviyo-forms-"] button:not([class*="close"]) {
  background: var(--color-gold) !important;
  color: #000 !important;
  font-family: var(--font-heading) !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  font-weight: 700 !important;
}

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
}

/* === GLOBAL RESONATOR AURA === */
.global-aura {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  opacity: 0.8;
  transition: all 2s cubic-bezier(0.165, 0.84, 0.44, 1);
  animation: aura-drift 20s infinite alternate-reverse ease-in-out;
}

@keyframes aura-drift {
  0% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.1) translateY(-2%); }
  100% { transform: scale(1.05) translateY(1%); }
}
</style>
