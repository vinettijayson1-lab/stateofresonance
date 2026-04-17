<template>
  <div class="gate-container">
    <div class="background-overlay"></div>
    <div class="content">
      <div class="signal-box">

        <Transition name="fade" mode="out-in">
          <!-- SUCCESS STATE -->
          <div v-if="unlocked" class="success-state">
            <div class="success-icon">✦</div>
            <h2 class="success-title">FREQUENCY LOCKED IN</h2>
            <p class="success-sub">Your 20% discount is now active</p>
            <div class="code-box">
              <span class="code-label">YOUR CODE</span>
              <span class="code-value">VOID2026</span>
            </div>
            <p class="code-instruction">Add items to your cart — your discount applies at checkout.</p>
            <router-link to="/attire" class="gate-button enter-btn">ENTER THE LABORATORY →</router-link>
          </div>

          <!-- DEFAULT STATE -->
          <div v-else>
            <h1 class="glitch-text">EARLY ACCESS</h1>
            <p class="subtitle">SYNCHRONIZE TO UNLOCK 20% OFF THIS DROP</p>

            <div class="countdown-container">
              <div class="time-block">
                <span class="time">{{ hours }}</span>
                <span class="label">HRS</span>
              </div>
              <span class="separator">:</span>
              <div class="time-block">
                <span class="time">{{ minutes }}</span>
                <span class="label">MIN</span>
              </div>
              <span class="separator">:</span>
              <div class="time-block">
                <span class="time">{{ seconds }}</span>
                <span class="label">SEC</span>
              </div>
            </div>

            <div class="input-container">
              <input
                v-model="password"
                type="text"
                placeholder="ENTER ACCESS CODE"
                @keyup.enter="checkPassword"
                class="gate-input"
              />
              <button @click="checkPassword" class="gate-button">SYNCHRONIZE</button>
            </div>

            <p v-if="error" class="error-msg">CODE NOT RECOGNIZED. CHECK YOUR SIGNAL.</p>

            <div class="footer-hint">
              <p>The code was hidden in plain sight.</p>
              <router-link to="/attire" class="skip-link">Enter store without discount →</router-link>
            </div>
          </div>
        </Transition>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const password = ref('');
const error = ref(false);
const unlocked = ref(false);

const STORAGE_KEY = 'portal_open_time_v2';

const checkPassword = () => {
  if (password.value.toUpperCase() === 'VOID2026') {
    unlocked.value = true;
    localStorage.setItem('resonance_access', 'true');
    gsap.from('.success-state', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' });
  } else {
    error.value = true;
    gsap.to('.signal-box', {
      x: 10, repeat: 5, yoyo: true, duration: 0.05,
      onComplete: () => gsap.set('.signal-box', { x: 0 })
    });
  }
};

// Persistent countdown — stores first-visit timestamp in localStorage
const hours = ref(47);
const minutes = ref(59);
const seconds = ref(59);

let timer: any;

onMounted(() => {
  // Load or create the countdown start time
  let startTime = parseInt(localStorage.getItem(STORAGE_KEY) || '0');
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem(STORAGE_KEY, startTime.toString());
  }

  const updateTime = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, 48 * 3600000 - elapsed);
    hours.value = Math.floor(remaining / 3600000);
    minutes.value = Math.floor((remaining % 3600000) / 60000);
    seconds.value = Math.floor((remaining % 60000) / 1000);
    if (remaining <= 0) clearInterval(timer);
  };

  updateTime(); // Set immediately
  timer = setInterval(updateTime, 1000);

  gsap.from('.signal-box', { opacity: 0, y: 50, duration: 1.5, ease: 'power4.out' });
});

onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.gate-container {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100dvh;
  background: #050505;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  font-family: 'Outfit', sans-serif;
}

.background-overlay {
  position: absolute;
  width: 100%; height: 100%;
  background: radial-gradient(circle at center, rgba(0,255,255,0.05) 0%, transparent 70%);
  pointer-events: none;
}

.content {
  position: relative;
  text-align: center;
  max-width: 500px;
  width: 90%;
}

.glitch-text {
  font-size: 3rem;
  letter-spacing: 0.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.25rem;
  color: #888;
  margin-bottom: 3rem;
}

.countdown-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.time-block { display: flex; flex-direction: column; }
.time { font-size: 2.5rem; font-weight: 300; font-family: 'Space Mono', monospace; }
.label { font-size: 0.6rem; color: #666; letter-spacing: 0.2rem; }
.separator { font-size: 2.5rem; color: #333; }

.input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gate-input {
  background: transparent;
  border: 1px solid #333;
  padding: 1rem;
  color: #fff;
  text-align: center;
  font-size: 1.1rem;
  letter-spacing: 0.3rem;
  outline: none;
  transition: border-color 0.3s;
}
.gate-input:focus { border-color: #0ff; }

.gate-button {
  background: #fff;
  color: #000;
  border: none;
  padding: 1rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
  text-decoration: none;
  display: block;
}
.gate-button:hover { background: #0ff; transform: scale(1.02); }

.error-msg { color: #ff3e3e; font-size: 0.7rem; margin-top: 1rem; letter-spacing: 0.1rem; }

.footer-hint {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.footer-hint > p { font-size: 0.65rem; color: #444; font-style: italic; }

.skip-link {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.2);
  font-size: 0.65rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s;
  text-underline-offset: 3px;
}
.skip-link:hover { color: rgba(255,255,255,0.5); }

/* Success State */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.success-icon { font-size: 2rem; color: #d4af37; }
.success-title { font-size: 2rem; letter-spacing: 0.3rem; }
.success-sub { color: #888; font-size: 0.8rem; letter-spacing: 0.1rem; }

.code-box {
  border: 1px solid rgba(212,175,55,0.5);
  background: rgba(212,175,55,0.05);
  padding: 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.code-label { font-size: 0.55rem; letter-spacing: 0.3rem; color: #888; }
.code-value { font-size: 2rem; font-family: 'Space Mono', monospace; color: #d4af37; letter-spacing: 0.3rem; }

.code-instruction { font-size: 0.7rem; color: rgba(255,255,255,0.4); max-width: 30ch; }

.enter-btn { margin-top: 0.5rem; }

/* Transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
