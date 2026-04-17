<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { 
  Sparkles, 
  Search, 
  ShoppingBag, 
  Crown, 
  BookOpen, 
  Instagram, 
  Music2, 
  Twitter,
  ChevronRight
} from 'lucide-vue-next'

const links = [
  {
    title: 'THE FREQUENCY QUIZ',
    subtitle: 'Synchronize your field & find your piece.',
    url: '/quiz',
    icon: Sparkles,
    highlight: true
  },
  {
    title: 'THE SANCTUARY',
    subtitle: 'Explore the full piece collection.',
    url: '/shop',
    icon: Search
  },
  {
    title: 'GHOST & BONES ATTIRE',
    subtitle: 'Limited run frequency-wear.',
    url: '/collections/the-ghost-and-bones',
    icon: ShoppingBag
  },
  {
    title: '✦ INNER CIRCLE',
    subtitle: 'Restricted access & priority drops.',
    url: '/inner-circle',
    icon: Crown
  },
  {
    title: 'THE VOID TRANSMISSIONS',
    subtitle: 'Read our latest esoteric manuscripts.',
    url: '/transmissions',
    icon: BookOpen
  }
]

onMounted(() => {
  gsap.from('.contact-container > *', {
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.15,
    ease: 'expo.out'
  })

  // Subtle background pulse
  gsap.to('.bg-glow', {
    opacity: 0.4,
    scale: 1.2,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})
</script>

<template>
  <div class="contact-view">
    <div class="bg-glow"></div>
    
    <div class="contact-container">
      <!-- Profile Header -->
      <header class="contact-header">
        <router-link to="/" class="brand-logo">
          RESONANCE
        </router-link>
        <p class="brand-tagline">ESOTERIC LUXURY SANCTUARY · CANADA</p>
      </header>

      <!-- Follow CTA -->
      <div class="follow-incentive glass">
        <div class="incentive-content">
          <span class="incentive-eyebrow">VOID PROTOCOL ACTIVE</span>
          <h2 class="incentive-title">Follow for Digital Rituals</h2>
          <p class="incentive-text">
            Join the shop on social for weekly tarot pulls and exclusive 11:11 drop alerts.
          </p>
          <div class="social-quick-links">
            <a href="https://instagram.com/resonancestateof" target="_blank" class="social-pill ig">
              <Instagram :size="16" /> Instagram
            </a>
            <a href="https://tiktok.com/@stateofresonance" target="_blank" class="social-pill tt">
              <Music2 :size="16" /> TikTok
            </a>
          </div>
        </div>
      </div>

      <!-- Links Grid -->
      <div class="links-list">
        <router-link 
          v-for="link in links" 
          :key="link.title" 
          :to="link.url"
          class="link-card glass"
          :class="{ 'link-highlight': link.highlight }"
        >
          <div class="link-icon-wrapper">
            <component :is="link.icon" :size="20" stroke-width="1.5" />
          </div>
          <div class="link-text">
            <h3 class="link-title">{{ link.title }}</h3>
            <p class="link-subtitle">{{ link.subtitle }}</p>
          </div>
          <ChevronRight class="link-arrow" :size="18" />
        </router-link>
      </div>

      <!-- Footer Info -->
      <footer class="contact-footer">
        <p class="construction-id">SIGNAL: 963HZ · STATUS: SYNCHRONIZED</p>
        <div class="footer-links">
          <router-link to="/">Home</router-link>
          <span>·</span>
          <router-link to="/shop">Store</router-link>
          <span>·</span>
          <router-link to="/transmissions">Manuscripts</router-link>
        </div>
        <p class="copy">© 2026 STATE OF RESONANCE</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.contact-view {
  min-height: 100dvh;
  background: var(--color-obsidian);
  color: var(--color-foreground);
  padding: 4rem 1.5rem 6rem;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.bg-glow {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vw;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
}

.contact-container {
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 1rem;
}

.brand-logo {
  font-family: var(--font-heading);
  font-size: 2rem;
  letter-spacing: 0.3em;
  color: var(--color-gold);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
}

.brand-tagline {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  opacity: 0.5;
  text-transform: uppercase;
}

/* Follow Incentive */
.follow-incentive {
  padding: 2rem;
  text-align: center;
  border-color: rgba(212, 175, 55, 0.2);
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
}

.incentive-eyebrow {
  display: block;
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.incentive-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.incentive-text {
  font-size: 0.85rem;
  line-height: 1.6;
  opacity: 0.6;
  margin-bottom: 2rem;
}

.social-quick-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--glass-border);
  border-radius: 100px;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  transition: all 0.3s var(--ease-out-expo);
}

.social-pill:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
  transform: translateY(-2px);
}

/* Links List */
.links-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  gap: 1.25rem;
  text-decoration: none;
  transition: all 0.4s var(--ease-out-expo);
  border: 1px solid var(--glass-border);
}

.link-card:hover {
  transform: scale(1.02);
  border-color: rgba(212, 175, 55, 0.4);
  background: rgba(212, 175, 55, 0.02);
}

.link-highlight {
  border-color: rgba(212, 175, 55, 0.5);
  background: rgba(212, 175, 55, 0.05);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.05);
}

.link-icon-wrapper {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
}

.link-text {
  flex-grow: 1;
  text-align: left;
}

.link-title {
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  margin-bottom: 0.25rem;
  color: #fff;
  text-transform: uppercase;
}

.link-subtitle {
  font-size: 0.7rem;
  opacity: 0.4;
  letter-spacing: 0.05em;
}

.link-arrow {
  opacity: 0.3;
  transition: transform 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(4px);
  opacity: 0.8;
  color: var(--color-gold);
}

/* Footer */
.contact-footer {
  text-align: center;
  margin-top: 2rem;
  opacity: 0.4;
}

.construction-id {
  font-size: 0.5rem;
  letter-spacing: 0.4em;
  margin-bottom: 2rem;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}

.footer-links a:hover {
  color: var(--color-gold);
}

.copy {
  font-size: 0.55rem;
  letter-spacing: 0.2em;
}

@media (max-width: 480px) {
  .contact-view {
    padding: 3rem 1rem 5rem;
  }
}
</style>
