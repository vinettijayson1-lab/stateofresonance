import { reactive } from 'vue'

export type CurrencyCode = 'CAD' | 'USD' | 'EUR'

interface CurrencyStore {
  active: CurrencyCode
  rates: Record<CurrencyCode, number>
  symbols: Record<CurrencyCode, string>
  setCurrency: (code: CurrencyCode) => void
  formatPrice: (cadValue: number) => string
}

export const currencyStore: CurrencyStore = reactive({
  active: (typeof window !== 'undefined' ? localStorage.getItem('user-currency') as CurrencyCode : null) || 'CAD',
  
  // Base is CAD (1.0)
  rates: {
    CAD: 1.0,
    USD: 0.74,
    EUR: 0.70
  },

  symbols: {
    CAD: '$',
    USD: '$',
    EUR: '€'
  },

  setCurrency(code: CurrencyCode) {
    this.active = code
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-currency', code)
    }
  },

  formatPrice(cadValue: number) {
    const converted = cadValue * this.rates[this.active]
    const symbol = this.symbols[this.active]
    
    // Format based on currency standards
    if (this.active === 'EUR') {
      return `${converted.toFixed(2)} ${symbol} ${this.active}`
    }
    
    return `${symbol}${converted.toFixed(2)} ${this.active}`
  }
})
