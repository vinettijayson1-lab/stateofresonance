<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResonanceStore } from '../store/resonance';

const resonance = useResonanceStore();

const rituals = [
  {
    id: 'cleansing-963',
    title: 'Divine Cleansing Protocol',
    frequency: '963Hz',
    tier: '963_HZ',
    summary: 'A protocol for returning any manifestation to its natural state of Unity and Oneness.',
    protocol: '1. Light the [963Hz Resonance Mist] (if owned). 2. Focus on the crown chakra. 3. Visualize a bridge of white light connecting you to the Source for 9 minutes.',
    isPublic: false
  },
  {
    id: 'heart-528',
    title: 'The Solfeggio Love Bridge',
    frequency: '528Hz',
    tier: '741_HZ',
    summary: 'A practice to facilitate DNA repair and increase vital life energy through the Love Frequency.',
    protocol: '1. Place the [528Hz Alchemical Elixir] on your heart space. 2. Breathe deeply for 5 cycles of 8 seconds. 3. Repeat: "I am a conduit for miracles."',
    isPublic: false
  },
  {
    id: 'earth-432',
    title: 'Grounding Synchronization',
    frequency: '432Hz',
    tier: 'SEEKER',
    summary: 'Synchronizing your field with the heartbeat of the Earth (Schumann Resonance).',
    protocol: '1. Hold the [Natural Alignment Pendant]. 2. Step onto bare earth or grass. 3. Close your eyes and feel the 432Hz pulse of the planetary field.',
    isPublic: true
  }
];

const expandedRitual = ref<string | null>(null);

const toggleRitual = (id: string) => {
  if (expandedRitual.value === id) {
    expandedRitual.value = null;
  } else {
    expandedRitual.value = id;
  }
};

const isUnlocked = (ritual: any) => {
  if (ritual.isPublic) return true;
  if (resonance.tier === '963_HZ' || resonance.tier === 'RESONANCE_ACHIEVED') return true;
  if ((resonance.tier === '741_HZ' || resonance.tier === '852_HZ') && ritual.tier !== '963_HZ') return true;
  return false;
};
</script>

<template>
  <div class="rituals-view container" style="padding: 15vh 0;">
    <div class="rituals-header" style="text-align: center; margin-bottom: 6rem;">
      <span class="popup-eyebrow">✦ THE ALCHEMICAL JOURNALS ✦</span>
      <h1 class="hero-title">High-Frequency Protocols</h1>
      <p style="opacity: 0.5; max-width: 600px; margin: 2rem auto;">
        Practices for the sanctification of space and the transformation of the self. 
        Higher-tier protocols are revealed to seekers who have synchronized their fields.
      </p>
    </div>

    <div class="rituals-grid">
      <div 
        v-for="ritual in rituals" 
        :key="ritual.id"
        class="ritual-card glass"
        :class="{ 'ritual-locked': !isUnlocked(ritual), 'ritual-expanded': expandedRitual === ritual.id }"
      >
        <div class="ritual-card-header" @click="toggleRitual(ritual.id)">
          <div class="ritual-meta">
            <span class="ritual-freq gold-text">{{ ritual.frequency }}</span>
            <span class="ritual-tier">{{ ritual.tier }}</span>
          </div>
          <h2 class="ritual-title">{{ ritual.title }}</h2>
          <p class="ritual-summary">{{ ritual.summary }}</p>
          
          <div class="ritual-status-badge">
            <span v-if="isUnlocked(ritual)" class="unlocked-text">✦ UNLOCKED</span>
            <span v-else class="locked-text">✦ RESTRICTED</span>
          </div>
        </div>

        <div v-if="expandedRitual === ritual.id" class="ritual-protocol-body">
          <div v-if="isUnlocked(ritual)" class="protocol-content">
            <h3 class="protocol-heading">The Protocol</h3>
            <p>{{ ritual.protocol }}</p>
            <div class="protocol-footer">
              <span class="meta-vibe">Verified Resonance</span>
            </div>
          </div>
          <div v-else class="protocol-locked-msg">
            <p>Access to this level of the Archive is restricted.</p>
            <router-link to="/quiz" class="btn-gold" style="padding: 0.5rem 1rem; font-size: 0.6rem;">Calibrate Your Field</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rituals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.ritual-card {
  padding: 2rem;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  border: 1px solid rgba(212, 175, 55, 0.1);
  background: rgba(212, 175, 55, 0.02);
}

.ritual-card:hover {
  transform: translateY(-5px);
  border-color: rgba(212, 175, 55, 0.3);
  background: rgba(212, 175, 55, 0.05);
}

.ritual-card-header {
  position: relative;
}

.ritual-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.ritual-freq {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2rem;
}

.ritual-tier {
  font-size: 0.5rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  opacity: 0.5;
}

.ritual-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  margin-bottom: 1rem;
}

.ritual-summary {
  font-size: 0.85rem;
  line-height: 1.6;
  opacity: 0.6;
}

.ritual-status-badge {
  margin-top: 1.5rem;
  font-size: 0.55rem;
  letter-spacing: 0.2rem;
}

.unlocked-text { color: #4ade80; }
.locked-text { color: var(--color-gold); opacity: 0.6; }

.ritual-protocol-body {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  animation: fade-in 0.6s ease forwards;
}

.protocol-heading {
  font-size: 0.6rem;
  letter-spacing: 0.4rem;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  color: var(--color-gold);
}

.protocol-content p {
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.9;
}

.protocol-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.protocol-locked-msg {
  text-align: center;
}

.protocol-locked-msg p {
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .rituals-grid { grid-template-columns: 1fr; }
}
</style>
