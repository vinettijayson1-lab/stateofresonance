import fs from 'fs';
import path from 'path';

// Load env variables
const envPath = path.resolve('.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach(line => {
  const match = line.match(/^([^=]+)="?(.*?)"?$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const SHOPIFY_SHOP_NAME = env.SHOPIFY_SHOP_NAME;
const SHOPIFY_ACCESS_TOKEN = env.SHOPIFY_ACCESS_TOKEN;

async function fetchTodayOrders() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today
  const isoDate = today.toISOString();
  
  const url = `https://${SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2024-01/orders.json?status=any&created_at_min=${isoDate}`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      console.error("Shopify API Error:", res.status, await res.text());
      return;
    }
    
    const data = await res.json();
    console.log(`\n--- SHOPIFY ORDERS TODAY (${isoDate}) ---`);
    console.log(`Total Orders Today: ${data.orders.length}`);
    
    let totalRevenue = 0;
    data.orders.forEach(order => {
      console.log(`- Order #${order.order_number} | Status: ${order.financial_status} | Total: $${order.total_price}`);
      totalRevenue += parseFloat(order.total_price);
    });
    console.log(`Total Revenue Today: $${totalRevenue.toFixed(2)}`);
    
  } catch (err) {
    console.error("Fetch Error:", err.message);
  }
}

fetchTodayOrders();
