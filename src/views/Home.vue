<script setup lang="ts">
import { ref, onMounted } from 'vue';

// State
const email = ref('');
const isHovered = ref<number | null>(null);

// Products data
const products = [
  {
    id: 1,
    name: 'Threshold Hoodie',
    subtitle: 'Cipher Series',
    price: 112,
  },
  {
    id: 2,
    name: 'All-Seeing Eye Hoodie',
    subtitle: 'Symbolic Collection',
    price: 112,
  },
  {
    id: 3,
    name: 'Classic Crewneck',
    subtitle: 'Iconic Edition',
    price: 112,
  },
];

const features = [
  {
    title: '450GSM Weight',
    description: 'Thick, structured fabric you feel immediately. Holds shape over time.',
  },
  {
    title: 'Designed in Canada',
    description: 'Every piece is developed locally with attention to detail and fit.',
  },
  {
    title: 'Limited Runs',
    description: "No mass production. Small drops only — once sold out, they're gone.",
  },
  {
    title: 'Symbolic Design',
    description: 'Minimal graphics inspired by sacred geometry and timeless motifs.',
  },
];

// Email submission
const handleEmailSubmit = async () => {
  if (!email.value) return;

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value }),
    });

    if (response.ok) {
      alert('Welcome! Check your email for your 30% discount code.');
      email.value = '';
    }
  } catch (error) {
    console.error('Subscription error:', error);
  }
};

// Scroll animations - only run in browser
onMounted(() => {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  const sections = document.querySelectorAll('.observe-fade');
  sections.forEach((section) => observer.observe(section));
});
</script>

<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          STATE OF<br />RESONANCE
        </h1>
        <p class="hero-subtitle">
          450GSM heavyweight streetwear built for structure, presence, and longevity.
        </p>
        <p class="hero-supporting">
          Designed in Canada. Limited-run drops. Made to be kept.
        </p>
        <div class="hero-ctas">
          <router-link to="/shop" class="cta-primary">
            SHOP COLLECTION →
          </router-link>
          <router-link to="/lookbook" class="cta-secondary">
            VIEW LOOKBOOK →
          </router-link>
        </div>
      </div>
      <div class="hero-image">
        <div class="hero-image-overlay" />
      </div>
    </section>

    <!-- Trust Strip -->
    <div class="trust-strip">
      <div class="trust-item">
        <span class="stars">★★★★★</span>
        <span>Rated by early supporters</span>
      </div>
      <div class="trust-divider" />
      <div class="trust-item">
        <span>🚚</span>
        <span>Free shipping on $110+</span>
      </div>
      <div class="trust-divider" />
      <div class="trust-item">
        <span>↩️</span>
        <span>30-day returns</span>
      </div>
      <div class="trust-divider" />
      <div class="trust-item">
        <span>🇨🇦</span>
        <span>Ships from Canada</span>
      </div>
    </div>

    <!-- Featured Product -->
    <section class="featured-product observe-fade">
      <div class="featured-grid">
        <div class="featured-image">
          <div class="image-placeholder" />
        </div>
        <div class="featured-details">
          <span class="featured-label">FEATURED</span>
          <h2 class="featured-title">The Foundation Tee</h2>
          <p class="featured-price">$45 CAD</p>
          <ul class="featured-specs">
            <li>450GSM heavyweight cotton</li>
            <li>Structured, boxy fit that holds shape</li>
            <li>Minimal symbolic embroidery</li>
            <li>Designed for everyday wear</li>
          </ul>
          <p class="featured-tagline">
            Built to feel substantial from day one — not thin, not disposable.
          </p>
          <router-link to="/product/foundation-tee" class="cta-primary">
            SHOP FOUNDATION →
          </router-link>
        </div>
      </div>
    </section>

    <!-- Collection -->
    <section class="collection observe-fade">
      <div class="collection-header">
        <h2 class="section-title">The Collection</h2>
        <p class="section-subtitle">
          Heavyweight essentials and symbolic pieces. Produced in limited runs.
        </p>
      </div>
      <div class="product-grid">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
          @mouseenter="isHovered = product.id"
          @mouseleave="isHovered = null"
        >
          <div class="product-image">
            <div class="image-placeholder" />
            <button v-if="isHovered === product.id" class="quick-shop">
              QUICK SHOP
            </button>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-subtitle">{{ product.subtitle }}</p>
            <p class="product-price">${{ product.price }} CAD</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Differentiation -->
    <section class="differentiation observe-fade">
      <h2 class="section-title">Crafted for Presence</h2>
      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="social-proof observe-fade">
      <h2 class="section-title">Worn in the Real World</h2>
      <div class="testimonials">
        <div class="testimonial-card">
          <div class="testimonial-image" />
          <p class="testimonial-text">
            "Heavyweight is real. Fit is perfect. Easily my favorite tee."
          </p>
          <p class="testimonial-author">— Verified Customer</p>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-image" />
          <p class="testimonial-text">
            "Quality you can feel. Finally found streetwear that actually lasts."
          </p>
          <p class="testimonial-author">— Verified Customer</p>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-image" />
          <p class="testimonial-text">
            "The structure is insane. This isn't your average hoodie."
          </p>
          <p class="testimonial-author">— Verified Customer</p>
        </div>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="brand-story observe-fade">
      <div class="story-content">
        <h2 class="section-title">The Origin</h2>
        <div class="story-text">
          <p>
            State of Resonance was built on a simple idea: what you wear should feel
            intentional.
          </p>
          <p>
            We focus on weight, structure, and symbolism — creating pieces that stand
            apart from disposable fashion.
          </p>
          <p>
            This is not fast fashion. This is apparel designed to last and to mean
            something.
          </p>
        </div>
        <router-link to="/about" class="cta-secondary"> READ MORE → </router-link>
      </div>
    </section>

    <!-- Email Capture -->
    <section class="email-capture observe-fade">
      <div class="email-content">
        <h2 class="email-title">Unlock Private Access</h2>
        <p class="email-subtitle">
          Get 30% off your first order + early access to limited drops.
        </p>
        <form class="email-form" @submit.prevent="handleEmailSubmit">
          <input
            v-model="email"
            type="email"
            placeholder="Enter email"
            class="email-input"
            required
          />
          <button type="submit" class="email-button">UNLOCK →</button>
        </form>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta">
      <p class="final-cta-text">Limited-run releases. No restocks guaranteed.</p>
      <router-link to="/shop" class="cta-primary large"> SHOP NOW → </router-link>
    </section>
  </div>
