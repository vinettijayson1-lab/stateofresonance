<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useResonanceStore } from '../store/resonance'
import gsap from 'gsap'

const router = useRouter()
const route = useRoute()
const resonance = useResonanceStore()
const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleUnlock = async () => {
  if (!email.value.includes('@')) {
    error.value = 'ENTER VALID FREQUENCY (EMAIL)'
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
        source: 'Locked Ad Squeeze Gate',
        properties: { AdTarget: route.query.piece || 'Unknown' }
      })
    })
    
    if (res.ok) {
      if (!resonance.tier) {
        resonance.commitResonance({ resonancePoints: resonance.resonancePoints + 50, tier: '396_HZ' })
      }
      localStorage.setItem('sor_seer_email', email.value)
      
      if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_category: 'Locked Vault' })
      
      success.value = true
      
      // Auto redirect to Inner Circle
      setTimeout(() => {
        router.push('/inner-circle')
      }, 3000)
    } else {
      throw new Error('Signal lost')
    }
  } catch (err) {
    error.value = 'SYNCHRONIZATION ERROR - TRY AGAIN'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  gsap.from('.gate-content', { opacity: 0, y: 30, duration: 1, delay: 0.2 })
  gsap.to('.pulse-overlay', { opacity: 0.1, duration: 2, repeat: -1, yoyo: true })
})
</script>

<template>
  <div class="locked-gate-view">
    <div class="pulse-overlay"></div>
    
    <div class="container section-top" style="min-height: 80vh; display: flex; align-items: center; justify-content: center;">
      <div v-if="!success" class="gate-content glass">
        <div class="hud-alert">ACCESS DENIED</div>
        <h1 class="hero-title" style="font-size: 2.2rem; margin-bottom: 1rem;">Vibrational Mismatch</h1>
        
        <p class="gate-desc">
          You have attempted to access an piece classified as {{ route.query.piece ? `[ ${route.query.piece} ]` : 'Tier 2 or higher' }}. 
          Your current resonance signature is inadequate. To view this collection, you must first synchronize with the Inner Circle.
        </p>
        
        <div class="email-capture">
          <input 
            type="email" 
            v-model="email" 
            placeholder="ENTER YOUR PRIMARY EMAIL" 
            class="gate-input"
            @keyup.enter="handleUnlock"
          />
          <button @click="handleUnlock" class="btn-gold" :disabled="loading" style="width: 100%; margin-top: 1rem;">
            {{ loading ? 'CALIBRATING...' : 'INITIATE SYNCHRONIZATION (+50 PTS)' }}
          </button>
        </div>
        
        <p v-if="error" class="error-text">{{ error }}</p>
      </div>

      <div v-else class="gate-content glass" style="text-align: center;">
        <div class="hud-alert" style="color: #4ade80; border-color: #4ade80;">SIGNAL ESTABLISHED</div>
        <h1 class="hero-title" style="margin-bottom: 1rem;">Welcome, Initiate</h1>
        <p class="gate-desc">
          Your frequency has been registered. 50 Resonance Points have been credited to your aura.
          Redirecting you to the Inner Circle...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.locked-gate-view {
  position: relative;
  background: #000;
  overflow: hidden;
  min-height: 100dvh;
}

.pulse-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(212,175,55,0.4) 0%, transparent 70%);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.gate-content {
  position: relative;
  z-index: 10;
  max-width: 500px;
  width: 100%;
  padding: 4rem 3rem;
  border: 1px solid rgba(255, 62, 62, 0.3);
  background: rgba(10, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  text-align: center;
}

.hud-alert {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #ff3e3e;
  border: 1px solid #ff3e3e;
  padding: 0.3rem 0.8rem;
  margin-bottom: 2rem;
  animation: flicker 4s infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
  52% { opacity: 1; }
  54% { opacity: 0.5; }
}

.gate-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.7;
  margin-bottom: 3rem;
  font-family: var(--font-mono);
}

.email-capture {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gate-input {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1.2rem;
  color: #fff;
  font-family: var(--font-heading);
  letter-spacing: 0.1em;
  font-size: 0.8rem;
  width: 100%;
  text-align: center;
  outline: none;
  transition: all 0.3s;
}

.gate-input:focus {
  border-color: var(--color-gold);
}

.error-text {
  color: #ff3e3e;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  font-family: var(--font-heading);
  margin-top: 1.5rem;
}
</style>
