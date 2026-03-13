// Shopify CLI v3 stores auth via a secureStore backed by the system keychain
// On Windows, it uses the 'keytar' napi - let's try to find and use it
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const cliBase = 'C:\\Users\\jayvi\\AppData\\Roaming\\npm\\node_modules\\@shopify\\cli';

// Look for keytar in various places
const possibleKeytar = [
  path.join(cliBase, 'node_modules', 'keytar'),
  path.join(cliBase, '..', 'keytar'),
  // Also try CLI's direct deps
  path.join('C:\\Users\\jayvi\\AppData\\Roaming\\npm\\node_modules', 'keytar'),
];

let keytar = null;
for (const p of possibleKeytar) {
  try {
    keytar = require(p);
    console.log('Found keytar at:', p);
    break;
  } catch(e) {
    console.log('Not found:', p);
  }
}

if (!keytar) {
  // Try to find keytar anywhere in the npm global modules
  try {
    const result = execSync('powershell -Command "Get-ChildItem -Path C:\\Users\\jayvi\\AppData\\Roaming\\npm\\node_modules -Recurse -Filter \'keytar.node\' -ErrorAction SilentlyContinue | Select-Object -First 5 FullName | Format-List"', {encoding: 'utf8'});
    console.log('Keytar native search:', result);
  } catch(e) {
    console.log('Search error:', e.message);
  }
  process.exit(0);
}

// Try to get the Shopify credentials
async function main() {
  try {
    const services = ['shopify-cli', 'shopify', '@shopify/cli'];
    for (const service of services) {
      const creds = await keytar.findCredentials(service);
      if (creds && creds.length > 0) {
        console.log(`\nService: ${service}`);
        creds.forEach(c => {
          console.log(`  Account: ${c.account}`);
          console.log(`  Password/Token: ${c.password}`);
        });
      } else {
        console.log(`No credentials for: ${service}`);
      }
    }
  } catch(e) {
    console.error('Error accessing keychain:', e.message);
  }
}

main();
