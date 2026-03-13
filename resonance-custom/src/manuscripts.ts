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

const renderManuscriptsFeed = () => {
    const grid = document.querySelector('#manuscripts-grid');
    if (!grid) return;

    grid.innerHTML = products
        .filter(p => p.id === 'm001' || p.id === 'm002')
        .map(p => renderProductCard(p)).join('');

    ScrollTrigger.refresh();
    
    gsap.to('#manuscripts-grid .product-card', {
        scrollTrigger: { trigger: '#manuscripts-grid', start: 'top 80%' },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    initCheckoutLinks();
};

if (document.readyState === 'complete') {
    renderManuscriptsFeed();
} else {
    window.addEventListener('load', renderManuscriptsFeed);
}
