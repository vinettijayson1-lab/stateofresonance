<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Toast {
  id: number
  name: string
  location: string
  product: string
  ago: string
}

const NAMES = ['Aria C.', 'Jordan M.', 'Xanthe R.', 'Sage L.', 'Demi V.', 'Orion K.', 'Luna F.', 'Raven S.', 'Cassian A.', 'Lyra B.']
const LOCATIONS = ['Montreal, QC', 'Toronto, ON', 'Vancouver, BC', 'Calgary, AB', 'Ottawa, ON', 'Halifax, NS', 'Winnipeg, MB', 'Quebec City, QC', 'Victoria, BC', 'Edmonton, AB']
const PRODUCTS = [
  'Omniscience Artifact',
  'Void Protocol Set',
  'Sacred Geometry Pendant',
  'Ghost & Bones Hoodie',
  'Solfeggio Crystal Grid',
  'Resonance Elixir Bundle',
  '963HZ Calibration Tool',
  'Her Resonance Ritual Kit',
  'Alchemical Incense Stack',
  'Synchronization Ring',
]
const AGOS = ['just now', '2 min ago', '4 min ago', '7 min ago', '11 min ago', '14 min ago']

const toasts = ref<Toast[]>([])
let counter = 0
let interval: ReturnType<typeof setInterval>

const rand = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

const showToast = () => {
  const toast: Toast = {
    id: ++counter,
    name: rand(NAMES),
    location: rand(LOCATIONS),
    product: rand(PRODUCTS),
    ago: rand(AGOS),
  }
  toasts.value.push(toast)
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== toast.id)
  }, 5000)
}

onMounted(() => {
  // First toast after 12s, then every 35–65s
  setTimeout(() => {
    showToast()
    interval = setInterval(showToast, 35000 + Math.random() * 30000)
  }, 12000)
})
onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="toast-stack">
    <TransitionGroup name="toast">
      <div v-for="t in toasts" :key="t.id" class="purchase-toast">
        <div class="toast-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <div class="toast-body">
          <p class="toast-who"><strong>{{ t.name }}</strong> from {{ t.location }}</p>
          <p class="toast-what">purchased <em>{{ t.product }}</em></p>
          <p class="toast-when">{{ t.ago }}</p>
        </div>
        <div class="toast-bar"></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  bottom: 6rem;
  left: 1.5rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  pointer-events: none;
  max-width: 280px;
}
.purchase-toast {
  background: rgba(7, 7, 7, 0.95);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-left: 3px solid #D4AF37;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}
.toast-icon {
  flex-shrink: 0;
  margin-top: 2px;
}
.toast-body {
  flex: 1;
  min-width: 0;
}
.toast-who {
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.8);
  margin-bottom: 0.15rem;
}
.toast-what {
  font-size: 0.6rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toast-what em {
  font-style: normal;
  color: #D4AF37;
}
.toast-when {
  font-size: 0.5rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 0.2rem;
}
.toast-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, #D4AF37, transparent);
  animation: toast-drain 5s linear forwards;
}
@keyframes toast-drain {
  from { transform: scaleX(1); transform-origin: left; }
  to { transform: scaleX(0); transform-origin: left; }
}

.toast-enter-active { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.toast-enter-from { opacity: 0; transform: translateX(-20px); }
.toast-leave-active { transition: all 0.3s ease; }
.toast-leave-to { opacity: 0; transform: translateX(-20px); }
</style>
