import { createI18n } from 'vue-i18n'
import en from '../locales/en_v4.json'
import fr from '../locales/fr_v4.json'

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: typeof window !== 'undefined' ? (localStorage.getItem('user-locale') || 'en') : 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})

export default i18n
