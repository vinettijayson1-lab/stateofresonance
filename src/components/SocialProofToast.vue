<template>
  <Transition name="toast">
    <div v-if="visible" class="social-proof-toast" :class="{ 'premium-resonance': current.isPremium }">
      <div class="toast-glow"></div>
      <div class="toast-icon">
        <div v-if="current.isPremium" class="divine-icon">✦</div>
        <div v-else class="vibrate-icon">⚡</div>
      </div>
      <div class="toast-content">
        <div class="toast-header">
          <span class="toast-name">{{ current.isSeed ? $t('social_proof.seeker') : current.name }}</span>
          <div class="live-dot"></div>
        </div>
        <span class="toast-action">{{ current.isPurchase ? $t('social_proof.purchase_action') : (current.isSeed ? $t('social_proof.sync_action') : current.action) }}</span>
        <span class="toast-time">{{ $t('social_proof.just_now') }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { cart } from '../store/cart';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const visible = ref(false);
const current = ref({ name: '', action: '', time: '', isPremium: false, isSeed: false, isPurchase: false });
let hideTimer: any;

watch(() => cart.lastManifestation, (newVal) => {
  if (newVal) {
    current.value = { ...newVal, isSeed: false, isPurchase: true };
    visible.value = true;
    
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      visible.value = false;
    }, 5500);
  }
});

onMounted(() => {
  // Initial seed delay
  setTimeout(() => {
    if (!visible.value) {
       current.value = { 
         name: '', // Will be handled by isSeed translation
         action: '', 
         time: '', 
         isPremium: false,
         isSeed: true,
         isPurchase: false
       };
       visible.value = true;
       hideTimer = setTimeout(() => visible.value = false, 4500);
    }
  }, 4000);
});

onUnmounted(() => {
  if (hideTimer) clearTimeout(hideTimer);
});
</script>

<style scoped>
.social-proof-toast {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(8, 8, 8, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 0.8rem 1.25rem;
  width: 320px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  border-radius: 4px;
  overflow: hidden;
  pointer-events: none;
}

.toast-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.05), transparent);
  animation: sweep 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes sweep {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}

.toast-icon {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 2px;
}

.divine-icon {
  color: var(--color-gold);
  font-size: 1.4rem;
  filter: drop-shadow(0 0 8px var(--color-gold));
  animation: pulse-divine 2s infinite;
}

.vibrate-icon {
  color: #fff;
  font-size: 1.1rem;
  opacity: 0.8;
}

.toast-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
}

.toast-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toast-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.05em;
  font-family: var(--font-heading);
}

.live-dot {
  width: 4px;
  height: 4px;
  background: #4ade80;
  border-radius: 50%;
  box-shadow: 0 0 6px #4ade80;
  animation: blink 2s infinite;
}

.toast-action {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.02em;
}

.toast-time {
  font-size: 0.6rem;
  color: var(--color-gold-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 0.1rem;
}

.premium-resonance {
  border-color: var(--color-gold) !important;
  background: rgba(12, 12, 12, 0.98);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
}

.premium-resonance .toast-name {
  color: var(--color-gold);
}

@keyframes blink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes pulse-divine {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px var(--color-gold)); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 15px var(--color-gold)); }
}

/* Transition */
.toast-enter-active {
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-40px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
</style>
