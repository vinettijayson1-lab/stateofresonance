<template>
  <div class="locker-container">
    <div class="locker-box">
      <h1 class="brand-title">STATE OF RESONANCE</h1>
      <p class="subtitle">System locked for stabilization</p>
      <input 
        v-model="password" 
        @keyup.enter="unlock" 
        type="password" 
        placeholder="Enter Override Sequence" 
        class="locker-input"
        autocomplete="off"
        autofocus
      />
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const error = ref('')

const unlock = () => {
  if (password.value === 'Alphazero!') {
    localStorage.setItem('sor_master_unlock', 'active')
    router.push({ name: 'Alchemist' })
  } else {
    error.value = 'ACCESS DENIED'
    password.value = ''
    setTimeout(() => { error.value = '' }, 2000)
  }
}
</script>

<style scoped>
.locker-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100vw;
  background-color: #030303;
  color: #fff;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: 0.1em;
}

.locker-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
}

.brand-title {
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
}

.subtitle {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.locker-input {
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  font-size: 0.9rem;
  text-align: center;
  outline: none;
  transition: all 0.3s ease;
  letter-spacing: 0.2em;
}

.locker-input:focus {
  border-color: #888;
}

.error-msg {
  color: #ff3333;
  font-size: 0.7rem;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}
</style>
