<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { CheckCircle2, Send, ShieldCheck, Zap } from 'lucide-vue-next'

const form = ref({
  fullName: '',
  handle: '',
  itemSelected: '',
  size: '',
  address: '',
  city: '',
  province: '',
  country: 'Canada',
  postalCode: '',
  email: ''
})

const submitting = ref(false)
const submitted = ref(false)

onMounted(() => {
  gsap.from('.shipping-card', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'expo.out'
  })
})

const submitSync = async () => {
  if (!form.value.fullName || !form.value.address) return
  
  submitting.value = true
  
  try {
    const response = await fetch('/api/marketing/influencer_fulfillment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Sync failed')

    submitting.value = false
    submitted.value = true
    
    gsap.from('.success-manifest', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    })
  } catch (e: any) {
    console.error('Sync error:', e)
    alert(`Construction failed: ${e.message}. Please retry your transmission.`)
    submitting.value = false
  }
}
</script>

<template>
  <div class="influencer-shipping-view">
    <div class="bg-void"></div>
    
    <!-- Sacred Portal Background -->
    <svg class="sacred-portal" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="150" stroke="rgba(212, 175, 55, 0.05)" stroke-width="0.5" fill="none" />
      <path d="M200 50 L250 150 L350 200 L250 250 L200 350 L150 250 L50 200 L150 150 Z" stroke="rgba(212, 175, 55, 0.1)" stroke-width="1" fill="none" />
    </svg>

    <div class="container content-wrapper">
      <div v-if="!submitted" class="shipping-card glass glow-edge">
        <div class="card-header">
          <Zap class="header-icon gold-text" :size="32" />
          <h2 class="title">Sync Your Frequency</h2>
          <p class="subtitle">Enter your logistics to anchor the piece in your physical field.</p>
        </div>

        <form @submit.prevent="submitSync" class="shipping-form">
          <div class="form-grid">
            <div class="field-group">
              <label>FULL NAME</label>
              <input v-model="form.fullName" type="text" placeholder="THE IDENTITY" required />
            </div>
            <div class="field-group">
              <label>SOCIAL HANDLE</label>
              <input v-model="form.handle" type="text" placeholder="@USERNAME" required />
            </div>
          </div>

          <div class="form-grid section-top-sm">
            <div class="field-group">
              <label>ITEM SELECTED</label>
              <input v-model="form.itemSelected" type="text" placeholder="E.G. 963HZ HOODIE" required />
            </div>
            <div class="field-group">
              <label>SIZE</label>
              <select v-model="form.size" required>
                <option value="" disabled>SELECT SCALE</option>
                <option value="S">SMALL (S)</option>
                <option value="M">MEDIUM (M)</option>
                <option value="L">LARGE (L)</option>
                <option value="XL">EXTRA LARGE (XL)</option>
                <option value="XXL">DOUBLE EXTRA (XXL)</option>
              </select>
            </div>
          </div>

          <div class="form-grid section-top-sm">
            <div class="field-group">
              <label>EMAIL ADDRESS</label>
              <input v-model="form.email" type="email" placeholder="YOUR@EMAIL.COM" required />
            </div>
            <div class="field-group">
              <label>STREET ADDRESS</label>
              <input v-model="form.address" type="text" placeholder="THE COORDINATES" required />
            </div>
          </div>

          <div class="form-grid section-top-sm">
            <div class="field-group">
              <label>CITY</label>
              <input v-model="form.city" type="text" required />
            </div>
            <div class="field-group">
              <label>PROVINCE / STATE</label>
              <input v-model="form.province" type="text" required />
            </div>
          </div>

          <div class="form-grid section-top-sm">
            <div class="field-group">
              <label>COUNTRY</label>
              <input v-model="form.country" type="text" required />
            </div>
            <div class="field-group">
              <label>POSTAL / ZIP CODE</label>
              <input v-model="form.postalCode" type="text" required />
            </div>
          </div>

          <button type="submit" class="btn-premium sync-btn" :disabled="submitting">
            <span v-if="!submitting">SYNC FIELD COORDINATES</span>
            <span v-else class="pulse-text">CALIBRATING TRANSMISSION...</span>
          </button>
        </form>

        <div class="security-meta">
          <ShieldCheck :size="14" />
          <span>END-TO-END QUANTUM ENCRYPTION ACTIVE</span>
        </div>
      </div>

      <!-- Success State -->
      <div v-else class="success-manifest glass text-center">
        <CheckCircle2 class="success-icon gold-text" :size="64" />
        <h2 class="title section-top-sm">FIELD SYNCHRONIZED</h2>
        <p class="subtitle section-top-sm">
          Your coordinates have been locked. The [{{ form.itemSelected.toUpperCase() }}] is entering the fulfillment void. 
          A confirmation signal has been sent to your device.
        </p>
        <div class="order-id">TRANSMISSION №{{ Math.floor(Math.random() * 1000000).toString().padStart(6, '0') }}</div>
        
        <router-link to="/" class="btn-gold section-top">RETURN TO THE VOID</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.influencer-shipping-view {
  min-height: 100vh;
  padding: 15vh 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.bg-void {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
  z-index: -2;
}

.sacred-portal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120vh;
  height: 120vh;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
  animation: sacredSpin 120s linear infinite;
}

@keyframes sacredSpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.content-wrapper {
  max-width: 800px;
  position: relative;
  z-index: 10;
}

.shipping-card {
  padding: 4rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(212, 175, 55, 0.08);
}

.card-header {
  text-align: center;
  margin-bottom: 4rem;
}

.header-icon {
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #fff;
}

.subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 1rem;
  letter-spacing: 0.1em;
}

.shipping-form {
  margin-top: 3rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-group label {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-muted);
}

.field-group input, .field-group select {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.1);
  padding: 1.2rem;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.field-group input:focus, .field-group select:focus {
  outline: none;
  border-color: var(--color-gold);
  background: rgba(212, 175, 55, 0.05);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
}

.sync-btn {
  width: 100%;
  margin-top: 4rem;
  padding: 1.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
}

.pulse-text {
  animation: textPulse 1s infinite alternate;
}

@keyframes textPulse {
  from { opacity: 0.4; }
  to { opacity: 1; }
}

.security-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
  font-size: 0.5rem;
  letter-spacing: 0.25em;
  opacity: 0.4;
  color: var(--color-gold);
}

/* Success State */
.success-manifest {
  padding: 6rem 4rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-gold);
  box-shadow: 0 0 50px rgba(212, 175, 55, 0.1);
}

.success-icon {
  margin: 0 auto;
}

.order-id {
  margin-top: 3rem;
  font-family: monospace;
  font-size: 0.7rem;
  letter-spacing: 0.5em;
  opacity: 0.4;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .shipping-card {
    padding: 2.5rem 1.5rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
}
</style>
