<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Star, Check, ChevronDown } from 'lucide-vue-next'

interface Review {
  id: number
  rating: number
  title: string
  body: string
  created_at: string
  reviewer: { name: string; verified: boolean; location: string | null }
  pictures: string[]
}

const props = defineProps<{ handle: string }>()

const reviews   = ref<Review[]>([])
const total     = ref(0)
const avgRating = ref(0)
const loading   = ref(true)
const page      = ref(1)
const hasMore   = ref(false)
const expanded  = ref<Set<number>>(new Set())

const starCounts = computed(() => {
  const counts = [0, 0, 0, 0, 0]
  for (const r of reviews.value) counts[5 - r.rating]++
  return counts
})

const fetchReviews = async (reset = false) => {
  if (reset) { reviews.value = []; page.value = 1 }
  loading.value = true
  try {
    const res = await fetch(`/api/reviews?handle=${encodeURIComponent(props.handle)}&page=${page.value}&per_page=8`)
    if (!res.ok) throw new Error('fetch failed')
    const data = await res.json()
    const newReviews: Review[] = data.reviews || []
    reviews.value = reset ? newReviews : [...reviews.value, ...newReviews]
    total.value = data.total_reviews ?? newReviews.length
    avgRating.value = data.avg_rating ? parseFloat(data.avg_rating) : calcAvg()
    hasMore.value = data.current_page < data.total_pages
  } catch {
    // silently fail — don't break the product page
  } finally {
    loading.value = false
  }
}

const calcAvg = () => {
  if (!reviews.value.length) return 0
  return reviews.value.reduce((sum, r) => sum + r.rating, 0) / reviews.value.length
}

const loadMore = async () => {
  page.value++
  await fetchReviews(false)
}

const toggleExpand = (id: number) => {
  if (expanded.value.has(id)) expanded.value.delete(id)
  else expanded.value.add(id)
}

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
}

watch(() => props.handle, () => fetchReviews(true))
onMounted(() => fetchReviews(true))
</script>

