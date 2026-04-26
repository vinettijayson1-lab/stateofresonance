import os
import json
import urllib.request

DOMAIN = 'state-of-resonance.myshopify.com'
TOKEN = '685a41996fcd50542b5701f51a90a094'
ENDPOINT = f'https://{DOMAIN}/api/2024-01/graphql.json'

query = """
  query AllProducts {
    products(first: 10) {
      edges {
        node {
          title
          variants(first: 1) {
            edges {
              node {
                price { amount }
              }
            }
          }
        }
      }
    }
  }
"""

req = urllib.request.Request(ENDPOINT, data=json.dumps({'query': query}).encode('utf-8'), headers={
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': TOKEN
})

with urllib.request.urlopen(req) as response:
    result = json.loads(response.read().decode())
    for edge in result['data']['products']['edges']:
        node = edge['node']
        price = node['variants']['edges'][0]['node']['price']['amount'] if node['variants']['edges'] else 'N/A'
        print(f"{node['title']} - ${price}")
