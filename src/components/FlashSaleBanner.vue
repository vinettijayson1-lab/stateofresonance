<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Flash sale ends at midnight tonight (local time)
const getEndOfDay = () => {
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  return end.getTime()
}

const endTime = ref(getEndOfDay())
const timeLeft = ref({ h: '00', m: '00', s: '00' })
const dismissed = ref(false)
let timer: ReturnType<typeof setInterval>

const tick = () => {
  const diff = endTime.value - Date.now()
  if (diff <= 0) { clearInterval(timer); return }
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  timeLeft.value = {
    h: String(h).padStart(2, '0'),
    m: String(m).padStart(2, '0'),
    s: String(s).padStart(2, '0'),
  }
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div v-if="!dismissed" class="flash-banner">
    <div class="flash-inner">
      <span class="flash-pulse"></span>
      <span class="flash-text">
        ⚡ SYNCHRONIZATION EVENT SALE — USE CODE
        <strong class="flash-code">SYNC15</strong>
        FOR 15% OFF YOUR ENTIRE ORDER
      </span>
      <div class="flash-countdown">
        <span class="flash-unit">{{ timeLeft.h }}<em>H</em></span>
        <span class="flash-sep">:</span>
        <span class="flash-unit">{{ timeLeft.m }}<em>M</em></span>
        <span class="flash-sep">:</span>
        <span class="flash-unit">{{ timeLeft.s }}<em>S</em></span>
      </div>
      <span class="flash-ends">ENDS TONIGHT</span>
    </div>
    <button class="flash-close" @click="dismissed = true" aria-label="Dismiss">✕</button>
  </div>
</template>

<style scoped>
.flash-banner {
  width: 100%;
  background: linear-gradient(90deg, #0a0a0a 0%, #1a1200 40%, #0a0a0a 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.4);
  padding: 0.6rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  z-index: 200;
}
.flash-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.flash-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #D4AF37;
  flex-shrink: 0;
  animation: blink 1s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}
.flash-text {
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
}
.flash-code {
  color: #D4AF37;
  letter-spacing: 0.25em;
  padding: 0.1rem 0.5rem;
  border: 1px solid rgba(212,175,55,0.4);
  margin: 0 0.25rem;
}
.flash-countdown {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #D4AF37;
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
}
.flash-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  min-width: 24px;
  text-align: center;
}
.flash-unit em {
  font-style: normal;
  font-size: 0.4rem;
  letter-spacing: 0.2em;
  opacity: 0.5;
  font-weight: 400;
}
.flash-sep { opacity: 0.4; font-size: 0.7rem; }
.flash-ends {
  font-size: 0.5rem;
  letter-spacing: 0.3em;
  color: rgba(212,175,55,0.5);
  text-transform: uppercase;
}
.flash-close {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255,255,255,0.3);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: color 0.2s;
}
.flash-close:hover { color: rgba(255,255,255,0.7); }

@media (max-width: 600px) {
  .flash-ends { display: none; }
  .flash-text { font-size: 0.55rem; }
}
</style>
