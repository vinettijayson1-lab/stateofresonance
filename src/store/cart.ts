import { reactive, computed } from 'vue'
import { useResonanceStore } from './resonance'
import { currencyStore } from './currency'
import { klaviyoService } from '../services/klaviyo'

interface CartItem {
  id: string
  title: string
  price: string
  priceValue: number
  image: string
  quantity: number
  handle: string
  variantId: string | null
  variants?: any[]
  extractedId?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  add: (product: any, qty?: number) => void
  remove: (id: string, variantId?: string | null) => void
  updateQuantity: (id: string, delta: number, variantId?: string | null) => void
  total: number
  subtotal: number
  selectedProvince: string
  taxRate: number
  taxAmount: number
  finalTotal: number
  savings: number
  discountTier: { percent: number, code: string | null }
  shippingProgress: number
  nextTierProgress: number
  syncMessage: string
  checkoutUrl: string
  globalResonanceCount: number
  lastManifestation: { name: string, action: string, time: string, isPremium: boolean } | null
  syncToAbandonedReservoir: () => Promise<void>
  clear: () => void
}

export const cart: CartStore = reactive({
  items: [] as CartItem[],
  isOpen: false as boolean,
  
  add(product: any, qty: number = 1) {
    const vid = product.variantId || product.id
    const existing = this.items.find(item => (item.variantId || item.id) === vid)
    if (existing) {
      existing.quantity += qty
    } else {
      const priceValue = parseFloat(product.price.replace(/[^0-9.]/g, ''))
      this.items.push({
        ...product,
        priceValue,
        quantity: qty
      })
    }
    this.isOpen = true

    // --- TRACKING ENTRAINMENT (Orion & Meta) ---
    if (typeof window !== 'undefined') {
      const priceVal = parseFloat(product.price.replace(/[^0-9.]/g, ''))
      
      // Generate Event ID for Deduplication
      const eventId = 'add_' + Math.random().toString(36).substring(2, 16)
      
      // Extract raw catalog ID from gid:// using base product ID (not variant!)
      const baseId = product.id;
      const rawId = typeof baseId === 'string' && baseId.includes('gid://') ? (baseId.split('/').pop() || baseId) : baseId;
      
      // Meta Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', 'AddToCart', {
          content_name: product.title,
          content_ids: [rawId],
          content_type: 'product',
          value: priceVal * (currencyStore.rates[currencyStore.active] || 1),
          currency: currencyStore.active
        }, { eventID: eventId })
      }

      // Meta Server-Side CAPI
      try {
        fetch('/api/marketing/capi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'AddToCart',
            eventId: eventId,
            eventSourceUrl: window.location.href,
            user: { email: localStorage.getItem('sor_seeker_email') || undefined },
            customData: {
              currency: currencyStore.active,
              value: priceVal * (currencyStore.rates[currencyStore.active] || 1),
              contents: [{
                id: rawId,
                name: product.title,
                quantity: qty,
                price: priceVal * (currencyStore.rates[currencyStore.active] || 1)
              }]
            }
          })
        })
      } catch (e) {
        console.error('CAPI AddToCart Intercept Failed')
      }

      // TikTok Pixel
      if ((window as any).ttq) {
        (window as any).ttq.track('AddToCart', {
          contents: [{
             content_id: rawId,
             content_name: product.title,
             quantity: 1,
             price: priceVal * (currencyStore.rates[currencyStore.active] || 1)
          }],
          content_type: 'product',
          value: priceVal * (currencyStore.rates[currencyStore.active] || 1),
          currency: currencyStore.active
        });
      }

      // GA4
      if ((window as any).gtag) {
        (window as any).gtag('event', 'add_to_cart', {
          currency: currencyStore.active,
          value: priceVal * (currencyStore.rates[currencyStore.active] || 1),
          items: [{
            item_id: rawId,
            item_name: product.title,
            price: priceVal * (currencyStore.rates[currencyStore.active] || 1),
            quantity: 1
          }]
        });
      }

      // Klaviyo
      klaviyoService.trackAddedToCart({
        "Name": product.title,
        "Categories": [product.category],
        "ImageURL": product.image,
        "URL": window.location.href,
        "Brand": "State of Resonance",
        "Price": priceVal * (currencyStore.rates[currencyStore.active] || 1),
        "Currency": currencyStore.active,
        "VariantID": vid,
        "ProductID": rawId 
      });
    }
    
    this.syncToAbandonedReservoir();
  },
  
  remove(id: string, variantId?: string | null) {
    this.items = this.items.filter(item => !(item.id === id && item.variantId === (variantId || null)))
    this.syncToAbandonedReservoir();
  },
  
  updateQuantity(id: string, delta: number, variantId?: string | null) {
    const item = this.items.find(item => item.id === id && item.variantId === (variantId || null))
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) this.remove(id, variantId)
      else this.syncToAbandonedReservoir()
    }
  },
  
  total: computed(() => {
    return cart.items.reduce((sum: number, item: CartItem) => sum + (item.priceValue * item.quantity), 0)
  }) as unknown as number,

  discountTier: computed(() => {
    // 1. Check for Membership Discount (New in Phase 5)
    const resonance = useResonanceStore()
    const memberDisc = resonance.memberDiscount

    // 2. Check for Event Discount (High Priority)
    const activeEvent = typeof window !== 'undefined' ? localStorage.getItem('sor_active_event') : null
    const eventDiscount = typeof window !== 'undefined' ? localStorage.getItem('sor_event_discount') : null
    
    if (activeEvent === 'sync_event_2026' && eventDiscount) {
      return { percent: Math.max(15, memberDisc * 100), code: eventDiscount }
    }

    // 3. Multi-buy Discount
    const count = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
    let multiPercent = 0
    let multiCode = null
    if (count >= 3) { multiPercent = 10; multiCode = 'ALIGN10' }
    else if (count >= 2) { multiPercent = 5; multiCode = 'ALIGN5' }

    // Return the highest applicable discount
    const finalPercent = Math.max(multiPercent, memberDisc * 100)
    const finalCode = finalPercent === 0 ? null : (multiPercent >= memberDisc * 100 ? multiCode : `MEMBER_${resonance.tier}`)

    return { percent: finalPercent, code: finalCode }
  }) as unknown as { percent: number, code: string | null },

  savings: computed(() => {
    return cart.total * (cart.discountTier.percent / 100)
  }) as unknown as number,

  subtotal: computed(() => {
    return cart.total - cart.savings
  }) as unknown as number,

  selectedProvince: 'International' as string,

  taxRate: computed(() => {
    const provinceMapping: Record<string, number> = {
      'AB': 0.05, 'NT': 0.05, 'NU': 0.05, 'YT': 0.05,
      'BC': 0.12,
      'MB': 0.12,
      'NB': 0.15, 'NL': 0.15, 'NS': 0.15, 'PE': 0.15,
      'ON': 0.13,
      'QC': 0.14975,
      'SK': 0.11,
      'International': 0
    }
    return provinceMapping[cart.selectedProvince] || 0
  }) as unknown as number,

  taxAmount: computed(() => {
    if (cart.selectedProvince === 'International') return 0
    return cart.subtotal * cart.taxRate
  }) as unknown as number,

  finalTotal: computed(() => {
    return cart.subtotal + cart.taxAmount
  }) as unknown as number,

  shippingProgress: computed(() => {
    const threshold = 110
    const progress = (cart.total / threshold) * 100
    return Math.min(progress, 100)
  }) as unknown as number,

  nextTierProgress: computed(() => {
    const count = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
    if (count === 0) return 0
    if (count === 1) return 50 // Halfway to 1st tier (2 items)
    if (count === 2) return 66 // 2/3 to 2nd tier (3 items)
    return 100
  }) as unknown as number,

  syncMessage: computed(() => {
    const count = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
    if (count === 0) return 'YOUR FREQUENCY IS SILENT'
    if (count === 1) return 'ADD 1 MORE ARTIFACT FOR THE 5% ALIGNMENT REWARD'
    if (count === 2) return 'ADD 1 MORE ARTIFACT FOR THE 10% ALIGNMENT REWARD'
    return 'MAXIMUM RESONANCE ACHIEVED'
  }) as unknown as string,

  checkoutUrl: computed(() => {
    if (cart.items.length === 0) return '#'
    
    // Deep Variant Extraction: Pull valid numeric Shopify IDs securely.
    const validItems = cart.items.map(item => {
      let id = item.variantId || item.id;
      
      // Extract numeric base from gid string
      if (typeof id === 'string' && id.includes('gid://')) {
        id = id.split('/').pop() || id;
      }

      // If missing or non-numeric, try fallback
      if (!id || (typeof id === 'string' && !/^\d+$/.test(id))) {
        id = item.variants?.[0]?.id || item.id;
        if (typeof id === 'string' && id.includes('gid://')) {
          id = id.split('/').pop() || id;
        }
      }
      
      return { ...item, extractedId: id ? String(id) : '' };
    }).filter(item => item.extractedId && /^\d+$/.test(item.extractedId))

    if (validItems.length > 0) {
      const itemStr = validItems.map(item => `${item.extractedId}:${item.quantity}`).join(',')
      const baseUrl = `https://state-of-resonance.myshopify.com/cart/${itemStr}`
      
      let finalUrl = baseUrl

      // --- Affiliate Meta-Routing Protocol ---
      let affiliateTag = null
      if (typeof window !== 'undefined') {
        affiliateTag = localStorage.getItem('sor_active_affiliate')
      }

      const queryParams = new URLSearchParams()

      // If active affiliate, FORCE their unique discount code + tracking attributes.
      // Else, use the user's natural cart discount tier.
      if (affiliateTag) {
        queryParams.append('discount', affiliateTag)
        queryParams.append('attributes[affiliate]', affiliateTag)
      } else if (cart.discountTier.code) {
        queryParams.append('discount', cart.discountTier.code)
      }

      if ([...queryParams].length > 0) {
        finalUrl += `?${queryParams.toString()}`
      }
      return finalUrl
    }

    const first = cart.items[0]
    return `https://state-of-resonance.myshopify.com/products/${first.handle}`
  }) as unknown as string,

  globalResonanceCount: 963,
  lastManifestation: null as any,
  
  async syncToAbandonedReservoir() {
    if (typeof window === 'undefined' || this.items.length === 0) return;

    // Get or Create Persistent Cart ID
    let cartId = localStorage.getItem('sor_cart_id');
    if (!cartId) {
      cartId = 'CRT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem('sor_cart_id', cartId);
    }

    try {
      // 1. Local Database Sync (Prisma)
      await fetch('/api/marketing/abandoned-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: cartId,
          items: this.items,
          totalValue: this.subtotal,
          seekerEmail: localStorage.getItem('sor_seeker_email') || null
        })
      });

      // 2. Klaviyo "Omniscience" Sync
      klaviyoService.trackCartSync({
        CartID: cartId,
        Items: this.items.map(item => ({
          ProductID: item.id,
          SKU: item.variantId || item.id,
          ProductName: item.title,
          Quantity: item.quantity,
          ItemPrice: item.priceValue * (currencyStore.rates[currencyStore.active] || 1),
          RowTotal: item.priceValue * item.quantity * (currencyStore.rates[currencyStore.active] || 1),
          ImageURL: item.image
        })),
        TotalValue: this.subtotal * (currencyStore.rates[currencyStore.active] || 1),
        Currency: currencyStore.active
      });
    } catch (err) {
      console.error('Abandoned Reservoir Sync Error:', err);
    }
  },

  clear() {
    this.items = []
  }
})

