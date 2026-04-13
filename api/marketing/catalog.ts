import axios from 'axios';

const SHOPIFY_DOMAIN = 'state-of-resonance.myshopify.com';
const VUE_FRONTEND_DOMAIN = 'https://stateofresonance.ca';
const DEFAULT_BRAND = 'State of Resonance';

const csvEscape = (val: string) => `"${(val || '').replace(/"/g, '""').replace(/[\n\r]/g, ' ').trim()}"`;

const applyPriceOverride = (title: string, currentPrice: string): string => {
  const t = (title || '').toLowerCase();
  const isHoodie = t.includes('hoodie') || t.includes('modern alchemist') || 
                   t.includes('atomic observer') || t.includes('quantum observer') || 
                   t.includes('crewneck');
  if (isHoodie) return '96.30 CAD';
  if (t.includes('shirt') || t.includes('tee')) return '52.80 CAD';
  
  const numericPrice = currentPrice.replace(/[^0-9.]/g, '');
  return `${numericPrice || '0.00'} CAD`;
}

export default async function handler(req: any, res: any) {
  try {
    // 1. Fetch live product data from Shopify Backend
    const shopifyUrl = `https://${SHOPIFY_DOMAIN}/products.json?limit=250`;
    const shopifyRes = await axios.get(shopifyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json'
      },
      timeout: 8000
    });

    if (!shopifyRes || shopifyRes.status !== 200 || !shopifyRes.data || !shopifyRes.data.products) {
      throw new Error("Failed to fetch Shopify source data");
    }

    const rawProducts = shopifyRes.data.products;

    // 2. Map data to Meta Advantage+ TSV Specification
    const headers = ['id', 'title', 'description', 'availability', 'condition', 
                     'price', 'link', 'image_link', 'brand', 'google_product_category'];

    const rows = rawProducts
      .filter((p: any) => p.images && p.images.length > 0) // Meta strictly rejects items without images
      .map((p: any) => {
        const description = (p.body_html || p.title)
          .replace(/<[^>]*>?/gm, '')
          .trim();
          
        const rawPrice = p.variants?.[0]?.price || '0.00';
        const finalPrice = applyPriceOverride(p.title, rawPrice);
        const imageUrl = p.images[0].src;

        return [
          p.id.toString(),
          csvEscape(p.title),
          csvEscape(description),
          'in stock',
          'new',
          csvEscape(finalPrice),
          csvEscape(`${VUE_FRONTEND_DOMAIN}/product/${p.handle}`), // Critical headless override
          csvEscape(imageUrl),
          csvEscape(DEFAULT_BRAND),
          csvEscape('Apparel & Accessories > Clothing')
        ].join('\t');
    });

    const tsvContent = [headers.join('\t'), ...rows].join('\n');

    // 3. Serve as raw TSV text for Facebook Business Manager
    res.setHeader('Content-Type', 'text/tab-separated-values; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0'); // Do not cache catalog feeds
    res.status(200).send(tsvContent);

  } catch (error: any) {
    console.error('Meta Catalog Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to generate Meta Catalog feed', details: error.message });
  }
}
