import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach(line => {
  const match = line.match(/^([^=]+)="?(.*?)"?$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN
});

async function checkDatabase() {
  try {
    const res = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
    console.log("Tables in database:", res.rows.map(r => r.name).join(', '));
    
    // Check if there's a table for users, subscribers, orders, etc.
    if (res.rows.find(r => r.name === 'Subscriber')) {
       const signups = await client.execute("SELECT * FROM Subscriber ORDER BY createdAt DESC LIMIT 5");
       console.log("Recent Subscribers:", signups.rows);
    }
    if (res.rows.find(r => r.name === 'Order')) {
       const orders = await client.execute("SELECT * FROM `Order` ORDER BY createdAt DESC LIMIT 5");
       console.log("Recent Orders:", orders.rows);
    }
  } catch (err) {
    console.error("DB Error:", err);
  }
}
checkDatabase();
