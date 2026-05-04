import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.vue'
import { routes, setupRouterGuards } from './router'
import i18n from './i18n'
import { currencyStore } from './store/currency'

import * as Sentry from '@sentry/vue'
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Register GSAP Plugins (Synchronicity Lockdown)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const createApp = ViteSSG(
  App,
  { 
    routes,
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      else return { top: 0, behavior: 'auto' }
    }
  },
  ({ app, router, isClient }) => {
    app.use(createPinia())
    app.use(i18n)

    setupRouterGuards(router)

    if (isClient) {
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
        tracesSampleRate: 1.0, 
        replaysSessionSampleRate: 0.1, 
        replaysOnErrorSampleRate: 1.0, 
      });

      injectAnalytics();
      injectSpeedInsights();

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
    }
  }
)
