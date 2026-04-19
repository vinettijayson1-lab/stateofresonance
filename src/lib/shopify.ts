/**
 * Shopify Storefront API — Headless fetch layer.
 * Uses the authenticated GraphQL Storefront API (not the public /products.json hack).
 */

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'state-of-resonance.myshopify.com';
const TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '685a41996fcd50542b5701f51a90a094';
const ENDPOINT = `https://${DOMAIN}/api/2024-01/graphql.json`;

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  price: string;
  compareAtPrice: string | null;
  image: string;
  images: string[];
  descriptionHtml: string;
  category: string;
  tags: string[];
  options: { name: string; values: string[] }[];
  variants: {
    id: string;
    title: string;
    price: string;
    available: boolean;
    option1?: string;
    option2?: string;
    option3?: string;
  }[];
}

const PRODUCTS_QUERY = `
  query AllProducts {
    products(first: 100) {
      edges {
        node {
          id
          handle
          title
          descriptionHtml
          productType
          tags
          options {
            name
            values
          }
          images(first: 20) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
        }
      }
    }
  }
`;

async function shopifyFetch<T>(query: string): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }
  return json.data;
}

function cleanImageUrl(url: string): string {
  return url.replace(/(\.[a-z]+)\?.*$/, '$1');
}

function prioritizeFrontImage(images: string[]): string {
  const front = images.find(i => i.toLowerCase().includes('front'));
  return front || images.find(i => i.endsWith('.png')) || images[0] || '/luxury-occult-bg.png';
}

function formatPrice(amount: string): string {
  const num = parseFloat(amount);
  return `$${num % 1 === 0 ? num.toFixed(0) : num.toFixed(2)}`;
}

interface GqlProduct {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  options: { name: string; values: string[] }[];
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        compareAtPrice: { amount: string; currencyCode: string } | null;
        selectedOptions: { name: string; value: string }[];
      };
    }[];
  };
}

export async function fetchProducts(): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: GqlProduct }[] } }>(PRODUCTS_QUERY);

    return data.products.edges.map(({ node: p }) => {
      const allImages = p.images.edges.map(e => cleanImageUrl(e.node.url));
      const bestImg = prioritizeFrontImage(allImages);
      const firstVariant = p.variants.edges[0]?.node;

      return {
        id: p.id,
        handle: p.handle,
        title: p.title,
        descriptionHtml: p.descriptionHtml || '',
        price: formatPrice(firstVariant?.price?.amount || '0'),
        compareAtPrice: firstVariant?.compareAtPrice
          ? formatPrice(firstVariant.compareAtPrice.amount)
          : null,
        image: bestImg,
        images: allImages,
        category: p.productType || 'Streetwear',
        tags: p.tags || [],
        options: p.options || [],
        variants: p.variants.edges.map(({ node: v }) => ({
          id: v.id,
          title: v.title,
          price: formatPrice(v.price.amount),
          available: v.availableForSale,
          option1: v.selectedOptions[0]?.value,
          option2: v.selectedOptions[1]?.value,
          option3: v.selectedOptions[2]?.value,
        })),
      };
    });
  } catch (err) {
    console.error('Shopify fetch error:', err);
    // Fallback to public JSON API if GraphQL fails
    return fetchProductsFallback();
  }
}

async function fetchProductsFallback(): Promise<ShopifyProduct[]> {
  const res = await fetch(`https://${DOMAIN}/products.json?limit=250`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.products.map((p: Record<string, unknown>) => {
    const images = ((p.images as { src: string }[]) || []).map(i => cleanImageUrl(i.src));
    const variants = (p.variants as { id: number; title: string; price: string; available: boolean; option1?: string; option2?: string; option3?: string }[]) || [];
    const firstVariant = variants[0];
    return {
      id: `gid://shopify/Product/${p.id}`,
      handle: p.handle as string,
      title: p.title as string,
      descriptionHtml: (p.body_html as string) || '',
      price: firstVariant ? formatPrice(firstVariant.price) : 'TBA',
      compareAtPrice: null,
      image: prioritizeFrontImage(images),
      images,
      category: (p.product_type as string) || 'Streetwear',
      tags: typeof p.tags === 'string' ? (p.tags as string).split(', ') : (p.tags as string[]) || [],
      options: (p.options as { name: string; values: string[] }[]) || [],
      variants: variants.map(v => ({
        id: `gid://shopify/ProductVariant/${v.id}`,
        title: v.title,
        price: formatPrice(v.price),
        available: v.available,
        option1: v.option1,
        option2: v.option2,
        option3: v.option3,
      })),
    };
  });
}
