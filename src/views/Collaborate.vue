<script setup lang="ts">
import { ref } from 'vue'
import { klaviyoService } from '../services/klaviyo'

const form = ref({
  name: '',
  handle: '',
  email: '',
  platform: 'instagram',
  followers: '',
  type: 'creator',
  message: ''
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

const platforms = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'other', label: 'Other' },
]

const types = [
  { value: 'creator', label: 'Content Creator' },
  { value: 'influencer', label: 'Micro-Influencer' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'stylist', label: 'Stylist / Art Director' },
  { value: 'retailer', label: 'Retailer / Boutique' },
  { value: 'other', label: 'Other' },
]

const submit = async () => {
  if (!form.value.name || !form.value.email) return
  status.value = 'loading'
  try {
    // Klaviyo — tag as collab prospect
    await klaviyoService.identify(form.value.email, {
      first_name: form.value.name.split(' ')[0],
      last_name: form.value.name.split(' ').slice(1).join(' '),
      source: 'Collaborate Page',
      collab_type: form.value.type,
      collab_platform: form.value.platform,
      collab_followers: form.value.followers,
      collab_handle: form.value.handle,
      collab_message: form.value.message,
      is_collab_prospect: true,
    })

    // Meta Pixel — Lead event
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_category: 'Collab Application',
        content_name: form.value.type
      })
    }

    // Notify via CAPI
    await fetch('/api/marketing/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'Lead',
        eventSourceUrl: window.location.href,
        user: { email: form.value.email },
        customData: { content_category: 'Collab Application' }
      })
    }).catch(() => {})

    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="collab-view">

    <!-- HERO -->
    <div class="collab-hero">
      <div class="collab-hero-bg">
        <img src="/images/lookbook/lookbook-hero.jpg" alt="Collaborate with State of Resonance" class="collab-hero-img" />
        <div class="collab-hero-overlay"></div>
      </div>
      <div class="collab-hero-content container">
        <span class="collab-eyebrow">✦ WORK WITH US ✦</span>
        <h1 class="collab-hero-title">Collaborate</h1>
        <p class="collab-hero-sub">We partner with creators, photographers, stylists, and retailers who align with our frequency. If you feel the resonance — let's build.</p>
      </div>
    </div>

    <!-- WHAT WE OFFER -->
    <section class="collab-offers">
      <div class="container">
        <span class="collab-eyebrow" style="display:block; margin-bottom:3rem;">WHAT WE OFFER</span>
        <div class="collab-offers-grid">
          <div class="collab-offer-card">
            <span class="collab-offer-num">01</span>
            <h3 class="collab-offer-title">Gifted Product</h3>
            <p class="collab-offer-body">Receive pieces from the current collection in exchange for authentic content. We don't script — your frequency, your style.</p>
          </div>
          <div class="collab-offer-card">
            <span class="collab-offer-num">02</span>
            <h3 class="collab-offer-title">Affiliate Commission</h3>
            <p class="collab-offer-body">Earn 15% on every sale driven through your unique link. Monthly payouts. No caps, no minimums.</p>
          </div>
          <div class="collab-offer-card">
            <span class="collab-offer-num">03</span>
            <h3 class="collab-offer-title">Co-Created Drops</h3>
            <p class="collab-offer-body">For aligned artists and designers — we produce limited co-branded runs. Revenue split. Your name on the piece.</p>
          </div>
          <div class="collab-offer-card">
            <span class="collab-offer-num">04</span>
            <h3 class="collab-offer-title">Wholesale Access</h3>
            <p class="collab-offer-body">Boutique owners and retailers — we offer wholesale pricing on select pieces. Minimum order of 6 units per style.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHO WE WORK WITH -->
    <section class="collab-who">
      <div class="container collab-who-inner">
        <div class="collab-who-text">
          <span class="collab-eyebrow" style="display:block; margin-bottom:1.5rem;">WHO WE WORK WITH</span>
          <h2 class="collab-who-heading">Seekers.<br/>Creators.<br/>Builders.</h2>
          <p class="collab-who-body">We're not interested in vanity metrics. We care about resonance — do your audience genuinely connect with esoteric aesthetics, spiritual growth, or premium streetwear culture? Then you're our kind of collaborator.</p>
          <ul class="collab-who-list">
            <li>✓ Micro-influencers (1K–100K) with high engagement</li>
            <li>✓ Editorial photographers and cinematographers</li>
            <li>✓ Stylists and creative directors</li>
            <li>✓ Boutique retailers across North America</li>
            <li>✓ Artists and musicians whose work aligns</li>
          </ul>
        </div>
        <div class="collab-who-img-wrap">
          <img src="/images/upgraded/ps-edit-2.jpg" alt="State of Resonance Garment" class="collab-who-img" />
        </div>
      </div>
    </section>

    <!-- APPLICATION FORM -->
    <section class="collab-form-section">
      <div class="container collab-form-wrap">
        <div class="collab-form-header">
          <span class="collab-eyebrow" style="display:block; margin-bottom:1rem;">APPLY NOW</span>
          <h2 class="collab-form-heading">Send Your Signal</h2>
          <p class="collab-form-sub">Fill out the form below. We review every application and respond within 3–5 business days.</p>
        </div>

        <!-- SUCCESS STATE -->
        <div v-if="status === 'success'" class="collab-success">
          <span class="collab-success-icon">✦</span>
          <h3>Signal Received</h3>
          <p>We've received your application and will be in touch within 3–5 business days. Check your inbox — we'll reach out to <strong>{{ form.email }}</strong>.</p>
          <router-link to="/best-sellers" class="btn-premium" style="display:inline-block; padding:1rem 2rem; font-size:0.75rem; margin-top:2rem;">Shop the Collection →</router-link>
        </div>

        <!-- FORM -->
        <form v-else @submit.prevent="submit" class="collab-form" id="collab-application-form">
          <div class="collab-form-row">
            <div class="collab-field">
              <label class="collab-label">Full Name *</label>
              <input v-model="form.name" type="text" class="collab-input" placeholder="Your name" required id="collab-name" />
            </div>
            <div class="collab-field">
              <label class="collab-label">Email Address *</label>
              <input v-model="form.email" type="email" class="collab-input" placeholder="your@email.com" required id="collab-email" />
            </div>
          </div>

          <div class="collab-form-row">
            <div class="collab-field">
              <label class="collab-label">Social Handle</label>
              <input v-model="form.handle" type="text" class="collab-input" placeholder="@yourhandle" id="collab-handle" />
            </div>
            <div class="collab-field">
              <label class="collab-label">Primary Platform</label>
              <select v-model="form.platform" class="collab-input collab-select" id="collab-platform">
                <option v-for="p in platforms" :key="p.value" :value="p.value">{{ p.label }}</option>
              </select>
            </div>
          </div>

          <div class="collab-form-row">
            <div class="collab-field">
              <label class="collab-label">Follower Count</label>
              <input v-model="form.followers" type="text" class="collab-input" placeholder="e.g. 12,000" id="collab-followers" />
            </div>
            <div class="collab-field">
              <label class="collab-label">Collaboration Type</label>
              <select v-model="form.type" class="collab-input collab-select" id="collab-type">
                <option v-for="t in types" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
            </div>
          </div>

          <div class="collab-field collab-field--full">
            <label class="collab-label">Tell us about yourself & what you have in mind</label>
            <textarea v-model="form.message" class="collab-input collab-textarea" rows="5" placeholder="Share your vision, your audience, and how you see us working together..." id="collab-message"></textarea>
          </div>

          <div class="collab-form-footer">
            <p class="collab-privacy">Your information is never shared or sold. By submitting you agree to be added to our collaborator pipeline.</p>
            <button type="submit" class="btn-premium collab-submit" :disabled="status === 'loading'" id="collab-submit-btn">
              {{ status === 'loading' ? 'Transmitting...' : 'SUBMIT APPLICATION' }}
            </button>
          </div>
          <p v-if="status === 'error'" class="collab-error">Something went wrong. Email us directly at <a href="mailto:collabs@stateofresonance.ca">collabs@stateofresonance.ca</a></p>
        </form>
      </div>
    </section>

    <!-- BOTTOM TRUST -->
    <div class="collab-bottom">
      <div class="container" style="text-align:center;">
        <p class="collab-bottom-text">Questions? Email <a href="mailto:collabs@stateofresonance.ca" class="collab-bottom-link">collabs@stateofresonance.ca</a></p>
        <p class="collab-bottom-text" style="margin-top:0.5rem; opacity:0.3;">State of Resonance · Saint-Jean-sur-Richelieu, QC · Canada</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.collab-view { min-height: 100dvh; background: #000; color: #fff; }
.collab-eyebrow { font-size: 0.55rem; letter-spacing: 0.4em; color: rgba(212,175,55,0.7); text-transform: uppercase; }

/* HERO */
.collab-hero { position: relative; height: 80vh; min-height: 500px; display: flex; align-items: flex-end; overflow: hidden; }
.collab-hero-bg { position: absolute; inset: 0; }
.collab-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; filter: contrast(1.05) brightness(0.8); }
.collab-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%); }
.collab-hero-content { position: relative; z-index: 2; padding-bottom: 8vh; }
.collab-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 8vw, 7rem); font-weight: 700; line-height: 1; color: #fff; margin: 1rem 0; }
.collab-hero-sub { font-size: 0.95rem; color: rgba(255,255,255,0.55); max-width: 480px; line-height: 1.7; }

