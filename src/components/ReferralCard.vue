<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useResonanceStore } from '../store/resonance';
import { Copy, Share2, Check, Zap } from 'lucide-vue-next';

const resonance = useResonanceStore();
const copied = ref(false);

onMounted(() => {
  resonance.initializeReferral();
});

const referralLink = computed(() => `https://stateofresonance.ca/join?ref=${resonance.referralId || 'SEEKER'}`);

const isAffiliate = computed(() => ['741_HZ', '852_HZ', '963_HZ', 'RESONANCE_ACHIEVED'].includes(resonance.tier || ''));
const affiliateData = ref({
  totalClicks: 142,
  conversions: 8,
  pendingCommissions: 240.50,
  lifetimeEarnings: 450.00
});

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  } catch (err) {
    console.error('Failed to copy resonance link:', err);
  }
};

const shareChannel = (channel: string) => {
  const text = "I've synchronized with the State of Resonance. Join the Inner Circle here:";
  let url = '';
  if (channel === 'twitter') url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink.value)}`;
  if (channel === 'facebook') url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink.value)}`;
  
  if (url) window.open(url, '_blank');
};
</script>

<template>
  <div class="referral-card glass">
    <div class="referral-header">
      <h3 class="gold-text">Amplify the Signal</h3>
      <p class="meta-vibe">VIRAL RESONANCE LOOP ACTIVE</p>
    </div>

    <div class="referral-body">
      <p class="referral-desc">
        Share your unique frequency. When 3 seekers join the Inner Circle via your link, you will automatically ascend to the next resonance tier.
      </p>

      <div class="referral-status">
        <div class="status-labels">
          <span>Synchronization Status</span>
          <span class="gold-text">{{ resonance.referrals }} / 3 Seekers</span>
        </div>
        <div class="status-bar">
          <div class="status-fill" :style="{ width: (Math.min(resonance.referrals / 3, 1) * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Affiliate Protocol -->
      <div v-if="isAffiliate" class="affiliate-stats" style="margin-top: 2rem; margin-bottom: 2rem; padding: 1.5rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(212,175,55,0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h4 class="gold-text" style="font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">Affiliate Ledger</h4>
          <span style="font-size: 0.6rem; color: #4ade80; letter-spacing: 0.1em;">ACTIVE</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <span style="display: block; font-size: 0.6rem; opacity: 0.5; margin-bottom: 0.25rem;">CLICKS</span>
            <span style="font-family: var(--font-heading); font-size: 1.2rem;">{{ affiliateData.totalClicks }}</span>
          </div>
          <div>
            <span style="display: block; font-size: 0.6rem; opacity: 0.5; margin-bottom: 0.25rem;">CONVERSIONS</span>
            <span style="font-family: var(--font-heading); font-size: 1.2rem;">{{ affiliateData.conversions }}</span>
          </div>
          <div>
            <span style="display: block; font-size: 0.6rem; opacity: 0.5; margin-bottom: 0.25rem;">PENDING</span>
            <span style="font-family: var(--font-mono); font-size: 1rem; color: var(--color-gold);">${{ affiliateData.pendingCommissions.toFixed(2) }}</span>
          </div>
          <div>
            <span style="display: block; font-size: 0.6rem; opacity: 0.5; margin-bottom: 0.25rem;">LIFETIME</span>
            <span style="font-family: var(--font-mono); font-size: 1rem; color: #4ade80;">${{ affiliateData.lifetimeEarnings.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <div class="link-box interactive" @click="copyLink">
        <span class="link-url">{{ referralLink }}</span>
        <div class="copy-trigger">
          <Check v-if="copied" :size="16" class="gold-text" />
          <Copy v-else :size="16" />
        </div>
      </div>

      <div class="share-actions">
        <button @click="shareChannel('twitter')" class="btn-share">
          <Share2 :size="14" />
          <span>Post to Twitter</span>
        </button>
        <button @click="shareChannel('facebook')" class="btn-share">
          <Share2 :size="14" />
          <span>Share to FB</span>
        </button>
      </div>

      <!-- Developmental Signal Boost -->
      <div class="dev-actions mt-6 border-t border-white/5 pt-6">
        <button @click="resonance.recordReferral()" class="btn-test-referral">
          <Zap :size="12" />
          <span>Simulate Soul Synchronized (Klaviyo Active)</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.referral-card {
  padding: 2.5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  position: relative;
  overflow: hidden;
}

.referral-header {
  margin-bottom: 2rem;
}

.referral-header h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.referral-desc {
  font-size: 0.85rem;
  opacity: 0.6;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.referral-status {
  margin-bottom: 2.5rem;
}

.status-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.status-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
}

.status-fill {
  height: 100%;
  background: var(--color-gold);
  box-shadow: 0 0 10px var(--color-gold);
  transition: width 1s ease;
}

.link-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.link-box:hover {
  border-color: rgba(212, 175, 55, 0.4);
}

.link-url {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  opacity: 0.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
}

.share-actions {
  display: flex;
  gap: 1rem;
}

.btn-share {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  padding: 0.75rem;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-share:hover {
  background: rgba(212, 175, 55, 0.05);
  border-color: var(--color-gold);
}

.btn-test-referral {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(212, 175, 55, 0.05);
  border: 1px dashed rgba(212, 175, 55, 0.3);
  color: var(--color-gold-muted);
  padding: 0.5rem;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-test-referral:hover {
  background: rgba(212, 175, 55, 0.15);
  border-style: solid;
  color: var(--color-gold);
}
</style>
