<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import gsap from 'gsap'
import { klaviyoService } from '../services/klaviyo'
import { useResonanceStore } from '../store/resonance'

const step = ref(0)
const answers = reactive<Record<number, string>>({})
const results = ref<any>(null)
const copyStatus = ref('')

const share = (platform: string) => {
  const url = window.location.href
  const text = `I just found my resonance at State of Resonance: ${results.value.title}. Tune your field at`
  
  if (platform === 'x') {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  } else if (platform === 'wa') {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
  }
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  copyStatus.value = 'RESONANCE LINK COPIED'
  setTimeout(() => copyStatus.value = '', 3000)
}

const questions = [
  {
    id: 1,
    text: "What energy are you currently seeking to amplify?",
    options: [
      { label: "Grounding & Protection", value: "grounding", sub: "396 Hz — Root Alignment" },
      { label: "Creative Restoration", value: "creative", sub: "417 Hz — Sacral Flow" },
      { label: "Love & Compassion", value: "love", sub: "528 Hz — Heart Coherence" },
      { label: "Higher Consciousness", value: "higher", sub: "963 Hz — Crown Connection" }
    ]
  },
  {
    id: 2,
    text: "How do you prefer to manifest your resonance?",
    options: [
      { label: "Through what I wear", value: "attire" },
      { label: "Through my sacred space", value: "space" },
      { label: "Through ritual practice", value: "ritual" }
    ]
  },
  {
    id: 3,
    text: "Choose a visual frequency that calls to you:",
    options: [
      { label: "Deep Obsidian & Shadows", value: "dark" },
      { label: "Pure Light & Radiance", value: "light" },
      { label: "Ancient Gold & Parchment", value: "old" }
    ]
  },
  {
    id: 4,
    text: "Which path describes your current journey?",
    options: [
      { label: "The Seeker of Hidden Knowledge", value: "seeker" },
      { label: "The Guardian of the Sacred", value: "guardian" },
      { label: "The Alchemist of Change", value: "alchemist" }
    ]
  }
]

const selectOption = (val: string) => {
  answers[step.value + 1] = val
  
  gsap.to('.quiz-step', {
    opacity: 0,
    y: -20,
    duration: 0.4,
    onComplete: () => {
      if (step.value < questions.length - 1) {
        step.value++
        gsap.fromTo('.quiz-step', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      } else {
        calculateResult()
      }
    }
  })
}

const calculateResult = () => {
  step.value = -1 // loading state
  
  // Ritual Animation
  gsap.to('.loading-state', { opacity: 1, duration: 0.5 })
  
  setTimeout(async () => {
    // Basic logic for recommendations
    const energy = answers[1]
    
    let targetHandle = "urban-hoodie-2" // Default: Ascended Master
    let reason = "Your seeking of higher consciousness and attire alignment points directly to our flagship Solfeggio piece."
    let tier = "NEOPHYTE"
    let tierReason = "You have begun the alignment process. The signal is clear, but requires stable grounding."

    if (energy === 'higher') {
      targetHandle = "omniscience-hoodie"
      reason = "Your frequency is vibrating at the highest Solfeggio level. 'The Omniscience' is your aligned armor for the inner vision ritual."
      tier = "963_HZ"
      tierReason = "Divine Consciousness confirmed. You are ready to transcend the vessel."
    } else if (answers[1] === '2' || answers[3] === '1') {
       tier = "741_HZ"
       tierReason = "Your heart and sacral coherence is strong. You are moving beyond the physical limitations."
    } else {
       tier = "SEEKER"
       tierReason = "You are searching for the light in the shadows. The path is manifesting before you."
    }

    if (energy === 'grounding') {
      targetHandle = "the-sigil-hoodie"
      reason = "For grounding energy and protection, the Sigil provides the necessary vibrational shielding."
    }
    
    // Fetch live data to ensure 100% resonance with current catalog
    try {
      const res = await fetch(`/api/products?handle=${targetHandle}`)
      if (res.ok) {
        const product = await res.json()
        results.value = {
          ...product,
          reason: reason,
          tier: tier,
          tierReason: tierReason
        }
      } else {
        throw new Error('Signal lost during synchronization')
      }
    } catch (err) {
      console.error('Quiz Fetch Error:', err)
      // Fallback to minimal state if API fails
      results.value = {
        title: targetHandle === 'the-sigil-hoodie' ? 'The Sigil Hoodie' : 'The Ascended Master Hoodie',
        handle: targetHandle,
        image: '/assets/placeholder.png',
        reason: reason,
        price: '$96.30',
        tier: tier,
        tierReason: tierReason
      }
    }
    
    gsap.to('.loading-state', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        step.value = 99 // results state
        gsap.fromTo('.results-state', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: 'expo.out' })
        trackQuizCompletion()
        // BroadCast signal to the cart store for the global feed
        import('../store/cart').then(({ cart }) => {
           cart.lastManifestation = {
             name: 'A New ' + tier,
             action: 'just completed their construction',
             time: 'Just now',
             isPremium: tier === '963_HZ' || tier === '741_HZ'
           }
        })
      }
    })
  }, 2500) // Slightly longer for "ritual" effect
}

