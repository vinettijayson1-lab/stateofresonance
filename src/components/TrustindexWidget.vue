<template>
  <div ref="container" class="trustindex-widget-instance"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  src: string
}>()

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  // We use a slight delay to ensure the DOM is fully rendered and layout is stable
  setTimeout(() => {
    if (container.value) {
      const s = document.createElement('script')
      s.src = props.src
      s.async = true
      s.defer = true
      // Append directly to the container so Trustindex's DOM scanner finds it exactly here
      container.value.appendChild(s)
    }
  }, 100)
})
</script>

<style scoped>
.trustindex-widget-instance {
  display: inline-block;
  min-height: 20px;
  min-width: 100px;
}
</style>