/* OFFERS */
.collab-offers { padding: 10vh 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.collab-offers-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: rgba(255,255,255,0.06); }
@media (max-width: 900px) { .collab-offers-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 540px) { .collab-offers-grid { grid-template-columns: 1fr; } }
.collab-offer-card { background: #000; padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 1rem; transition: background 0.3s; }
.collab-offer-card:hover { background: #070707; }
.collab-offer-num { font-size: 0.55rem; letter-spacing: 0.4em; color: rgba(255,255,255,0.2); }
.collab-offer-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: #fff; }
.collab-offer-body { font-size: 0.8rem; color: rgba(255,255,255,0.45); line-height: 1.65; }

/* WHO */
.collab-who { padding: 10vh 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.collab-who-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
@media (max-width: 768px) { .collab-who-inner { grid-template-columns: 1fr; gap: 3rem; } }
.collab-who-heading { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; color: #fff; line-height: 1; margin-bottom: 1.5rem; }
.collab-who-body { font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 2rem; }
.collab-who-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
.collab-who-list li { font-size: 0.8rem; color: rgba(255,255,255,0.55); letter-spacing: 0.05em; }
.collab-who-img-wrap { aspect-ratio: 3/4; overflow: hidden; }
.collab-who-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: grayscale(0.15); transition: transform 0.8s ease; }
.collab-who-img-wrap:hover .collab-who-img { transform: scale(1.04); }

/* FORM SECTION */
.collab-form-section { padding: 10vh 0; background: #030303; }
.collab-form-wrap { max-width: 780px; margin: 0 auto; }
.collab-form-header { margin-bottom: 4rem; }
.collab-form-heading { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3rem); color: #fff; margin: 0.75rem 0 1rem; }
.collab-form-sub { font-size: 0.85rem; color: rgba(255,255,255,0.4); }

.collab-form { display: flex; flex-direction: column; gap: 1.75rem; }
.collab-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 600px) { .collab-form-row { grid-template-columns: 1fr; } }
.collab-field { display: flex; flex-direction: column; gap: 0.5rem; }
.collab-field--full { grid-column: 1 / -1; }
.collab-label { font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
.collab-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  color: #fff;
  padding: 0.85rem 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.3s;
  width: 100%;
}
.collab-input:focus { border-color: rgba(255,255,255,0.5); }
.collab-input::placeholder { color: rgba(255,255,255,0.2); }
.collab-select { cursor: pointer; appearance: none; background: transparent; }
.collab-select option { background: #0a0a0a; color: #fff; }
.collab-textarea { resize: vertical; min-height: 120px; border: 1px solid rgba(255,255,255,0.08); padding: 1rem; }
.collab-textarea:focus { border-color: rgba(255,255,255,0.3); }
.collab-form-footer { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); }
.collab-privacy { font-size: 0.6rem; color: rgba(255,255,255,0.2); max-width: 320px; line-height: 1.6; }
.collab-submit { padding: 1rem 2.5rem; font-size: 0.8rem; letter-spacing: 0.2em; }
.collab-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.collab-error { font-size: 0.7rem; color: #ff6b6b; margin-top: 0.5rem; }
.collab-error a { color: #d4af37; }

/* SUCCESS */
.collab-success { text-align: center; padding: 5rem 2rem; }
.collab-success-icon { display: block; font-size: 2rem; color: #d4af37; margin-bottom: 1.5rem; }
.collab-success h3 { font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem; }
.collab-success p { font-size: 0.9rem; color: rgba(255,255,255,0.55); max-width: 440px; margin: 0 auto; line-height: 1.7; }

/* BOTTOM */
.collab-bottom { padding: 4vh 0; border-top: 1px solid rgba(255,255,255,0.06); }
.collab-bottom-text { font-size: 0.7rem; color: rgba(255,255,255,0.35); letter-spacing: 0.05em; }
.collab-bottom-link { color: rgba(212,175,55,0.6); text-decoration: none; }
.collab-bottom-link:hover { color: #d4af37; }
</style>
