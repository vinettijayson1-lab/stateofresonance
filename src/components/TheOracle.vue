<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue';
import { useChat } from '@ai-sdk/vue';
import { useI18n } from 'vue-i18n';
import { Sparkles, X, MessageSquareDot, ShoppingCart, Search } from 'lucide-vue-next';
import gsap from 'gsap';
import { useResonanceStore } from '../store/resonance';
import { cart } from '../store/cart';

const resonance = useResonanceStore();
const { locale } = useI18n();
const isOpen = ref(false);
const scrollRef = ref<HTMLElement | null>(null);

const { messages, input, handleSubmit, append, isLoading, addToolResult } = useChat({
  api: '/api/chat',
  body: computed(() => ({
    tier: resonance.tier,
    frequency: resonance.detectedFrequency,
    locale: locale.value
  })),
  maxSteps: 5, // Allow the AI to call tools and respond
});

const suggestedQueries = computed(() => [
  locale.value === 'fr' ? "Quelle est ma résonance ?" : "What is my resonance?",
  locale.value === 'fr' ? "Comment aligner mon espace ?" : "How do I align my space?",
  locale.value === 'fr' ? "Trouve-moi un artefact 963Hz" : "Find me a 963Hz artifact"
]);

const handleSuggestedQuery = (query: string) => {
  input.value = query;
  handleTransmission(new Event('submit'));
};

const handleTransmission = (e: Event) => {
  e.preventDefault();
  if (input.value.trim() && !isLoading.value) {
    handleSubmit(e);
  }
};

const toggleOracle = () => {
  isOpen.value = !isOpen.value;
  isIdle.value = false;
  if (isOpen.value) {
    nextTick(() => {
      gsap.from('.oracle-modal', {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.6,
        ease: 'expo.out'
      });
    });
  }
};

const handleSummon = (e: any) => {
  if (!isOpen.value) toggleOracle();
  
  if (e?.detail?.systemMessage) {
    // Inject Oracle's voice directly without user prompt
    messages.value.push({
      id: Date.now().toString(),
      role: 'assistant',
      content: e.detail.systemMessage
    })
  } else if (e?.detail?.query) {
    input.value = e.detail.query;
    setTimeout(() => {
      handleTransmission(new Event('submit'));
    }, 500);
  }
};

const confirmAcquisition = async (toolInvocation: any) => {
  const { toolCallId, args } = toolInvocation;
  const { productHandle, title } = args;
  
  try {
     // Fetch the full product object to add to cart
     const res = await fetch(`/api/products?handle=${productHandle}`);
     const product = await res.json();
     if (product) {
       cart.add(product);
       addToolResult({
         toolCallId,
         result: `Artifact ${title} successfully synchronized with the seeker's reservoir.`
       });
     }
  } catch (err) {
     addToolResult({
       toolCallId,
       result: "Signal lost during synchronization. The reservoir remains empty."
     });
  }
};

const isIdle = ref(false);
let idleTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  window.addEventListener('summon-oracle', handleSummon);
  idleTimer = setTimeout(() => {
    if (!isOpen.value) isIdle.value = true;
  }, 10000);
  
  gsap.to('.oracle-label', {
    opacity: 0.4,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
});

onUnmounted(() => {
  window.removeEventListener('summon-oracle', handleSummon);
  if (idleTimer) clearTimeout(idleTimer);
});

