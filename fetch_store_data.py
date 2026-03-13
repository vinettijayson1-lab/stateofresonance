import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
token = "REDACTED_SECRET"
api_version = "2024-01"

headers = {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json"
}

def get_collections():
    url = f"https://{shop}/admin/api/{api_version}/custom_collections.json"
    response = requests.get(url, headers=headers)
    return response.json()

def get_smart_collections():
    url = f"https://{shop}/admin/api/{api_version}/smart_collections.json"
    response = requests.get(url, headers=headers)
    return response.json()

def get_products():
    url = f"https://{shop}/admin/api/{api_version}/products.json?limit=50"
    response = requests.get(url, headers=headers)
    return response.json()

if __name__ == "__main__":
    print("--- Custom Collections ---")
    custom = get_collections()
    print(json.dumps(custom, indent=2))
    
    print("\n--- Smart Collections ---")
    smart = get_smart_collections()
    print(json.dumps(smart, indent=2))
    
    print("\n--- Products (Top 50) ---")
    products = get_products()
    # Just print titles and types for brevity
    for p in products.get('products', []):
        print(f"- {p['title']} ({p['product_type']})")