</template>

<style scoped>
.homepage {
  background: #0a0a0a;
  color: #ffffff;
  min-height: 100vh;
}

/* Hero */
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 2rem;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 0.9;
  margin-bottom: 2rem;
  text-transform: uppercase;
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 300;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-supporting {
  font-size: 0.875rem;
  opacity: 0.6;
  letter-spacing: 1px;
  margin-bottom: 3rem;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.hero-image {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
}

/* Buttons */
.cta-primary {
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  text-decoration: none;
}

.cta-primary:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.cta-primary.large {
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
}

.cta-secondary {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  text-decoration: none;
}

.cta-secondary:hover {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
}

/* Trust Strip */
.trust-strip {
  background: #0f0f0f;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.8;
}

.stars {
  color: #ffd700;
}

.trust-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
}

/* Featured Product */
.featured-product {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.featured-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.featured-image {
  position: relative;
  aspect-ratio: 3/4;
}

.featured-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  opacity: 0.5;
  display: block;
  margin-bottom: 1rem;
}

.featured-title {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 1rem;
}

.featured-price {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.featured-specs {
  list-style: none;
  margin-bottom: 2rem;
  padding: 0;
}

.featured-specs li {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.938rem;
  opacity: 0.8;
}

.featured-tagline {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.7;
  margin-bottom: 2rem;
  font-style: italic;
}

/* Collection */
.collection {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.collection-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1rem;
  opacity: 0.6;
  max-width: 600px;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.product-card {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  position: relative;
  aspect-ratio: 3/4;
  margin-bottom: 1rem;
  overflow: hidden;
}

.quick-shop {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  animation: slideUp 0.3s ease-out;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.product-subtitle {
  font-size: 0.875rem;
  opacity: 0.5;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1rem;
  font-weight: 300;
}

/* Differentiation */
.differentiation {
  background: #0f0f0f;
  padding: 8rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.differentiation .section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.feature-card {
  text-align: center;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.feature-description {
  font-size: 0.938rem;
  line-height: 1.6;
  opacity: 0.7;
}

/* Social Proof */
.social-proof {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.social-proof .section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: #0f0f0f;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.testimonial-image {
  aspect-ratio: 1;
  background: #1a1a1a;
  margin-bottom: 1.5rem;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
}

.testimonial-author {
  font-size: 0.875rem;
  opacity: 0.5;
}

/* Brand Story */
.brand-story {
  background: #0f0f0f;
  padding: 8rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.story-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.story-content .section-title {
  margin-bottom: 2rem;
}

.story-text {
  margin-bottom: 3rem;
}

.story-text p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

/* Email Capture */
.email-capture {
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 2rem;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.email-title {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 1rem;
}

.email-subtitle {
  font-size: 1rem;
  opacity: 0.6;
  margin-bottom: 2rem;
}

.email-form {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.email-input {
  flex: 1;
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 1rem 1.5rem;
  font-size: 0.938rem;
  outline: none;
  transition: border-color 0.3s;
}

.email-input:focus {
  border-color: rgba(255, 255, 255, 0.5);
}

.email-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.email-button {
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.email-button:hover {
  background: #e0e0e0;
}

/* Final CTA */
.final-cta {
  background: #0f0f0f;
  padding: 6rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.final-cta-text {
  font-size: 1.125rem;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
  opacity: 0.8;
}

/* Placeholders */
.image-placeholder,
.testimonial-image {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.image-placeholder::after,
.testimonial-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 70%
  );
  background-size: 200% 200%;
  animation: shimmer 3s infinite;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Fade in visible class */
.fade-in-visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Responsive */
@media (max-width: 968px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .email-form {
    flex-direction: column;
  }

  .trust-strip {
    gap: 1rem;
  }

  .trust-divider {
    display: none;
  }

  .featured-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
