<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { cart } from '../store/cart'

let fired = false

const onMouseOut = (e: MouseEvent) => {
  if (fired) return
  if (e.clientY <= 5) {
    if (sessionStorage.getItem('sor_exit_shown')) return
    
    fired = true
    sessionStorage.setItem('sor_exit_shown', '1')
    
    if (cart.items.length > 0) {
      // The Seeker has items loaded.
      window.dispatchEvent(new CustomEvent('summon-oracle', { 
        detail: { systemMessage: "Seeker, you left an artifact in the void. What is holding back your synchronization?" } 
      }))
    } else {
      // The Seeker has no items loaded.
      window.dispatchEvent(new CustomEvent('summon-oracle', { 
        detail: { systemMessage: "Seeker, the sanctuary remains open. What frequency are you searching for?" } 
      }))
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('mouseleave', onMouseOut)
  }, 10000) // Delay the trigger slightly so it doesn't fire aggressively upon initial load
})

onUnmounted(() => document.removeEventListener('mouseleave', onMouseOut))

</script>

<template>
  <!-- UI Deprecated per strict brand restructuring. The tracker lives purely to summon The Oracle via the central Event Bus. -->
</template>