<template>
  <section class="reviews-section" v-if="!loading || reviews.length > 0">

    <!-- Header -->
    <div class="reviews-header">
      <div class="reviews-meta">
        <span class="reviews-eyebrow">CUSTOMER REVIEWS</span>
        <div v-if="total > 0" class="reviews-aggregate">
          <div class="agg-stars">
            <span v-for="s in 5" :key="s" class="agg-star" :class="{ filled: s <= Math.round(avgRating) }">★</span>
          </div>
          <span class="agg-score">{{ avgRating.toFixed(1) }}</span>
          <span class="agg-count">{{ total }} review{{ total !== 1 ? 's' : '' }}</span>
        </div>
      </div>

      <!-- Rating breakdown bars -->
      <div v-if="total > 0" class="rating-bars">
        <div v-for="(count, i) in starCounts" :key="i" class="rating-bar-row">
          <span class="bar-label">{{ 5 - i }}★</span>
          <div class="bar-track">
            <div class="bar-fill" :style="{ width: total ? `${(count / reviews.length) * 100}%` : '0%' }"></div>
          </div>
          <span class="bar-count">{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading && !reviews.length" class="reviews-skeleton">
      <div class="skeleton-card" v-for="i in 3" :key="i"></div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!loading && !reviews.length" class="reviews-empty">
      <p>No reviews yet. Be the first.</p>
      <a :href="`https://judge.me/reviews/new?shop=${encodeURIComponent('state-of-resonance.myshopify.com')}&handle=${handle}`" target="_blank" rel="noopener" class="btn-outline" style="font-size: 0.7rem; padding: 0.75rem 1.5rem;">Write a Review</a>
    </div>

    <!-- Review cards -->
    <div v-else class="reviews-list">
      <div v-for="r in reviews" :key="r.id" class="review-card glass">

        <!-- Stars + date -->
        <div class="review-top">
          <div class="review-stars">
            <span v-for="s in 5" :key="s" class="rev-star" :class="{ filled: s <= r.rating }">★</span>
          </div>
          <span class="review-date">{{ formatDate(r.created_at) }}</span>
        </div>

        <!-- Title -->
        <p v-if="r.title" class="review-title">{{ r.title }}</p>

        <!-- Body (truncated unless expanded) -->
        <p class="review-body" :class="{ truncated: !expanded.has(r.id) && r.body.length > 220 }">
          {{ r.body }}
        </p>
        <button v-if="r.body.length > 220" class="expand-btn" @click="toggleExpand(r.id)">
          {{ expanded.has(r.id) ? 'Show less ↑' : 'Read more ↓' }}
        </button>

        <!-- Photos -->
        <div v-if="r.pictures.length" class="review-photos">
          <img v-for="(pic, pi) in r.pictures.slice(0, 4)" :key="pi" :src="pic" class="review-photo" loading="lazy" />
        </div>

        <!-- Reviewer -->
        <div class="reviewer-row">
          <div class="reviewer-avatar">{{ r.reviewer.name.charAt(0).toUpperCase() }}</div>
          <div>
            <p class="reviewer-name">{{ r.reviewer.name }}</p>
            <p v-if="r.reviewer.location" class="reviewer-location">{{ r.reviewer.location }}</p>
          </div>
          <div v-if="r.reviewer.verified" class="verified-badge">
            <Check :size="10" />
            Verified Purchase
          </div>
        </div>
      </div>
    </div>

    <!-- Load more -->
    <div v-if="hasMore" class="load-more-wrap">
      <button @click="loadMore" class="load-more-btn" :disabled="loading">
        <ChevronDown v-if="!loading" :size="14" />
        <span>{{ loading ? 'Loading...' : 'Load More Reviews' }}</span>
      </button>
    </div>

    <!-- Write a review CTA -->
    <div v-if="total > 0" class="write-review-wrap">
      <a :href="`https://judge.me/reviews/new?shop=${encodeURIComponent('state-of-resonance.myshopify.com')}&handle=${handle}`" target="_blank" rel="noopener" class="write-review-link">
        Write a Review →
      </a>
    </div>

  </section>
</template>

<style scoped>
.reviews-section {
  margin-top: 6vh;
  padding-top: 6vh;
  border-top: 1px solid rgba(212, 175, 55, 0.12);
}

/* Header */
.reviews-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.reviews-meta {
  flex: 1;
}

.reviews-eyebrow {
  display: block;
  font-size: 0.55rem;
  letter-spacing: 0.35em;
  color: var(--color-gold-muted);
  opacity: 0.7;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.reviews-aggregate {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.agg-stars {
  display: flex;
  gap: 2px;
}

.agg-star {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.15);
  line-height: 1;
}

.agg-star.filled {
  color: #d4af37;
}

.agg-score {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
}

.agg-count {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.05em;
}

/* Rating bars */
.rating-bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.rating-bar-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.bar-label {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.45);
  width: 1.5rem;
  text-align: right;
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #d4af37;
  border-radius: 2px;
  transition: width 0.6s ease;
}

.bar-count {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
  width: 1rem;
  flex-shrink: 0;
}

/* Skeleton */
.reviews-skeleton {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skeleton-card {
  height: 160px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.04);
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

/* Empty */
.reviews-empty {
  text-align: center;
  padding: 4rem 0;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Review list */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-card {
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.3s;
}

.review-card:hover {
  border-color: rgba(212, 175, 55, 0.18);
}

/* Stars + date */
.review-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.review-stars {
  display: flex;
  gap: 2px;
}

.rev-star {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.1);
}

.rev-star.filled {
  color: #d4af37;
}

.review-date {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.05em;
}

.review-title {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: 0.02em;
}

.review-body {
  font-size: 0.82rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0.5rem;
}

.review-body.truncated {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.expand-btn {
  background: none;
  border: none;
  color: var(--color-gold-muted);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1rem;
  transition: color 0.2s;
}

.expand-btn:hover { color: var(--color-gold); }

/* Review photos */
.review-photos {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.review-photo {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Reviewer */
.reviewer-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  flex-wrap: wrap;
}

.reviewer-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-gold);
  flex-shrink: 0;
}

.reviewer-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.05em;
}

.reviewer-location {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
}

.verified-badge {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  color: #4ade80;
  opacity: 0.8;
  text-transform: uppercase;
}

/* Load more */
.load-more-wrap {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

.load-more-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more-btn:hover:not(:disabled) {
  border-color: rgba(212, 175, 55, 0.3);
  color: var(--color-gold);
}

.load-more-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Write review link */
.write-review-wrap {
  margin-top: 2rem;
  text-align: center;
}

.write-review-link {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2px;
  transition: all 0.3s;
}

.write-review-link:hover {
  color: var(--color-gold);
  border-color: var(--color-gold);
}

@media (max-width: 768px) {
  .reviews-header {
    flex-direction: column;
    gap: 2rem;
  }

  .rating-bars {
    min-width: unset;
    width: 100%;
  }

  .review-card {
    padding: 1.5rem;
  }
}
</style>
