<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { currencyStore } from '../store/currency'
import { useResonanceStore } from '../store/resonance'
import { TrendingUp, Activity, Layers, Archive, ShieldCheck, Zap, Ghost, ShoppingBag, Radio } from 'lucide-vue-next'
import gsap from 'gsap'

interface Product {
  id: string
  title: string
  price: string
  cost: number
  category: string
  handle: string
  available: boolean
}

interface Order {
  id: string
  transmissionId: string
  totalRevenue: number
  totalProfit: number
  currency: string
  items: any[]
  createdAt: string
}

interface InfluencerRequest {
  id: string
  fullName: string
  handle: string
  email: string
  itemSelected: string
  size: string
  address: string
  city: string
  province: string
  country: string
  postalCode: string
  status: string
  discountCode?: string
  createdAt: string
}

const products = ref<Product[]>([])
const orders = ref<Order[]>([])
const influencers = ref<InfluencerRequest[]>([])
const loading = ref(true)
const statsLoading = ref(true)
const generatingCode = ref<string | null>(null)

// Stats
const totalRevenue = computed(() => orders.value.reduce((s, o) => s + o.totalRevenue, 0))
const totalProfit = computed(() => orders.value.reduce((s, o) => s + o.totalProfit, 0))
const avgMargin = computed(() => orders.value.length ? (totalProfit.value / totalRevenue.value) * 100 : 0)
const totalInventoryValue = computed(() => products.value.reduce((s, p) => {
  const pVal = parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0
  return s + pVal
}, 0))

const fetchData = async () => {
  try {
    const [pRes, oRes, iRes] = await Promise.all([
      fetch('/api/products?limit=500'),
      fetch('/api/orders'),
      fetch('/api/marketing/influencer_fulfillment')
    ])
    
    products.value = await pRes.json()
    orders.value = await oRes.json()
    if (iRes.ok) influencers.value = await iRes.json()
  } catch (err) {
    console.error('Alchemical transmission failed:', err)
  } finally {
    loading.value = false
    statsLoading.value = false
  }
}

onMounted(() => {
  fetchData()
  gsap.from('.stat-card', { 
    opacity: 0, 
    y: 20, 
    stagger: 0.1, 
    duration: 0.8, 
    ease: 'power3.out' 
  })
})

const updateInfluencerStatus = async (id: string, status: string) => {
  try {
    const res = await fetch('/api/marketing/influencer_fulfillment', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    if (res.ok) {
      const idx = influencers.value.findIndex(i => i.id === id)
      if (idx !== -1) influencers.value[idx].status = status
    } else {
      console.error('Failed to update status from server.')
    }
  } catch (err) {
    console.error('Failed to update status', err)
  }
}

const generateGiftCode = async (id: string, handle: string) => {
  generatingCode.value = id
  try {
    const res = await fetch('/api/marketing/generate_discount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, handle })
    })
    const data = await res.json()
    if (res.ok && data.success) {
      const idx = influencers.value.findIndex(i => i.id === id)
      if (idx !== -1) {
        influencers.value[idx].discountCode = data.discountCode
        influencers.value[idx].status = 'approved'
      }
    } else {
      alert(`Generation failed: ${data.error}`)
    }
  } catch (err) {
    console.error('Failed to generate code', err)
  } finally {
    generatingCode.value = null
  }
}

