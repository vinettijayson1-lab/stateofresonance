// Use Shopify CLI's own session store module to retrieve the token
const cliPath = 'C:\\Users\\jayvi\\AppData\\Roaming\\npm\\node_modules\\@shopify\\cli';

async function main() {
  try {
    // Shopify CLI uses @shopify/cli-kit for session storage
    const kitPath = cliPath + '\\node_modules\\@shopify\\cli-kit';
    
    // Try to load the session module
    let session;
    const sessionPaths = [
      kitPath + '\\dist\\public\\node\\session.js',
      kitPath + '\\dist\\public\\node\\session\\index.js',
    ];
    
    for (const p of sessionPaths) {
      try {
        session = require(p);
        console.log('Loaded session from:', p);
        break;
      } catch(e) {
        console.log('Could not load:', p, '-', e.message.split('\n')[0]);
      }
    }
    
    if (session && session.ensureAuthenticatedAdmin) {
      const result = await session.ensureAuthenticatedAdmin('state-of-resonance-dev-store.myshopify.com');
      console.log('Admin session:', JSON.stringify(result, null, 2));
    } else if (session && session.currentSessionForScopes) {
      const result = await session.currentSessionForScopes(['read_products']);
      console.log('Session:', JSON.stringify(result, null, 2));
    } else {
      console.log('Session module functions:', session ? Object.keys(session) : 'not loaded');
      
      // Try to grep the session store file directly
      const fs = require('fs');
      const path = require('path');
      
      // Look for TOML config files in the CLI kit
      const configDirs = [
        process.env.APPDATA + '\\shopify',
        process.env.LOCALAPPDATA + '\\shopify', 
        process.env.USERPROFILE + '\\.shopify-cli-kit-store',
        process.env.USERPROFILE + '\\.shopify',
      ];
      
      for (const dir of configDirs) {
        try {
          if (fs.existsSync(dir)) {
            console.log('\nFound dir:', dir);
            const files = fs.readdirSync(dir, {recursive: true});
            files.forEach(f => console.log(' -', f));
          } else {
            console.log('Not found:', dir);
          }
        } catch(e) {
          console.log('Error checking', dir, ':', e.message);
        }
      }
    }
  } catch(e) {
    console.error('Error:', e.message);
    console.error(e.stack);
  }
}

main();
