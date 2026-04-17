<template>
  <div class="post-purchase-teaser glass glow-edge">
    <div class="teaser-content">
      <span class="teaser-eyebrow">SIGNAL DETECTED · NEXT PHASE</span>
      <h3 class="teaser-title">The Void is Expanding.</h3>
      <p class="teaser-body">
        Piece acquisition complete. Your resonance has been recorded.
        The next synchronization event (Phase 2: Convergence) will begin in:
      </p>
      
      <div class="countdown-row">
        <div class="count-unit">
          <span class="count-val">05</span>
          <span class="count-label">DAYS</span>
        </div>
        <div class="count-unit">
          <span class="count-val">14</span>
          <span class="count-label">HRS</span>
        </div>
        <div class="count-unit">
          <span class="count-val">22</span>
          <span class="count-label">MIN</span>
        </div>
      </div>

      <div class="void-access-form">
        <p class="form-label">REQUEST EARLY INTERCEPTION</p>
        <div class="input-group">
          <input type="email" placeholder="ENTER YOUR FREQUENCY (EMAIL)" class="void-input" />
          <button class="void-btn">JOIN THE VOID</button>
        </div>
        <p class="form-sub">Only 50 slots remain for the Inner Circle extraction.</p>
      </div>
    </div>
    
    <div class="teaser-visual">
      <div class="glitch-orb"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Logic for actual countdown could be added here
</script>

<style scoped>
.post-purchase-teaser {
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  gap: 3rem;
  padding: 4rem;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(212, 175, 55, 0.2);
  margin: 4rem 0;
  position: relative;
  overflow: hidden;
}

.teaser-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  opacity: 0.6;
  display: block;
  margin-bottom: 1.5rem;
}

.teaser-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  color: #fff;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.teaser-body {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.6;
  margin-bottom: 3rem;
  max-width: 45ch;
}

.countdown-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
}

.count-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.count-val {
  font-size: 2.5rem;
  font-family: var(--font-heading);
  color: var(--color-gold-muted);
}

.count-label {
  font-size: 0.5rem;
  letter-spacing: 0.3em;
  opacity: 0.4;
  margin-top: 0.5rem;
}

.void-access-form {
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  padding-top: 2.5rem;
}

.form-label {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  opacity: 0.4;
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 1rem;
}

.void-input {
  flex: 1;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1rem 1.5rem;
  color: #fff;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  outline: none;
}

.void-btn {
  background: var(--color-gold);
  color: #000;
  border: none;
  padding: 0 2rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: filter 0.3s;
}

.void-btn:hover {
  filter: brightness(1.2);
}

.form-sub {
  font-size: 0.6rem;
  font-style: italic;
  opacity: 0.4;
  margin-top: 1rem;
}

.teaser-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.glitch-orb {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle at center, var(--color-gold) 0%, transparent 70%);
  filter: blur(20px);
  opacity: 0.3;
  animation: pulse-orb 4s infinite alternate;
}

@keyframes pulse-orb {
  from { transform: scale(1); opacity: 0.2; }
  to { transform: scale(1.3); opacity: 0.5; }
}

@media (max-width: 768px) {
  .post-purchase-teaser {
    grid-template-columns: 1fr;
    padding: 2.5rem;
  }
  .input-group {
    flex-direction: column;
  }
  .teaser-visual {
    display: none;
  }
}
</style>
