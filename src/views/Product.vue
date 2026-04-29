<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cart } from '../store/cart'
import { useResonanceStore } from '../store/resonance'
import { klaviyoService } from '../services/klaviyo'
import gsap from 'gsap'
import ProductCard from '../components/ProductCard.vue'
import StickyBuyBar from '../components/StickyBuyBar.vue'
import TrustindexWidget from '../components/TrustindexWidget.vue'

import SocialShare from '../components/SocialShare.vue'
import { currencyStore } from '../store/currency'
import ProductReviews from '../components/ProductReviews.vue'
import { Sparkles, Zap, Shield, HelpCircle } from 'lucide-vue-next'

interface Variant {
  id: string
  title: string
  price: string
  available: boolean
  options: string[]
  image?: { src: string }
}

interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
  type: string
  description: string
  variantId: string | null
  available: boolean
  variants: Variant[]
  images: string[]
  modelImage?: string | null
  options: { name: string, position: number, values: string[] }[]
  metadata?: any
  inventory_quantity?: number
  collections?: { handle: string }[]
}

const route = useRoute()
const router = useRouter()
const resonance = useResonanceStore()
const product = ref<Product | null>(null)
const loading = ref(true)
const acquiring = ref(false)
const isUnlocked = ref(localStorage.getItem('sor_inner_circle') === 'true')
const accessCode = ref('')
const accessEmail = ref('')
const accessError = ref('')
const subLoading = ref(false)
const subSuccess = ref(false)

const unlockAccess = () => {
  const code = accessCode.value.toUpperCase().replace(/\s/g, '')
  if (code === 'RESONANCE963' || code === 'MASTER_963') {
    isUnlocked.value = true
    localStorage.setItem('sor_inner_circle', 'true')
    // Meta Pixel: Lead event for member unlock
    if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'Inner Circle Unlock' })
  } else {
    accessError.value = 'FREQUENCY MISMATCH'
  }
}

const requestAccess = async () => {
  if (!accessEmail.value.includes('@')) {
    accessError.value = 'INVALID SIGNAL'
    return
  }
  
  subLoading.value = true
  accessError.value = ''
  
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: accessEmail.value,
        source: 'Product Access Request'
      })
    })
    
    if (res.ok) {
      subSuccess.value = true
    } else {
      throw new Error('Signal lost')
    }
  } catch (err) {
    accessError.value = 'SYNCHRONIZATION ERROR'
  } finally {
    subLoading.value = false
  }
}

// Gallery State
const currentImage = ref('')
const showModel = ref(false)

const setMainImage = (img: string) => {
  currentImage.value = img
  showModel.value = false
}

