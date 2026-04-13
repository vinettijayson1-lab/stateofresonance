import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
// Alchemy is deprecated in favor of Contact

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/best-sellers',
      name: 'BestSellers',
      component: () => import('./views/BestSellers.vue')
    },
    {
      path: '/sanctuary',
      redirect: '/best-sellers'
    },
    {
      path: '/attire',
      name: 'Attire',
      component: () => import('./views/Category.vue')
    },
    {
      path: '/manuscripts',
      name: 'Manuscripts',
      component: () => import('./views/Category.vue')
    },
    {
      path: '/alchemy',
      redirect: '/contact'
    },
    {
      path: '/transmissions',
      name: 'Transmissions',
      component: () => import('./views/Transmissions.vue')
    },
    {
      path: '/transmissions/:slug',
      name: 'TransmissionDetail',
      component: () => import('./views/TransmissionDetail.vue')
    },
    {
      path: '/collections/:handle',
      name: 'Collection',
      component: () => import('./views/Collection.vue')
    },
    {
      path: '/product/:handle',
      name: 'Product',
      component: () => import('./views/Product.vue')
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('./views/Checkout.vue')
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: () => import('./views/Quiz.vue')
    },
    {
      path: '/resonance',
      name: 'Resonance',
      component: () => import('./views/Resonance.vue')
    },
    {
      path: '/sync-event',
      name: 'SyncEvent',
      component: () => import('./views/SyncEvent.vue')
    },
    {
      path: '/gate',
      name: 'Gate',
      component: () => import('./views/PasswordGate.vue')
    },
    {
      path: '/success',
      name: 'Success',
      component: () => import('./views/Success.vue')
    },
    {
      path: '/locked',
      name: 'LockedGate',
      component: () => import('./views/LockedGate.vue')
    },
    {
      path: '/inner-circle',
      name: 'InnerCircle',
      component: () => import('./views/InnerCircle.vue')
    },
    {
      path: '/lookbook',
      name: 'Lookbook',
      component: () => import('./views/Lookbook.vue')
    },
    {
      path: '/omniscience',
      name: 'Omniscience',
      component: () => import('./views/Omniscience.vue')
    },
    {
      path: '/alchemy/rituals',
      name: 'Rituals',
      component: () => import('./views/Rituals.vue')
    },
    {
      path: '/connect',
      redirect: '/contact'
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/alchemist',
      name: 'Alchemist',
      component: () => import('./views/AlchemistDashboard.vue'),
      beforeEnter: (_to, _from, next) => {
        const isMasterUnlocked = localStorage.getItem('sor_master_unlock') === 'active';
        if (isMasterUnlocked) next()
        else next('/lock')
      }
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('./views/Privacy.vue')
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('./views/Terms.vue')
    },
    {
      path: '/shipping-request',
      redirect: '/influencer-shipping'
    },
    {
      path: '/influencer-shipping',
      name: 'InfluencerShipping',
      component: () => import('./views/InfluencerFulfillment.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    },
    {
      path: '/poetry',
      name: 'Poetry',
      component: () => import('./views/Poetry.vue')
    },
    {
      path: '/lock',
      name: 'SiteLocker',
      component: () => import('./views/SiteLocker.vue')
    },
    {
      // 404 catch-all - redirect to home
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/'
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'auto' }
    }
  }
})

// === SEEKER REFERRAL INTERCEPTOR ===
router.beforeEach((to, _from, next) => {

  if (to.query.ref) {
    localStorage.setItem('sor_referred_by', to.query.ref as string);
  }
  next();
});

// === GLOBALS SEO ROUTING ===
const defaultMeta: Record<string, any> = {
  en: {
    title: 'State of Resonance | Esoteric Luxury Streetwear',
    description: "Premium ritualwear for those who dress with intention. Limited-run garments and symbolic objects — State of Resonance is Canada's esoteric luxury streetwear label.",
    robots: 'index, follow'
  },
  fr: {
    title: 'State of Resonance | Streetwear Ésotérique de Luxe',
    description: "Ritualwear de luxe pour ceux qui s'habillent avec intention. Vêtements en édition limitée — State of Resonance est l'étiquette de streetwear ésotérique de luxe du Canada.",
    robots: 'index, follow'
  }
}

