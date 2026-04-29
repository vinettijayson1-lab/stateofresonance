<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  src: string
}>()

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  if (container.value && props.src) {
    const s = document.createElement('script')
    s.src = props.src
    s.async = true
    s.defer = true
    container.value.appendChild(s)
  }
})
</script>

<template>
  <div class="trustindex-widget-instance" ref="container"></div>
</template>

<style scoped>
.trustindex-widget-instance {
  display: inline-block;
  min-height: 20px;
  min-width: 20px;
}
</style>
