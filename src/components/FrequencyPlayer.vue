<template>
  <div class="frequency-player-wrap" v-click-outside="closeControls">
    <button 
      @click="toggleControls" 
      class="freq-toggle" 
      :class="{ 'is-active': isActive, 'open': showControls }"
      :title="`Current Signal: ${selectedFrequency}Hz`"
    >
      <div class="freq-icon">
        <div class="wave-line" v-for="i in 3" :key="i" :class="'wave-' + i"></div>
      </div>
      <span class="freq-label">{{ selectedFrequency }} HZ</span>
      <div v-if="isActive" class="pulse-ring"></div>
    </button>

    <transition name="dropdown">
      <div v-if="showControls" class="player-dropdown glass">
        <div class="dropdown-header">SIGNAL CALIBRATION</div>
        
        <!-- Frequency Selector -->
        <div class="freq-grid">
          <button 
            v-for="f in availableFrequencies" 
            :key="f.value"
            @click="setFrequency(f.value)"
            class="freq-selector-btn"
            :class="{ active: selectedFrequency === f.value }"
          >
            <span class="f-val">{{ f.value }}</span>
            <span class="f-label">{{ f.label }}</span>
          </button>
        </div>

        <div class="divider"></div>

        <div class="mode-selector">
          <button @click="setMode('ambient')" :class="{ active: mode === 'ambient' }" class="mode-btn">
            AMBIENT
            <span v-if="isMissingAsset('ambient')" class="sync-tag">SYNCING...</span>
          </button>
          <button @click="setMode('chant')" :class="{ active: mode === 'chant' }" class="mode-btn">
            CHANT
            <span v-if="isMissingAsset('chant')" class="sync-tag">SYNCING...</span>
          </button>
        </div>

        <button @click="deactivate" class="deactivate-btn">DISABLE SIGNAL</button>
      </div>
    </transition>
    
    <!-- Sacred Audio Layers -->
    <audio ref="ambientAudio" loop :src="getAssetPath('ambient')"></audio>
    <audio ref="chantAudio" loop :src="getAssetPath('chant')"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, watch, computed } from 'vue'

const isActive = ref(false)
const showControls = ref(false)
const mode = ref<'ambient' | 'chant'>('ambient')
const selectedFrequency = ref(963)

const availableFrequencies = [
  { value: 963, label: 'SINGULARITY' },
  { value: 528, label: 'MIRACLE' },
  { value: 432, label: 'NATURE' },
  { value: 396, label: 'LIBERATION' }
]

const ambientAudio = ref<HTMLAudioElement | null>(null)
const chantAudio = ref<HTMLAudioElement | null>(null)

const setFrequency = (freq: number) => {
  selectedFrequency.value = freq
  syncAudioLayers()
}

const toggleControls = () => {
  showControls.value = !showControls.value
  if (!isActive.value) {
    activate()
  }
}

const closeControls = () => {
  showControls.value = false
}

const setMode = (newMode: 'ambient' | 'chant') => {
  mode.value = newMode
}

const getAssetPath = (type: 'ambient' | 'chant') => {
  return `/audio/${selectedFrequency.value}hz-${type}.mp3`
}

const isMissingAsset = (type: 'ambient' | 'chant') => {
  // Only 963Hz assets are confirmed present in the initial shop
  return selectedFrequency.value !== 963
}

const activate = () => {
  isActive.value = true
  syncAudioLayers()
}

const syncAudioLayers = () => {
  if (!isActive.value) return

  // Manage Ambient Layer
  if (mode.value === 'ambient' && ambientAudio.value) {
    if (isMissingAsset('ambient')) {
      // Fallback: Just use Pure Tone if MP3 is missing
      fadeAudio(ambientAudio.value, 0, 500, () => ambientAudio.value?.pause())
      return
    }
    ambientAudio.value.volume = 0
    ambientAudio.value.play().catch(() => {})
    fadeAudio(ambientAudio.value, 0.45, 2000)
  } else if (ambientAudio.value) {
    fadeAudio(ambientAudio.value, 0, 1500, () => ambientAudio.value?.pause())
  }

  // Manage Chant Layer
  if (mode.value === 'chant' && chantAudio.value) {
    if (isMissingAsset('chant')) {
      fadeAudio(chantAudio.value, 0, 500, () => chantAudio.value?.pause())
      return
    }
    chantAudio.value.volume = 0
    chantAudio.value.play().catch(() => {})
    fadeAudio(chantAudio.value, 0.5, 2500)
  } else if (chantAudio.value) {
    fadeAudio(chantAudio.value, 0, 1500, () => chantAudio.value?.pause())
  }
}