const addToCartAndNavigate = () => {
  if (results.value) {
    // Add to cart before navigating
    // Create a minimal product object that the cart expects
    const p = {
      id: results.value.id || results.value.handle,
      title: results.value.title,
      price: results.value.price || '$96.30', // Fallback to current hoodie price
      image: results.value.image,
      handle: results.value.handle,
      variantId: results.value.variantId || null
    }
    
    import('../store/cart').then(({ cart }) => {
      cart.add(p)
      // Open cart immediately for direct construction
      cart.isOpen = true
      
      // Update manifestation feed
      cart.lastManifestation = {
        name: 'A New ' + results.value.tier,
        action: 'just claimed their aligned piece',
        time: 'Just now',
        isPremium: results.value.tier === '963_HZ' || results.value.tier === '741_HZ'
      }
    })
  }
}

const reset = () => {
  step.value = 0
  Object.keys(answers).forEach(k => delete (answers as any)[k])
  results.value = null
}

import { onMounted } from 'vue'
onMounted(() => {
  if (window.fbq) {
    window.fbq('track', 'ViewContent', { 
      content_name: 'Frequency Quiz',
      content_category: 'Engagement'
    })
  }
})

const trackQuizCompletion = () => {
  // Klaviyo Track
  klaviyoService.trackCompletedQuiz({
    vibrational_tier: results.value.tier,
    detected_frequency: results.value.category || 'Unknown',
    aligned_artifact: results.value.title,
    status: 'Resonance Found'
  });

  if (window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'Quiz Outcome: ' + results.value.title,
      status: 'Resonance Found'
    })
  }
}
const quizEmail = ref('')
const quizSubmitting = ref(false)
const quizSubDone = ref(false)

const subscribeFromQuiz = async () => {
  if (!quizEmail.value || !quizEmail.value.includes('@')) return
  quizSubmitting.value = true
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: quizEmail.value,
        source: 'QUIZ_RESULTS',
        properties: {
          resonance_tier: results.value?.tier,
          aligned_artifact: results.value?.title,
          calibration_date: new Date().toISOString()
        }
      })
    })
    
    if (res.ok) {
      quizSubDone.value = true
      
      // Klaviyo Identify
      klaviyoService.identify(quizEmail.value, {
        'resonance_tier': results.value?.tier,
        'aligned_artifact': results.value?.title,
        'quiz_completed': true
      });
    }
  } catch (err) {
    console.error('Quiz Subscription Error:', err)
  } finally {
    quizSubmitting.value = false
  }
}
</script>

