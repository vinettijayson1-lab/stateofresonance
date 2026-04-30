import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/shopify';
import { getSortedTransmissionsData } from '@/lib/transmissions';

const BASE = 'https://stateofresonance.ca';

export async function GET() {
  const products = await fetchProducts();
  const transmissions = getSortedTransmissionsData();
  const now = new Date().toISOString();
  
  // Static pages with priority and changefreq
  const statics = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/collection/all', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/symbols', priority: '0.6', changefreq: 'monthly' },
    { url: '/social-proof', priority: '0.6', changefreq: 'weekly' },
    { url: '/transmissions', priority: '0.7', changefreq: 'weekly' },
    { url: '/lookbook', priority: '0.6', changefreq: 'monthly' },
    { url: '/collab', priority: '0.5', changefreq: 'monthly' },
    { url: '/faq', priority: '0.5', changefreq: 'monthly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${statics.map(page => `  <url>
    <loc>${BASE}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${products.map(p => `  <url>
    <loc>${BASE}/product/${p.handle}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
${transmissions.map(t => `  <url>
    <loc>${BASE}/transmissions/${t.slug}</loc>
    <lastmod>${t.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, { 
    headers: { 
      'Content-Type': 'application/xml', 
      'Cache-Control': 'public, max-age=3600, s-maxage=86400' 
    }
      });
}