const toggleModelView = () => {
  if (!product.value?.modelImage) return
  showModel.value = !showModel.value
  
  // Transition effect
  gsap.fromTo('.main-img-wrapper img', 
    { opacity: 0.4, scale: 0.98 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' }
  )
}

// Variant Selection State
const selectedOptions = ref<Record<string, string>>({})
const userSelected = ref<string[]>([]) // Tracks options the user explicitly clicked
const sizeError = ref(false)
const quantity = ref(1)

const addToCartWithQty = () => {
  if (!product.value) return

  // Guard: require explicit size selection if product has a Size option
  const sizeOpt = product.value.options?.find((o: any) => o.name === 'Size')
  if (sizeOpt && !userSelected.value.includes('Size')) {
    sizeError.value = true
    // Clear error after 3s
    setTimeout(() => { sizeError.value = false }, 3000)
    // Scroll to variant selector
    document.querySelector('.variant-selectors')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    return
  }

  sizeError.value = false
  const item = { ...product.value }
  const variant = selectedVariant.value
  
  if (variant) {
    item.variantId = variant.id
    item.image = variant.image?.src || item.image
    item.price = variant.price
  }
  
  // Use member discount price if unlocked
  if (memberPrice.value) {
    item.price = memberPrice.value
  }
  
  cart.add(item, quantity.value)
  
}

const selectedVariant = computed(() => {
  if (!product.value || !product.value.variants) return null
  return product.value.variants.find(v => {
    if (!v.options) return false;
    return v.options.every((opt, idx) => {
      const optName = product.value?.options[idx]?.name
      return optName && selectedOptions.value[optName] === opt
    })
  }) || product.value.variants[0]
})

const isAvailable = computed(() => {
  if (!product.value) return false
  if (selectedVariant.value) return selectedVariant.value.available !== false
  return product.value.available !== false
})

const isOptionAvailable = (optName: string, val: string) => {
  if (!product.value || !product.value.variants) return true;
  const optIdx = product.value.options.findIndex((o: any) => o.name === optName);
  if (optIdx === -1) return true;
  
  // True if ANY variant with this option value is available
  return product.value.variants.some((v: any) => v.options[optIdx] === val && v.available !== false);
}

// Cleaned up metaphysical claims
const memberPrice = computed(() => {
  const basePrice = parseFloat((selectedVariant.value?.price || product.value?.price || '0').replace(/[^0-9.]/g, ''))
  if (resonance.memberDiscount > 0 && isUnlocked.value) {
    const discountedValue = basePrice * (1 - resonance.memberDiscount)
    return currencyStore.formatPrice(discountedValue)
  }
  return null
})

const liveViewers = computed(() => {
  if (!product.value) return 0
  return Math.floor(Math.random() * 12) + 4
})


const remainingStock = computed(() => {
  if (!product.value) return 0
  if (product.value.inventory_quantity !== undefined) return product.value.inventory_quantity
  // Deterministic but "low" (4-14) based on ID
  const val = 4 + (product.value.id.charCodeAt(product.value.id.length - 1) % 11)
  return val
})


const isClothing = computed(() => {
  if (!product.value) return false
  const title = product.value.title.toLowerCase()
  const cat = (product.value.category || '').toLowerCase()
  const type = (product.value.type || '').toLowerCase()
  
  const clothingTerms = ['hoodie', 'tee', 'shirt', 'crewneck', 'sweatshirt', 'attire', 'apparel', 'layer', 'garment']
  const specificCollections = ['the ghost and bones', 'urban esoterica', 'natural alignment']
  
  return clothingTerms.some(term => title.includes(term) || cat.includes(term) || type.includes(term)) || 
         specificCollections.some(col => cat.includes(col))
})

// Build the Shopify checkout URL
const shopifyUrl = computed(() => {
  if (!product.value) return '#'
  let vid = selectedVariant.value?.id || product.value.variantId
  if (vid) {
    if (typeof vid === 'string' && vid.includes('gid://')) {
      vid = vid.split('/').pop() || vid
    }
    return `https://state-of-resonance.myshopify.com/cart/${vid}:1`
  }
  return `https://state-of-resonance.myshopify.com/products/${product.value.handle}`
})

const addToCart = () => {
  if (!product.value) return
  const item = { ...product.value, price: selectedVariant.value?.price || product.value.price, variantId: selectedVariant.value?.id || product.value.variantId }
  cart.add(item)
  // Tracking is now unified in cart.ts
}


const relatedProducts = ref<Product[]>([])

onMounted(async () => {
  try {
    const handle = Array.isArray(route.params.handle) ? route.params.handle[0] : route.params.handle
    const res = await fetch(`/api/products?handle=${handle}`)
    
    if (!res.ok) {
        throw new Error(`API returned status ${res.status}`)
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        console.error("API returned non-JSON response:", contentType);
        // This is a sign of Vite/Vercel fallback to HTML
        throw new Error("Invalid API response (received HTML/JS instead of JSON)");
    }

    const data = await res.json()
    if (data.error) throw new Error("Product data extraction failed: " + data.error)
    product.value = data
    
    // Tier Ad redirection (HIDDEN TO ALLOW COLD TRAFFIC CHECKOUT)
    const minReq = product.value?.metadata?.minResonanceScore || 0
    // if (minReq > resonance.resonancePoints) {
    //   router.push(`/locked?piece=${encodeURIComponent(product.value?.title || '')}`)
    //   return
    // }
    
    // --- KLAVIYO TRACKING (Orion) ---
    if (product.value) {
      klaviyoService.trackViewedProduct({
        "Name": product.value.title,
        "ProductID": product.value.id,
        "Categories": [product.value.category],
        "ImageURL": product.value.image,
        "URL": window.location.href,
        "Brand": "State of Resonance",
        "Price": product.value.price.replace(/[^0-9.]/g, ''),
        "Metadata": {
          "VariantID": product.value.variantId,
          "Type": product.value.type
        }
      });
      
      // Meta Pixel Tracking
      if ((window as any).fbq) {
        // Meta catalogs index by VARIANT ID — use variant as content_ids for catalog matching
        const firstVariantId = product.value.variants?.[0]?.id || product.value.variantId || product.value.id
        const rawVariantId = typeof firstVariantId === 'string' && firstVariantId.includes('gid://')
          ? (firstVariantId.split('/').pop() || firstVariantId)
          : firstVariantId
        const pPrice = parseFloat(product.value.price.replace(/[^0-9.]/g, ''));
        const eventId = 'view_' + Math.random().toString(36).substring(2, 16);
        
        (window as any).fbq('track', 'ViewContent', {
          content_name: product.value.title,
          content_ids: [rawVariantId],
          content_type: 'product_group',
          value: pPrice * (currencyStore.rates[currencyStore.active] || 1),
          currency: currencyStore.active
        }, { eventID: eventId });
        
        // Meta Server-Side CAPI
        try {
          fetch('/api/marketing/capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventName: 'ViewContent',
              eventId: eventId,
              eventSourceUrl: window.location.href,
              user: { email: localStorage.getItem('sor_seeker_email') || undefined },
              customData: {
                currency: currencyStore.active,
                value: pPrice * (currencyStore.rates[currencyStore.active] || 1),
                contents: [{
                  id: rawVariantId,
                  name: product.value.title,
                  quantity: 1,
                  price: pPrice * (currencyStore.rates[currencyStore.active] || 1)
                }]
              }
            })
          })
        } catch (e) {
          console.warn('CAPI ViewContent Intercept Failed')
        }
      }
    }
    
    if (product.value) {
      currentImage.value = product.value.image
      
      // Initialize default options
      if (product.value.options) {
        product.value.options.forEach(opt => {
          selectedOptions.value[opt.name] = opt.values[0]
        })
      }

      // Fetch Related Products
      try {
        const relRes = await fetch(`/api/products?category=${product.value.category}&limit=5`)
        const relData = await relRes.json()
        relatedProducts.value = relData.filter((p: Product) => p.handle !== handle).slice(0, 4)
      } catch (err) {
        console.error('Failed to fetch related products:', err)
      }

      // --- ENHANCED SEO & TRUST SOLIDIFICATION ---
      const pageTitle = `${product.value.title} | State of Resonance`
      const pageDesc = (product.value.description || '').replace(/<[^>]*>/g, '').substring(0, 160) || `${product.value.title} — Esoteric luxury piece.`
      
      document.title = pageTitle
      
      // Update Meta Tags
      const updateMeta = (selector: string, attr: string, val: string) => {
        const el = document.querySelector(selector)
        if (el) el.setAttribute(attr, val)
      }

      updateMeta('meta[name="description"]', 'content', pageDesc)
      updateMeta('meta[property="og:title"]', 'content', pageTitle)
      updateMeta('meta[property="og:description"]', 'content', pageDesc)
      if (product.value.image) updateMeta('meta[property="og:image"]', 'content', product.value.image)
      updateMeta('meta[property="og:url"]', 'content', window.location.href)

      // Inject Product structured data (Schema.org) + aggregateRating from Judge.me
      const price = product.value.price.replace(/[^0-9.]/g, '')

      const injectSchema = (ratingValue?: number, reviewCount?: number) => {
        const schemaBase: Record<string, any> = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.value!.title,
          image: product.value!.images || [product.value!.image],
          description: (product.value!.description || '').replace(/<[^>]*>/g, ''),
          brand: { '@type': 'Brand', name: 'State of Resonance' },
          category: product.value!.category,
          sku: product.value!.id,
          mpn: product.value!.variantId || product.value!.id,
          offers: {
            '@type': 'Offer',
            url: window.location.href,
            priceCurrency: 'CAD',
            price: price,
            priceValidUntil: '2026-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: product.value!.available !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: { '@type': 'Organization', name: 'State of Resonance' },
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: 'CA',
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnPeriod',
              merchantReturnDays: 30,
              returnMethod: 'https://schema.org/ReturnByMail',
              returnFees: 'https://schema.org/FreeReturn'
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'CAD' },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'd' },
                transitTime: { '@type': 'ShippingDeliveryTime', minValue: 5, maxValue: 10, unitCode: 'd' }
              }
            }
          }
        }

        // Inject aggregateRating only when we have real data from Judge.me
        if (ratingValue && reviewCount && reviewCount > 0) {
          schemaBase.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: ratingValue.toFixed(1),
            reviewCount: reviewCount,
            bestRating: 5,
            worstRating: 1
          }
        }

        let schemaEl = document.getElementById('ld-product')
        if (schemaEl) {
          schemaEl.textContent = JSON.stringify(schemaBase)
        } else {
          const s = document.createElement('script')
          s.type = 'application/ld+json'
          s.id = 'ld-product'
          s.textContent = JSON.stringify(schemaBase)
          document.head.appendChild(s)
        }
      }

      // Inject schema immediately (no rating yet)
      injectSchema()

      // Then fetch real Judge.me rating & re-inject with aggregateRating
      fetch(`/api/reviews?handle=${product.value.handle}&per_page=1&page=1`)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.avg_rating && data?.total_reviews) {
            injectSchema(parseFloat(data.avg_rating), data.total_reviews)
          }
        })
        .catch(() => { /* schema already injected without rating */ })

      // Inject BreadcrumbList schema — gives Google "State of Resonance > Shop > [Name]" in SERPs
      const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'State of Resonance', item: 'https://stateofresonance.ca' },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://stateofresonance.ca/best-sellers' },
          { '@type': 'ListItem', position: 3, name: product.value.title, item: window.location.href }
        ]
      }
      let bcEl = document.getElementById('ld-breadcrumb')
      if (bcEl) {
        bcEl.textContent = JSON.stringify(breadcrumb)
      } else {
        const bc = document.createElement('script')
        bc.type = 'application/ld+json'
        bc.id = 'ld-breadcrumb'
        bc.textContent = JSON.stringify(breadcrumb)
        document.head.appendChild(bc)
      }
    }
  } catch (e) {
    console.error('Failed to fetch product:', e)
  } finally {
    loading.value = false
  }
})

