const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Try to find and use Shopify CLI's stored token
// Shopify CLI stores tokens in the system keychain via the 'keytar' library
// Let's try to find the keytar module and use it

const shopifyCliPath = 'C:\\Users\\jayvi\\AppData\\Roaming\\npm\\node_modules\\@shopify\\cli';

// Try to require the CLI's auth module
try {
  const keytarPath = path.join(shopifyCliPath, 'node_modules', 'keytar');
  const keytar = require(keytarPath);
  
  keytar.findCredentials('shopify-cli').then(creds => {
    console.log('Found credentials:', JSON.stringify(creds, null, 2));
  }).catch(err => {
    console.error('keytar error:', err.message);
  });
} catch(e) {
  console.log('Could not load keytar:', e.message);
  
  // Try to find the CLI's TOML config
  const configPaths = [
    path.join(process.env.APPDATA || '', 'shopify', 'credentials'),
    path.join(process.env.APPDATA || '', '@shopify', 'cli', 'config.toml'),
    path.join(process.env.LOCALAPPDATA || '', 'shopify', 'config'),
    path.join(process.env.USERPROFILE || '', '.shopify', 'credentials'),
  ];
  
  configPaths.forEach(p => {
    try {
      if (fs.existsSync(p)) {
        console.log('Found:', p);
        console.log(fs.readFileSync(p, 'utf8'));
      } else {
        console.log('Not found:', p);
      }
    } catch(e2) {
      console.log('Error reading', p, ':', e2.message);
    }
  });
}
