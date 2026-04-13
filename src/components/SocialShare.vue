<template>
  <div class="social-share-cluster">
    <span class="share-label">— RESONATE THIS ARTIFACT —</span>
    <div class="share-links">
      <a :href="whatsappUrl" target="_blank" class="share-icon" aria-label="Share on WhatsApp">
        <MessageCircle :size="18" />
      </a>
      <a :href="xUrl" target="_blank" class="share-icon" aria-label="Share on X">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <a :href="pinterestUrl" target="_blank" class="share-icon" aria-label="Share on Pinterest">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.305 2.605 7.992 6.32 9.57-.088-.81-.167-2.053.034-2.936.182-.796 1.173-4.975 1.173-4.975s-.299-.599-.299-1.484c0-1.388.805-2.425 1.808-2.425.853 0 1.264.64 1.264 1.407 0 .858-.546 2.14-.828 3.328-.235.992.499 1.802 1.477 1.802 1.772 0 3.134-1.869 3.134-4.568 0-2.388-1.716-4.06-4.169-4.06-2.841 0-4.508 2.131-4.508 4.333 0 .858.33 1.778.742 2.278.081.099.093.187.069.285-.075.315-.245.998-.278 1.137-.044.183-.145.222-.335.134-1.252-.583-2.034-2.413-2.034-3.883 0-3.161 2.297-6.064 6.622-6.064 3.477 0 6.178 2.478 6.178 5.788 0 3.454-2.177 6.233-5.198 6.233-1.015 0-1.97-.526-2.297-1.151l-.625 2.381c-.225.867-.833 1.954-1.241 2.617a10.28 10.28 0 0 0 2.898.414c5.672 0 10.289-4.617 10.289-10.289C22.578 6.617 17.961 2 12.289 2z"/>
        </svg>
      </a>
      <button @click="copyLink" class="share-icon" aria-label="Copy Link">
        <Link :size="18" />
      </button>
    </div>
    <Transition name="fade">
      <div v-if="copied" class="copy-success gold-text">SYSTEM LINK COPIED</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MessageCircle, Link } from 'lucide-vue-next'

const props = defineProps<{
  title: string
  image?: string
}>()

const url = computed(() => window.location.href)
const encodedUrl = computed(() => encodeURIComponent(url.value))
const encodedTitle = computed(() => encodeURIComponent(props.title))
const encodedImg = computed(() => encodeURIComponent(props.image || ''))

const xUrl = computed(() => `https://twitter.com/intent/tweet?text=${encodedTitle.value}&url=${encodedUrl.value}`)
const whatsappUrl = computed(() => `https://api.whatsapp.com/send?text=${encodedTitle.value} ${encodedUrl.value}`)
const pinterestUrl = computed(() => `https://pinterest.com/pin/create/button/?url=${encodedUrl.value}&media=${encodedImg.value}&description=${encodedTitle.value}`)

const copied = ref(false)
const copyLink = () => {
  navigator.clipboard.writeText(url.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<style scoped>
.social-share-cluster {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.share-label {
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  opacity: 0.4;
  text-transform: uppercase;
}

.share-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.share-icon {
  color: rgba(255,255,255,0.5);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.share-icon:hover {
  color: var(--color-gold);
  transform: translateY(-3px);
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
}

.copy-success {
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  font-weight: 600;
  animation: breathe 2s infinite;
}

@keyframes breathe {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
