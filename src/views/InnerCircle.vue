<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import ReferralCard from '../components/ReferralCard.vue'
import ManifestationBoard from '../components/ManifestationBoard.vue'
import { useResonanceStore } from '../store/resonance'
import { useI18n } from 'vue-i18n'
import { klaviyoService } from '../services/klaviyo'
import gsap from 'gsap'
import { Lock } from 'lucide-vue-next'

interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
  metadata?: any
}

const membersProducts = ref<Product[]>([])
const loading = ref(true)
const resonance = useResonanceStore()
const { t } = useI18n()
const isUnlocked = ref(localStorage.getItem('sor_inner_circle') === 'true')
const accessCode = ref('')
const accessEmail = ref(localStorage.getItem('sor_seer_email') || '')
const accessPhone = ref('')
const smsConsent = ref(true)
const accessError = ref('')
const subLoading = ref(false)
const subSuccess = ref(false)

const nextTier = computed(() => {
  const current = resonance.tier
  if (current === '396_HZ') return '417_HZ'
  if (current === '417_HZ') return '528_HZ'
  if (current === '528_HZ') return '639_HZ'
  if (current === '639_HZ') return '741_HZ'
  if (current === '741_HZ') return '852_HZ'
  if (current === '852_HZ') return '963_HZ'
  if (current === '963_HZ') return 'RESONANCE_ACHIEVED'
  return null
})

const pointsToNext = computed(() => {
  const points = resonance.resonancePoints
  if (points < 100) return 100 - points
  if (points < 300) return 300 - points
  if (points < 500) return 500 - points
  return 0
})

const pointsProgress = computed(() => {
  const points = resonance.resonancePoints
  if (points < 100) return (points / 100) * 100
  if (points < 300) return ((points - 100) / 200) * 100
  if (points < 500) return ((points - 300) / 200) * 100
  return 100
})

const unlockAccess = () => {
  if (accessCode.value.toUpperCase() === 'RESONANCE963' || accessCode.value.toUpperCase() === 'MASTER_963') {
    isUnlocked.value = true
    localStorage.setItem('sor_inner_circle', 'true')
    if (accessEmail.value) localStorage.setItem('sor_seer_email', accessEmail.value)
    
    // Auto-promote to 417_HZ if initial unlock
    if (!resonance.tier || resonance.tier === '396_HZ') {
      resonance.commitResonance({ tier: '417_HZ' })
    }
    
    if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'Inner Circle Unlock' });
    fetchMembersProducts()
  } else {
    accessError.value = t('inner_circle.access_error') || 'FREQUENCY MISMATCH'
  }
}

const lockPortal = () => {
  localStorage.removeItem('sor_inner_circle')
  isUnlocked.value = false
  window.location.reload()
}

const requestAccess = async () => {
  if (!accessEmail.value.includes('@')) {
    accessError.value = 'INVALID SIGNAL'
    return
  }
  
  const resonance = useResonanceStore()
  
  try {
    // --- KLAVIYO IDENTIFY (Orion) ---
    klaviyoService.identify(accessEmail.value, {
      'vibrational_tier': resonance.tier,
      'detected_frequency': resonance.detectedFrequency
    });

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: accessEmail.value,
        phone: accessPhone.value,
        sms_consent: smsConsent.value,
        source: 'Inner Circle Request',
        vibrational_tier: resonance.tier,
        detected_frequency: resonance.detectedFrequency
      })
    })
    
    if (res.ok) {
      subSuccess.value = true
      localStorage.setItem('sor_seer_email', accessEmail.value)
    } else {
      throw new Error('Signal lost')
    }
  } catch (err) {
    accessError.value = 'SYNCHRONIZATION ERROR'
  } finally {
    subLoading.value = false
  }
}

