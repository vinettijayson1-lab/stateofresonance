<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard.vue'
import { Sparkles, ArrowLeft, Share2, BookOpen } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const router = useRouter()
const article = ref<any>(null)
const loading = ref(true)

const fetchArticle = async () => {
  try {
    const slug = route.params.slug
    const res = await fetch(`/api/transmissions?slug=${slug}`)
    if (!res.ok) throw new Error('Transmission Lost')
    article.value = await res.json()
    
    // SEO Update
    document.title = `${article.value.title} | Void Transmissions`
  } catch (err) {
    console.error('Failed to sync transmission:', err)
    router.push('/transmissions')
  } finally {
    loading.value = false
    // Trigger entrance
    setTimeout(initAnimations, 100)
  }
}

const initAnimations = () => {
  gsap.from('.article-header', {
    opacity: 0,
    y: 30,
    duration: 1.4,
    ease: 'expo.out'
  })

  // Scroll revealed text blocks
  const blocks = document.querySelectorAll('.article-body p, .article-body h3, .article-body blockquote')
  blocks.forEach(block => {
    gsap.from(block, {
      scrollTrigger: {
        trigger: block,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power2.out'
    })
  })
}

const shareFrequency = () => {
  if (navigator.share) {
    navigator.share({
      title: article.value.title,
      url: window.location.href
    })
  }
}

onMounted(fetchArticle)
</script>

<template>
  <div class="transmission-detail-view" :class="{ 'is-loading': loading }">
    <div v-if="loading" class="loading-overlay">
      <div class="pulse-ring"></div>
      <p>Synchronizing Frequency Field...</p>
    </div>

    <div v-else-if="article" class="article-container">
      <!-- Reading Signal Progress -->
      <div class="reading-progress"></div>

      <nav class="article-nav container">
        <router-link to="/transmissions" class="back-link interactive">
          <ArrowLeft :size="16" /> <span>BACK TO ARCHIVE</span>
        </router-link>
        <button @click="shareFrequency" class="share-btn interactive">
          <Share2 :size="16" />
        </button>
      </nav>

      <header class="article-header container">
        <div class="article-meta">
          <span class="category-tag glow-gold">{{ article.category }}</span>
          <span class="date-tag">{{ new Date(article.publishedAt).toLocaleDateString() }}</span>
        </div>
        <h1 class="article-title hero-title">{{ article.title }}</h1>
        <div v-if="article.image" class="article-hero-img glass animate-glint">
          <img :src="article.image" :alt="article.title" />
        </div>
      </header>

      <div class="article-content-grid container">
        <div class="article-body-wrapper">
          <div class="article-body" v-html="article.content"></div>
          
          <footer class="article-footer">
            <div class="divider"></div>
            <p class="footer-msg">End of Transmission. Integration complete.</p>
          </footer>
        </div>

        <!-- Alchemical Sidebar -->
        <aside class="article-sidebar">
          <div class="sidebar-card glass glow-edge">
             <div class="card-header">
                <Sparkles :size="14" class="gold-text" />
                <span>FIELD RESONANCE</span>
             </div>
             <p class="card-text">
               The frequency of this transmission aligns with seekers in the <strong>{{ article.category }}</strong> spectrum.
             </p>
             <div class="sidebar-divider"></div>
             <div v-if="article.featuredProducts?.length" class="recommended-garments">
                <p class="rec-label">Recommended Garments:</p>
                <div class="rec-grid">
                  <ProductCard 
                    v-for="p in article.featuredProducts" 
                    :key="p.id" 
                    :product="p" 
                    small 
                  />
                </div>
             </div>
             <router-link to="/quiz" class="sidebar-cta">CALIBRATE YOUR FIELD →</router-link>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transmission-detail-view {
  min-height: 100dvh;
  background: #050507;
  padding-bottom: 20vh;
  position: relative;
}

/* Loading State */
.loading-overlay {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0.6;
}

.article-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15vh;
  margin-bottom: 5vh;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  color: var(--color-gold-muted);
}

.article-header {
  text-align: center;
  margin-bottom: 8vh;
}

.article-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
}

.category-tag {
  color: var(--color-gold);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
}

.article-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 5vh;
}

.article-hero-img {
  width: 100%;
  aspect-ratio: 21/9;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
}

.article-hero-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.article-content-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 8vw;
  align-items: start;
}

.article-body {
  font-size: 1.15rem;
  line-height: 2;
  color: rgba(255,255,255,0.7);
}

.article-body :deep(h2) {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  color: #fff;
  margin: 4rem 0 2rem;
}

.article-body :deep(h3) {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-gold);
  margin: 3rem 0 1.5rem;
}

.article-body :deep(p) {
  margin-bottom: 2rem;
}

.article-body :deep(blockquote) {
  border-left: 2px solid var(--color-gold);
  padding-left: 2.5rem;
  margin: 4rem 0;
  font-style: italic;
  font-size: 1.4rem;
  color: #fff;
}

/* Sidebar */
.article-sidebar {
  position: sticky;
  top: 15vh;
}

.sidebar-card {
  padding: 2.5rem;
  background: rgba(255,255,255,0.02);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1.5rem;
}

.card-text {
  font-size: 0.85rem;
  line-height: 1.6;
  opacity: 0.6;
}

.recommended-garments {
  margin-top: 2rem;
}

.rec-label {
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  opacity: 0.4;
  margin-bottom: 1.5rem;
}

.sidebar-cta {
  display: block;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  color: var(--color-gold);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-align: center;
}

@media (max-width: 1024px) {
  .article-content-grid {
    grid-template-columns: 1fr;
  }
  .article-sidebar {
    position: static;
    margin-top: 10vh;
  }
}
</style>
