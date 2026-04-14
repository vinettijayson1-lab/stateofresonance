import requests
import json

r = requests.get('https://state-of-resonance.myshopify.com/products.json?limit=250')
data = r.json()
products = data['products']

print(f"Total products: {len(products)}")
for i, p in enumerate(products):
    imgs = p.get('images', [])
    first_img = imgs[0]['src'][:100] if imgs else 'NONE'
    print(f"{i+1}. {p['handle']} | {p['title']} | images: {len(imgs)} | {first_img}")