const fetchMembersProducts = async () => {
  try {
    const res = await fetch('/api/products?limit=250')
    const data = await res.json()
    // Filter for members-only items
    membersProducts.value = data.filter((p: any) => p.metadata?.isMembersOnly === true).sort((a: any, b: any) => (a.metadata?.minResonanceScore || 0) - (b.metadata?.minResonanceScore || 0))
  } catch (err) {
    console.error('Failed to distill members reservoir:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const resonance = useResonanceStore()
  const savedEmail = localStorage.getItem('sor_seer_email')
  if (savedEmail) {
    resonance.handshake(savedEmail).then(() => {
      if (isUnlocked.value) fetchMembersProducts()
    })
  } else if (isUnlocked.value) {
    fetchMembersProducts()
  }
  
  gsap.from('.members-header', { opacity: 0, y: 30, duration: 1, delay: 0.2 })
})
</script>

<template>
  <div class="inner-circle-view container">
    <!-- Gated State (Strict Password Enforced) -->
    <div v-if="!isUnlocked" class="members-gate glass section-top">
      <div class="gate-content">
        <span class="gate-id">{{ $t('inner_circle.id_label') }}</span>
        <h1 class="hero-title">{{ $t('inner_circle.title') }}</h1>
        <p class="gate-text">
          This space is reserved for those who have been granted access. Enter your frequency key below, or request early access with your email.
        </p>

        <!-- Code form -->
        <div class="lock-form" style="margin-top: 2rem;">
          <input 
            type="password" 
            v-model="accessCode" 
            placeholder="ENTER ACCESS KEY..." 
            class="members-input"
            @keyup.enter="unlockAccess"
            style="text-align: center; letter-spacing: 0.3em; font-size: 0.7rem;"
          />
          <button @click="unlockAccess" class="btn-gold">{{ $t('inner_circle.unlock_btn') }}</button>
        </div>
        <p v-if="accessError && !accessEmail" class="error-msg">Incorrect access code.</p>

        <!-- Divider -->
        <div class="divider" style="margin: 2.5rem 0;">OR</div>

        <!-- Email request access -->
        <div v-if="!subSuccess">
          <p style="font-size: 0.75rem; opacity: 0.5; margin-bottom: 1.5rem; line-height: 1.6;">
            Don't have a code yet? Submit your email to request access and be notified when new drops unlock.
          </p>
          <div class="lock-form" style="flex-direction: column; gap: 0.75rem; margin: 0 auto; max-width: 420px;">
            <input
              type="email"
              v-model="accessEmail"
              placeholder="YOUR EMAIL ADDRESS"
              class="members-input"
              @keyup.enter="requestAccess"
              style="letter-spacing: 0.1em;"
            />
            <button
              @click="requestAccess"
              class="btn-gold"
              :disabled="subLoading"
              style="width: 100%; padding: 1rem;"
            >
              {{ subLoading ? 'SENDING...' : 'REQUEST INNER CIRCLE ACCESS' }}
            </button>
          </div>
          <p v-if="accessError && accessEmail" class="error-msg">Please enter a valid email address.</p>
        </div>

        <!-- Success state -->
        <div v-else style="text-align: center; padding: 2rem 0;">
          <p style="font-size: 0.6rem; letter-spacing: 0.3em; color: #4ade80; margin-bottom: 1rem; text-transform: uppercase;">✓ Request Received</p>
          <p style="font-size: 0.85rem; opacity: 0.6; line-height: 1.7; max-width: 360px; margin: 0 auto;">
            You're on the list. We'll send you an access key when the next drop opens up. Until then, explore the shop.
          </p>
          <router-link to="/best-sellers" class="btn-gold" style="display: inline-block; margin-top: 2rem;">SHOP THE COLLECTION</router-link>
        </div>
      </div>
    </div>

    <!-- Members Content -->
    <div v-else class="members-content section-top">
      <!-- Ascension HUD (New in Phase 5) -->
      <div class="ascension-hud glass">
        <div class="hud-header">
          <div class="tier-badge gold-text">{{ resonance.tier ? resonance.tier.replace('_', ' ') : '396 HZ' }}</div>
          <div class="hud-controls" style="display: flex; gap: 1rem; align-items: center;">
            <div class="points-display">{{ $t('membership.resonance_points', { n: resonance.resonancePoints }) }}</div>
            <button @click="lockPortal" class="btn-outline" style="padding: 0.3rem 0.8rem; font-size: 0.5rem; opacity: 0.5;">LOCK PORTAL</button>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: pointsProgress + '%' }"></div>
        </div>
        <div v-if="nextTier" class="hud-footer">
          {{ $t('membership.next_tier', { tier: $t(`membership.tiers.${nextTier}`) }) }} ({{ pointsToNext }} remaining)
        </div>
      </div>

      <header class="members-header">
        <div class="header-meta">{{ $t('membership.tier_label') }} : {{ resonance.tier ? resonance.tier.replace('_', ' ') : '396 HZ' }}</div>
        <h1 class="hero-title">{{ $t('inner_circle.welcome') }}</h1>
        <p class="members-intro">
          {{ $t('inner_circle.intro') }}
        </p>
      </header>

      <div class="reservoir-grid">
        <div class="reservoir-section">
          <h2 class="reservoir-title">{{ $t('inner_circle.exclusive_title') }}</h2>
          <div v-if="loading" class="loading-state">{{ $t('inner_circle.loading') }}</div>
          <div v-else class="product-grid">
            <div v-for="product in membersProducts" :key="product.id" class="relative group">
              <ProductCard 
                :product="product" 
                :style="((product.metadata?.minResonanceScore || 0) > resonance.resonancePoints) ? 'opacity: 0.25; pointer-events: none; filter: grayscale(100%);' : ''" 
              />
              <div v-if="(product.metadata?.minResonanceScore || 0) > resonance.resonancePoints" class="lock-overlay absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                <div class="lock-icon mb-4 opacity-50">
                   <Lock :size="32" />
                </div>
                <div class="lock-status text-[0.65rem] tracking-[0.3em] text-red-500 font-bold mb-2 uppercase"> Access Restricted </div>
                <div class="lock-requirement text-[0.55rem] tracking-[0.1em] opacity-60">
                   Requires {{ product.metadata?.minResonanceScore }} Resonance Points
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="manifestation-protocols glass">
          <h2 class="reservoir-title">{{ $t('inner_circle.protocols_title') }}</h2>
          <div class="protocol-list">
            <div class="protocol-item">
              <span class="protocol-num">01</span>
              <div class="protocol-body">
                <h3>{{ $t('inner_circle.protocol_1_title') }}</h3>
                <p>{{ $t('inner_circle.protocol_1_text') }}</p>
              </div>
            </div>
            <div v-if="resonance.tier !== '417_HZ' && resonance.tier !== '396_HZ'" class="protocol-item">
              <span class="protocol-num">02</span>
              <div class="protocol-body">
                <h3>{{ $t('inner_circle.protocol_2_title') }}</h3>
                <p>{{ $t('inner_circle.protocol_2_text') }}</p>
              </div>
            </div>
          </div>
          <!-- Referral Loop (Viral Growth) -->
          <ReferralCard style="margin-top: 5rem;" />

          <!-- Manifestation Board (Phase 8 Success) -->
          <ManifestationBoard />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inner-circle-view {
  min-height: 80vh;
  padding-top: 18vh !important;
  padding-bottom: 20vh;
}