const onImgError = (e: any) => {
  e.target.src = '/assets/placeholder.png'
}
</script>

<template>
  <div class="product-detail container" :class="{ 'divine-resonance': product?.metadata?.isMembersOnly }" style="padding: 15vh 0;">
    <!-- Breadcrumb Navigation -->
    <nav class="pdp-breadcrumb" aria-label="Breadcrumb">
      <router-link to="/">Home</router-link>
      <span class="bc-sep">/</span>
      <router-link to="/best-sellers">Shop</router-link>
      <span class="bc-sep">/</span>
      <span>{{ product?.title || 'Product' }}</span>
    </nav>

    <div v-if="loading" class="loading-state">
      <p>Loading product...</p>
    </div>

    <!-- Inner Circle Lock -->
    <div v-else-if="product?.metadata?.isMembersOnly && !isUnlocked" class="inner-circle-lock glass">
      <div class="lock-inner">
        <span class="popup-eyebrow">✦ RESTRICTED FREQUENCY ✦</span>
        <h1 class="hero-title" style="margin-bottom: 2rem;">Inner Circle Only</h1>
        <p class="lock-text" style="opacity: 0.6; margin-bottom: 3rem;">
          Access strictly prohibited. Provide the initiation frequency to synchronize your field and view this piece.
        </p>

        <!-- Direct Access Phase Only -->
        <div class="lock-form" style="display: flex; gap: 1rem; max-width: 450px; margin: 0 auto;">
          <input 
            type="password" 
            v-model="accessCode" 
            placeholder="ENTER FREQUENCY KEY..." 
            class="glass-input"
            @keyup.enter="unlockAccess"
            style="flex: 1; text-align: center; letter-spacing: 0.3em; font-size: 0.7rem; padding: 1rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #fff; outline: none;"
          />
          <button @click="unlockAccess" class="btn-gold" style="padding: 1rem 1.5rem; letter-spacing: 0.2em;">UNLOCK</button>
        </div>
        <p v-if="accessError" class="error-msg" style="color: #ff3e3e; font-size: 0.6rem; margin-top: 1.5rem; letter-spacing: 0.2em;">{{ accessError }}</p>
      </div>
    </div>

    <div v-else-if="product" class="product-split">
      <div class="product-gallery">
        <div class="main-img-wrapper">
          <transition name="fade-fast" mode="out-in">
            <img :key="showModel ? 'model' : 'flat'" :src="showModel ? product.modelImage : currentImage" :alt="`963Hz Esoteric Piece: ${product.title} | State of Resonance Ritual Tool`" @error="onImgError" />
          </transition>
          <div class="construction-overlay">
            <div class="scanning-line"></div>
          </div>
          
          <!-- Model View Toggle -->
          <button 
            v-if="product.modelImage" 
            @click="toggleModelView" 
            class="model-toggle-btn interactive"
            :class="{ 'is-active': showModel }"
          >
            <span class="toggle-track"></span>
            <span class="toggle-label">{{ showModel ? 'VIEW FLAT-LAY' : 'VIEW ON MODEL' }}</span>
          </button>
        </div>
        <!-- Thumbnails -->
        <div v-if="product.images && product.images.length > 1" class="thumbnail-grid">
          <div 
            v-for="(img, idx) in product.images" 
            :key="idx"
            class="thumb-item"
            :class="{ active: currentImage === img }"
            @click="setMainImage(img)"
          >
            <img :src="img" alt="Product view" @error="onImgError" />
          </div>
        </div>
        
      </div>
      <div class="product-detail-info">
        <p class="product-meta">{{ product.category }} / {{ product.type }}</p>
        <h1 class="hero-title" style="font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.1; text-align: left; margin-bottom: 2rem;">{{ product.title }}</h1>
        <div class="price-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; gap: 1rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
            <div style="display: flex; flex-direction: column;">
              <p class="product-price" :class="{ 'gold-text': memberPrice }" style="font-size: 1.5rem; margin: 0;">
                {{ memberPrice || selectedVariant?.price || product?.price }}
              </p>
              <span v-if="memberPrice" class="original-price" style="text-decoration: line-through; opacity: 0.4; font-size: 0.8rem;">
                {{ selectedVariant?.price || product?.price }} [BASE]
              </span>
            </div>
            <p class="meta-vibe" style="font-size: 0.55rem; margin-top: 0.25rem; opacity: 0.5;">
              Taxes Included for International Seeker / Calculated at Checkout for Canada
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
            <div v-if="memberPrice" class="member-badge" style="background: var(--color-gold); color: #000; padding: 0.2rem 0.6rem; font-size: 0.5rem; letter-spacing: 0.2em; font-weight: bold;">
              INNER CIRCLE PRICE
            </div>
          </div>
          <div class="live-seekers glass" style="padding: 0.5rem 1rem; display: flex; align-items: center; gap: 0.5rem; border: 1px solid rgba(74, 222, 128, 0.2);">
            <span class="fomo-dot" style="width: 6px; height: 6px; background: #4ade80; border-radius: 50%; box-shadow: 0 0 8px #4ade80;"></span>
            <span class="meta-vibe" style="font-size: 0.55rem; color: #4ade80; opacity: 1;">{{ liveViewers }} Seekers Synchronizing</span>
          </div>
        </div>

        <!-- Real Inventory Signal — only show when we have actual stock data and it's low -->
        <div v-if="selectedVariant?.inventory_quantity !== null && selectedVariant?.inventory_quantity !== undefined && selectedVariant.inventory_quantity <= 5 && selectedVariant.inventory_quantity > 0" class="limited-edition-badge">
          <span class="ltd-flame">🏺</span>
          <div class="ltd-text">
            <span class="ltd-title" style="color: var(--color-gold);">ONLY {{ selectedVariant.inventory_quantity }} LEFT IN THIS SIZE</span>
            <span class="ltd-sub" style="color: var(--color-gold-muted);">Each piece is made to order — embroidered and printed by hand. Once this size sells out, it may not return.</span>
          </div>
        </div>
        <!-- Fallback badge when no real inventory (Printful/on-demand) -->
        <div v-else-if="isClothing && (selectedVariant?.inventory_quantity === null || selectedVariant?.inventory_quantity === undefined)" class="limited-edition-badge">
          <span class="ltd-flame">🏺</span>
          <div class="ltd-text">
            <span class="ltd-title" style="color: var(--color-gold);">MADE TO ORDER — LIMITED RUN</span>
            <span class="ltd-sub" style="color: var(--color-gold-muted);">Each piece is made to order. I have the embroidery done at my local shop and print them myself, so every single artifact goes explicitly through my own hands.</span>
          </div>
        </div>
        
        <p class="brand-motto-subtle" style="font-size: 0.55rem; letter-spacing: 0.3em; color: var(--color-gold-muted); margin-top: 2rem; margin-bottom: 2rem; text-transform: uppercase; opacity: 0.6; text-align: center;">
          Wear your frequency. Let your vibes Resonate. State of Resonance.
        </p>

        <!-- Variant Selectors -->
        <div v-if="product.options && product.options.length > 0" class="variant-selectors" style="margin-bottom: 2rem;">
          <div v-for="opt in product.options" :key="opt.name" class="option-group">
            <div class="option-label-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <p class="option-label">{{ opt.name }}</p>
              <a v-if="opt.name === 'Size'" href="/size-guide" class="size-guide-link" style="font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-gold-muted); text-decoration: underline; opacity: 0.7;">Size Guide ↗</a>
            </div>
            <div class="option-values">
              <button 
                v-for="val in opt.values" 
                :key="val"
                class="option-chip"
                :class="{ 
                  active: selectedOptions[opt.name] === val,
                  'out-of-stock-chip': !isOptionAvailable(opt.name, val)
                }"
                @click="selectedOptions[opt.name] = val; if (!userSelected.includes(opt.name)) { userSelected.push(opt.name); }; sizeError = false"
              >
                {{ val }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Primary Actions: Add to Bag FIRST, Buy Now SECOND -->
        <div class="product-actions-luxury" style="margin-bottom: 2rem;">
          <!-- Size selection error nudge -->
          <div 
            v-if="sizeError" 
            style="margin-bottom: 1rem; padding: 0.75rem 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; text-align: center; animation: shake 0.4s ease;"
          >
            ✦ SELECT A SIZE TO CONTINUE
          </div>
          <div v-if="isAvailable" class="commerce-primary-row" style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <div class="qty-selector glass" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 1rem; border: 1px solid var(--color-gold-muted); min-width: 120px; font-size: 1.2rem; background: rgba(0,0,0,0.4);">
              <button @click="quantity > 1 ? quantity-- : null" class="qty-btn" style="background: none; border: none; color: #fff; cursor: pointer; padding: 0.5rem; opacity: 0.7; font-size: 1.2rem;">−</button>
              <span class="qty-val" style="font-family: var(--font-heading); min-width: 20px; text-align: center;">{{ quantity }}</span>
              <button @click="quantity++" class="qty-btn" style="background: none; border: none; color: #fff; cursor: pointer; padding: 0.5rem; opacity: 0.7; font-size: 1.2rem;">+</button>
            </div>
            <!-- PRIMARY: Add to Bag -->
            <button @click="addToCartWithQty" class="btn-premium add-btn" style="flex: 1; padding: 1.25rem; font-size: 1rem; letter-spacing: 0.2em; text-transform: uppercase;">ADD TO BAG</button>
          </div>
          
          <!-- SECONDARY: Buy Now -->
          <a v-if="isAvailable" :href="shopifyUrl" class="btn-solid-gold animate-glint full-width-buy" style="display: block; text-align: center; margin-top: 1rem; padding: 1.25rem; background: var(--color-gold); border: 1px solid var(--color-gold); color: #000; font-weight: bold; text-decoration: none; letter-spacing: 0.2em; font-size: 1rem; text-transform: uppercase; transition: transform 0.3s ease;" @click="addToCartWithQty">
            BUY NOW
          </a>

          <!-- Trustindex Verified Badges -->
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center; margin-top:1.5rem;">
            <TrustindexWidget src="https://cdn.trustindex.io/loader-cert.js?1703b7e689202141f136d18372e" />
            <TrustindexWidget src="https://cdn.trustindex.io/loader-cert.js?ea9bfdd7014018072776609e74f" />
            <TrustindexWidget src="https://cdn.trustindex.io/loader-cert.js?6e7277670e8c181e27066a48ca1" />
            <TrustindexWidget src="https://cdn.trustindex.io/loader-cert.js?ef204277027f181fb316fe34015" />
          </div>

          <!-- Trust nudges near CTA -->
          <div class="pdp-trust-strip" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.25rem; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); font-size: 0.75rem;">
            <span class="pdp-trust-item">⭐ 5.0 Google Verified</span>
            <span class="pdp-trust-item">🚚 Free Shipping $110+</span>
            <span class="pdp-trust-item">↩️ 30-Day Returns</span>
            <span class="pdp-trust-item">🔒 Secure Checkout</span>
            <span class="pdp-trust-item">🇨🇦 Ships from Canada</span>
          </div>

        </div>


        <div v-if="!isAvailable" class="unavailable-note" style="margin-bottom: 3rem; text-align: left; padding: 1.5rem; background: rgba(255,255,255,0.03); border-left: 2px solid var(--color-gold-muted);">
          <span style="display: block; font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.5rem;">Currently out of stock</span>
          This item has sold out for this release. <router-link to="/inner-circle" class="gold-text" style="text-decoration: underline;">Join Inner Circle for drop notifications.</router-link>
        </div>

        <!-- Connection Hook for High Frequency Items -->


        <!-- WHY THIS PIECE IS SPECIAL -->
        <div v-if="isClothing" class="why-special-block">
          <p class="why-special-eyebrow">✦ WHY OUR PIECES FEEL DIFFERENT</p>
          <div class="why-special-grid" style="grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div class="why-card" style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
              <div class="why-icon" style="font-size: 1.2rem; margin: 0;">⚖️</div>
              <strong style="font-size: 0.8rem;">450gsm heavyweight cotton</strong>
            </div>
            <div class="why-card" style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
              <div class="why-icon" style="font-size: 1.2rem; margin: 0;">🎨</div>
              <strong style="font-size: 0.8rem;">Oversized, structured fit</strong>
            </div>
            <div class="why-card" style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
              <div class="why-icon" style="font-size: 1.2rem; margin: 0;">🧵</div>
              <strong style="font-size: 0.8rem;">Double-stitched construction</strong>
            </div>
            <div class="why-card" style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
              <div class="why-icon" style="font-size: 1.2rem; margin: 0;">🍁</div>
              <strong style="font-size: 0.8rem;">Designed in Canada</strong>
            </div>
            <div class="why-card" style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
              <div class="why-icon" style="font-size: 1.2rem; margin: 0;">📦</div>
              <strong style="font-size: 0.8rem;">Limited runs</strong>
            </div>
            <div class="why-card" style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
              <div class="why-icon" style="font-size: 1.2rem; margin: 0;">✦</div>
              <strong style="font-size: 0.8rem;">Symbolic designs with purpose</strong>
            </div>
          </div>
        </div>

        <div class="product-description">
          <p style="font-size: 0.65rem; letter-spacing: 0.2em; color: var(--color-gold-muted); margin-bottom: 0.5rem; text-transform: uppercase;">Product Details</p>
          <div v-html="product.description || ''"></div>
        </div>

        <!-- SYMBOL MEANINGS -->
        <div v-if="isClothing" class="symbol-meaning-block" style="margin-top: 2rem; padding: 1.5rem; background: rgba(212,175,55,0.02); border-left: 2px solid var(--color-gold-muted);">
          <p style="font-size: 0.65rem; letter-spacing: 0.2em; color: var(--color-gold-muted); margin-bottom: 1rem; text-transform: uppercase;">✦ Symbol Meaning</p>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem; line-height: 1.8; opacity: 0.9;">
            <li><strong>963 Hz:</strong> intuition, clarity</li>
            <li><strong>528 Hz:</strong> transformation</li>
            <li><strong>432 Hz:</strong> grounding</li>
            <li><strong>396 Hz:</strong> release</li>
          </ul>
        </div>

        <!-- MATERIAL & LOGISTICAL TRUST SIGNALS -->
        <div class="trust-signals" style="margin-top: 2.5rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem;">
          <div v-if="isClothing" style="margin-bottom: 1.5rem;">
            <p style="font-size: 0.65rem; letter-spacing: 0.2em; color: var(--color-gold-muted); margin-bottom: 0.5rem; text-transform: uppercase;">Material & Fit</p>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; opacity: 0.8; line-height: 1.6;">
              <li>✦ 100% Heavyweight Cotton (400 GSM)</li>
              <li>✦ Oversized boxy silhouette (Pre-shrunk)</li>
              <li>✦ Double-needle stitched seams</li>
              <li>✦ Ethically sourced and manufactured</li>
            </ul>
          </div>
          
          <div>
            <p style="font-size: 0.65rem; letter-spacing: 0.2em; color: var(--color-gold-muted); margin-bottom: 0.5rem; text-transform: uppercase;">Shipping & Returns</p>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; opacity: 0.8; line-height: 1.6;">
              <li>✦ Ships from Canada within 1–3 business days</li>
              <li>✦ Free shipping on orders over $110 CAD</li>
              <li>✦ 30-day returns — no questions asked</li>
              <li>✦ Secure checkout powered by Shopify</li>
            </ul>
          </div>
        </div>

        <!-- SOCIAL PROOF / FROM THE LABORATORY -->
        <div v-if="product.collections?.some((c: any) => c.handle === 'vault')" class="social-proof-panel glass" style="margin-top: 3rem; padding: 1.5rem; border: 1px solid rgba(212, 175, 55, 0.2);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div class="proof-icon" style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-gold); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </div>
            <div class="proof-text">
              <h4 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.1rem;" class="gold-text">Proof of Manifestation</h4>
              <p style="font-size: 0.7rem; opacity: 0.7; line-height: 1.4;">The Alchemist is actively rendering this series. Witness the live physical documentation.</p>
            </div>
          </div>
          <div style="display: flex; gap: 1rem;">
            <a href="https://www.tiktok.com/@stateofresonanace/video/7622395219643845906?lang=en" target="_blank" rel="noopener noreferrer" class="btn-outline interact-glow" style="flex: 1; padding: 0.5rem; font-size: 0.65rem; text-align: center; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> TikTok
            </a>
            <a href="https://www.instagram.com/reel/DWhpDeNEVn7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" class="btn-outline interact-glow" style="flex: 1; padding: 0.5rem; font-size: 0.65rem; text-align: center; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram
            </a>
          </div>
        </div>

        <SocialShare :title="product.title" :image="product.image" style="margin-top: 2rem;" />
      </div>
    </div>



    <!-- Related Products -->
    <div v-if="relatedProducts.length > 0" class="related-section" style="margin-top: 15vh;">
      <div class="section-header" style="text-align: center; margin-bottom: 6rem;">
        <span class="popup-eyebrow" style="margin-bottom: 1rem;">✦ COMPLETE YOUR LOOK ✦</span>
        <h2 class="hero-title" style="font-size: 2.5rem;">You May Also Like</h2>
        <p style="opacity: 0.5; letter-spacing: 0.1em; font-size: 0.8rem; margin-top: 1rem;">More from the archive.</p>
      </div>
      <div class="product-grid">
        <ProductCard v-for="rel in relatedProducts" :key="rel.id" :product="rel" />
      </div>
    </div>

    <div v-else class="empty-state" style="min-height:60vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2rem; opacity:0.5;">
      <p style="font-size:0.75rem; letter-spacing:0.3em; text-transform:uppercase;">Product not found.</p>
      <router-link to="/best-sellers" class="btn-premium">Back to Shop</router-link>
    </div>
    
    <StickyBuyBar 
      v-if="product" 
      :product="product" 
      :selectedVariant="selectedVariant" 
      :shopifyUrl="shopifyUrl" 
    />
  </div>
