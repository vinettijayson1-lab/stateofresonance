const axios = require('axios');

async function testFetch(url) {
  try {
    const res = await axios.get(url);
    console.log(`Success on ${url}:\n` + res.data.substring(0, 300));
  } catch (e) {
    console.error(`Failed on ${url}:`, e.message);
  }
}

async function run() {
  await testFetch('https://state-of-resonance.myshopify.com/blogs/transmissions.atom');
  await testFetch('https://state-of-resonance.myshopify.com/blogs/archives.atom');
  await testFetch('https://state-of-resonance.myshopify.com/blogs/articles.atom');
}

run();
