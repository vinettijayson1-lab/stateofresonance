<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'

// Shared state from App.vue — keeps nav top offset in sync
const barVisible = inject<ReturnType<typeof ref>>('barVisible')

const visible = ref(true)
const currentMessageIndex = ref(0)
const affiliateMode = ref(false)
const affiliateMessage = ref("")

const messages = [
  "✦ THE SYNCHRONIZATION EVENT IS LIVE · CALIBRATE YOUR FIELD",
  "👁️ CANADA'S #1 ESOTERIC SANCTUARY · 5,000+ SACRED TOOLS",
  "✦ CIPHER: UNLOCK20 FOR 20% OFF ALL ALCHEMICAL ARTIFACTS",
  "✦ FREE SHIPPING ON ORDERS OVER $110 · DIRECT FROM THE LABORATORY",
]

const dismiss = () => {
  visible.value = false
  if (barVisible) barVisible.value = false
  sessionStorage.setItem('sor_bar_dismissed', '1')
}

onMounted(() => {
  if (sessionStorage.getItem('sor_bar_dismissed')) {
    visible.value = false
    return
  }

  // Check URL query parameters for affiliate links from Shopify Collabs or custom URLs
  const params = new URLSearchParams(window.location.search)
  const discountCode = params.get('discount') || params.get('affiliate') || params.get('collabs')

  if (discountCode) {
    affiliateMode.value = true
    affiliateMessage.value = `✦ ALIGNMENT SECURED: DISCOUNT CODE [ ${discountCode.toUpperCase()} ] APPLIED ✦`
  } else {
    // Cycle through messages every 4 seconds only if not in affiliate mode
    setInterval(() => {
      currentMessageIndex.value = (currentMessageIndex.value + 1) % messages.length
    }, 4000)
  }
})
</script>

<template>
  <div
    v-if="visible"
    id="announcement-bar"
    class="announcement-bar"
    role="banner"
    aria-label="Store Announcement"
  >
    <div class="announcement-inner">
      <span class="announcement-text" :key="affiliateMode ? 'affiliate' : currentMessageIndex">
        {{ affiliateMode ? affiliateMessage : messages[currentMessageIndex] }}
      </span>
    </div>
    <button
      class="announcement-close"
      @click="dismiss"
      aria-label="Dismiss announcement"
      title="Dismiss"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.announcement-bar {
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    #0a0c10 0%,
    #111520 20%,
    #0d0f1a 50%,
    #111520 80%,
    #0a0c10 100%
  );
  border-bottom: 1px solid rgba(198, 156, 109, 0.4);
  box-shadow:
    0 1px 0 rgba(198, 156, 109, 0.08),
    0 2px 20px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 48px;
  overflow: hidden;
}

/* Subtle shimmer sweep */
.announcement-bar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(198, 156, 109, 0.04) 50%,
    transparent 70%
  );
  background-size: 200% 100%;
  animation: bar-shimmer 5s linear infinite;
  pointer-events: none;
}

@keyframes bar-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.announcement-inner {
  flex: 1;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.announcement-text {
  display: inline-block;
  font-size: 0.52rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #C69C6D;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  animation: bar-fadein 0.6s ease forwards;
  white-space: nowrap;
}

@keyframes bar-fadein {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.announcement-close {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(198, 156, 109, 0.45);
  font-size: 0.9rem;
  line-height: 1;
  cursor: pointer;
  padding: 2px 4px;
  transition: color 0.2s ease;
  font-family: Arial, sans-serif;
}

.announcement-close:hover {
  color: #C69C6D;
}

@media (max-width: 600px) {
  .announcement-bar {
    padding: 0 40px 0 12px;
    min-height: 22px;
  }

  .announcement-text {
    font-size: 0.45rem;
    letter-spacing: 0.12em;
    white-space: normal;
    text-align: center;
    line-height: 1.2;
  }
}
</style>
