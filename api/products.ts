import axios from 'axios';

// Retain visual formatters (no logic overrides, just aesthetic mapping)
const getLuxImage = (handle: string, originalImage: string): string => {
  // Luxury esoteric occult background overrides — WebP for 88% size reduction
  const overrides: Record<string, string> = {
    'the-hermetic-scales-pullover': '/images/upgraded/the-hermetic-scales-pullover.webp',
    'the-hand-of-mysteries-pullover': '/images/upgraded/the-hand-of-mysteries-pullover.webp',
    'the-awakened-hand-pullover-1': '/images/upgraded/the-awakened-hand-pullover-1.webp',
    'urban-hoodie-9': '/images/upgraded/urban-hoodie-9.webp',
    'oversized-faded-t-shirt-1': '/images/upgraded/oversized-faded-t-shirt-1.webp',
    'unisex-garment-dyed-heavyweight-t-shirt-3': '/images/upgraded/unisex-garment-dyed-heavyweight-t-shirt-3.webp',
    'unisex-garment-dyed-heavyweight-t-shirt-2': '/images/upgraded/unisex-garment-dyed-heavyweight-t-shirt-2.webp',
    'urban-hoodie-8': '/images/upgraded/urban-hoodie-8.webp',
    'urban-hoodie-7': '/images/upgraded/urban-hoodie-7.webp',
    'urban-hoodie-6': '/images/upgraded/urban-hoodie-6.webp',
    'unisex-garment-dyed-heavyweight-t-shirt': '/images/upgraded/unisex-garment-dyed-heavyweight-t-shirt.webp',
    'urban-garment-dyed-hoodie-1': '/images/upgraded/urban-garment-dyed-hoodie-1.webp',
    'crop-hoodie': '/images/upgraded/crop-hoodie.webp',
    'women-s-relaxed-v-neck-t-shirt': '/images/upgraded/women-s-relaxed-v-neck-t-shirt.webp',
    'unisex-premium-sweatshirt': '/images/upgraded/unisex-premium-sweatshirt.webp',
    'unisex-premium-mid-weight-hoodie-1': '/images/upgraded/unisex-premium-mid-weight-hoodie-1.webp',
    'unisex-oversized-hoodie': '/images/upgraded/unisex-oversized-hoodie.webp',
    'urban-hoodie-1': '/images/upgraded/urban-hoodie-1.webp',
    'og-crewnwck': '/images/upgraded/og-crewnwck.webp',
    'men-s-box-hoodie': '/images/upgraded/men-s-box-hoodie.webp',
    'her-resonance-hoodie': '/images/upgraded/her-resonance-hoodie.webp',
    'celestial-alignment': '/images/upgraded/celestial-alignment.webp',
    'oversized-faded-t-shirt': '/images/upgraded/oversized-faded-t-shirt.webp',
    'resonace': '/images/upgraded/resonace.webp',
    'sacred-heart': '/images/upgraded/sacred-heart.webp',
  };
  return overrides[handle] || originalImage;
};

const detectCategory = (title: string, type: string, tags: string = ''): string => {
  const t = (title + tags + type).toLowerCase();
  if (t.includes('hoodie') || t.includes('crewneck') || t.includes('shirt') || t.includes('apparel') || t.includes('tee')) return 'Attire';
  if (t.includes('pendant') || t.includes('ring') || t.includes('artifact') || t.includes('jewelry')) return 'Artifacts';
  if (t.includes('oil') || t.includes('mist') || t.includes('elixir')) return 'Alchemical Elixirs';
  if (t.includes('incense') || t.includes('botanical') || t.includes('herb')) return 'Alchemical Botanicals';
  if (t.includes('candle') || t.includes('light') || t.includes('illumination')) return 'Illuminations';
  if (t.includes('bowl') || t.includes('deck') || t.includes('tool')) return 'Ritual Tools';
  if (t.includes('ghost') || t.includes('bones')) return 'Ghost';
  return 'Apparel';
};

const detectType = (title: string, type: string): string => {
  const t = title.toLowerCase();
  if (t.includes('hoodie')) return 'Hoodie';
  if (t.includes('crewneck')) return 'Crewneck';
  if (t.includes('shirt') || t.includes('tee')) return 'T-Shirt';
  if (t.includes('pendant')) return 'Pendant';
  return type || 'Apparel';
};

