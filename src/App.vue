<script setup lang="ts">
import { ref, onMounted, computed, watch, provide } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CSSPlugin } from 'gsap/CSSPlugin'
import Lenis from 'lenis/dist/lenis.mjs'
import AnnouncementBar from './components/AnnouncementBar.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import CurrencySwitcher from './components/CurrencySwitcher.vue'
import CartSidebar from './components/CartSidebar.vue'
import ResonatorToast from './components/ResonatorToast.vue'
import TheOracle from './components/TheOracle.vue'
import ExitIntentGate from './components/ExitIntentGate.vue'
import { cart } from './store/cart'
import { useResonanceStore } from './store/resonance'
import { klaviyoService } from './services/klaviyo'
import FrequencyPlayer from './components/FrequencyPlayer.vue'
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
      <div 
        class="collapsible-sector" 
        :class="{ 'sector-collapsed': !headerExpanded || !barVisible }"
      >
        <AnnouncementBar v-if="barVisible" />
      </div>
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
        <button v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="mobile-close-btn gold-text">✕</button>

        <div v-if="mobileMenuOpen" class="mobile-drawer-header">
           <span class="meta-vibe gold-text">STATE OF RESONANCE</span>
           <div class="resonance-trace"></div>
        </div>

        <!-- PRIMARY SHOPPING NAV -->
        <router-link to="/best-sellers" class="nav-link" @click="mobileMenuOpen = false">
          <span class="label-primary">SHOP</span>
          <span class="label-hover">ALL PRODUCTS</span>
        </router-link>
        <router-link to="/best-sellers" class="nav-link nav-link--highlight" @click="mobileMenuOpen = false">
          <span class="label-primary">BEST SELLERS</span>
          <span class="label-hover">TOP 10</span>
        </router-link>
        
        <router-link to="/attire" class="nav-link" @click="mobileMenuOpen = false">
          <span class="label-primary">HOODIES & TEES</span>
          <span class="label-hover">APPAREL</span>
        </router-link>

        <!-- WORLD / LORE -->
        <router-link to="/about" class="nav-link" @click="mobileMenuOpen = false">
          <span class="label-primary">THE WORLD</span>
          <span class="label-hover">ABOUT</span>
        </router-link>

        <!-- SUPPORT -->
        <router-link to="/contact" class="nav-link" @click="mobileMenuOpen = false">
          <span class="label-primary">CONTACT</span>
          <span class="label-hover">SUPPORT</span>
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
             <FrequencyPlayer />
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
        <!-- Resonance HUD -->
        <div v-if="resonance.isCalibrated" class="resonance-hud desktop-only interactive" title="Current Vibrational State">
          <div class="hud-monitor">
            <span class="hud-freq">{{ resonance.detectedFrequency }}Hz</span>
            <span class="hud-tier">{{ resonance.tier }}</span>
          </div>
          <div class="hud-waves">
            <span class="wave"></span>
            <span class="wave"></span>
            <span class="wave"></span>
          </div>
        </div>

        <router-link to="/quiz" class="sync-icon-link interactive mobile-only" title="Sync Your Field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-dasharray="2 4"/>
            <path d="M12 8V12L14 14" stroke-linecap="round"/>
          </svg>
        </router-link>

        <FrequencyPlayer />

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

        <button @click="cart.isOpen = true; mobileMenuOpen = false" class="nav-link reservoir-btn" style="background: none; border: none; cursor: pointer;">
          <span class="desktop-only text-label">
            <span class="label-primary">{{ $t('nav.reservoir') }}</span>
            <span class="label-hover">VIEW CART</span>
          </span>
          <svg class="mobile-only cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="reservoir-count" v-if="cart.items.length > 0">{{ cart.items.length }}</span>
        </button>
      </div>
    </nav>
    </div>

    <CartSidebar />
    <ResonatorToast />
    <ExitIntentGate />
    <TheOracle />
    <div class="toast-container"></div>
    <div id="teleport-target"></div>
    
    <!-- WhatsApp Resonance Button -->
    <a href="https://wa.me/16470000000" class="whatsapp-btn glow-gold" target="_blank" title="Seeker Support">
      <svg viewBox="0 0 448 512" fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.6-16.5-14.7-27.6-32.8-30.8-38.4-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </a>


    <main>
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="glass">
      <div class="container footer-content">
        <div class="trust-badges">
          <p class="badge-label">SECURED & ENCRYPTED PAYMENTS</p>
          <div class="badge-icons">
            <!-- Visa -->
            <svg class="payment-icon" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M278.2 334.2L311.5 142.5H363.7L330.4 334.2H278.2ZM524.3 146.2C513.4 142.1 496.3 137.7 474.9 137.7C423.5 137.7 387.7 163.4 387.5 200.2C387.2 227 412.4 241.9 431.5 250.9C451.1 260.1 457.7 265.8 457.6 273.9C457.5 286.5 442.5 292.1 428.3 292.1C408.4 292.1 397.7 289.1 381.1 281.9L374.4 278.7L367.1 319.4C379.9 325.2 403.8 330.3 428.6 330.6C483.3 330.6 518.5 305.2 518.8 265.7C519.0 244.6 505.5 228.6 476.4 215.3C458.5 206.7 447.6 200.8 447.7 192.1C447.7 184.5 456.8 176.4 475.9 176.4C492.2 176.1 504.2 179.8 513.7 184.5L518.3 186.7L524.3 146.2ZM641.5 142.5H601.8C589.4 142.5 580.3 145.9 574.9 158.1L496.1 334.2H550.7L561.5 305.8H626.6L632.6 334.2H681.0L641.5 142.5ZM576.3 268.5L602.0 200.5L616.4 268.5H576.3ZM222.8 142.5L172.0 268.9L166.6 241.6C155.9 210.0 127.6 175.7 95.9 158.9L141.6 334.0H196.5L278.7 142.5H222.8Z" />
              <path fill="currentColor" d="M123.1 142.5H37.4L36.7 146.4C102.4 162.7 147.8 198.2 166.6 241.6L147.5 158.5C144.1 146.5 135.3 143.0 123.1 142.5Z" opacity="0.6"/>
            </svg>

            <!-- Mastercard -->
            <svg class="payment-icon" viewBox="0 0 131.39 86.9" xmlns="http://www.w3.org/2000/svg">
              <rect width="131.39" height="86.9" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="2"/>
              <circle fill="currentColor" cx="48.37" cy="43.45" r="27.23" opacity="0.9"/>
              <circle fill="currentColor" cx="83.02" cy="43.45" r="27.23" opacity="0.7"/>
              <path fill="currentColor" d="M65.7 22.41a27.22 27.22 0 0 1 0 42.08 27.22 27.22 0 0 1 0-42.08z" opacity="0.6"/>
            </svg>

            <!-- Amex -->
            <svg class="payment-icon" viewBox="0 0 60 24" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="24" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5"/>
              <path fill="currentColor" d="M7 17l1.4-3.4h-.01L10 17h1.8L8.7 9H7L3.9 17H7zm1.4-5.5l.9 2.3H7.5l.9-2.3zM13.8 9v8h2v-4.8l2 4.8h1.5l2-4.9V17h2V9h-2.8l-1.9 4.8L16.6 9h-2.8zM25.8 9v8H32v-1.7h-4.2v-1.6H31v-1.7h-3.2v-1.3H32V9h-6.2zM39 13.3c.9-.3 1.4-1 1.4-1.9C40.4 9.9 39.2 9 37.1 9H33v8h2V14.5h1.6L38 17h2.4l-2.2-3.4.8-.3zm-4-1.3v-1.4h2.1c.9 0 1.2.4 1.2.7 0 .5-.3.7-1.2.7H35z"/>
              <path fill="currentColor" d="M43 9l-3.1 8h2.1l.5-1.4h3.2l.5 1.4h2.2L45.3 9H43zm.2 5.1l1-2.8 1 2.8h-2z"/>
              <path fill="currentColor" d="M50 9v8h2v-2.9H54L55.6 17H58l-2-3.6c1-.4 1.6-1.2 1.6-2.3 0-1.8-1.4-2.9-3.7-2.9H50zm2 1.7h2c.9 0 1.7.3 1.7 1.1 0 .7-.5 1.2-1.7 1.2H52v-2.3z" opacity="0.6"/>
            </svg>

            <!-- Apple Pay -->
            <svg class="payment-icon" viewBox="0 0 165.52 105.96" xmlns="http://www.w3.org/2000/svg">
              <rect width="165.52" height="105.96" rx="9.77" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="2"/>
              <path fill="currentColor" d="M43.55 36.84c1.42-1.76 2.38-4.2 2.12-6.64-2.05.08-4.53 1.37-6 3.08-1.31 1.51-2.46 3.94-2.15 6.27 2.28.18 4.61-1.13 6.03-2.71z"/>
              <path fill="currentColor" d="M53.58 58.31c-.06-5.37 4.41-7.97 4.61-8.1-2.52-3.69-6.43-4.19-7.82-4.25-3.32-.34-6.47 1.97-8.15 1.97-1.68 0-4.27-1.93-7.02-1.88-3.61.05-6.95 2.12-8.79 5.38-3.74 6.49-.96 16.12 2.71 21.4 1.8 2.61 3.96 5.54 6.8 5.43 2.73-.11 3.77-1.77 7.08-1.77s4.24 1.77 7.12 1.72c2.94-.05 4.79-2.66 6.59-5.28 2.08-3.02 2.93-5.95 2.97-6.1-.06-.03-5.08-1.96-5.1-7.52z"/>
              <path fill="currentColor" d="M83.92 32.74h-8.09L62.58 78.45h6.4l3.37-9.78h14.71l3.37 9.78h6.57L83.92 32.74zm-9.9 30.1l6.3-18.32h.15l6.3 18.32H74.02zM113.86 46.6c-5.87 0-10.22 4.4-10.22 10.71v.17c0 6.31 4.35 10.7 10.22 10.7 3.39 0 6.07-1.57 7.62-4.01h.11v3.74h5.74V32.29h-5.74v18.32h-.11c-1.53-2.47-4.22-4.01-7.62-4.01zm1.68 5.06c3.64 0 6.06 2.79 6.06 6.96v.17c0 4.18-2.42 6.96-6.06 6.96s-6.04-2.82-6.04-7.01v-.17c0-4.12 2.4-6.91 6.04-6.91zM134.62 46.87l-7.06 21.26h5.92l4.4-14.45h.11l4.4 14.45h6.07l-7.06-21.26h-6.78z"/>
            </svg>

            <!-- Google Pay -->
            <svg class="payment-icon" viewBox="0 0 165.52 105.96" xmlns="http://www.w3.org/2000/svg">
              <rect width="165.52" height="105.96" rx="9.77" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="2"/>
              <path fill="currentColor" d="M89.09 53.75v13.37h-4.25V32.58h11.27a10.19 10.19 0 0 1 7.24 2.78 9.23 9.23 0 0 1 2.97 7.03 9.26 9.26 0 0 1-2.97 7.1 10.06 10.06 0 0 1-7.24 2.76h-6.96zm0-17.11v13.04h7.07a5.77 5.77 0 0 0 4.32-1.74 5.73 5.73 0 0 0 0-8.26 5.72 5.72 0 0 0-4.32-1.71h-7.07zM112.11 43.1a9.94 9.94 0 0 1 7.05 2.44 8.64 8.64 0 0 1 2.6 6.68v13.5h-4.06v-3.04h-.17a7.73 7.73 0 0 1-6.72 3.68 8.77 8.77 0 0 1-5.98-2.15 7.12 7.12 0 0 1-2.46-5.49 6.77 6.77 0 0 1 2.69-5.62 11.23 11.23 0 0 1 7.16-2.09 12.9 12.9 0 0 1 6.37 1.48v-1.04a4.83 4.83 0 0 0-1.77-3.78 6.13 6.13 0 0 0-4.18-1.45 6.6 6.6 0 0 0-5.72 3.04l-3.74-2.35a10.51 10.51 0 0 1 9.02-4.84h-.09zm-5.46 16.46a3.49 3.49 0 0 0 1.43 2.84 5.21 5.21 0 0 0 3.29 1.1 6.74 6.74 0 0 0 4.78-1.98 6.37 6.37 0 0 0 2.05-4.73 11.33 11.33 0 0 0-5.72-1.35 7.27 7.27 0 0 0-4.33 1.15 3.56 3.56 0 0 0-1.5 2.97zM145.17 43.74l-14.18 32.6h-4.38l5.27-11.36-9.35-21.24h4.62l6.74 16.28h.09l6.57-16.28h4.62z"/>
              <path fill="currentColor" d="M54.8 52.77a20.94 20.94 0 0 0-.31-3.71H32.85v7.05h12.34a10.56 10.56 0 0 1-4.56 6.92l7.35 5.7a21.39 21.39 0 0 0 6.82-15.96z"/>
              <path fill="currentColor" d="M32.85 74.21a21.12 21.12 0 0 0 14.63-5.47l-7.35-5.7a13.38 13.38 0 0 1-7.28 2.07 13.43 13.43 0 0 1-12.63-9.27l-7.58 5.86a21.72 21.72 0 0 0 20.21 12.51z" opacity="0.9"/>
              <path fill="currentColor" d="M20.22 55.84a13.44 13.44 0 0 1 0-8.6l-7.58-5.86a21.69 21.69 0 0 0 0 20.32l7.58-5.86z" opacity="0.8"/>
              <path fill="currentColor" d="M32.85 37.97a11.74 11.74 0 0 1 8.29 3.24l6.16-6.17a20.84 20.84 0 0 0-14.45-5.62 21.72 21.72 0 0 0-20.21 12.51l7.58 5.86a13.43 13.43 0 0 1 12.63-9.82z" opacity="0.7"/>
            </svg>
          </div>
          <div class="footer-social-resonance">
            <span class="meta-vibe gold-text" style="display: block; margin-bottom: 1rem; margin-top: 2rem;">CONNECT WITH RESONANCE</span>
            <div class="social-icons-grid">
              <a href="https://instagram.com/resonancestateof" target="_blank" class="social-icon-link"><Instagram :size="18" /></a>
              <a href="https://facebook.com/stateofresonance" target="_blank" class="social-icon-link"><Facebook :size="18" /></a>
              <a href="https://twitter.com/stateofresonance" target="_blank" class="social-icon-link"><Twitter :size="18" /></a>
              <a href="https://tiktok.com/@stateofresonance" target="_blank" class="social-icon-link"><Music2 :size="18" /></a>
              <a href="https://pinterest.com/stateofresonance" target="_blank" class="social-icon-link"><Compass :size="18" /></a>
            </div>
          </div>
        </div>
        <p class="footer-sup">FREQUENCY LABORATORY · STATEOFRESONANCE.CA</p>
        <div class="footer-trust-links">
          <a href="https://www.trustindex.io/reviews/stateofresonance.ca" target="_blank" class="footer-trust-link gold-text">✦ 5.0 GOOGLE REVIEWS</a>
          <span class="footer-divider">|</span>
          <router-link to="/best-sellers" class="footer-trust-link">BEST SELLERS</router-link>
          <span class="footer-divider">|</span>
          <router-link to="/contact" class="footer-trust-link">SHIPPING & RETURNS</router-link>
          <span class="footer-divider">|</span>
          <router-link to="/inner-circle" class="footer-trust-link">INNER CIRCLE</router-link>
          <span class="footer-divider">|</span>
          <router-link to="/privacy" class="footer-trust-link">PRIVACY POLICY</router-link>
          <span class="footer-divider">|</span>
          <router-link to="/terms" class="footer-trust-link">TERMS OF SERVICE</router-link>
        </div>
        <p class="footer-motto" style="font-size: 0.6rem; letter-spacing: 0.3em; color: var(--color-gold); margin-bottom: 1.5rem; text-transform: uppercase; font-weight: 500;">
          Wear your frequency. Let your vibes Resonate. State of Resonance.
        </p>
        <p class="footer-copy">&copy; 2026 STATE OF RESONANCE. ESOTERIC LUXURY SANCTUARY.</p>
        
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