</template>

<style scoped>
.lifestyle-img-wrap:hover .lifestyle-zoom { transform: scale(1.05); }

.product-split {
  display: grid;
  grid-template-columns: minmax(300px, 40%) 1fr;
  gap: 5vw;
  align-items: start;
}

.main-img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4/5;
  max-height: 75vh;
  overflow: hidden;
  background-color: transparent;
  backdrop-filter: blur(8px);
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(212, 175, 55, 0.05);
}

.thumbnail-grid {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.thumb-item {
  width: 85px;
  height: 85px;
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
  border: 1px solid rgba(212, 175, 55, 0.15);
  background: transparent;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}

.thumb-item.active {
  border-color: var(--color-gold);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
}

.thumb-item:hover:not(.active) {
  border-color: rgba(212, 175, 55, 0.4);
}

.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.main-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: transparent;
  mix-blend-mode: lighten;
}

.construction-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.scanning-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-gold);
  box-shadow: 0 0 15px var(--color-gold);
  animation: scan-line 4s linear infinite;
  opacity: 0.3;
}

@keyframes scan-line {
  0% { top: 0%; }
  100% { top: 100%; }
}

.model-toggle-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #fff;
  padding: 8px 16px;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.4s var(--ease-out-expo);
  z-index: 10;
}

