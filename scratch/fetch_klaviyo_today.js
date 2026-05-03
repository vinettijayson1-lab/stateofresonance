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

const KLAVIYO_API_KEY = env.KLAVIYO_API_KEY;

async function fetchKlaviyoProfiles() {
  const url = `https://a.klaviyo.com/api/profiles/?sort=-created`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Revision': '2024-02-15',
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      console.error("Klaviyo API Error:", res.status, await res.text());
      return;
    }
    
    const data = await res.json();
    console.log(`\n--- KLAVIYO SUBSCRIBERS RECENT ---`);
    const todayStr = new Date().toISOString().split('T')[0];
    let todayCount = 0;
    
    data.data.forEach(profile => {
      const created = profile.attributes.created;
      if (created && created.startsWith(todayStr)) {
        todayCount++;
        console.log(`- New Subscriber: ${profile.attributes.email} (Added at ${created})`);
      }
    });
    console.log(`\nTotal Subscribers Today (${todayStr}): ${todayCount}`);
    
  } catch (err) {
    console.error("Fetch Error:", err.message);
  }
}

fetchKlaviyoProfiles();
