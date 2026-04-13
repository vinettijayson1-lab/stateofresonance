<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted } from 'vue'

const { locale } = useI18n()
const emit = defineEmits(['select'])
const isOpen = ref(false)
const switcherRef = ref<HTMLElement | null>(null)

const setLocale = (newLocale: string) => {
  locale.value = newLocale
  localStorage.setItem('user-locale', newLocale)
  window.dispatchEvent(new CustomEvent('locale-changed', { detail: newLocale }))
  emit('select', newLocale)
  isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (switcherRef.value && !switcherRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div 
    ref="switcherRef"
    class="ultra-thin-lang" 
    :class="{ 'is-open': isOpen }"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <div class="lang-trigger gold-text" @click="toggle">
      {{ locale.toUpperCase() }}
      <span class="chevron" :class="{ 'rotate': isOpen }">▾</span>
    </div>
    
    <div class="lang-dropdown glass" v-show="isOpen">
      <button 
        v-if="locale !== 'en'"
        @click="setLocale('en')" 
        class="lang-option"
      >
        EN
      </button>
      <button 
        v-if="locale !== 'fr'"
        @click="setLocale('fr')" 
        class="lang-option"
      >
        FR
      </button>
    </div>
  </div>
</template>

<style scoped>
.ultra-thin-lang {
  position: relative;
  width: 50px;
  height: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.lang-trigger {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  cursor: pointer;
  border: 1px solid rgba(212, 175, 55, 0.2);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s var(--ease-out-expo);
  border-radius: 2px;
}

.is-open .lang-trigger {
  border-color: var(--color-gold);
  background: rgba(212, 175, 55, 0.1);
}

.chevron {
  font-size: 0.6rem;
  transition: transform 0.3s ease;
  margin-left: 4px;
}

.chevron.rotate {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(10, 10, 12, 0.98);
  border: 1px solid var(--color-gold);
  border-top: none;
  margin-top: -1px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: slide-down 0.3s var(--ease-out-expo);
}

.lang-option {
  width: 100%;
  padding: 8px;
  background: none;
  border: none;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
}

.lang-option:hover {
  background: rgba(212, 175, 55, 0.2);
  color: var(--color-gold);
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .ultra-thin-lang {
    width: 45px;
    height: 22px;
    font-size: 0.65rem;
  }
}
</style>
