import { createClient } from '@libsql/client/web'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN
});

const csvEscape = (val: string) => `"${(val || '').replace(/"/g, '""').replace(/[\n\r]/g, ' ').trim()}"`;

const applyPriceOverride = (title: string, currentPrice: string): string => {
  const t = (title || '').toLowerCase();
  const isHoodie = t.includes('hoodie') || t.includes('modern alchemist') || 
                   t.includes('atomic observer') || t.includes('quantum observer') || 
                   t.includes('crewneck');
  if (isHoodie) return '96.30 CAD';
  if (t.includes('shirt') || t.includes('tee')) return '58.20 CAD';
  const numericPrice = String(currentPrice).replace(/[^0-9.]/g, '');
  return `${numericPrice || '0.00'} CAD`;
}

export default async function handler(req: any, res: any) {
  try {
    const rs = await libsql.execute('SELECT * FROM "Product" ORDER BY createdAt DESC');
    const allProducts = rs.rows;

    // Only include products with a valid image URL (Meta rejects products without one)
    const products = allProducts.filter(p => p.image && String(p.image).startsWith('http'));

    const headers = ['id', 'title', 'description', 'availability', 'condition', 
                     'price', 'link', 'image_link', 'brand', 'google_product_category'];

    const rows = products.map((p: any) => {
      const description = (String(p.description) || String(p.title))
        .replace(/<[^>]*>?/gm, '')
        .trim();
      const price = applyPriceOverride(String(p.title), String(p.price));

      return [
        p.id,
        csvEscape(p.title),
        csvEscape(description),
        'in stock',
        'new',
        csvEscape(price),
        csvEscape(`https://stateofresonance.ca/product/${p.handle}`),
        csvEscape(p.image || ''),
        csvEscape('State of Resonance'),
        csvEscape('Apparel & Accessories > Clothing')
      ].join('\t'); // Use TAB delimiter — more robust than comma for Meta
    });

    const tsvContent = [headers.join('\t'), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/tab-separated-values; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).send(tsvContent);

  } catch (error) {
    console.error('Catalog Feed Error:', error);
    res.status(500).json({ error: 'Failed to generate catalog feed' });
  }
}
