<template>
  <div class="currency-switcher glass animate-in">
    <button 
      v-for="code in currencies" 
      :key="code"
      @click="setCurrency(code)"
      class="currency-btn"
      :class="{ 'is-active': active === code }"
    >
      {{ code }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { currencyStore } from '../store/currency'
import type { CurrencyCode } from '../store/currency'

const emit = defineEmits(['select'])
const currencies: CurrencyCode[] = ['CAD', 'USD', 'EUR']
const active = computed(() => currencyStore.active)

const setCurrency = (code: CurrencyCode) => {
  currencyStore.setCurrency(code)
  emit('select', code)
}
</script>

<style scoped>
.currency-switcher {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 99px;
  backdrop-filter: blur(10px);
}

.currency-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.65rem;
  font-family: var(--font-heading);
  padding: 6px 12px;
  border-radius: 99px;
  cursor: pointer;
  letter-spacing: 0.1em;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.currency-btn:hover {
  color: #fff;
}

.currency-btn.is-active {
  background: rgba(212, 175, 55, 0.1);
  color: var(--color-gold);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .currency-switcher {
    padding: 2px;
  }
  .currency-btn {
    padding: 4px 8px;
    font-size: 0.55rem;
  }
}
</style>