.members-gate {
  max-width: 600px;
  margin: 10vh auto;
  padding: 5rem 3rem;
  text-align: center;
  border: 1px solid var(--color-gold-muted);
  overflow: hidden;
}

/* Constrain the hero-title inside the gate box */
.members-gate .hero-title {
  font-size: clamp(1.8rem, 5vw, 3rem) !important;
  line-height: 1.15;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.gate-id {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  margin-bottom: 2rem;
}

.gate-text {
  font-size: 0.95rem;
  opacity: 0.6;
  margin-bottom: 3rem;
  line-height: 1.8;
}

.lock-form {
  display: flex;
  gap: 1rem;
  justify-content: center;
  max-width: 450px;
  margin: 0 auto;
}

.members-input {
  flex: 1;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1rem;
  color: #fff;
  font-family: var(--font-heading);
  letter-spacing: 0.2em;
  font-size: 0.8rem;
  width: 100%;
  min-width: 280px;
  outline: none;
  transition: border-color 0.3s;
}

.members-input:focus {
  border-color: var(--color-gold-muted);
}

.error-msg {
  color: #ff3e3e;
  font-size: 0.6rem;
  margin-top: 1.5rem;
  letter-spacing: 0.2em;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  opacity: 0.3;
  font-size: 0.5rem;
  letter-spacing: 0.3em;
  margin: 2rem 0;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #fff;
}

.divider:not(:empty)::before { margin-right: 1.5rem; }
.divider:not(:empty)::after { margin-left: 1.5rem; }

.btn-outline {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.8rem 1.5rem;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn-outline:hover {
  opacity: 0.7;
}

/* Members Content */
.members-header {
  margin-bottom: 6rem;
}

.header-meta {
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  margin-bottom: 1.5rem;
}

.members-intro {
  font-size: 1.1rem;
  opacity: 0.6;
  max-width: 600px;
  line-height: 1.6;
}

.reservoir-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 4rem;
}

.reservoir-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  margin-bottom: 3rem;
  text-transform: uppercase;
}

.manifestation-protocols {
  padding: 2.5rem;
  align-self: start;
  border: 1px solid rgba(212,175,55,0.1);
}

.protocol-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.protocol-num {
  font-family: var(--font-heading);
  color: var(--color-gold-muted);
  font-size: 1.25rem;
  opacity: 0.4;
}

.protocol-body h3 {
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.protocol-body p {
  font-size: 0.8rem;
  opacity: 0.5;
  line-height: 1.6;
}

/* Ascension HUD */
.ascension-hud {
  margin-bottom: 4rem;
  padding: 2rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 4px;
  background: rgba(12, 12, 12, 0.5);
  backdrop-filter: blur(20px);
}

.hud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.tier-badge {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.points-display {
  font-size: 0.7rem;
  opacity: 0.6;
  letter-spacing: 0.1em;
}

.progress-track {
  height: 4px;
  background: rgba(255,255,255,0.05);
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-gold);
  box-shadow: 0 0 10px var(--color-gold);
  transition: width 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.hud-footer {
  font-size: 0.6rem;
  opacity: 0.4;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  .reservoir-grid {
    grid-template-columns: 1fr;
  }
}
</style>
