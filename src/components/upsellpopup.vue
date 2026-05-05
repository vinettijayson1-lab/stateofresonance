<template>
  <Teleport to="body">
    <transition name="upsell-fade">
      <div v-if="isOpen" class="upsell-overlay" @click.self="close">
        <div class="upsell-modal">
          <button @click="close" class="upsell-close">✕</button>
          
          <div class="upsell-header">
            <span class="upsell-checkmark">✓</span>
            <h3>Added to Bag!</h3>
            <p class="upsell-subtitle">Complete your resonance</p>
          </div>

          <div class="upsell-product">
            <img :src="upsellItem.image" :alt="upsellItem.title" @error="$event.target.src = '/images/lookbook/lookbook-hero.jpg'" />
            <div class="upsell-details">
              <h4>{{ upsellItem.title }}</h4>
              <p class="upsell-description">{{ upsellItem.description }}</p>
              <div class="upsell-price-row">
                <span class="upsell-price">{{ upsellItem.price }}</span>
                <span class="upsell-badge">Perfect Match</span>
              </div>
            </div>
          </div>

          <div class="upsell-actions">
            <button @click="addUpsell" class="btn-upsell-yes">
              Add to Bag — {{ upsellItem.price }}
            </button>
            <button @click="close" class="btn-upsell-no">
              No Thanks
            </button>
          </div>

          <p class="upsell-trust">
            🚚 Free shipping $110+ • ↩️ 30-day returns
          </p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cart } from '../store/cart'

interface UpsellItem {
  id: string
  title: string
  description: string
  price: string
  image: string
  handle: string
  variantId: string
}

const props = defineProps<{
  isOpen: boolean
  triggerProduct?: any
}>()

const emit = defineEmits<{
  close: []
}>()

// Upsell rules - customize these for your products
const upsellRules: Record<string, UpsellItem> = {
  'hoodie': {
    id: 'gid://shopify/Product/8265649488023',
    variantId: 'gid://shopify/ProductVariant/44464521773207',
    title: 'The Foundation Tee',
    description: 'Essential base layer. Pairs perfectly with your new piece.',
    price: '$45.00',
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/ghost-and-bones-resonance-base-t-shirt-3967446.png?v=1777596426',
    handle: 'ghost-and-bones-resonance-base-t-shirt'
  },
  'tee': {
    id: 'gid://shopify/Product/8265634218135',
    variantId: 'gid://shopify/ProductVariant/44464469557399',
    title: 'Ghost & Bones Hoodie',
    description: 'Elevate your frequency. Premium heavyweight construction.',
    price: '$120.00',
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/ghost-and-bones-hoodie-4032470.png?v=1777596426',
    handle: 'ghost-and-bones-hoodie'
  }
}

const upsellItem = computed(() => {
  if (!props.triggerProduct) return upsellRules['hoodie']
  
  const title = props.triggerProduct.title?.toLowerCase() || ''
  
  if (title.includes('hoodie') || title.includes('crewneck')) {
    return upsellRules['hoodie']
  }
  
  if (title.includes('tee') || title.includes('t-shirt')) {
    return upsellRules['tee']
  }
  
  return upsellRules['hoodie']
})

const addUpsell = () => {
  const item = {
    id: upsellItem.value.id,
    title: upsellItem.value.title,
    price: upsellItem.value.price,
    image: upsellItem.value.image,
    handle: upsellItem.value.handle,
    variantId: upsellItem.value.variantId
  }
  
  cart.add(item, 1)
  
  // Track upsell conversion
  if ((window as any).fbq) {
    const rawId = item.variantId.split('/').pop() || item.variantId;
    (window as any).fbq('track', 'AddToCart', {
      content_name: item.title,
      content_ids: [rawId],
      content_type: 'product',
      value: parseFloat(item.price.replace(/[^0-9.]/g, '')),
      currency: 'CAD'
    })
  }
  
  close()
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.upsell-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.upsell-modal {
  background: #0a0a0a;
  border: 1px solid rgba(212, 175, 55, 0.3);
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.upsell-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s;
}

.upsell-close:hover {
  color: var(--color-gold);
}

.upsell-header {
  text-align: center;
  margin-bottom: 2rem;
}

.upsell-checkmark {
  display: inline-block;
  width: 60px;
  height: 60px;
  background: var(--color-gold);
  color: #000;
  border-radius: 50%;
  font-size: 2rem;
  line-height: 60px;
  margin-bottom: 1rem;
  font-weight: bold;
}

.upsell-header h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-heading);
}

.upsell-subtitle {
  font-size: 0.8rem;
  color: var(--color-gold-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.upsell-product {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
}

.upsell-product img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0;
}

.upsell-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.upsell-details h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.upsell-description {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.upsell-price-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.upsell-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-gold);
}

.upsell-badge {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
  padding: 0.25rem 0.6rem;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  border: 1px solid rgba(74, 222, 128, 0.3);
  text-transform: uppercase;
}

.upsell-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.btn-upsell-yes {
  background: var(--color-gold);
  color: #000;
  border: none;
  padding: 1.2rem;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-upsell-yes:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.btn-upsell-no {
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.6);
  padding: 0.9rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  z-index: 10;
  pointer-events: auto;
}

.btn-upsell-no:hover {
  border-color: var(--color-gold-muted);
  color: var(--color-gold-muted);
}

.upsell-trust {
  text-align: center;
  font-size: 0.65rem;
  opacity: 0.5;
  margin: 0;
}

.upsell-fade-enter-active,
.upsell-fade-leave-active {
  transition: opacity 0.3s;
}

.upsell-fade-enter-from,
.upsell-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .upsell-modal {
    padding: 1.5rem;
  }
  
  .upsell-product {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .upsell-product img {
    width: 150px;
    height: 150px;
  }
}
</style>
