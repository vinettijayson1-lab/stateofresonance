import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/shopify';
import { getSortedTransmissionsData } from '@/lib/transmissions';

const BASE = 'https://stateofresonance.ca';

export async function GET() {
  const products = await fetchProducts();
  const transmissions = getSortedTransmissionsData();
  
const statics = ["", '/collection/all', '/social-proof', '/about', '/symbols', '/faq', '/terms', '/privacy', '/transmissions'];
  const dynamics = products.map(p => `/product/${p.handle}`);
  const blogDynamics = transmissions.map(t => `/transmissions/${t.slug}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...statics, ...dynamics, ...blogDynamics].map(r => `  <url><loc>${BASE}${r}</loc><changefreq>${r.startsWith('/product') ? 'weekly' : 'monthly'}</changefreq><priority>${r === '' ? '1.0' : r.startsWith('/product') ? '0.8' : r.includes('transmissions') ? '0.8' : '0.6'}</priority></url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' } });
}
