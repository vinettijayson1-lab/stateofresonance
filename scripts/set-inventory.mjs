/**
 * set-inventory.mjs
 * One-time script: sets ALL product variant inventory to 7 units
 * across your Shopify store using the Admin REST API.
 *
 * Usage:
 *   SHOPIFY_DOMAIN=state-of-resonance.myshopify.com \
 *   SHOPIFY_ADMIN_TOKEN=shpat_XXXXX \
 *   node set-inventory.mjs
 *
 * Get your Admin API token from:
 *   Shopify Admin → Settings → Apps and sales channels → Develop apps
 *   → Create an app → Configure Admin API scopes: write_inventory, read_inventory
 */

const DOMAIN = process.env.SHOPIFY_DOMAIN;
const TOKEN  = process.env.SHOPIFY_ADMIN_TOKEN;
const TARGET_QTY = 7; // Change this to any number under 10

if (!DOMAIN || !TOKEN) {
  console.error('❌  Set SHOPIFY_DOMAIN and SHOPIFY_ADMIN_TOKEN env vars first.');
  process.exit(1);
}

const BASE = `https://${DOMAIN}/admin/api/2024-01`;
const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': TOKEN,
};

async function get(path) {
  const r = await fetch(`${BASE}${path}`, { headers });
  return r.json();
}

async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, { method: 'POST', headers, body: JSON.stringify(body) });
  return r.json();
}

// 1. Get the primary location ID
const { locations } = await get('/locations.json');
const locationId = locations[0]?.id;
if (!locationId) { console.error('No location found'); process.exit(1); }
console.log(`📍 Location: ${locations[0].name} (${locationId})`);

// 2. Get all products
const { products } = await get('/products.json?limit=250&fields=id,title,variants');
console.log(`📦 Found ${products.length} products\n`);

// 3. Set inventory for each variant
for (const product of products) {
  for (const variant of product.variants) {
    const inventoryItemId = variant.inventory_item_id;
    const result = await post('/inventory_levels/set.json', {
      location_id: locationId,
      inventory_item_id: inventoryItemId,
      available: TARGET_QTY,
    });
    const qty = result.inventory_level?.available ?? 'error';
    console.log(`  ✓ ${product.title} — ${variant.title}: ${qty} units`);
  }
}

console.log(`\n✅ All variants set to ${TARGET_QTY} units.`);