<template>
  <div class="quiz-container glass">
    <div v-if="step >= 0 && step < questions.length" class="quiz-step">
      <div class="quiz-header">
        <span class="meta-vibe">Step {{ step + 1 }} of {{ questions.length }}</span>
        <h2 class="quiz-question">{{ questions[step].text }}</h2>
      </div>
      
      <div class="options-grid">
        <button 
          v-for="opt in (questions[step].options as any[])" 
          :key="opt.value"
          @click="selectOption(opt.value)"
          class="option-btn glass"
        >
          <span class="option-label">{{ opt.label }}</span>
          <span v-if="opt.sub" class="option-sub">{{ opt.sub }}</span>
        </button>
      </div>
    </div>
    
    <div v-else-if="step === -1" class="loading-state">
      <div class="spinner"></div>
      <p class="meta-vibe ritual-text">SYNCHRONIZING WITH THE SOURCE...</p>
      <p class="meta-vibe ritual-sub">ALCHEMICAL FREQUENCIES ALIGNING</p>
    </div>
    
    <div v-else-if="step === 99" class="results-state">
      <div class="results-header">
        <h2 class="gold-text">Resonance Found</h2>
        <p class="meta-vibe">Your aligned piece has been identified</p>
      </div>
      
      <div class="recommendation-card glass">
        <div v-if="results.tier" class="tier-badge-container">
           <div class="tier-glow"></div>
           <div class="tier-label">RESONANCE TIER</div>
           <div class="tier-value">{{ results.tier }}</div>
        </div>
        <img :src="results.image" :alt="results.title" class="rec-img" />
        <div class="rec-info">
          <h3>{{ results.title }}</h3>
          <p class="rec-reason">{{ results.reason }}</p>
          <p v-if="results.tierReason" class="tier-insight">"{{ results.tierReason }}"</p>
          
          <div class="discount-box">
             <span class="meta-vibe">Exclusive Reward</span>
             <p class="promo-code">INNER_CIRCLE_963</p>
             <p class="promo-hint">Code: <strong class="gold-text">RESONANCE963</strong> to unlock the Members Collection</p>
          </div>
          
          <div class="inner-circle-capture glass" style="margin-bottom: 2rem; padding: 1.5rem; border: 1px solid rgba(212,175,55,0.2);">
            <p class="meta-vibe" style="margin-bottom: 1rem;">THE INNER CIRCLE</p>
            <p style="font-size: 0.7rem; opacity: 0.6; margin-bottom: 1.5rem;">Join the elite seekers and receive the first signal for Phase 2: Convergence.</p>
            
            <div v-if="!quizSubDone" class="quiz-sub-form" style="display: flex; gap: 0.5rem;">
              <input 
                type="email" 
                v-model="quizEmail" 
                placeholder="YOUR EMAIL" 
                style="flex:1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 0.6rem; color: #fff; font-size: 0.7rem;"
              />
              <button 
                @click="subscribeFromQuiz" 
                class="btn-premium" 
                style="padding: 0.6rem 1rem; margin: 0; font-size: 0.6rem;"
                :disabled="quizSubmitting"
              >
                {{ quizSubmitting ? 'SYNCING...' : 'JOIN' }}
              </button>
            </div>
            <p v-else style="font-size: 0.7rem; color: var(--color-gold);">RESONANCE RECORDED. WELCOME.</p>
          </div>

          <div class="share-actions">
            <span class="meta-vibe">Transmit your Frequency</span>
            <div class="share-buttons">
              <button @click="share('x')" class="share-btn x-btn">𝕏 — Public Signal</button>
              <button @click="share('wa')" class="share-btn wa-btn">WhatsApp — Private Dispatch</button>
            </div>
            <div class="secondary-actions" style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center;">
              <button @click="copyLink" class="reset-link" style="margin:0; width:auto;">Copy Resonance Link</button>
              <button @click="share('wa')" class="reset-link" style="margin:0; width:auto;">Invite a Seeker</button>
            </div>
            <p v-if="copyStatus" class="copy-status">{{ copyStatus }}</p>
          </div>
          
          <button @click="addToCartAndNavigate" class="btn-premium resonance-pulse" style="width: 100%; text-align: center; margin-bottom: 2rem;">Claim Result & Calibrate Collection</button>
          
          <div class="event-cta glass" style="padding: 1.5rem; border: 1px dashed var(--color-gold-muted); margin-bottom: 2rem;">
            <p class="meta-vibe" style="margin-bottom: 0.5rem;">Ongoing Event</p>
            <p style="font-size: 0.75rem; opacity: 0.8;">The Synchronization Event is active. Use code <strong class="gold-text">SYNC15</strong> for an exclusive 15% reward.</p>
          </div>

          <button @click="reset" class="reset-link">Recalibrate (Retake Quiz)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem;
  border: 1px solid var(--glass-border);
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quiz-header {
  margin-bottom: 3rem;
  text-align: center;
}