const seoMap: Record<string, any> = {
  en: {
    'Home': {
      title: 'State of Resonance | Esoteric Occult Streetwear Canada',
      description: "Canada's #1 esoteric streetwear brand. Premium sacred geometry hoodies, occult graphic tees, and limited-drop apparel. Frequency-calibrated clothing — wear your vibration. Free shipping over $100 CAD.",
      robots: 'index, follow'
    },
    'BestSellers': {
      title: 'Best Selling Occult Streetwear | State of Resonance',
      description: 'Shop our most-loved esoteric streetwear pieces. Sacred geometry hoodies, occult graphic tees and limited-edition drops by State of Resonance. Free shipping over $100 CAD.',
      robots: 'index, follow'
    },
    'Attire': {
      title: 'Occult Streetwear Canada | Sacred Geometry Hoodies \u0026 Esoteric Tees | State of Resonance',
      description: 'Luxury occult streetwear made in Canada. Sacred geometry hoodies, esoteric graphic tees, and frequency-calibrated apparel. Limited drops — 50 pieces per run. Free shipping on orders over $100.'
    },
    'Transmissions': {
      title: 'Solfeggio Frequencies, Occult Lore \u0026 Esoteric Wisdom | State of Resonance Blog',
      description: 'Explore Solfeggio frequency science, sacred geometry, alchemical traditions, and esoteric philosophy. The Void Transmissions — knowledge for the modern seeker.'
    },
    'Collection': {
      title: 'Esoteric Streetwear Collections | State of Resonance',
      description: 'Browse exclusive limited-run clothing collections — sacred geometry hoodies, occult graphic tees, and frequency-calibrated apparel by State of Resonance.'
    },
    'Product': {
      title: 'Artifact Synchronizing... | State of Resonance',
      description: 'Loading frequency-calibrated artifact details.'
    },
    'Lookbook': {
      title: 'Refined Noir Lookbook | High-Fashion Esoteric Streetwear | State of Resonance',
      description: 'Experience the "Seers" collection. High-contrast visceral streetwear photography and esoteric modeling from the Void. Explore the next evolution of resonance.'
    },
    'Quiz': {
      title: 'Find Your Frequency | Esoteric Style Quiz | State of Resonance',
      description: 'Take the Frequency Quiz to discover which State of Resonance garment aligns with your current vibrational state.',
      robots: 'noindex, nofollow'
    },
    'Checkout': {
      title: 'Artifact Reservoir | State of Resonance',
      robots: 'noindex, nofollow'
    },
    'Resonance': {
      title: 'Signal Synchronized | State of Resonance',
      description: 'Welcome Seeker. Your field has been synchronized with the Void.',
      robots: 'noindex, nofollow'
    },
    'Gate': {
      title: 'Portal Locked | State of Resonance',
      description: 'The synchronization requires an access key.',
      robots: 'noindex, nofollow'
    },
    'Success': {
      title: 'Order Confirmed | State of Resonance',
      description: 'Your artifact has been synchronized. Thank you for your order.',
      robots: 'noindex, nofollow'
    },
    'LockedGate': {
      title: 'Signal Restricted | State of Resonance',
      description: 'The requested artifact requires an advanced resonance tier.',
      robots: 'noindex, nofollow'
    },
    'InnerCircle': {
      title: 'Inner Circle | Members-Only Drops | State of Resonance',
      description: 'Restricted access for authenticated seekers. Exclusive limited-run drops and high-frequency protocols.',
      robots: 'noindex, nofollow'
    },
    'Contact': {
      title: 'Contact State of Resonance | Customer Support \u0026 Orders',
      description: 'Reach the State of Resonance team for order support, sizing questions, and wholesale inquiries. Canada\'s premier esoteric streetwear label.',
      robots: 'index, follow'
    },
    'Alchemist': {
      title: 'Alchemical Ledger | Merchant Intelligence | State of Resonance',
      robots: 'noindex, nofollow'
    },
    'Omniscience': {
      title: 'The Omniscience | The Final Frequency | State of Resonance',
      description: 'Experience the ultimate convergence of matter and spirit. The frequency-locked singularity — the most powerful garment in the collection.',
      image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/omniscience_placeholder.png?v=1771234571'
    },
    'InfluencerShipping': {
      title: 'Fulfillment Sync | State of Resonance',
      description: 'Anchor your frequency. Complete the logistics sync for your laboratory artifacts.',
      robots: 'noindex, nofollow'
    },
    'About': {
      title: 'Our Story | State of Resonance — Esoteric Streetwear Canada',
      description: 'Discover the esoteric philosophy driving State of Resonance. Sacred geometry meets luxury streetwear. Made for seekers who dress with intention.',
      robots: 'index, follow'
    },
    'Poetry': {
      title: 'The Transmissions | Poetry by Jayson Vinetti',
      description: 'Poetry, songwriting, and visceral human exploration by the creator of State of Resonance.',
      robots: 'index, follow'
    }
  },
  fr: {
    'Home': defaultMeta.fr,
    'Sanctuary': {
      title: 'Boutique Ésotérique Canada | Outils de Rituel, Cristaux et Artefacts Sacrés | State of Resonance',
      description: 'Achetez des outils de rituel ésotériques, des grilles de cristaux, des décors de géométrie sacrée et des artefacts de sanctuaire. La meilleure boutique occulte au Canada pour des sanctuaires domestiques à haute vibration. Livraison gratuite dès 100 $ CAD.'
    },
    'Attire': {
      title: 'Streetwear Occulte Canada | Hoodies Ésotériques et T-shirts Spirituels | State of Resonance',
      description: 'Streetwear occulte de luxe fabriqué au Canada. Hoodies de géométrie sacrée, t-shirts graphiques ésotériques et vêtements calibrés en fréquence. Séries limitées — 50 pièces par édition. Livraison gratuite pour les commandes de plus de 100 $.'
    },
    'Manuscripts': {
      title: 'Livres Ésotériques Canada | Manuscrits Occultes et Textes Spirituels | State of Resonance',
      description: 'Livres ésotériques rares, manuscrits occultes, grimoires et textes spirituels. Découvrez la sagesse sacrée du premier sanctuaire ésotérique au Canada.'
    },
    'Alchemy': {
      title: 'Apothicaire Naturel Canada | Herbes de Rituel, Fumée Sacrée et Élixirs Botaniques | State of Resonance',
      description: 'Achetez des herbes de rituel, des bâtons de fumigation sacrés, des élixirs botaniques et de la médecine végétale alchimique. Source éthique, adaptée aux fréquences de votre pratique. Livraison gratuite dès 100 $ CAD.'
    },
    'Transmissions': {
      title: 'Fréquences Solfège, Savoir Occulte et Sagesse Ésotérique | Blog State of Resonance',
      description: 'Explorez la science des fréquences Solfège, la géométrie sacrée, les traditions alchimiques et la philosophie ésotérique. Les Transmissions du Vide — un savoir pour le chercheur moderne.'
    },
    'Collection': {
      title: 'Collections Ésotériques Commissariées Canada | State of Resonance',
      description: 'Parcourez des collections ésotériques exclusives — vêtements sacrés, outils de rituel et artefacts alchimiques calibrés pour l\'ascension dimensionnelle.'
    },
    'Product': {
      title: 'Artefact en cours de synchronisation... | State of Resonance',
      description: 'Chargement des détails de l\'artefact calibré en fréquence.'
    },
    'Lookbook': {
      title: 'Lookbook Refined Noir | Streetwear Ésotérique Haute Couture | State of Resonance',
      description: 'Découvrez la collection "Seers". Photographie de streetwear viscérale à haut contraste et mannequinat ésotérique du Vide.'
    },
    'Quiz': {
      title: 'Trouvez votre fréquence | State of Resonance',
      description: 'Faites le Quiz de Fréquence pour découvrir quel artefact s\'aligne avec votre état vibratoire actuel.',
      robots: 'noindex, nofollow'
    },
    'Checkout': {
      title: 'Réservoir d\'Artefacts | State of Resonance',
      robots: 'noindex, nofollow'
    },
    'Resonance': {
      title: 'Signal Synchronisé | State of Resonance',
      description: 'Bienvenue Chercheur. Votre champ a été synchronisé avec le Vide.',
      robots: 'noindex, nofollow'
    },
    'Gate': {
      title: 'Portail Verrouillé | State of Resonance',
      description: 'La synchronisation nécessite une clé d\'accès.',
      robots: 'noindex, nofollow'
    },
    'Success': {
      title: 'Manifestation Confirmée | State of Resonance',
      description: 'Votre artefact a été synchronisé. Bienvenue dans le Cercle Intérieur.',
      robots: 'noindex, nofollow'
    },
    'LockedGate': {
      title: 'Signal Restreint | State of Resonance',
      description: 'L\'artefact demandé nécessite un niveau de résonance avancé. Veuillez vous authentifier.',
      robots: 'noindex, nofollow'
    },
    'InnerCircle': {
      title: 'Réservoir du Cercle Intérieur | State of Resonance',
      description: 'Accès restreint pour les chercheurs authentifiés. Artefacts exclusifs et protocoles de haute fréquence.',
      robots: 'noindex, nofollow'
    },
    'Contact': {
      title: 'Contactez le Sanctuaire | State of Resonance',
      description: 'La passerelle numérique officielle vers State of Resonance. Accédez aux outils de rituel, au Quiz de Fréquence et à nos dernières transmissions alchimiques.',
      robots: 'index, follow'
    },
    'Alchemist': {
      title: 'Grand Livre Alchimique | Intelligence Marchande | State of Resonance',
      robots: 'noindex, nofollow'
    },
    'Omniscience': {
      title: 'L\'Artefact d\'Omniscience | La Fréquence Finale | State of Resonance',
      description: 'Découvrez la convergence ultime de la matière et de l\'esprit. La singularité verrouillée en fréquence conçue pour une conscience dimensionnelle totale.',
      image: 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/omniscience_placeholder.png?v=1771234571'
    },
    'InfluencerShipping': {
      title: 'Synchronisation de l\'Expédition | State of Resonance',
      description: 'Ancrez votre fréquence. Complétez la synchronisation logistique pour vos artefacts de laboratoire.',
      robots: 'noindex, nofollow'
    }
  }
}



