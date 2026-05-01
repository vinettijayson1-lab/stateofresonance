const axios = require('axios');

async function testFetch() {
  try {
    const res = await axios.get('https://state-of-resonance.myshopify.com/blogs/news/articles.json');
    console.log(JSON.stringify(res.data, null, 2).substring(0, 500));
  } catch (e) {
    console.error('Error fetching news:', e.message);
  }
}

testFetch();
