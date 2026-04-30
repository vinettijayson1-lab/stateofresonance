import axios from 'axios';

// Retain visual formatters (no logic overrides, just aesthetic mapping)
const getLuxImage = (handle: string, originalImage: string): string => {
  // Luxury esoteric occult background overrides — WebP for 88% size reduction
  const overrides: Record<string, string> = {
    'the-hermetic-scales-pullover': '/images/lookbook/20260426_150335.jpg',
    'the-hand-of-mysteries-pullover': '/images/lookbook/20260426_150343.jpg',
    'the-awakened-hand-pullover-1': '/images/lookbook/20260426_150444.jpg',
    'urban-hoodie-9': '/images/lookbook/20260426_150530.jpg',
    'oversized-faded-t-shirt-1': '/images/lookbook/20260426_150732.jpg',
    'unisex-garment-dyed-heavyweight-t-shirt-3': '/images/lookbook/20260426_150747.jpg',
    'unisex-garment-dyed-heavyweight-t-shirt-2': '/images/lookbook/20260426_151256-edit-20260429172132.jpg',
    'urban-hoodie-8': '/images/lookbook/20260426_151256.jpg',
    'urban-hoodie-7': '/images/lookbook/20260426_151344.jpg',
    'urban-hoodie-6': '/images/lookbook/20260426_151349.jpg',
    'unisex-garment-dyed-heavyweight-t-shirt': '/images/lookbook/20260426_151450.jpg',
    'urban-garment-dyed-hoodie-1': '/images/lookbook/20260426_151529-edit-20260429171533.jpg',
    'crop-hoodie': '/images/lookbook/20260426_151529.jpg',
    'women-s-relaxed-v-neck-t-shirt': '/images/lookbook/20260426_151538.jpg',
    'unisex-premium-sweatshirt': '/images/lookbook/20260426_152121-edit-20260429171606.jpg',
    'unisex-premium-mid-weight-hoodie-1': '/images/lookbook/20260426_152138.jpg',
    'unisex-oversized-hoodie': '/images/lookbook/20260426_152219-edit-20260429171820.jpg',
    'urban-hoodie-1': '/images/lookbook/20260426_152314.jpg',
    'og-crewnwck': '/images/lookbook/20260426_152340-edit-20260429171747.jpg',
    'men-s-box-hoodie': '/images/lookbook/20260426_152405.jpg',
    'her-resonance-hoodie': '/images/lookbook/20260426_152411.jpg',
    'celestial-alignment': '/images/lookbook/20260426_152525.jpg',
    'oversized-faded-t-shirt': '/images/lookbook/20260426_152532.jpg',
    'resonace': '/images/lookbook/20260426_152832.jpg',
    'sacred-heart': '/images/lookbook/20260426_152918.jpg',
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
      const shopifyUrl = `https://${SHOPIFY_DOMAIN}/products.json?limit=250&page=${page}&t=${Date.now()}`;
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
      
      const isMembersOnly = tagsStr.includes('locked') || tagsStr.includes('vault') || tagsStr.includes('membersonly') || p.title.toLowerCase().includes('vault');
      const categoryStr = detectCategory(p.title || '', p.product_type || '', tagsStr);
      
      let rawPrice = p.variants?.[0]?.price ? String(p.variants[0].price) : 'TBA';
      if (rawPrice !== 'TBA' && !rawPrice.includes('$')) rawPrice = `$${rawPrice}`;

      // Optimize images (strip Shopify sizing params for HQ)
      const optimizedImages = (p.images || []).map((img: any) => ({
        src: img.src.replace(/(\.[a-z]+)\?.*$/, '$1'),
        alt: img.alt || '',
        position: img.position || 99
      }));

      // 1. Try to find an explicit 'front' label
      const frontImage = optimizedImages.find((img: any) => {
        const alt = (img.alt || '').toLowerCase();
        const src = (img.src || '').toLowerCase();
        return alt.includes('front') || src.includes('front') || alt.includes('transparent');
      });
      
      // 2. If no label, grab the FIRST available PNG (transparent see-through image)
      const firstPng = optimizedImages.find((img: any) => (img.src || '').toLowerCase().includes('.png'));
      
      // 3. Fallback to the first image overall
      let primaryRawImage = optimizedImages[0]?.src || '/assets/placeholder.png';
      
      if (frontImage) {
        primaryRawImage = frontImage.src;
      } else if (firstPng) {
        primaryRawImage = firstPng.src;
      }
      
      const primaryImage = primaryRawImage;

      return {
        id: p.id ? p.id.toString() : Math.random().toString(36).substring(7),
        title: p.title,
        handle: p.handle || '',
        description: p.body_html || p.description || '',
        price: rawPrice,
        image: primaryImage,
        category: categoryStr,
        type: detectType(p.title || '', p.product_type || ''),
        variantId: p.variants?.[0]?.id ? p.variants[0].id.toString() : null,
        variants: (p.variants || []).map((v: any) => {
          let vPrice = v.price ? String(v.price) : rawPrice;
          if (vPrice !== 'TBA' && !vPrice.includes('$')) vPrice = `$${vPrice}`;
          return {
            id: v.id ? v.id.toString() : null,
            title: v.title || 'Standard',
            price: vPrice,
            available: v.available !== false,
            inventory_quantity: v.inventory_quantity ?? null,
            options: [v.option1, v.option2, v.option3].filter(Boolean)
          };
        }),
        images: optimizedImages.map((img: any) => img.src),
        modelImage: getModelImage(p.handle, p.title),
        options: p.options || [],
        available: p.variants?.some((v: any) => v.available !== false) ?? true,
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
       if (col === 'all') {
           // Return all products, no filtering required
       } else if (col === 'attire') {
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
       } else if (col === 'hoodies') {
           mapped = mapped.filter((p: any) => p.type === 'Hoodie' || p.title.toLowerCase().includes('hoodie'));
       } else if (col === 'tees') {
           mapped = mapped.filter((p: any) => p.type === 'T-Shirt' || p.title.toLowerCase().includes('shirt') || p.title.toLowerCase().includes('tee'));
       } else if (col === 'crewnecks') {
           mapped = mapped.filter((p: any) => p.type === 'Crewneck' || p.title.toLowerCase().includes('crewneck') || p.title.toLowerCase().includes('sweatshirt'));
       } else if (col === 'accessories') {
           mapped = mapped.filter((p: any) => !['Hoodie', 'T-Shirt', 'Crewneck', 'Apparel', 'Attire'].includes(p.type) && !['Attire', 'Apparel', 'Ghost'].includes(p.category));
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