const getModelImage = (handle: string, title: string): string | null => {
  // If specific items require secondary modeling hover states
  if (title.toLowerCase().includes('solfeggio')) return '/assets/luxury/solfeggio_model.png';
  if (title.toLowerCase().includes('omniscience')) return '/assets/luxury/omniscience_model.png';
  return null;
};

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
    const { category, type, handle, collection } = req.query;
    const limit = parseInt(req.query.limit as string) || 250;

    // Execute Native Live Sync (Paginated up to 1250 items)
    let data: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const shopifyUrl = `https://${SHOPIFY_DOMAIN}/products.json?limit=250&page=${page}`;
      const shopifyRes = await axios.get(shopifyUrl, AXIOS_CONFIG);
      
      if (!shopifyRes || shopifyRes.status !== 200 || !shopifyRes.data?.products) {
        if (page === 1) return res.status(500).json({ error: 'Shopify Sync Offline' });
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

    // Pure Map - No Arbitrary Re-Pricing Overrides
    let mapped = data.filter((p: any) => p.handle).map((p: any) => {
      const tagsStr = (Array.isArray(p.tags) ? p.tags.join(',') : String(p.tags || '')).toLowerCase();
      
      // Dynamic Metadata mapping directly from Shopify tagging
      const isMembersOnly = tagsStr.includes('locked') || tagsStr.includes('vault') || tagsStr.includes('membersonly') || p.title.toLowerCase().includes('vault');
      
      const categoryStr = detectCategory(p.title || '', p.product_type || '', tagsStr);
      
      // Enforce rigorous pricing schema based on Printful's literal push
      let rawPrice = p.variants?.[0]?.price ? String(p.variants[0].price) : 'TBA';
      if (rawPrice !== 'TBA' && !rawPrice.includes('$')) {
         rawPrice = `$${rawPrice}`; 
      }

      // Optimize images (Remove Shopify sizing params for HQ)
      const optimizedImages = (p.images || []).map((img: any) => {
        return img.src.replace(/(\.[a-z]+)\?.*$/, '$1'); // Strip ?v= parameters
      });

      const primaryImage = optimizedImages[0] || '/assets/placeholder.png';

      return {
        id: p.id ? p.id.toString() : Math.random().toString(36).substring(7),
        title: p.title,
        handle: p.handle || '',
        price: rawPrice,
        image: getLuxImage(p.handle, primaryImage),
        category: categoryStr,
        type: detectType(p.title || '', p.product_type || ''),
        variantId: p.variants?.[0]?.id ? p.variants[0].id.toString() : null,
        variants: (p.variants || []).map((v: any) => {
          let vPrice = v.price ? String(v.price) : rawPrice;
          if (vPrice !== 'TBA' && !vPrice.includes('$')) {
             vPrice = `$${vPrice}`;
          }
          return {
            id: v.id ? v.id.toString() : null,
            title: v.title || 'Standard',
            price: vPrice,
            available: v.available !== false,
            options: [v.option1, v.option2, v.option3].filter(Boolean)
          };
        }),
        images: optimizedImages,
        modelImage: getModelImage(p.handle, p.title),
        options: p.options || [],
        collections: [{ handle: 'all' }],
        metadata: {
          isMembersOnly: isMembersOnly,
          minResonanceScore: isMembersOnly ? 111 : 0
        }
      };
    });

    // ----------------------------------------------------
    // Deterministic Routing Filters (Decoupled from Turso)
    // ----------------------------------------------------
    if (category && category !== 'undefined') {
       const filterCat = category.toString();
       if (filterCat === 'Alchemy') {
           mapped = mapped.filter((p: any) => p.category.includes('Alchemical') || p.category.includes('Illumination') || p.category.includes('Ritual'));
       } else {
           mapped = mapped.filter((p: any) => p.category === filterCat);
       }
    }

    if (collection && collection !== 'undefined') {
       const col = Array.isArray(collection) ? collection[0].toLowerCase() : collection.toLowerCase();
       if (col === 'attire') {
           mapped = mapped.filter((p: any) => p.category === 'Attire' || p.category === 'Apparel' || String(p.type).includes('Vault') || String(p.category).includes('Ghost'));
       } else if (col === 'sanctuary') {
           mapped = mapped.filter((p: any) => ['Decor', 'Illuminations', 'Earth Relics', 'Artifacts', 'Boxes', 'Shrine'].includes(p.category));
       } else if (col === 'manuscripts') {
           mapped = mapped.filter((p: any) => ['Esoteric', 'Books', 'Manuscripts'].includes(p.category));
       } else if (col === 'alchemy') {
           mapped = mapped.filter((p: any) => ['Alchemical', 'Elixirs', 'Oils', 'Incense', 'Resin', 'Herbs', 'Illuminations', 'Ritual Tools'].includes(p.category));
       } else if (col.includes('ghost')) {
           mapped = mapped.filter((p: any) => p.category === 'Ghost' || p.category === 'Attire' || p.category === 'Apparel' || p.title.toLowerCase().includes('ghost'));
       } else if (col.includes('her') || col.includes('resonance')) {
           mapped = mapped.filter((p: any) => p.category === 'Attire' || p.category === 'Apparel');
       } else {
           // Unknown collection — return all apparel as fallback
           mapped = mapped.filter((p: any) => ['Attire', 'Apparel', 'Ghost'].includes(p.category));
       }
    }

    // ----------------------------------------------------
    // Individual Product Resolution
    // ----------------------------------------------------
    if (handle) {
       const singleProduct = mapped.find((p: any) => p.handle === handle.toString());
       if (singleProduct) return res.status(200).json(singleProduct);
       
       return res.status(404).json({ error: 'Artifact not found. Please sync from Shopify.' });
    }

    return res.status(200).json(mapped.slice(0, Math.min(limit, mapped.length)));

  } catch (error: any) {
    console.error('Storefront V2 Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to synchronize with Shopify', details: error.message });
  }
}
