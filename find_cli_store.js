// Intercept CLI's HTTP calls by wrapping its main functionality
// Shopify CLI uses node-fetch internally - let's monkey-patch it to capture the auth token

const path = require('path');
const cliBase = 'C:\\Users\\jayvi\\AppData\\Roaming\\npm\\node_modules\\@shopify\\cli';

// Find where the CLI stores its token - look at XDG_DATA_HOME or similar
const fs = require('fs');
const os = require('os');

// On Windows, Shopify CLI might use:
// - %LOCALAPPDATA%\shopify-cli-kit-node\store.json
// - %APPDATA%\shopify-cli-kit-node\store.json  
// - %USERPROFILE%\AppData\Local\shopify-cli-kit-node
// - system keychain

const possibleStorePaths = [
  path.join(process.env.LOCALAPPDATA || '', 'shopify-cli-kit-node'),
  path.join(process.env.APPDATA || '', 'shopify-cli-kit-node'),
  path.join(process.env.LOCALAPPDATA || '', '@shopify', 'cli-kit'),
  path.join(process.env.TEMP || '', 'shopify'),
  path.join(os.homedir(), 'Library', 'Application Support', '@shopify', 'cli', 'store.json'),
  path.join(os.tmpdir(), 'shopify-cli-kit-node'),
];

console.log('Checking possible store paths:');
possibleStorePaths.forEach(p => {
  try {
    if (fs.existsSync(p)) {
      console.log('\n FOUND:', p);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        // List directory contents
        fs.readdirSync(p).forEach(f => {
          const full = path.join(p, f);
          try {
            const content = fs.readFileSync(full, 'utf8');
            console.log('  File:', f);
            console.log('  Content:', content.slice(0, 500));
          } catch(e) {
            console.log('  File:', f, '(binary or inaccessible)');
          }
        });
      } else {
        const content = fs.readFileSync(p, 'utf8');
        console.log('  Content:', content.slice(0, 1000));
      }
    } else {
      console.log('  Not found:', p);
    }
  } catch (e) {
    console.log('  Error:', p, e.message);
  }
});

// Also check using env var that Shopify CLI might set
console.log('\nRelevant env vars:');
Object.keys(process.env).filter(k => /shopify|xdg|config/i.test(k)).forEach(k => {
  console.log(` ${k}=${process.env[k]}`);
});
