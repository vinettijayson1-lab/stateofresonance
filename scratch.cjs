const axios = require('axios');

async function testFetch() {
  try {
    const res = await axios.get('https://state-of-resonance.myshopify.com/blogs/news.atom');
    console.log(res.data.substring(0, 1000));
  } catch (e) {
    console.error('Error fetching blogs:', e.message);
  }
}

testFetch();