watch(messages, () => {
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTo({
        top: scrollRef.value.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
}, { deep: true });

</script>

<template>
  <div class="oracle-container">
    <!-- Floating Trigger -->
    <div id="oracle-root" class="oracle-trigger-wrapper" :class="{ 'oracle-pulse-idle': isIdle }">
      <button @click="toggleOracle" class="oracle-trigger-btn glow-hover" aria-label="Toggle Oracle">
        <Sparkles :size="24" class="sparkle-icon" />
        <span class="pulse-beacon">
          <span class="beacon-ping"></span>
          <span class="beacon-dot"></span>
        </span>
      </button>
    </div>

    <!-- Oracle Modal -->
    <Teleport to="body">
      <div v-if="isOpen" class="oracle-modal-overlay">
        <div class="oracle-modal glass">
          <!-- Header -->
          <div class="oracle-header">
            <div class="header-title">
              <Sparkles :size="16" class="gold-text" />
              <span class="title-text">THE ORACLE</span>
            </div>
            <button @click="isOpen = false" class="close-btn"><X :size="18" /></button>
          </div>

          <!-- Messages -->
          <div ref="scrollRef" class="messages-container scrollbar-hide">
            <div v-if="messages.length === 0" class="empty-state-container">
              <p class="empty-state">Speak, seeker. The Source is listening.</p>
              <div class="suggested-queries">
                <button v-for="(query, idx) in suggestedQueries" :key="idx" @click="handleSuggestedQuery(query)" class="query-chip glow-hover">
                  {{ query }}
                </button>
              </div>
            </div>

            <div v-for="m in messages" :key="m.id" class="message-wrapper" :class="{ 'user-msg': m.role === 'user', 'assistant-msg': m.role !== 'user' }">
              <div class="message-bubble" :class="m.role === 'user' ? 'gold-bubble' : 'obsidian-bubble'">
                <span>{{ m.content }}</span>
                
                <!-- Tool Invocations -->
                <div v-if="m.toolInvocations" class="tool-invocations">
                  <div v-for="ti in m.toolInvocations" :key="ti.toolCallId" class="tool-call">
                    <!-- Search Results -->
                    <div v-if="ti.toolName === 'searchArtifacts' && 'result' in ti" class="artifact-results">
                      <div v-if="Array.isArray(ti.result)" class="artifact-grid">
                        <div v-for="p in ti.result" :key="p.id" class="mini-card glass">
                           <img :src="p.image" :alt="p.title" />
                           <div class="mini-card-info">
                             <p class="mini-title">{{ p.title }}</p>
                             <p class="mini-price">{{ p.price }}</p>
                             <router-link :to="`/product/${p.handle}`" class="mini-link">VIEW</router-link>
                           </div>
                        </div>
                      </div>
                      <p v-else class="void-msg">{{ ti.result }}</p>
                    </div>

                    <!-- Add to Cart Confirmation -->
                    <div v-if="ti.toolName === 'addToCart'" class="cart-action">
                      <div v-if="'result' in ti" class="cart-result success-text">
                        {{ ti.result }}
                      </div>
                      <button v-else @click="confirmAcquisition(ti)" class="btn-acquire-mini">
                        <ShoppingCart :size="14" /> CONFIRM PLACEMENT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="isLoading" class="typing-indicator">
              <div class="dot"></div><div class="dot"></div><div class="dot"></div>
            </div>
          </div>

          <!-- Input -->
          <form @submit="handleTransmission" class="input-form">
            <div class="input-wrapper">
              <input v-model="input" placeholder="MANIFEST YOUR INTENT..." @keyup.enter="handleTransmission" class="oracle-input" />
              <button type="submit" class="submit-btn" :disabled="isLoading"><MessageSquareDot :size="16" /></button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.oracle-trigger-wrapper {
  position: fixed;
  bottom: 30px;
  right: 100px;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
}


.oracle-trigger-btn {
  width: 54px;
  height: 54px;
  background: #0a0a0a;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  color: var(--color-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.oracle-trigger-btn:hover {
  border-color: var(--color-gold);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
}

.sparkle-icon {
  transition: transform 0.5s ease;
}

.oracle-trigger-btn:hover .sparkle-icon {
  transform: rotate(12deg);
}

.pulse-beacon {
  position: absolute;
  top: -2px;
  right: -2px;
  display: flex;
  width: 12px;
  height: 12px;
}

.beacon-ping {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-gold);
  border-radius: 50%;
  opacity: 0.75;
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.beacon-dot {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--color-gold);
  border-radius: 50%;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

/* Modal */
.oracle-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1001;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 100px 30px;
}

.oracle-modal {
  width: 320px;
  height: 480px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.2);
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
}

.oracle-header {
  padding: 1rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(212, 175, 55, 0.05);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-text {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--color-gold);
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #fff;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem 0;
}

.empty-state {
  text-align: center;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.suggested-queries {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.query-chip {
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 4px;
  padding: 0.75rem 1rem;
  color: var(--color-gold);
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.query-chip:hover {
  background: rgba(212, 175, 55, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
}

.message-wrapper {
  display: flex;
}

.user-msg { justify-content: flex-end; }
.assistant-msg { justify-content: flex-start; }

.message-bubble {
  max-width: 85%;
  padding: 0.75rem 1rem;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  line-height: 1.6;
}

.gold-bubble {
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  color: var(--color-gold);
}

.obsidian-bubble {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.8);
}

.typing-indicator {
  display: flex;
  gap: 0.3rem;
  padding: 0.5rem;
}

.typing-indicator .dot {
  width: 3px;
  height: 3px;
  background: var(--color-gold);
  border-radius: 50%;
  animation: typing 1s infinite alternate;
}

.typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  from { opacity: 0.2; transform: translateY(0); }
  to { opacity: 1; transform: translateY(-2px); }
}

.input-form {
  padding: 1rem;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
}

.input-wrapper {
  position: relative;
}

.oracle-input {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: #fff;
  text-transform: uppercase;
  outline: none;
  transition: border-color 0.3s;
}

.oracle-input:focus {
  border-color: var(--color-gold);
}

.submit-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-gold);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 1;
}

.submit-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .oracle-trigger-wrapper {
    right: 20px;
    bottom: 100px;
  }
  .oracle-modal-overlay {
    padding: 20px;
  }
  .oracle-modal {
    width: calc(100vw - 40px);
    height: 60vh;
  }
}
/* Tool Invocations */
.tool-invocations {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.artifact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.75rem;
}

.mini-card {
  padding: 0.5rem;
  background: rgba(255,255,255,0.02);
  border-radius: 4px;
}

.mini-card img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.mini-title {
  font-size: 0.55rem;
  letter-spacing: 0.05em;
  line-height: 1.2;
  margin-bottom: 0.25rem;
  height: 2.4em;
  overflow: hidden;
}

.mini-price {
  font-size: 0.6rem;
  color: var(--color-gold);
}

.mini-link {
  display: block;
  margin-top: 0.5rem;
  padding: 0.25rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  text-align: center;
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  color: var(--color-gold);
}

.cart-action {
  margin-top: 0.5rem;
}

.btn-acquire-mini {
  width: 100%;
  padding: 0.75rem;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.btn-acquire-mini:hover {
  background: var(--color-gold);
  color: #000;
}

.success-text {
  color: #4ade80;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
</style>