.model-toggle-btn:hover {
  background: var(--color-gold);
  color: #000;
  border-color: var(--color-gold);
}

.model-toggle-btn.is-active {
  background: var(--color-gold);
  color: #000;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.4s ease;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}

.product-description {
  opacity: 0.7;
  max-width: 40ch;
}

/* Frequency Specs */
.freq-specs {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(212, 175, 55, 0.15);
  background: rgba(212, 175, 55, 0.02);
}
.freq-specs-title {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  margin-bottom: 1.5rem;
  text-align: center;
}
.freq-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.freq-label {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.4;
}
.freq-value {
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-align: right;
  max-width: 55%;
}

/* Frequency Meaning Panel */
.freq-meaning-panel {
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid rgba(212, 175, 55, 0.1);
  background: rgba(212, 175, 55, 0.03);
}

.freq-meaning-hz {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--color-gold-muted);
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.freq-meaning-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.freq-meaning-body {
  font-size: 0.85rem;
  line-height: 1.7;
  opacity: 0.7;
  color: #fff;
}

.alignment-bar {
  height: 1px;
  background: rgba(255,255,255,0.1);
  width: 100%;
}

.alignment-fill {
  height: 100%;
  background: var(--color-gold);
  box-shadow: 0 0 10px var(--color-gold);
  animation: pulse-width 3s ease-in-out infinite;
}

@keyframes pulse-width {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.product-actions-luxury {
  margin-top: 0;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.commerce-primary-row {
  display: flex;
  gap: 1rem;
  min-height: 3.5rem;
}

.qty-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(212, 175, 55, 0.3);
  background: rgba(0, 0, 0, 0.4);
  width: 120px;
  padding: 0 1rem;
  height: 100%;
}

.qty-btn {
  background: none;
  border: none;
  color: var(--color-gold-muted);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s;
}

.qty-btn:hover {
  color: #fff;
}

.qty-val {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: #fff;
}

.add-btn {
  flex: 1;
  height: 100%;
  font-size: 0.85rem;
  letter-spacing: 0.25em;
}

.full-width-buy {
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  letter-spacing: 0.25em;
}


.variant-selectors {
  margin-bottom: 2.5rem;
}

.option-group {
  margin-bottom: 1.5rem;
}

.option-label {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  margin-bottom: 0.75rem;
}

.option-values {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.option-chip {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  padding: 0.5rem 1.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-chip:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(212, 175, 55, 0.3);
}

.option-chip.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: #000;
  font-weight: 600;
}

.option-chip.out-of-stock-chip {
  opacity: 0.3;
  text-decoration: line-through;
  cursor: not-allowed;
  pointer-events: none;
  background: transparent;
  border-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 968px) {
  .product-split {
    grid-template-columns: 1fr;
  }
  .product-actions {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .main-img-wrapper {
    max-height: 55vh;
    aspect-ratio: 1/1;
  }
}

.acquiring {
  opacity: 0.7;
  animation: pulse-gold 0.8s ease infinite;
  cursor: wait;
}

@keyframes pulse-gold {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(212, 175, 55, 0); }
}

.unavailable-note {
  margin-top: 1.25rem;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.5;
}

.pdp-trust-item {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.05em;
}

.limited-edition-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--color-gold-muted);
  background: rgba(212, 175, 55, 0.03);
  margin-bottom: 2rem;
  border-left: 3px solid var(--color-gold);
}

