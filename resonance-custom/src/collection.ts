import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { products, renderProductCard, initCheckoutLinks } from './products'

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

const renderCollection = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const collectionName = urlParams.get('collection');
    const grid = document.querySelector('#collection-grid');
    const titleEl = document.querySelector('#collection-title');
    const noProductsEl = document.querySelector('#no-products');

    if (!grid || !collectionName) return;

    if (titleEl) {
        titleEl.textContent = collectionName.replace(/-/g, ' ');
    }

    // Filter products. Note: In a real app we'd need better mapping, 
    // for now we filter by handle prefix or a custom mapping if needed.
    // However, the user wants collections from "The Way to Resonance".
    // I will mock the filtering based on the 'handle' or specific IDs for now,
    // or better, I should have a 'collection' field in the registry.
    
    const filteredProducts = products.filter(p => {
        const target = collectionName.toLowerCase();
        
        // Handle categories first
        if (p.category && p.category.toLowerCase() === target) return true;
        if (p.category === 'Sacred Smoke' && target === 'incense') return true;

        // Handle collection tags
        if (!p.collections) return false;
        
        // Map target handles to official collection names from the Way to Resonance
        if (target === 'candles') return p.collections.some(c => c.includes('Candle'));
        if (target === 'amulets') return p.collections.some(c => c.includes('Amulet') || c.includes('Adornment'));
        if (target === 'incense') return p.collections.some(c => c.includes('Smoke') || c.includes('Incense'));
        if (target === 'manuscripts') return p.collections.some(c => c.includes('Manuscript') || c.includes('Journal') || c.includes('Book'));
        if (target === 'alchemy') return p.collections.some(c => c.includes('Oil') || c.includes('Elixir') || c.includes('Essence'));
        
        return p.collections.some(c => c.toLowerCase() === target);
    });

    if (filteredProducts.length === 0) {
        if (noProductsEl) (noProductsEl as HTMLElement).style.display = 'block';
        return;
    }

    grid.innerHTML = filteredProducts
        .map(p => renderProductCard(p))
        .join('');

    ScrollTrigger.refresh();
    
    gsap.to('#collection-grid .product-card', {
        scrollTrigger: { trigger: '#collection-grid', start: 'top 80%' },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    initCheckoutLinks();
};

if (document.readyState === 'complete') {
    renderCollection();
} else {
    window.addEventListener('load', renderCollection);
}
