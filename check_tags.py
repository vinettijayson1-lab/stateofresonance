import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
token = "REDACTED_SECRET"
api_version = "2024-01"

headers = {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json"
}

def get_products():
    url = f"https://{shop}/admin/api/{api_version}/products.json?limit=50"
    response = requests.get(url, headers=headers)
    return response.json().get('products', [])

if __name__ == "__main__":
    products = get_products()
    all_tags = set()
    for p in products:
        tags = [t.strip() for t in p['tags'].split(',')]
        all_tags.update(tags)
    
    print(f"Total products found: {len(products)}")
    print("Unique tags found in first 50 products:")
    for tag in sorted(list(all_tags)):
        print(f"- {tag}")
