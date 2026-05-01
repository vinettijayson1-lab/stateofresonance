<script setup lang="ts">
import { ShieldCheck, PackageCheck, Lock } from 'lucide-vue-next'

const props = defineProps<{
  type: 'secure' | 'orders' | 'ssl'
}>()

const config = {
  secure: { icon: ShieldCheck, title: 'Certified Secure' },
  orders: { icon: PackageCheck, title: 'Issue-Free Orders' },
  ssl: { icon: Lock, title: 'Secure SSL' }
}
</script>

<template>
  <div class="ti-badge">
    <div class="ti-badge-top">
      <component :is="config[props.type].icon" class="ti-icon" :size="14" />
      <span class="ti-title">{{ config[props.type].title }}</span>
    </div>
    <div class="ti-badge-bottom">
      Verified by <strong>Trustindex</strong>
    </div>
  </div>
</template>

<style scoped>
.ti-badge {
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  width: max-content;
  border: 1px solid rgba(0,0,0,0.1);
}

.ti-badge-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.5rem;
  background: #fff;
}

.ti-icon {
  color: #00b67a;
  flex-shrink: 0;
}

.ti-title {
  color: #111;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.ti-badge-bottom {
  background: #111;
  color: #fff;
  font-size: 0.45rem;
  padding: 0.15rem 0.5rem;
  text-align: center;
  letter-spacing: 0.02em;
}

.ti-badge-bottom strong {
  font-weight: 700;
}
</style>
