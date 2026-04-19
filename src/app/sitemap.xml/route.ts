import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/shopify';

const BASE = 'https://stateofresonance.ca';

export async function GET() {
  const products = await fetchProducts();
  const statics = ['', '/collection/all', '/collection/best-sellers', '/social-proof', '/about', '/symbols', '/faq', '/terms', '/privacy'];
  const dynamics = products.map(p => `/product/${p.handle}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...statics, ...dynamics].map(r => `  <url><loc>${BASE}${r}</loc><changefreq>${r.startsWith('/product') ? 'weekly' : 'monthly'}</changefreq><priority>${r === '' ? '1.0' : r.startsWith('/product') ? '0.8' : '0.6'}</priority></url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' } });
}
