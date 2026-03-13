import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)

const cursor = document.querySelector('.custom-cursor') as HTMLElement;
document.addEventListener('mousemove', (e) => {
  if (cursor) {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  }
});

const collections = [
    {
        name: 'Earth Relics',
        image: '/assets/earth_relics_collection.png',
        handle: 'earth-relics',
        description: 'Crystals, Minerals & Tumbled Stones'
    },
    {
        name: 'Sacred Adornments',
        image: '/assets/amulets_collection.png',
        handle: 'sacred-adornments',
        description: 'Metaphysical Jewelry & Protective Talismans'
    },
    {
        name: 'Alchemical Botanicals',
        image: '/assets/alchemical_botanicals_collection.png',
        handle: 'alchemical-botanicals',
        description: 'Sacred Herbs, Resins & Botanical Offerings'
    },
    {
        name: 'Alchemical Elixirs',
        image: '/assets/alchemy_collection.png',
        handle: 'alchemical-elixirs',
        description: 'Vibrational Oils & Ritual Essences'
    },
    {
        name: 'Sacred Smoke',
        image: '/assets/sacred_smoke_collection.png',
        handle: 'sacred-smoke',
        description: 'Premium Incense & Smudging Tools'
    },
    {
        name: 'Illuminations',
        image: '/assets/candles_collection.png',
        handle: 'illuminations',
        description: 'Intentional Candles & Sacred Wax'
    },
    {
        name: 'Ritual Tools',
        image: '/assets/ritual_tools_collection.png',
        handle: 'ritual-tools',
        description: 'Masterpieces of Transition & Forged Intent'
    },
    {
        name: 'Esoteric Manuscripts',
        image: '/assets/manuscripts_collection.png',
        handle: 'esoteric-manuscripts',
        description: 'Ancient Texts, Journals & Guided Vessels'
    },
    {
        name: 'Divination Tools',
        image: '/assets/divination_tools_collection.png',
        handle: 'divination-tools',
        description: 'Tarot, Oracles & Celestial Alignment'
    },
    {
        name: 'Shrine Artifacts',
        image: '/assets/shrine_artifacts_collection.png',
        handle: 'shrine-artifacts',
        description: 'Statues, Altars & Sacred Space enhancements'
    }
];

const renderSanctuaryCollections = () => {
    const grid = document.querySelector('#sanctuary-grid');
    if (!grid) return;

    grid.innerHTML = collections.map(col => `
        <div class="product-card glass fade-in-scroll" style="cursor: pointer;" onclick="window.location.href='/collection.html?collection=${col.handle}'">
            <div class="product-image-container skeleton">
                <img src="${col.image}" 
                     alt="${col.name}" 
                     class="product-image" 
                     loading="lazy" 
                     onload="this.parentElement.classList.remove('skeleton')"
                     onerror="this.src='/assets/placeholder.png'; this.parentElement.classList.remove('skeleton')" />
                <div class="collection-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                    <span style="color: white; border: 1px solid white; padding: 10px 20px; font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Enter Collection</span>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">Sanctuary</span>
                <h3 class="product-title">${col.name}</h3>
                <p style="color: var(--color-foreground-muted); font-size: 0.8rem; letter-spacing: 0.1em; margin-top: 10px;">${col.description}</p>
            </div>
        </div>
    `).join('');

    // Add hover effect logic for overlay
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.collection-overlay') as HTMLElement;
            if (overlay) overlay.style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.collection-overlay') as HTMLElement;
            if (overlay) overlay.style.opacity = '0';
        });
    });

    ScrollTrigger.refresh();
    
    gsap.to('#sanctuary-grid .product-card', {
        scrollTrigger: { trigger: '#sanctuary-grid', start: 'top 80%' },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
};

if (document.readyState === 'complete') {
    renderSanctuaryCollections();
} else {
    window.addEventListener('load', renderSanctuaryCollections);
}
