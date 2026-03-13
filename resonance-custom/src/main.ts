import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { products, renderProductCard, initCheckoutLinks } from './products'
import { initStickyCart } from './components/sticky-cart'
import { initFreeShippingBar } from './components/free-shipping-bar'
import { initTrustBadges } from './components/trust-badges'
import { initInstagramFeed } from './components/instagram-feed'
import { initEmailPopup } from './components/email-popup'
import { initChatWidget } from './components/chat-widget'

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger)

// Initialize Smooth Scrolling (Lenis)
const lenis = new Lenis()

// Synchronize ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Rendering and Animations Function
const initApp = () => {
  console.log("State of Resonance: Initializing Sanctuary...");

  // Render Products
  const clothingGrid = document.querySelector('#clothing-grid');
  const esotericGrid = document.querySelector('#esoteric-grid');

  if (clothingGrid) {
    clothingGrid.innerHTML = products
      .filter(p => p.type === 'clothing')
      .map(p => renderProductCard(p))
      .join('');
  }

  if (esotericGrid) {
    esotericGrid.innerHTML = products
      .filter(p => p.type === 'esoteric')
      .map(p => renderProductCard(p))
      .join('');
  }

  // Initialize App Features
  initFreeShippingBar();
  initStickyCart();
  initTrustBadges();
  initInstagramFeed();
  initEmailPopup();
  initChatWidget();

  // FORCE ScrollTrigger Refresh after rendering content
  ScrollTrigger.refresh();

  // Hover states for cursor
  const cursor = document.querySelector('.custom-cursor') as HTMLElement;
  document.querySelectorAll('a, button, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor?.classList.add('cursor-hover');
      gsap.to(cursor, { scale: 3, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      cursor?.classList.remove('cursor-hover');
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
  });

  // Handle "Acquire" clicks - Deep link into Shopify
  initCheckoutLinks();

  // Custom Cursor Mouse Listener
  document.addEventListener('mousemove', (e) => {
    if (cursor) {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    }
  });

  // Entrance Animations
  const tl = gsap.timeline();
  tl.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power4.out"
  })
  .to('.hero-subtitle', {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.8")
  .to('.btn-premium', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.4");

  // Navigation Logic for "Enter the Void"
  const enterBtn = document.querySelector('.hero .btn-premium');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      gsap.to('main', { opacity: 0, duration: 0.5, onComplete: () => {
        window.location.href = '/void.html';
      }});
    });
  }

  // Scroll Reveal Animations - Manifesto
  gsap.to('#manifesto .container > *', {
    scrollTrigger: {
      trigger: '#manifesto',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
  });

  // Staggered Reveal for Clothing
  if (document.querySelector('#clothing-grid')) {
    gsap.to('#clothing-grid .product-card', {
      scrollTrigger: {
        trigger: '#clothing-grid',
        start: 'top 80%',
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }

  // Staggered Reveal for Esoteric
  if (document.querySelector('#esoteric-grid')) {
    gsap.to('#esoteric-grid .product-card', {
      scrollTrigger: {
        trigger: '#esoteric-grid',
        start: 'top 80%',
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }

  // Mobile Menu Toggle Logic
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }
};

// Start the app when ready
if (document.readyState === 'complete') {
  initApp();
} else {
  window.addEventListener('load', initApp);
}
