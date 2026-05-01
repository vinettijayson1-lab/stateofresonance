<script setup lang="ts">
import { ref, onMounted } from 'vue'
import fm from 'front-matter'

interface Transmission {
  id: string
  title: string
  excerpt: string
  category: string
  slug: string
  image?: string
  publishedAt: string
}

const transmissions = ref<Transmission[]>([])
const loading = ref(true)

const fetchTransmissions = async () => {
  try {
    // Import all markdown files as raw strings
    const modules = import.meta.glob('../content/transmissions/*.md', { query: '?raw', import: 'default' })
    
    const loadedArticles: Transmission[] = []
    
    for (const path in modules) {
      const rawContent = await modules[path]() as string
      const parsed = fm<any>(rawContent)
      
      // Extract slug from filename (e.g., ../content/transmissions/my-post.md -> my-post)
      const slug = path.split('/').pop()?.replace(/\.md$/, '') || ''
      
      loadedArticles.push({
        id: slug,
        slug,
        title: parsed.attributes.title || 'Unknown Transmission',
        excerpt: parsed.attributes.excerpt || '',
        category: parsed.attributes.category || 'TRANSMISSION',
        image: parsed.attributes.image,
        publishedAt: parsed.attributes.date || new Date().toISOString()
      })
    }
    
    // Sort by date descending
    loadedArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    
    transmissions.value = loadedArticles
  } catch (err) {
    console.error('Failed to sync transmissions:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchTransmissions)
</script>

<template>
  <div class="blog-feed" :class="{ 'is-loading': loading }">
    <div v-if="loading" class="feed-skeleton">
      <div v-for="i in 3" :key="i" class="skeleton-card glass animate-pulse"></div>
    </div>
    
    <div v-else-if="transmissions.length === 0" class="empty-feed">
      <p>No transmissions detected in the current cycle.</p>
    </div>

    <div v-else v-for="article in transmissions" :key="article.slug" class="blog-card glass">
      <div class="blog-meta">
        <span class="blog-category">{{ article.category }}</span>
        <span class="blog-date">{{ new Date(article.publishedAt).toLocaleDateString() }}</span>
      </div>
      <h2 class="blog-title">{{ article.title }}</h2>
      <p class="blog-excerpt">{{ article.excerpt }}</p>
      <router-link 
        :to="{ name: 'TransmissionDetail', params: { slug: article.slug } }" 
        class="blog-link gold-link"
      >
        Read Transmission
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.blog-feed {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
}

.blog-feed.is-loading {
  min-height: 50vh;
}

.feed-skeleton {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skeleton-card {
  height: 250px;
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.3; }
}

.empty-feed {
  text-align: center;
  padding: 10vh 0;
  opacity: 0.5;
  letter-spacing: 0.2em;
}

.blog-card {
  padding: 2.5rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  transition: all 0.4s ease;
}

.blog-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-bottom-color: var(--color-gold);
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.blog-category {
  color: var(--color-gold-muted);
}

.blog-date {
  color: rgba(255, 255, 255, 0.4);
}

.blog-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
}

.blog-excerpt {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 80ch;
}

.gold-link {
  color: var(--color-gold);
  text-decoration: none;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  position: relative;
}

.gold-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -4px;
  left: 0;
  background-color: var(--color-gold);
  transition: width 0.3s ease;
}

.gold-link:hover::after {
  width: 100%;
}
</style>
