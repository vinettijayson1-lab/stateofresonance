import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

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

interface Article {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    link: string;
}

// Data from the previously generated SEO articles
const articles: Article[] = [
    {
        title: "The Ultimate Guide to Selecting Premium Sweatpants for Men",
        excerpt: "Discover the synthesis of high-end aesthetics and unparalleled comfort. We explore the fabric science and design principles behind true luxury loungewear.",
        date: "MARCH 2026",
        category: "ATTIRE",
        link: "https://stateofresonance.ca/blogs/news/premium-sweatpants-guide"
    },
    {
        title: "Understanding Healing Frequencies: How 432Hz Impacts Your Reality",
        excerpt: "Delve into the mathematics of the universe. Learn how specific tonal frequencies, like the 'Natural Pitch', can catalyze deep state alignment and reduce chaos.",
        date: "MARCH 2026",
        category: "ALCHEMY",
        link: "https://stateofresonance.ca/blogs/news/healing-frequencies-432hz"
    },
    {
        title: "Building the Perfect Gothic Wardrobe: A 2026 Style Guide",
        excerpt: "Moving beyond basic black. How to construct a sophisticated, esoteric-inspired wardrobe that commands attention while remaining fundamentally wearable.",
        date: "FEBRUARY 2026",
        category: "ATTIRE",
        link: "https://stateofresonance.ca/blogs/news/gothic-wardrobe-guide"
    },
    {
        title: "The Power of Sigil Magic in Modern Life",
        excerpt: "Ancient technology for the contemporary mind. An introduction to constructing and activating sigils for focus, protection, and targeted intention manifestation.",
        date: "JANUARY 2026",
        category: "RITUAL",
        link: "https://stateofresonance.ca/blogs/news/sigil-magic-intro"
    }
];

const renderBlogFeed = () => {
    const feed = document.querySelector('#blog-feed');
    if (!feed) return;

    feed.innerHTML = articles.map(article => `
        <article class="blog-preview-card fade-in-scroll" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 40px; opacity: 0; transform: translateY(30px);">
            <header style="display: flex; gap: 20px; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                <span style="color: var(--color-gold-muted); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">${article.category}</span>
                <span style="color: #666; font-size: 0.8rem; letter-spacing: 0.1em;">${article.date}</span>
            </header>
            <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 20px; font-weight: 400; line-height: 1.2;">
                <a href="${article.link}" target="_blank" style="color: inherit; text-decoration: none;" class="article-link">${article.title}</a>
            </h2>
            <p style="color: #aaa; font-family: var(--font-body); line-height: 1.6; margin-bottom: 30px;">${article.excerpt}</p>
            <a href="${article.link}" target="_blank" class="btn-premium small" style="display: inline-block;">Read Transmission</a>
        </article>
    `).join('');

    // Animate entries
    ScrollTrigger.refresh();
    
    gsap.to('.blog-preview-card', {
        scrollTrigger: {
            trigger: '#blog-feed',
            start: 'top 80%'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Hover effects for read buttons and links
    document.querySelectorAll('.btn-premium, .article-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor?.classList.add('cursor-hover');
            gsap.to(cursor, { scale: 3, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            cursor?.classList.remove('cursor-hover');
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
};

if (document.readyState === 'complete') {
    renderBlogFeed();
} else {
    window.addEventListener('load', renderBlogFeed);
}
