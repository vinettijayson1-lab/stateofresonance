import { createApp } from 'vue'
import { createPinia } from 'pinia'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { currencyStore } from './store/currency'

// Register GSAP Plugins (Synchronicity Lockdown)
gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)

// --- GLOBAL CALIBRATION (Phase 6) ---
const userLocale = localStorage.getItem('user-locale') || 'en'
const userCurrency = localStorage.getItem('user-currency')
if (!userCurrency) {
  if (userLocale === 'fr') {
    currencyStore.setCurrency('EUR')
  } else {
    currencyStore.setCurrency('CAD')
  }
}

app.mount('#app')
