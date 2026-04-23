const https = require('https');

const options = {
  hostname: 'www.clarity.ms',
  path: '/export-data/api/v1/project-live-insights?projectId=w1rmxt8w4b',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ4M0FCMDhFNUYwRDMxNjdEOTRFMTQ3M0FEQTk2RTcyRDkwRUYwRkYiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJjM2NkZGU2Ni1iN2QzLTQ3ZTgtOTQyMi1hZTM3OWM5NzE3NzciLCJzdWIiOiIzMjU0OTA1NDg5NDQ2Mjk5Iiwic2NvcGUiOiJEYXRhLkV4cG9ydCIsIm5iZiI6MTc3Njk3NjA0NSwiZXhwIjo0OTMwNTc2MDQ1LCJpYXQiOjE3NzY5NzYwNDUsImlzcyI6ImNsYXJpdHkiLCJhdWQiOiJjbGFyaXR5LmRhdGEtZXhwb3J0ZXIifQ.jYtQ4KSe0w4rpcKlNmU8CHAh-cDI9shMnjGgHb9cF72bVMl2yLk6ADMHFTts2rsk2ncxVRy9PInPYYdwolOARE6M7O4R3Sd9QQ9wnroxnUA_-SLOHihP-XcFkmrL393l7_pRLZDPouDIykreRgWwDRvBRb51rK1AsOqUY7Og9cypDsQ2vw1hc38wLqEeXi5qDe9INYMGxSRjNocmqZEs6LRi3PO2muTpME-w8FI-1mtGfzrop-ZhIOn_kyTn36FWvNcbhbUhwF_SAhhueqb_JuPTY3sgeLeU6ejiTb9Fusxfk_Y0Kc6Escf6ZGrFsX3WdUY0KQaK4jGCFSipUDSYwQ'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch (e) {
      console.log('Error parsing JSON:', e);
      console.log('Raw output:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