import { track } from '@vercel/analytics'

router.afterEach((to) => {
  // 1. Detect Current Locale (from localStorage, matching vue-i18n)
  const currentLang = localStorage.getItem('user-locale') || 'en'
  const langMapped = currentLang === 'fr' ? 'fr' : 'en'

  // Track SPA page views in Vercel Analytics on every route change
  track('pageview', { url: to.fullPath })

  // --- GLOBAL PIXEL SPA SYNCHRONIZATION ---
  if (typeof window !== 'undefined') {
    // Delay slightly to let page title render
    setTimeout(() => {
      // 1. Meta Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', 'PageView');
      }
      
      // 2. TikTok Pixel
      if ((window as any).ttq) {
        (window as any).ttq.page();
      }
      
      // 3. Google Analytics 4
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_path: to.fullPath,
          page_title: document.title
        });
      }
      
      // 4. Pinterest Tag
      if ((window as any).pintrk) {
        (window as any).pintrk('track', 'pagevisit');
      }
    }, 150);
  }

  // 2. Select Metadata based on language and route
  const langSeoMap = seoMap[langMapped] || seoMap.en
  const seoConfig = langSeoMap[to.name as string] || defaultMeta[langMapped]
  
  // Support dynamic meta from components via Route meta or params
  const title = (to.meta.title as string) || seoConfig.title || defaultMeta[langMapped].title
  const desc = (to.meta.description as string) || seoConfig.description || defaultMeta[langMapped].description
  const robots = seoConfig.robots || defaultMeta[langMapped].robots
  const url = `https://stateofresonance.ca${to.fullPath}`

  // 3. Update Document Title
  document.title = title
  
  // 4. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.setAttribute('content', desc)
  
  // 3. Update Robots
  let metaRobots = document.querySelector('meta[name="robots"]')
  if (metaRobots) {
    metaRobots.setAttribute('content', robots)
  } else {
    const el = document.createElement('meta')
    el.name = 'robots'
    el.content = robots
    document.head.appendChild(el)
  }

  // 4. Update Canonical (Strict, dropping query params to prevent duplicate content flags)
  let cleanUrl = url.split('?')[0]
  let linkCanonical = document.querySelector('link[rel="canonical"]')
  if (linkCanonical) {
    linkCanonical.setAttribute('href', cleanUrl)
  } else {
    const el = document.createElement('link')
    el.rel = 'canonical'
    el.href = cleanUrl
    document.head.appendChild(el)
  }

  // 5. Update Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', title)
  
  let ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', desc)
  
  let ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) ogUrl.setAttribute('content', url)
  
  // 6. Update OG Image (Default: Seer Brand Hero)
  let ogImage = document.querySelector('meta[property="og:image"]')
  if (ogImage && !to.meta.image) {
    ogImage.setAttribute('content', 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/resonance_brand_seer_og_image_1774962124899.png')
  }
})

// --- HARDENED SPA CHUNK RECOVERY ---
router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module') || error.name === 'ChunkLoadError') {
    // Force a hard reload if the user's cached chunk hashes no longer match the latest deployment
    window.location.href = to.fullPath
  }
})

export default router