// --- GLOBAL RESONANCE SYNCHRONIZATION ---
if (typeof window !== 'undefined') {
  // Simulate live manifestation activity
  setInterval(() => {
    if (Math.random() > 0.8) {
      cart.globalResonanceCount++
      
      // Update lastManifestation for the feed
      const names = ['J.V.', 'A.K.', 'R.T.', 'M.B.', 'S.L.', 'D.N.', 'C.F.', 'K.Y.', 'L.M.', 'X.Z.']
      const regions = ['Toronto', 'Montréal', 'Vancouver', 'Ottawa', 'Calgary', 'London', 'New York', 'Paris', 'Tokyo', 'Berlin']
      const actions = [
        'acquired the Omniscience Artifact', 
        'calibrated their frequency (963Hz)', 
        'joined the Inner Circle Reservoir', 
        'manifested a Sigil Hoodie', 
        'synchronized with the Void',
        'attained Adept status',
        'acquired the Alchemist Layer',
        'unlocked the Final Frequency'
      ]
      
      const nameIndex = Math.floor(Math.random() * names.length)
      const regionIndex = Math.floor(Math.random() * regions.length)
      const actionIndex = Math.floor(Math.random() * actions.length)
      
      const name = names[nameIndex]
      const region = regions[regionIndex]
      const action = actions[actionIndex]
      const isPremium = action.includes('Omniscience') || action.includes('Inner Circle') || action.includes('Final Frequency')
      
      cart.lastManifestation = {
        name: `${name} in ${region}`,
        action,
        time: 'Just now',
        isPremium
      }
    }
  }, 12000)
}