.meta-vibe {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  display: block;
  margin-bottom: 1rem;
}

.quiz-question {
  font-size: 2rem;
  line-height: 1.4;
  font-family: var(--font-heading);
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.option-btn {
  padding: 2.5rem;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.02);
}

.option-btn:hover {
  border-color: var(--color-gold-muted);
  background: rgba(212, 175, 55, 0.05);
  transform: translateY(-4px);
}

.option-label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.option-sub {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  opacity: 0.5;
  text-transform: uppercase;
}

.loading-state {
  text-align: center;
  padding: 4rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(212, 175, 55, 0.1);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  margin: 0 auto 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.results-header {
  text-align: center;
  margin-bottom: 3rem;
}

.recommendation-card {
  display: flex;
  gap: 3rem;
  padding: 2.5rem;
  align-items: center;
}

.rec-img {
  width: 280px;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid var(--glass-border);
}

.rec-info {
  flex: 1;
}

.rec-info h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.rec-reason {
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.7;
  margin-bottom: 1rem;
}

.tier-insight {
  font-size: 0.75rem;
  font-style: italic;
  color: var(--color-gold-muted);
  margin-bottom: 2rem;
  opacity: 0.8;
  letter-spacing: 0.05em;
}

.tier-badge-container {
  position: absolute;
  top: -20px;
  right: -20px;
  background: #000;
  border: 1px solid var(--color-gold);
  padding: 1rem;
  text-align: center;
  z-index: 10;
  min-width: 120px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.8);
}

.tier-label {
  font-size: 0.5rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-muted);
  margin-bottom: 0.25rem;
}

.tier-value {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: var(--color-gold);
}

.tier-glow {
  position: absolute;
  inset: 0;
  background: var(--color-gold);
  filter: blur(20px);
  opacity: 0.1;
  pointer-events: none;
}

.discount-box {
  background: rgba(212, 175, 55, 0.05);
  border: 1px dashed var(--color-gold-muted);
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.promo-code {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.2em;
  color: var(--color-gold);
  margin: 0.5rem 0;
}

.promo-hint {
  font-size: 0.7rem;
  opacity: 0.5;
}

.share-actions {
  margin-bottom: 2.5rem;
  text-align: center;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.share-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: var(--color-gold-muted);
}

.copy-status {
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  color: var(--color-gold-muted);
  margin-top: 0.75rem;
  animation: fade-in 0.3s ease;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.reset-link {
  background: none;
  border: none;
  color: white;
  opacity: 0.3;
  margin-top: 1.5rem;
  cursor: pointer;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  width: 100%;
}

.reset-link:hover { opacity: 0.8; }

@media (max-width: 768px) {
  .quiz-container { padding: 2rem; }
  .options-grid { grid-template-columns: 1fr; }
  .recommendation-card { flex-direction: column; gap: 2rem; padding: 1.5rem; }
  .rec-img { width: 100%; }
  .quiz-question { font-size: 1.5rem; }
}
</style>
