<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useRouter } from 'vue-router'
import { klaviyoService } from '../services/klaviyo'

const isVisible = ref(false)
const hasFired = ref(false)
const email = ref('')
const error = ref('')
const loading = ref(false)
const success = ref(false)
const router = useRouter()

// Desktop: trigger when cursor exits top of viewport
const handleMouseLeave = (e: MouseEvent) => {
  if (e.clientY <= 5 && !hasFired.value && !isVisible.value) {
    if (localStorage.getItem('sor_exit_triggered')) return
    triggerGate()
  }
}

// Mobile: trigger when user has scrolled 60%+ then quickly scrolls back up
let lastScrollY = 0
let maxScrollReached = 0
const handleMobileScroll = () => {
  const scrollY = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPct = docHeight > 0 ? scrollY / docHeight : 0

  if (scrollPct > maxScrollReached) maxScrollReached = scrollPct

  // Fire if: mobile, scrolled past 60%, now scrolling up fast, not triggered yet
  const isMobile = window.innerWidth < 768
  const scrollingUp = scrollY < lastScrollY - 80
  const engagedEnough = maxScrollReached > 0.6

  if (isMobile && scrollingUp && engagedEnough && !hasFired.value && !isVisible.value) {
    if (localStorage.getItem('sor_exit_triggered')) return
    triggerGate()
  }

  lastScrollY = scrollY
}

const triggerGate = () => {
  isVisible.value = true
  hasFired.value = true
  localStorage.setItem('sor_exit_triggered', 'true')
  
  // High-end entrance sequence
  gsap.fromTo('.exit-gate-overlay', 
    { opacity: 0 }, 
    { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
  )
  
  gsap.fromTo('.exit-content', 
    { y: 100, opacity: 0, scale: 0.95 }, 
    { y: 0, opacity: 1, scale: 1, duration: 1.5, delay: 0.2, ease: 'expo.out' }
  )

  gsap.fromTo('.seer-bg-image',
    { scale: 1.2, opacity: 0 },
    { scale: 1, opacity: 0.4, duration: 3, delay: 0.5, ease: 'power2.out' }
  )
}

const closeGate = () => {
  gsap.to('.exit-content', { y: 50, opacity: 0, duration: 0.8, ease: 'expo.in' })
  gsap.to('.exit-gate-overlay', { 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.3, 
    onComplete: () => { isVisible.value = false } 
  })
}

const captureIntent = async () => {
  if (!email.value.includes('@')) {
    error.value = 'Please enter a valid email address.'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email.value, 
        source: 'Exit Intent — Inner Circle',
        properties: {
          tier: 'inner_circle_prospect'
        }
      })
    })
    
    if (res.ok) {
      if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_category: 'Inner Circle Exit Intent' })
      klaviyoService.identify(email.value, { inner_circle_prospect: true, source: 'Exit Intent — Inner Circle' })
      success.value = true
    } else {
      throw new Error('Signal lost')
    }
  } catch (err) {
    error.value = 'Something went wrong — please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!localStorage.getItem('sor_exit_triggered')) {
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleMobileScroll, { passive: true })
  }
})

