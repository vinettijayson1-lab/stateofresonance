<script setup lang="ts">
import FrequencyQuiz from '../components/FrequencyQuiz.vue'
</script>

<template>
  <div class="quiz-view">
    <div class="container">
      <FrequencyQuiz />
    </div>
  </div>
</template>

<style scoped>
.quiz-view {
  min-height: 100dvh;
  padding: 120px 0 80px;
  background: var(--color-obsidian);
  position: relative;
  display: flex;
  align-items: center;
}

.quiz-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 70%);
  pointer-events: none;
}
</style>
