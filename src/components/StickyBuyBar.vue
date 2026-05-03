<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cart } from '../store/cart'

const props = defineProps<{
  product: any
  selectedVariant: any
  shopifyUrl: string
}>()

const isVisible = ref(false)

const handleScroll = () => {
  // Show bar when user has scrolled past the main buy section (~500px)
  // Lower threshold ensures it appears before they scroll too far
  isVisible.value = window.scrollY > 500 && window.innerWidth < 900
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const addToCart = () => {
  cart.add({
    ...props.product,
    price: props.selectedVariant?.price || props.product.price,
    variantId: props.selectedVariant?.id || props.product.variantId
  })
  cart.isOpen = true
}
</script>

<template>
  <Transition name="slide-up">
    <div v-if="isVisible" class="sticky-buy-bar glass">
      <div class="sticky-content">
        <div class="sticky-info">
          <img :src="product.image" :alt="product.title" class="sticky-img" />
          <div class="sticky-text">
            <p class="sticky-title">{{ product.title }}</p>
            <p class="sticky-price gold-text">{{ selectedVariant?.price || product.price }}</p>
          </div>
        </div>
        <div class="sticky-actions" v-if="selectedVariant?.available !== false && product.available !== false">
           <button @click="addToCart" class="btn-premium" style="flex: 1;">RESERVOIR</button>
           <a :href="shopifyUrl" @click="addToCart" class="btn-acquire animate-glint" style="flex: 2; padding: 0.6rem; font-size: 0.6rem;">ACQUIRE NOW</a>
        </div>
        <div class="sticky-actions" v-else>
           <button disabled class="btn-premium" style="flex: 1; opacity: 0.5;">RETURNED TO SOURCE (ALL OUT)</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.sticky-buy-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  padding-bottom: max(1.5rem, calc(1rem + env(safe-area-inset-bottom))); /* iOS notch fix */
  z-index: 1000;
  border-top: 1px solid rgba(255,255,255,0.08);
  background: rgba(5, 5, 8, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.sticky-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.sticky-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sticky-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,0.1);
}

.sticky-title {
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.sticky-price {
  font-size: 0.7rem;
  font-weight: bold;
}

.sticky-actions {
  display: flex;
  gap: 0.5rem;
}

.sticky-actions button, .sticky-actions a {
  padding: 0.6rem 1rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

@media (min-width: 901px) {
  .sticky-buy-bar { display: none; }
}
</style>