const deactivate = () => {
  isActive.value = false
  showControls.value = false
  
  if (ambientAudio.value) ambientAudio.value.pause()
  if (chantAudio.value) chantAudio.value.pause()
}

watch(mode, syncAudioLayers)
watch(selectedFrequency, syncAudioLayers)

const fadeAudio = (audio: HTMLAudioElement, targetVol: number, duration: number, cb?: () => void) => {
  if (!audio) return
  const startVol = audio.volume
  const steps = 30
  const stepTime = duration / steps
  const volDelta = (targetVol - startVol) / steps
  
  let currentStep = 0
  const interval = setInterval(() => {
    currentStep++
    audio.volume = Math.max(0, Math.min(1, startVol + volDelta * currentStep))
    if (currentStep >= steps) {
      clearInterval(interval)
      if (cb) cb()
    }
  }, stepTime)
}

const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: any) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

onBeforeUnmount(() => {
  // Clean up if needed
})
</script>

<style scoped>
.frequency-player-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.freq-toggle {
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.15);
  height: 42px;
  min-width: 80px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.4s var(--ease-out-expo);
  padding: 0 12px;
  position: relative;
}

.freq-toggle:hover, .freq-toggle.open {
  border-color: var(--color-gold);
  background: rgba(212, 175, 55, 0.05);
}

.freq-toggle.is-active {
  border-color: var(--color-gold);
  background: rgba(212, 175, 55, 0.08);
}

.freq-icon {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 8px;
  margin-bottom: 4px;
}

.wave-line {
  width: 1.5px;
  background: var(--color-gold);
  opacity: 0.4;
  border-radius: 1px;
}

.is-active .wave-line {
  opacity: 1;
  box-shadow: 0 0 5px var(--color-gold);
}

.wave-1 { height: 60%; animation: wave 1s ease-in-out infinite; }
.wave-2 { height: 100%; animation: wave 1.2s ease-in-out infinite; }
.wave-3 { height: 80%; animation: wave 0.8s ease-in-out infinite; }

@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.4); }
}

.freq-label {
  font-size: 0.45rem;
  letter-spacing: 0.2em;
  color: var(--color-gold-muted);
  text-transform: uppercase;
}

.is-active .freq-label {
  color: var(--color-gold);
}

.player-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  transform: translateX(-65px);
  width: 260px;
  padding: 16px;
  background: rgba(10, 10, 12, 0.98);
  border: 1px solid var(--color-gold);
  box-shadow: 0 20px 60px rgba(0,0,0,0.9);
  z-index: 10000 !important;
  display: flex;
  flex-direction: column;
  gap: 12px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.dropdown-header {
  font-size: 0.5rem;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.3);
  margin-bottom: 8px;
  text-align: center;
}

.freq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.freq-selector-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  transition: all 0.3s;
}

.freq-selector-btn .f-val {
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
}

.freq-selector-btn .f-label {
  font-size: 0.4rem;
  letter-spacing: 0.1em;
  color: var(--color-gold-muted);
}

.freq-selector-btn:hover {
  background: rgba(212, 175, 55, 0.05);
  border-color: rgba(212, 175, 55, 0.2);
}

.freq-selector-btn.active {
  background: rgba(212, 175, 55, 0.15);
  border-color: var(--color-gold);
}

.divider {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin: 4px 0;
}

.mode-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mode-btn {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.6);
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  position: relative;
}

.sync-tag {
  font-size: 0.35rem;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gold);
  opacity: 0.5;
}

.mode-btn:hover {
  background: rgba(212, 175, 55, 0.1);
  color: #fff;
}

.mode-btn.active {
  background: var(--color-gold);
  color: #000;
  border-color: var(--color-gold);
}

.deactivate-btn {
  margin-top: 8px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.2);
  font-size: 0.45rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s;
}

.deactivate-btn:hover {
  color: #ff4d4d;
}

.pulse-ring {
  position: absolute;
  inset: -1px;
  border: 1px solid var(--color-gold);
  border-radius: 4px;
  animation: pulse-ring 2s infinite;
  pointer-events: none;
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.1, 1.3); opacity: 0; }
}

/* Transitions */
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
