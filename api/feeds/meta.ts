import axios from 'axios';

const SHOPIFY_DOMAIN = 'state-of-resonance.myshopify.com';
const AXIOS_CONFIG = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json'
  },
  timeout: 8000
};

export default async function handler(req: any, res: any) {
  try {
    let data: any[] = [];
    let page = 1;
    let hasMore = true;

    // Fetch products from Shopify
    while (hasMore) {
      const shopifyUrl = `https://${SHOPIFY_DOMAIN}/products.json?limit=250&page=${page}&t=${Date.now()}`;
      const shopifyRes = await axios.get(shopifyUrl, AXIOS_CONFIG);
      
      if (!shopifyRes || shopifyRes.status !== 200 || !shopifyRes.data?.products) {
        break;
      }

      const chunk = shopifyRes.data.products;
      data.push(...chunk);

      if (chunk.length < 250 || page >= 5) {
        hasMore = false;
      } else {
        page++;
      }
    }

    // Escape XML special characters
    const escapeXml = (unsafe: string) => {
      if (!unsafe) return '';
      return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
          default: return c;
        }
      });
    };

    // Strip HTML from descriptions
    const stripHtml = (html: string) => {
      if (!html) return '';
      return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    };

    // Build the XML
    let xml = `<?xml version="1.0"?>\n<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n  <channel>\n    <title>State of Resonance Catalog</title>\n    <link>https://stateofresonance.ca</link>\n    <description>Esoteric Luxury Streetwear and Artifacts</description>\n`;

    data.filter(p => p.handle).forEach(p => {
      // Create an item for each product. 
      // If you want variant-level ads later, you can loop over p.variants here instead.
      
      const id = p.variants?.[0]?.id || p.id;
      const title = p.title || '';
      const description = stripHtml(p.body_html || p.description || title);
      const link = `https://stateofresonance.ca/product/${p.handle}?utm_source=meta_catalog`;
      const imageLink = p.images?.[0]?.src ? p.images[0].src.replace(/(\.[a-z]+)\?.*$/, '$1') : 'https://stateofresonance.ca/images/lookbook/lookbook-hero.jpg';
      
      let price = p.variants?.[0]?.price || '0.00';
      // Ensure price has decimals
      if (!price.includes('.')) price = `${price}.00`;
      
      const availability = p.variants?.some((v: any) => v.available !== false) ? 'in stock' : 'out of stock';
      
      // Meta requires standard condition string
      const condition = 'new';
      const brand = 'State of Resonance';
      
      // Ignore products that shouldn't be advertised (e.g., Hidden or vault items)
      const tagsStr = (Array.isArray(p.tags) ? p.tags.join(',') : String(p.tags || '')).toLowerCase();
      if (tagsStr.includes('locked') || tagsStr.includes('vault')) return;

      xml += `    <item>\n`;
      xml += `      <g:id>${escapeXml(String(id))}</g:id>\n`;
      xml += `      <g:item_group_id>${escapeXml(String(p.id))}</g:item_group_id>\n`;
      xml += `      <g:title>${escapeXml(title)}</g:title>\n`;
      xml += `      <g:description>${escapeXml(description.substring(0, 5000))}</g:description>\n`;
      xml += `      <g:link>${escapeXml(link)}</g:link>\n`;
      xml += `      <g:image_link>${escapeXml(imageLink)}</g:image_link>\n`;
      xml += `      <g:brand>${escapeXml(brand)}</g:brand>\n`;
      xml += `      <g:condition>${condition}</g:condition>\n`;
      xml += `      <g:availability>${availability}</g:availability>\n`;
      xml += `      <g:price>${price} CAD</g:price>\n`;
      xml += `    </item>\n`;
    });

    xml += `  </channel>\n</rss>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // Cache on Edge for 1 hour
    return res.status(200).send(xml);

  } catch (error: any) {
    console.error('Meta Feed Error:', error.message);
    res.status(500).json({ error: 'Failed to generate Meta feed', details: error.message });
  }
}
