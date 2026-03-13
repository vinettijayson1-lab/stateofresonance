import './style.css'
import gsap from 'gsap'
import Lenis from 'lenis'
import { products, initCheckoutLinks } from './products'
import { trackEvent } from './analytics'

const lenis = new Lenis()
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)

const cursor = document.querySelector('.custom-cursor') as HTMLElement;
document.addEventListener('mousemove', (e) => {
  if (cursor) {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  }
});

const renderProductDetails = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const container = document.querySelector('#product-info-container');
    const mediaContainer = document.querySelector('#product-media-container');
    
    if (!productId || !container || !mediaContainer) {
        if(container) container.innerHTML = "<h1>Artifact Not Found</h1>";
        return;
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = "<h1>Artifact Not Found</h1><p>The requested frequency could not be located.</p>";
        return;
    }

    // Set Document Title
    document.title = `${product.title} | State of Resonance`;

    // Render Media
    mediaContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="width: 100%; height: auto; display: block; filter: brightness(0.9) contrast(1.1);" />
    `;

    // Render Info
    container.innerHTML = `
        <div class="urgency-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Only 3 left in this frequency
        </div>
        <span style="color: var(--color-gold-muted); text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.9rem;">${product.category}</span>
        <h1 style="font-family: var(--font-heading); font-size: 4rem; line-height: 1.1; font-weight: 300; margin: 0;">${product.title}</h1>
        <p style="font-size: 1.5rem; color: #fff; margin: 0; font-family: var(--font-body);">${product.price}</p>
        
        <div style="width: 100px; height: 1px; background: rgba(255,255,255,0.2); margin: 20px 0;"></div>
        
        <p style="font-size: 1.1rem; line-height: 1.8; color: #aaa; max-width: 500px;">
            ${product.description}
        </p>

        <div class="quantity-selector">
            <button class="qty-btn minus">-</button>
            <input type="text" value="1" class="qty-input" readonly />
            <button class="qty-btn plus">+</button>
        </div>
        
        <div style="margin-top: 20px;">
            <button class="btn-premium acquire-btn" style="width: 100%; max-width: 300px; padding: 20px;" data-handle="${product.handle}" data-variant="${product.variantId || ''}">
                Acquire Artifact
            </button>
        </div>

        <div class="value-props">
            <div class="prop-item">
                <span class="prop-title">Sacred Quality</span>
                <p class="prop-desc">Each artifact is cleansed or tuned to its intended vibration before fulfillment.</p>
            </div>
            <div class="prop-item">
                <span class="prop-title">Fulfillment</span>
                <p class="prop-desc">Processed within 24-48 business hours. Tracked shipping from Canada.</p>
            </div>
        </div>

        <div class="shipping-info-section glass" style="margin-top: 30px; padding: 20px; border: 1px solid rgba(197, 160, 89, 0.2);">
            <h3 style="font-family: var(--font-heading); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 15px; color: var(--color-gold-muted);">Fulfillment & Shipping (Est.)</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
                <span style="color: #888;">Canada</span>
                <span style="color: #fff; font-weight: 500;">${product.type === 'clothing' ? (product.price.includes('108') ? '$12.50+' : '$8.29+') : '$12.50+'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span style="color: #888;">USA</span>
                <span style="color: #fff; font-weight: 500;">${product.type === 'clothing' ? (product.price.includes('108') ? '$9.50+' : '$4.75+') : '$9.50+'}</span>
            </div>
        </div>

        <div class="reviews-section">
            <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 30px;">Customer Alignment</h2>
            <div class="review-card glass">
                <div class="review-stars">★★★★★</div>
                <p class="review-text">"The resonance from this artifact is palpable. My space feels transformed."</p>
                <div class="review-author">J. Vance, Toronto</div>
            </div>
            <div class="review-card glass">
                <div class="review-stars">★★★★★</div>
                <p class="review-text">"Beautifully crafted. Fast shipping to the UK. A true treasure."</p>
                <div class="review-author">M. Thorne, London</div>
            </div>
        </div>
    `;

    // Quantity Logic
    const qtyInput = container.querySelector('.qty-input') as HTMLInputElement;
    const minusBtn = container.querySelector('.minus');
    const plusBtn = container.querySelector('.plus');

    minusBtn?.addEventListener('click', () => {
        const val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = (val - 1).toString();
    });

    plusBtn?.addEventListener('click', () => {
        const val = parseInt(qtyInput.value);
        qtyInput.value = (val + 1).toString();
    });

    // Track ViewContent
    trackEvent('ViewContent', {
        content_name: product.title,
        content_category: product.category,
        content_ids: [product.id],
        content_type: 'product',
        value: parseFloat(product.price.replace(/[^0-9.]/g, '')),
        currency: 'CAD'
    });


    // Bind Checkout Logic to the newly rendered button
    setTimeout(() => {
        initCheckoutLinks();
    }, 100);

    // Finalize page

    // Initial Animation
    gsap.from(mediaContainer, { x: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(container.children, { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 });
};

if (document.readyState === 'complete') {
    renderProductDetails();
} else {
    window.addEventListener('load', renderProductDetails);
}
