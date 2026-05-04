<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BlogFeed from '../components/BlogFeed.vue'
import ProductCard from '../components/ProductCard.vue'
interface Product {
  id: string
  title: string
  price: string
  category: string
  image: string
  handle: string
  variantId: string | null
}

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const products = ref<Product[]>([])
const loading = ref(true)
const counts = ref<Record<string, number>>({})

const fetchCounts = async () => {
  try {
    const res = await fetch('/api/counts')
    counts.value = await res.json()
  } catch (e) {
    console.error('Failed to fetch counts:', e)
  }
}

const getGroupCount = (groupName: string) => {
  const cats = CATALOGUE_GROUPS[groupName] || []
  return cats.reduce((acc, cat) => acc + (counts.value[cat] || 0), 0)
}

const CATALOGUE_GROUPS: Record<string, string[]> = {
  'Ritual Tools': ['Ritual Tools', 'Ritual Items & Spell Supplies', 'Magical Wands & Besom Brooms', 'Ritual Athames', 'Ritual Kits', 'Cauldrons', 'Chalices', 'Mortar & Pestle'],
  'Shrine Garments': ['Shrine Garments', 'Statues', 'Home Decor', 'Mystic Curiosities', 'Stone Crafts & Gemstone Trees'],
  'Mystic Curiosities': ['Mystic Curiosities', 'Novelty & Gift Ideas', 'Bumper Stickers', 'Posters'],
  'Divination Tools': ['Divination Tools', 'All Divination', 'Tarot Decks', 'Oracle Decks & Reading Cards', 'Pendulums', 'Scrying', 'Runes & Rune Products'],
  'Sacred Adornments': ['Sacred Adornments', 'All Jewelry', 'All Pendants & Necklaces', 'All Pendants & Charms', 'Rings', 'Bracelets & Anklets', 'Amulets & Talismans', 'Earrings'],
  'Sacred Smoke': ['Sacred Smoke', 'All Smudge Sticks & Burning Accessories', 'Cone Incense', 'HEM incense sticks', 'Nag Champa', 'Stick Incense Burners'],
  'Earth Minerals': ['Earth Minerals', 'Crystals', 'Raw Bulk Stones', 'Bulk Tumbled Stones', 'Geodes', 'Selenite', 'Points'],
  'Alchemical Botanicals': ['Alchemical Botanicals', 'Herb packets A - M', 'Herb packets N - Z', 'Herbal Mixes', 'Herbal Teas & Accessories', 'Ritual Smoke blends'],
  'Alchemical Elixirs': ['Alchemical Elixirs', 'Oils', 'Essential Oils', 'Waters & Carrier Oils', 'Goloka Pure Oils & Scented Sprays', 'Ritual Washes'],
  'Esoteric Manuscripts': ['Esoteric Manuscripts', 'All Books & Journals', 'Tarot & Divination books', 'Paganism & Wicca', 'Spirituality', 'Leather Journals - all'],
  'Illuminations': ['Illuminations', 'All Candles & Candle Accessories', 'Figure Candles', 'Pillar Candles', 'Charged Ritual Candles', 'Herbal Votives'],
  'Esoteric Protection': ['Esoteric Protection', 'Protection & Cleansing', 'Esoteric & Occult', 'Bags'],
  'Sacred Geometry': ['Sacred Geometry', 'Pyramids', 'Chakra & Reiki', 'Sound  & Vibrational Healing'],
  'Attire': ['Attire', 'Apparel', 'Resonance Layer', 'Solfeggio Layer', 'Vibrational Layer', 'Urban Esoterica', 'Natural Alignment', 'The GHOST and BONES', 'State of Resonance Attire'],
  'The GHOST and BONES': ['The GHOST and BONES'],
  'Her Resonance': ['Her Resonance']
}

const ATTIRE_COLLECTIONS = computed(() => [
  { 
    name: t('collections.ghost_bones.title', 'The GHOST and BONES'), 
    handle: 'the-ghost-and-bones', 
    desc: t('collections.ghost_bones.meta', 'Premium Resonance Attire'), 
    image: '/images/lookbook/lookbook-hero.jpg' 
  },
  { 
    name: t('hero.her_resonance', 'Her Resonance'), 
    handle: 'her-resonance', 
    desc: t('hero.her_collection', 'For the Divine Feminine'), 
    image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/womens-relaxed-v-neck-t-shirt-solid-black-blend-front-69a0a8a271e46.jpg?v=1772136626' 
  }
])

const getCollectionHandle = (groupName: string) => {
  const handleMap: Record<string, string> = {
    'Ritual Tools': 'ritual-tools',
    'Divination Tools': 'divination-tools',
    'Shrine Garments': 'shrine-garments',
    'Sacred Smoke': 'sacred-smoke',
    'Earth Minerals': 'earth-relics',
    'Alchemical Botanicals': 'alchemical-botanicals',
    'Alchemical Elixirs': 'alchemical-elixirs',
    'Sacred Adornments': 'sacred-adornments',
    'Mystic Curiosities': 'mystic-curiosities',
    'Esoteric Protection': 'esoteric-protection',
    'Illuminations': 'illuminations',
    'Esoteric Manuscripts': 'esoteric-manuscripts',
    'Attire': 'the-ghost-and-bones'
  }
  
  return handleMap[groupName] || groupName.toLowerCase().replace(/\s+/g, '-')
}