const copyDiscountCode = async (code: string) => {
  try {
    await window.navigator.clipboard.writeText(code)
    // Silently succeeds
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

const getFrequencyGroup = (price: string) => {
  const val = parseFloat(price.replace(/[^0-9.]/g, ''))
  if (val >= 90) return '963 Hz (Singularity)'
  if (val >= 50) return '528 Hz (Love)'
  if (val >= 35) return '432 Hz (Nature)'
  return '396 Hz (Root)'
}

const frequencyData = computed(() => {
  const groups: Record<string, number> = {}
  products.value.forEach(p => {
    const freq = getFrequencyGroup(p.price)
    groups[freq] = (groups[freq] || 0) + 1
  })
  return Object.entries(groups).map(([name, count]) => ({ name, count }))
})

const resonance = useResonanceStore()

const chartPoints = computed(() => {
  if (orders.value.length < 2) return ""
  // Sort orders by date
  const sorted = [...orders.value].sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  const maxRev = Math.max(...sorted.map(o => o.totalRevenue)) || 1
  const width = 300
  const height = 40
  
  return sorted.map((o, i) => {
    const x = (i / (sorted.length - 1)) * width
    const y = height - (o.totalRevenue / maxRev) * height
    return `${x},${y}`
  }).join(' ')
})

const copyLink = async () => {
  try {
    await window.navigator.clipboard.writeText(`https://stateofresonance.ca/?ref=${resonance.referralId}`);
    // Optional: could add a toast here
  } catch (err) {
    console.error('Failed to copy', err);
  }
};

</script>

<template>
  <div class="alchemist-dashboard container">
    <header class="dashboard-header">
      <div class="header-content">
        <span class="meta-vibe gold-text">AUTHORIZED ACCESS · ALCHEMIST LEVEL</span>
        <h1 class="hero-title">Alchemical Ledger</h1>
        <p class="subtitle">Transforming raw frequency into measurable abundance.</p>
      </div>
      <div class="system-status">
        <div class="status-dot online"></div>
        <span>LEAD-TO-GOLD: ACTIVE</span>
      </div>
    </header>

    <!-- stats Grid -->
    <div class="stats-grid">
      <div class="stat-card glass glow-hover">
        <div class="stat-icon revenue"><TrendingUp :size="20" /></div>
        <div class="stat-info">
          <span class="stat-label">Total Abundance</span>
          <h3 class="stat-value">{{ currencyStore.formatPrice(totalRevenue) }}</h3>
          <span class="stat-sub">Gross Revenue (CAD Base)</span>
        </div>
      </div>

      <div class="stat-card glass glow-hover">
        <div class="stat-icon profit"><Zap :size="20" /></div>
        <div class="stat-info">
          <span class="stat-label">Vibrational Surplus</span>
          <h3 class="stat-value">{{ currencyStore.formatPrice(totalProfit) }}</h3>
          <span class="stat-sub">Net Profit (COGS Calibrated)</span>
        </div>
      </div>

      <div class="stat-card glass glow-hover">
        <div class="stat-icon margin"><Activity :size="20" /></div>
        <div class="stat-info">
          <span class="stat-label">Resonance Efficiency</span>
          <h3 class="stat-value">{{ avgMargin.toFixed(1) }}%</h3>
          <span class="stat-sub">Average Operational Margin</span>
        </div>
      </div>

      <div class="stat-card glass glow-hover">
        <div class="stat-icon inventory"><Archive :size="20" /></div>
        <div class="stat-info">
          <span class="stat-label">Frozen Light</span>
          <h3 class="stat-value">{{ currencyStore.formatPrice(totalInventoryValue) }}</h3>
          <div class="resonance-velocity-mini desktop-only">
             <svg width="100" height="20" viewBox="0 0 100 20">
               <polyline fill="none" stroke="var(--color-gold)" stroke-width="1.5" :points="chartPoints.split(' ').map(p => {
                 const [x,y] = p.split(',');
                 return `${parseFloat(x)/3},${parseFloat(y)/2}`;
               }).join(' ')" />
             </svg>
          </div>
          <span class="stat-sub">Total Unsold Artifact Value</span>
        </div>
      </div>
    </div>

    <!-- Main Content Split -->
    <div class="dashboard-main">
      <div class="main-column">
        <!-- Order Manifestations -->
      <section class="manifestations-section glass">
        <div class="section-header">
          <h2 class="section-title"><ShoppingBag :size="18" /> Recent Manifestations</h2>
          <button @click="fetchData" class="refresh-btn">Sync Pulse</button>
        </div>

        <div v-if="orders.length === 0" class="empty-state">
          <Ghost :size="40" />
          <p>The ledger is currently silent. No recent signal detected.</p>
        </div>

        <div v-else class="order-table-wrapper">
          <table class="order-table">
            <thead>
              <tr>
                <th>TRANSMISSION</th>
                <th>CURRENCY</th>
                <th>REVENUE</th>
                <th>PROFIT</th>
                <th>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td class="gold-text">#{{ order.transmissionId }}</td>
                <td>{{ order.currency }}</td>
                <td>{{ order.totalRevenue.toFixed(2) }}</td>
                <td class="profit-text">+{{ order.totalProfit.toFixed(2) }}</td>
                <td class="time-text">{{ new Date(order.createdAt).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Influencer Fulfillment Module -->
      <section class="manifestations-section glass" style="margin-top: 2rem;">
        <div class="section-header">
          <h2 class="section-title"><Radio :size="18" /> Influencer Sync Ledger</h2>
        </div>

        <div v-if="influencers.length === 0" class="empty-state">
          <Ghost :size="40" />
          <p>No calibration requests from the collective.</p>
        </div>

        <div v-else class="order-table-wrapper">
          <table class="order-table">
            <thead>
              <tr>
                <th>INFLUENCER</th>
                <th>CONTACT</th>
                <th>ARTIFACT</th>
                <th>DESTINATION</th>
                <th>STATUS & ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inf in influencers" :key="inf.id">
                <td>
                  <strong style="display: block; color: var(--color-gold);">{{ inf.fullName }}</strong>
                  <a :href="'https://instagram.com/' + inf.handle.replace('@','')" target="_blank" style="font-size: 0.65rem; color: #4ade80; text-decoration: none;">{{ inf.handle }}</a>
                </td>
                <td style="font-size: 0.7rem; opacity: 0.8">{{ inf.email }}</td>
                <td>
                  <span style="display: block">{{ inf.itemSelected }}</span>
                  <span class="time-text">Size: {{ inf.size }}</span>
                </td>
                <td>
                  <span style="font-size: 0.65rem; opacity: 0.7; display: block; max-width: 150px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                    {{ inf.address }}, {{ inf.city }}, {{ inf.province }}
                  </span>
                  <span class="time-text">{{ inf.country }} {{ inf.postalCode }}</span>
                </td>
                <td>
                  <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                    <span :class="['status-badge', inf.status]">{{ inf.status.toUpperCase() }}</span>
                    <select class="status-select" :value="inf.status" @change="(e) => updateInfluencerStatus(inf.id, (e.target as HTMLSelectElement).value)">
                      <option value="pending">PENDING</option>
                      <option value="approved">APPROVED</option>
                      <option value="shipped">SHIPPED</option>
                      <option value="declined">DECLINED</option>
                    </select>
                    
                    <div style="flex-basis: 100%; margin-top: 0.5rem;" v-if="!inf.discountCode">
                      <button @click="generateGiftCode(inf.id, inf.handle)" class="refresh-btn" :disabled="generatingCode === inf.id">
                        {{ generatingCode === inf.id ? 'Generating...' : '+ Provision 100% Code' }}
                      </button>
                    </div>
                    <div style="flex-basis: 100%; margin-top: 0.5rem;" v-else>
                      <span class="gold-text" style="font-family: var(--font-mono); font-size: 0.8rem;">{{ inf.discountCode }}</span>
                      <button @click="copyDiscountCode(inf.discountCode!)" class="refresh-btn" style="margin-left: 0.5rem; padding: 0.2rem 0.5rem;">Copy</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      </div>

      <!-- Frequency Intelligence -->
      <aside class="intelligence-side">
        <div class="intel-card glass">
          <h2 class="section-title"><Layers :size="18" /> Frequency Density</h2>
          <div class="freq-list">
            <div v-for="item in frequencyData" :key="item.name" class="freq-item">
              <div class="freq-bar-wrap">
                <div class="freq-label-row">
                  <span>{{ item.name }}</span>
                  <span>{{ item.count }} Artifacts</span>
                </div>
                <div class="freq-bar-bg">
                  <div class="freq-bar-fill" :style="{ width: (item.count / products.length * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="intel-card glass security-info">
          <h2 class="section-title"><ShieldCheck :size="18" /> System Integrity</h2>
          <div class="integrity-log">
            <div class="log-entry">
              <span class="log-time">[{{ new Date().getHours() }}:{{ new Date().getMinutes() }}]</span>
              <span class="log-msg">Seeker Collective: {{ resonance.referrals }} Synchronized</span>
            </div>
            <div class="log-entry">
              <span class="log-time">[22:04]</span>
              <span class="log-msg">Klaviyo Orion: Synchronized</span>
            </div>
            <div class="log-entry">
              <span class="log-time">[22:01]</span>
              <span class="log-msg">Meta Signal: Encrypted</span>
            </div>
          </div>
          <div class="referral-id-tag" style="background: rgba(212,175,55,0.1); border: 1px solid var(--color-gold); padding: 1rem; margin-top: 1.5rem; text-align: center; cursor: pointer;" @click="copyLink">
             <Radio :size="16" class="gold-text" style="margin: 0 auto 0.5rem auto; display: block;" /> 
             <span style="font-size: 0.7rem; color: #fff; letter-spacing: 0.1em; display: block; margin-bottom: 0.25rem;">YOUR INFLUENCER LINK:</span>
             <strong style="color: var(--color-gold); font-size: 1.2rem; letter-spacing: 0.2em;">{{ resonance.referralId }}</strong>
             <span style="display: block; font-size: 0.5rem; opacity: 0.5; margin-top: 0.5rem;">CLICK TO COPY</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.alchemist-dashboard {
  padding-top: 15vh;
  padding-bottom: 10vh;
}

.dashboard-header {
  margin-bottom: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.5;
  margin-top: 0.5rem;
}

.system-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  opacity: 0.7;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-dot.online {
  background: #4ade80;
  box-shadow: 0 0 10px #4ade80;
  animation: blink 2s infinite;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.stat-card {
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 4px;
}

.revenue .stat-icon { color: #4ade80; }
.profit .stat-icon { color: var(--color-gold); }
.inventory .stat-icon { color: #fff; }

.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  opacity: 0.4;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.75rem;
  font-family: var(--font-heading);
  margin-bottom: 0.25rem;
}

.stat-sub {
  font-size: 0.6rem;
  opacity: 0.3;
  letter-spacing: 0.05em;
}

/* Main Content */
.dashboard-main {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
}

.manifestations-section {
  padding: 2rem;
  min-height: 400px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1rem;
  font-family: var(--font-heading);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.refresh-btn {
  background: none;
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: var(--color-gold-muted);
  font-size: 0.6rem;
  padding: 0.4rem 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s;
}

.refresh-btn:hover {
  background: var(--color-gold-muted);
  color: #000;
}

.order-table-wrapper {
  overflow-x: auto;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
}

.order-table th {
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  letter-spacing: 0.1em;
  opacity: 0.4;
  font-weight: 400;
}

.order-table td {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.02);
  vertical-align: middle;
}

.profit-text { color: #4ade80; font-family: var(--font-mono); }
.time-text { opacity: 0.3; font-size: 0.65rem; }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
  opacity: 0.2;
  gap: 1rem;
}

/* Status Select UI */
.status-badge {
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.5rem;
  border-radius: 2px;
  background: rgba(255,255,255,0.05);
}
.status-badge.pending { color: var(--color-gold); background: rgba(212, 175, 55, 0.1); }
.status-badge.shipped { color: #4ade80; background: rgba(74, 222, 128, 0.1); }
.status-badge.declined { color: #f87171; background: rgba(248, 113, 113, 0.1); }

.status-select {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  font-size: 0.6rem;
  padding: 0.2rem;
  outline: none;
  cursor: pointer;
}
.status-select option {
  background: #111;
  color: #fff;
}

/* Intelligence Side */
.intelligence-side {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.intel-card {
  padding: 2rem;
}

.freq-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.freq-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  opacity: 0.7;
}

.freq-bar-bg {
  height: 2px;
  background: rgba(255,255,255,0.05);
}

.freq-bar-fill {
  height: 100%;
  background: var(--color-gold);
  box-shadow: 0 0 10px var(--color-gold);
}

.integrity-log {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.log-entry {
  font-size: 0.6rem;
  font-family: var(--font-mono);
  display: flex;
  gap: 1rem;
}

.log-time { color: var(--color-gold-muted); }
.log-msg { opacity: 0.4; }

.referral-id-tag {
  margin-top: 2rem;
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  color: var(--color-gold-muted);
  opacity: 0.5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-top: 1px solid rgba(255,255,255,0.03);
}

.resonance-velocity-mini {
  margin-top: 0.5rem;
  opacity: 0.6;
}

@keyframes blink {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@media (max-width: 1024px) {
  .dashboard-main { grid-template-columns: 1fr; }
}
</style>
