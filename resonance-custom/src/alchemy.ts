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

// Custom Cursor (Shared Logic)
const cursor = document.querySelector('.custom-cursor') as HTMLElement;
document.addEventListener('mousemove', (e) => {
  if (cursor) {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  }
});

const renderAlchemyFeed = () => {
    const grid = document.querySelector('#alchemy-grid');
    if (!grid) return;

    grid.innerHTML = products
        .filter(p => p.category === 'Alchemy' || (p.collections && p.collections.includes('Alchemical Elixirs')))
        .map(p => renderProductCard(p)).join('');

    // Animate entries
    ScrollTrigger.refresh();
    
    gsap.to('#alchemy-grid .product-card', {
        scrollTrigger: { trigger: '#alchemy-grid', start: 'top 80%' },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Hover effects and Acquire click logic mapping
    initCheckoutLinks();
};

if (document.readyState === 'complete') {
    renderAlchemyFeed();
} else {
    window.addEventListener('load', renderAlchemyFeed);
}
