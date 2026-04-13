<template>
  <div v-if="show" class="urgency-banner">
    <span class="pulse-dot"></span>
    <span class="banner-text">⚡ {{ bannerText }} — PORTAL CLOSES IN {{ hours }}H {{ minutes }}M → Use code <strong>{{ discountCode }}</strong> for 15% OFF</span>
    <button @click="show = false" class="banner-close">✕</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const show = ref(true);
const hours = ref(47);
const minutes = ref(59);
const discountCode = ref('ALIGN528');
const bannerText = ref('LIMITED ACCESS');

let timer: any;
onMounted(() => {
  // Sync to real elapsed time if stored
  const savedAt = localStorage.getItem('portal_open_time');
  if (savedAt) {
    const elapsed = Date.now() - parseInt(savedAt);
    const remaining = Math.max(0, 48 * 3600 * 1000 - elapsed);
    hours.value = Math.floor(remaining / 3600000);
    minutes.value = Math.floor((remaining % 3600000) / 60000);
    if (remaining <= 0) { show.value = false; return; }
  } else {
    localStorage.setItem('portal_open_time', Date.now().toString());
  }

  // Sync with active event
  const activeEvent = localStorage.getItem('sor_active_event');
  const eventDiscount = localStorage.getItem('sor_event_discount');
  if (activeEvent === 'sync_event_2026' && eventDiscount) {
    discountCode.value = eventDiscount;
    bannerText.value = 'SYNCHRONIZATION EVENT ACTIVE';
  }

  timer = setInterval(() => {
    if (minutes.value > 0) {
      minutes.value--;
    } else if (hours.value > 0) {
      hours.value--;
      minutes.value = 59;
    } else {
      show.value = false;
    }
  }, 60000);
});

onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.urgency-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9500;
  background: linear-gradient(90deg, #1a0a00, #0d0d0d, #1a0a00);
  border-bottom: 1px solid rgba(212, 175, 55, 0.4);
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.65rem;
  letter-spacing: 0.1rem;
  color: rgba(255,255,255,0.8);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #f97316;
  border-radius: 50%;
  animation: urgency-pulse 1.2s ease infinite;
  flex-shrink: 0;
}

@keyframes urgency-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.6); }
  50% { box-shadow: 0 0 0 6px rgba(249, 115, 22, 0); }
}

.banner-text strong {
  color: #d4af37;
}

.banner-close {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255,255,255,0.3);
  cursor: pointer;
  font-size: 0.7rem;
  padding: 0.25rem;
}
</style>