const onImgError = (e: any) => {
  e.target.src = '/images/lookbook/lookbook-hero.jpg'
}

const activeGroup = ref<string | null>(null)

const fetchProducts = async () => {
  loading.value = true
  try {
    const categoryName = String(route.name)
    const title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    
    // Update SEO
    document.title = `${title} | State of Resonance`
    
    let url = `/api/products?category=${categoryName}&limit=250`
    
    // Explicit override for the Attire section to exclusively pull the Ghost & Bones collection
    if (categoryName === 'Attire' && !activeGroup.value) {
      url = '/api/products?collection=the-ghost-and-bones&limit=250'
    }

    if (activeGroup.value) {
      const categoriesInGroup = CATALOGUE_GROUPS[activeGroup.value]
      const res = await fetch(url)
      const data = await res.json()
      products.value = data.filter((p: any) => categoriesInGroup.includes(p.category))
    } else {
      const res = await fetch(url)
      const data = await res.json()
      products.value = data
    }
  } catch (e) {
    console.error('Failed to fetch products:', e)
  } finally {
    loading.value = false
  }
}

watch(() => route.query.group, (newGroup) => {
  activeGroup.value = newGroup as string || null
  fetchProducts()
}, { immediate: true })

onMounted(() => {
  fetchCounts()
  fetchProducts()
})

// Group selection handled by <a> tags directly now
</script>

<template>
  <div class="category-view container" style="min-height: 100dvh;">
    <header class="category-header" style="padding: 15vh 0 5vh;">
      <div v-if="activeGroup" class="breadcrumb">
        <router-link to="/shop" class="nav-link" style="text-decoration: none; color: inherit; cursor:pointer;">{{ String(route.name) }}</router-link>
        <span class="gold-text"> / {{ activeGroup }}</span>
      </div>
      <h1 class="hero-title" style="font-size: 4rem;">{{ activeGroup || String(route.name) }}</h1>
      <p class="product-meta">The {{ activeGroup || String(route.name) }} Shop</p>
    </header>

    <!-- Catalogue Group Selection (Only if in Shop and no active group) -->
    <div v-if="route.name === 'Shop' && !activeGroup && !loading" class="catalogue-grid">
      <template v-for="(cats, groupName) in CATALOGUE_GROUPS" :key="groupName">
        <!-- Special Handling for Attire -->
        <template v-if="groupName === 'Attire'">
          <router-link v-for="col in ATTIRE_COLLECTIONS" :key="col.handle"
             :to="{ name: 'Collection', params: { handle: col.handle }}"
             class="catalogue-card glass collection-card" :style="{ '--bg-img': `url(${col.image})` }">
            <div class="card-content">
              <h3 class="catalogue-name" v-html="col.name.replace('\n', ' ')"></h3>
              <p class="catalogue-meta">{{ col.desc }}</p>
            </div>
          </router-link>
        </template>
        
        <router-link v-else-if="groupName !== 'The GHOST and BONES' && groupName !== 'Her Resonance'"
           :to="{ name: 'Collection', params: { handle: getCollectionHandle(String(groupName)) }}"
           class="catalogue-card glass">
          <h3 class="catalogue-name">{{ groupName }}</h3>
          <p class="catalogue-meta">{{ getGroupCount(String(groupName)) }} Garments | Enter Collection</p>
        </router-link>
      </template>
    </div>

    <div v-if="loading" class="loading-state">
      <p>Synchronizing with the Archives...</p>
    </div>

    <!-- Product Grid -->
    <div v-else-if="activeGroup || route.name !== 'Shop'" class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <div v-if="route.name === 'Manuscripts' && !loading" class="manuscripts-blog-section" style="margin-top: 8rem;">
      <h2 class="hero-title" style="font-size: 3rem; margin-bottom: 2rem;">Transmissions</h2>
      <BlogFeed />
    </div>
  </div>
</template>

<style scoped>
.loading-state {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-style: italic;
  opacity: 0.5;
}

.catalogue-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.catalogue-card {
  padding: 4rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid var(--glass-border);
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.collection-card {
  background-image: var(--bg-img);
  background-size: cover;
  background-position: center;
  padding: 0;
  display: flex;
  align-items: flex-end;
  min-height: 400px;
}

.collection-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--color-obsidian) 10%, transparent 60%);
  opacity: 0.8;
  transition: opacity 0.4s ease;
}

.collection-card:hover::before {
  opacity: 1;
}

.card-content {
  position: relative;
  padding: 2rem;
  width: 100%;
  text-align: left;
}

.catalogue-card:hover {
  background-color: rgba(212, 175, 55, 0.05);
  border-color: var(--color-gold-muted);
  transform: translateY(-5px);
}

.catalogue-name {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.catalogue-meta {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.7;
}

.breadcrumb {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  opacity: 0.6;
}
</style>
