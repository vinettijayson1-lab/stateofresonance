<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import TrustBadge from '../components/TrustBadge.vue'
import { klaviyoService } from '../services/klaviyo'

interface Product { id: string; title: string; price: string; category: string; image: string; handle: string }

const attireProducts = ref<Product[]>([])
const loading = ref(true)
const seekerEmail = ref('')
const subscribeStatus = ref<'idle'|'loading'|'success'|'error'>('idle')

const clockTime = ref('')
const updateClock = () => {
  const now = new Date()
  const h = String(now.getHours()).padStart(2,'0')
  const m = String(now.getMinutes()).padStart(2,'0')
  const s = String(now.getSeconds()).padStart(2,'0')
  clockTime.value = `${h}:${m}:${s}`
}

onMounted(async () => {
  updateClock()
  setInterval(updateClock, 1000)
  try {
    const res = await fetch('/api/products?limit=24')
    const data = await res.json()
    attireProducts.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('Failed:', e)
  } finally {
    loading.value = false
  }
})

const handleEmailSync = async () => {
  if (!seekerEmail.value) return
  subscribeStatus.value = 'loading'

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: seekerEmail.value,
        source: 'Homepage'
      })
    })

    if (res.ok) {
      klaviyoService.identify(seekerEmail.value)
      subscribeStatus.value = 'success'
      seekerEmail.value = ''
    } else {
      throw new Error()
    }
  } catch {
    subscribeStatus.value = 'error'
  }
}
</script>

<template>
<div class="home">

  <!-- TRUST -->
  <div class="trust">
    <TrustBadge type="secure" />
    <TrustBadge type="orders" />
    <TrustBadge type="ssl" />
  </div>

  <!-- HERO -->
  <section class="hero">
    <img src="/images/lookbook/lookbook-hero.jpg" class="hero-img" />
    <div class="overlay"></div>

    <div class="hero-content">
      <h1>STATE OF RESONANCE</h1>

      <!-- ✅ FIXED MESSAGE -->
      <p class="hero-sub">
        Esoteric streetwear engineered for presence.
      </p>

      <router-link to="/best-sellers" class="btn">
        SHOP COLLECTION →
      </router-link>
    </div>

    <div class="clock">
      MONTRÉAL: {{ clockTime }}
    </div>
  </section>

  <!-- STRIP -->
  <div class="strip">
    <span>450GSM</span>
    <span>CANADA</span>
    <span>LIMITED</span>
    <span>FREE SHIPPING</span>
  </div>

  <!-- FEATURE -->
  <section class="feature">

    <img
      src="https://cdn.shopify.com/s/files/1/0787/0808/0663/files/ghost-and-bones-resonance-base-t-shirt-3967446.png"
    />

    <div>
      <h2>The Foundation Tee</h2>
      <p class="price">$45 CAD</p>

      <!-- ✅ HIGH-CONVERTING -->
      <ul>
        <li>450GSM heavyweight cotton</li>
        <li>Structured premium fit</li>
        <li>Minimal symbolic design</li>
      </ul>

      <router-link to="/product/ghost-and-bones-resonance-base-t-shirt" class="btn">
        SHOP FOUNDATION →
      </router-link>
    </div>

  </section>

  <!-- PRODUCTS -->
  <section class="products">

    <h2>Shop</h2>

    <div v-if="loading">Loading...</div>

    <div v-else class="grid">
      <ProductCard
        v-for="p in attireProducts.slice(0,6)"
        :key="p.id"
        :product="p"
      />
    </div>

    <!-- ✅ TRUST BOOST -->
    <div class="mini-trust">
      <span>✅ 5.0 Rated</span>
      <span>🚚 Free Shipping</span>
      <span>🔒 Secure</span>
    </div>

  </section>

  <!-- STORY -->
  <section class="story">
    <blockquote>
      Matter must serve Spirit — presence is the medium.
    </blockquote>
    <p>— Jayson Vinetti</p>
  </section>

  <!-- VALUE -->
  <section class="value">
    <h2>Crafted for Presence</h2>

    <div class="grid">
      <div><h3>450GSM</h3></div>
      <div><h3>Canada</h3></div>
      <div><h3>Geometry</h3></div>
      <div><h3>Limited</h3></div>
    </div>
  </section>

  <!-- EMAIL -->
  <section class="email">

    <h2>Unlock Private Access</h2>

    <p class="email-sub">
      Join early access members and unlock exclusive drops.
    </p>

    <input v-model="seekerEmail" placeholder="EMAIL" />

    <button @click="handleEmailSync">
      {{ subscribeStatus === 'loading' ? 'Sending...' : 'UNLOCK' }}
    </button>

  </section>

</div>
</template>

<style scoped>
.home { background:black; color:white; }

/* HERO */
.hero {
  position:relative;
  height:90vh;
}

.hero-img {
  width:100%;
  height:100%;
  object-fit:cover;
}

.overlay {
  position:absolute;
  inset:0;
  background:rgba(0,0,0,0.5);
}

.hero-content {
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align:center;
}

.hero-sub {
  opacity:0.7;
  margin-top:10px;
}

.clock {
  position:absolute;
  bottom:20px;
  left:20px;
  font-size:12px;
}

/* STRIP */
.strip {
  display:flex;
  justify-content:space-around;
  padding:10px;
  opacity:0.6;
}

/* FEATURE */
.feature {
  display:flex;
  padding:60px;
  gap:40px;
}

/* PRODUCTS */
.products {
  padding:60px;
}

.grid {
  display:flex;
  gap:20px;
}

/* TRUST */
.mini-trust {
  display:flex;
  justify-content:center;
  gap:20px;
  margin-top:20px;
  opacity:0.6;
}

/* STORY */
.story {
  text-align:center;
  padding:60px;
  font-style:italic;
}

/* VALUE */
.value {
  text-align:center;
  padding:60px;
}

/* EMAIL */
.email {
  text-align:center;
  padding:60px;
}

.email-sub {
  opacity:0.6;
  margin-bottom:20px;
}
</style>