.ltd-flame {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 5px var(--color-gold));
}

.ltd-text {
  flex: 1;
}

.ltd-title {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--color-gold);
  margin-bottom: 0.4rem;
}

.ltd-sub {
  font-size: 0.75rem;
  opacity: 0.6;
  line-height: 1.4;
}

.ltd-stock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--color-gold-muted);
  background: rgba(0,0,0,0.3);
  min-width: 80px;
}

.stock-num {
  font-size: 1.2rem;
  font-weight: 800;
  font-family: var(--font-mono);
  line-height: 1;
}

.stock-label {
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  margin-top: 0.2rem;
  opacity: 0.7;
}

/* Inner Circle Styling */
.inner-circle-lock {
  max-width: 600px;
  margin: 5vh auto;
  padding: 5rem 3rem;
  text-align: center;
  border: 1px solid var(--color-gold-muted);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.05);
}

.lock-text {
  font-size: 0.9rem;
  opacity: 0.6;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.lock-form {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.glass-input {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1rem;
  color: #fff;
  font-family: var(--font-heading);
  letter-spacing: 0.2em;
  font-size: 0.8rem;
}

.lock-hint {
  display: block;
  margin-top: 2.5rem;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--color-gold-muted);
  text-decoration: none;
}

.divine-resonance {
  --color-gold: #d4af37;
  --color-gold-muted: rgba(212, 175, 55, 0.5);
}

.divine-resonance .main-img-wrapper {
  border: 1px solid var(--color-gold);
  box-shadow: 0 0 50px rgba(212, 175, 55, 0.1);
}

.ritual-link-hint {
  display: block;
  text-align: center;
  font-size: 0.55rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  text-decoration: none;
  opacity: 0.6;
  margin-top: 0.5rem;
  transition: opacity 0.3s ease;
}

.ritual-link-hint:hover {
  opacity: 1;
  text-decoration: underline;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

/* === BREADCRUMB === */
.pdp-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 3rem;
  flex-wrap: wrap;
}
.pdp-breadcrumb a {
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: color 0.3s;
}
.pdp-breadcrumb a:hover { color: var(--color-gold); }
.bc-sep { opacity: 0.3; }
.pdp-breadcrumb span:last-child { color: rgba(255,255,255,0.7); }

/* === WHY THIS PIECE IS SPECIAL === */
.why-special-block {
  margin: 2.5rem 0;
  padding: 2rem;
  border: 1px solid rgba(212, 175, 55, 0.15);
  background: rgba(212, 175, 55, 0.03);
}

.why-special-eyebrow {
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  margin-bottom: 1.5rem;
  display: block;
}

.why-special-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.why-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.why-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.why-card strong {
  display: block;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: #fff;
  margin-bottom: 0.25rem;
}

.why-card p {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
  margin: 0;
}
</style>
