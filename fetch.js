const http = require('https');
http.get('https://stateofresonance.ca/product/urban-hoodie-1', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const m = data.match(/<script type="application\/ld\+json[^>]*>([\s\S]*?)<\/script>/);
    if (m) {
      try {
        console.log("Found JSON-LD:", JSON.parse(m[1]));
      } catch (e) {
        console.log("Invalid JSON:", e);
        console.log("Raw matched string:", m[1]);
      }
    } else {
      console.log("No JSON-LD found");
    }
  });
});