onUnmounted(() => {
  document.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('scroll', handleMobileScroll)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="exit-gate-overlay">
      <div class="exit-content glass">
        <button class="close-btn" @click="closeGate">✕</button>
        
        <!-- Premium Seer Background -->
        <div class="seer-bg-wrapper">
          <img src="https://cdn.shopify.com/s/files/1/0787/0808/0663/files/resonance_piece_a_high_fashion_streetwear_noir_1774960188309.png" class="seer-bg-image" alt="The Seer" />
          <div class="seer-gradient-overlay"></div>
        </div>

        <div v-if="!success" class="ritual-capture">
          <span class="hud-alert glow-gold">FREE GUIDE — DECODE YOUR SYMBOL</span>
          <h2 class="hero-title" style="font-size: clamp(2rem, 5vw, 2.8rem); line-height: 1.1; margin-bottom: 1.5rem;">
            What Does Your<br/><span class="gold-text">Symbol Mean?</span>
          </h2>
          
          <p class="exit-desc">
            Every piece in the collection is built around a specific symbol and frequency. Enter your email and we'll send you the full Symbol Decoder — a free guide to the meaning behind each design.
          </p>
          
          <div class="email-capture">
            <input 
              type="email" 
              v-model="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              class="members-input"
              @keyup.enter="captureIntent"
            />
            <button @click="captureIntent" class="btn-gold interactive animate-glint" :disabled="loading" style="width: 100%; margin-top: 1rem; height: 60px;">
              {{ loading ? 'ONE MOMENT...' : 'SEND ME THE GUIDE' }}
            </button>
          </div>
          <p v-if="error" class="error-text">Please enter a valid email address.</p>
          <a @click.prevent="closeGate" class="sever-link interactive">I'll figure it out myself</a>
        </div>

        <div v-else class="ritual-capture success-state" style="text-align: center;">
          <span class="hud-alert glow-gold" style="color: #4ade80; border-color: #4ade80;">✓ YOU'RE IN</span>
          <p class="meta-vibe" style="margin-bottom: 1rem; opacity: 0.5; letter-spacing: 0.3em;">INNER CIRCLE — EARLY ACCESS</p>
          <h2 class="hero-title" style="margin-bottom: 1.5rem; font-size: clamp(1.8rem, 4vw, 2.4rem); line-height: 1.1;">
            You'll hear about<br/><span class="gold-text">new drops first.</span>
          </h2>
          <p class="exit-desc" style="margin-bottom: 3rem;">
            Check your inbox. We’ll notify you before pieces go live to the public. Limited runs — once they’re gone, they don’t come back.
          </p>
          <button @click="closeGate" class="btn-gold" style="width: 100%;">SHOP THE COLLECTION →</button>
          
          <p class="motto-signoff" style="font-size: 0.5rem; letter-spacing: 0.4em; color: var(--color-gold-muted); margin-top: 2rem; text-transform: uppercase; opacity: 0.5;">
            Wear your frequency. Let your vibes Resonate. State of Resonance.
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.exit-gate-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.exit-content {
  position: relative;
  background: rgba(5, 5, 5, 0.95);
  border: 1px solid rgba(212, 175, 55, 0.2);
  max-width: 550px;
  width: 100%;
  padding: 5rem 3rem 4rem;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.05);
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.seer-bg-wrapper {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.seer-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  filter: grayscale(1) contrast(1.2);
}

.seer-gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(5, 5, 5, 0.8) 70%, #050505 100%);
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  opacity: 0.3;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
  z-index: 20;
}

.close-btn:hover {
  opacity: 1;
  transform: rotate(90deg);
}

.hud-alert {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  padding: 0.4rem 1rem;
  margin-bottom: 2.5rem;
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: var(--color-gold);
  background: rgba(212, 175, 55, 0.05);
}

.exit-desc {
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  line-height: 1.7;
  opacity: 0.8;
  margin-bottom: 3rem;
  font-family: var(--font-mono);
  max-width: 45ch;
  color: #ccc;
}

.email-capture {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 10;
}

.members-input {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.4rem;
  color: #fff;
  font-family: var(--font-heading);
  letter-spacing: 0.2em;
  font-size: 0.85rem;
  width: 100%;
  text-align: center;
  outline: none;
  transition: all 0.4s var(--ease-out-expo);
}

.members-input:focus {
  border-color: var(--color-gold);
  background: rgba(212, 175, 55, 0.02);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.05);
}

.sever-link {
  display: block;
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-align: center;
  margin-top: 2.5rem;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.3s;
  text-decoration: none;
  color: #fff;
}

.sever-link:hover {
  opacity: 0.8;
}

.success-state .discount-code {
  letter-spacing: 0.2em;
  color: var(--color-gold);
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
  font-family: var(--font-mono);
}

.error-text {
  color: #ff4b4b;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  font-family: var(--font-heading);
  margin-top: 1.5rem;
  text-align: center;
}
</style>
