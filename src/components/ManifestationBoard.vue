<script setup lang="ts">
import { ref } from 'vue';
import { useResonanceStore } from '../store/resonance';

const resonance = useResonanceStore();
const newManifestion = ref('');
const isSubmitting = ref(false);

const submitManifestation = async () => {
  if (!newManifestion.value.trim() || newManifestion.value.length < 5) return;
  
  isSubmitting.value = true;
  // Delay for ritualistic feel
  await new Promise(r => setTimeout(r, 1500));
  
  resonance.addManifestation(newManifestion.value);
  newManifestion.value = '';
  isSubmitting.value = false;
};
</script>

<template>
  <div class="manifestation-board">
    <div class="board-header">
      <h2 class="section-title">Wall of Calibration</h2>
      <p class="section-subtitle">A collective chronicle of synchronization results.</p>
    </div>

    <!-- Submission Form -->
    <div class="manifestation-form glass">
      <textarea 
        v-model="newManifestion" 
        placeholder="TRANSFORM YOUR INTENT INTO FORM... (SHARE YOUR RESULTS)"
        class="glass-input manifestation-input"
        :disabled="isSubmitting"
      ></textarea>
      <div class="form-footer">
        <span class="meta-vibe" :style="{ opacity: newManifestion.length > 0 ? 0.6 : 0 }">
          {{ newManifestion.length }} / 500 characters
        </span>
        <button 
          @click="submitManifestation" 
          class="btn-gold small" 
          :disabled="isSubmitting || newManifestion.length < 5"
        >
          {{ isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL' }}
        </button>
      </div>
    </div>

    <!-- The Wall -->
    <div class="manifestations-grid">
      <div 
        v-for="entry in resonance.persistence.manifestations" 
        :key="entry.id"
        class="manifestation-card glass-glow"
      >
        <div class="entry-meta">
          <span class="entry-seeker">{{ entry.seeker }}</span>
          <span class="entry-hz gold-text">{{ entry.frequency }}Hz</span>
          <span class="entry-tier badge">{{ entry.tier }}</span>
        </div>
        <p class="entry-content">{{ entry.content }}</p>
        <div class="entry-footer">
          <span class="entry-date">{{ new Date(entry.timestamp).toLocaleDateString() }}</span>
          <div class="entry-sigil">✦</div>
        </div>
      </div>
    </div>

    <div v-if="resonance.persistence.manifestations.length === 0" class="empty-board">
      <p>The chronicle is currently silent. Be the first to manifest.</p>
    </div>
  </div>
</template>

<style scoped>
.manifestation-board {
  margin-top: 5rem;
}

.board-header {
  margin-bottom: 3rem;
  text-align: center;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  letter-spacing: 0.1rem;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 0.8rem;
  opacity: 0.5;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}

.manifestation-form {
  padding: 2rem;
  margin-bottom: 5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.manifestation-input {
  width: 100%;
  min-height: 120px;
  background: none;
  border: none;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  color: #fff;
  resize: vertical;
  margin-bottom: 1.5rem;
  outline: none;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.manifestations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.manifestation-card {
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.manifestation-card:hover {
  border-color: rgba(212, 175, 55, 0.2);
  background: rgba(255, 255, 255, 0.04);
}

.entry-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  font-size: 0.65rem;
  letter-spacing: 0.1rem;
}

.entry-seeker {
  font-weight: bold;
  opacity: 0.8;
}

.entry-tier.badge {
  padding: 0.2rem 0.5rem;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 2px;
}

.entry-content {
  font-size: 0.9rem;
  line-height: 1.7;
  opacity: 0.8;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.entry-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.3;
  font-size: 0.55rem;
}

.entry-sigil {
  font-size: 1rem;
  color: var(--color-gold);
}

.empty-board {
  text-align: center;
  padding: 5rem;
  opacity: 0.4;
  font-style: italic;
}

@keyframes glow-border {
  from { border-color: rgba(212, 175, 55, 0.2); }
  to { border-color: rgba(212, 175, 55, 0.6); }
}

.glass-glow:hover {
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.05);
}
</style>
