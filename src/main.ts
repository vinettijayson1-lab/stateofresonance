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

import * as Sentry from '@sentry/vue'

const app = createApp(App)

// Initialize Sentry Analytics Guard
Sentry.init({
  app,
  dsn: "https://463e372e93b4df24a0ed40bc5c84f981@o4511226580959232.ingest.us.sentry.io/4511226583580672",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, 
  // Session Replay
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0, 
});

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
