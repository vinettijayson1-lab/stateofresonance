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
    custom_url = f"https://{shop}/admin/api/{api_version}/custom_collections.json"
    smart_url = f"https://{shop}/admin/api/{api_version}/smart_collections.json"
    
    custom = requests.get(custom_url, headers=headers).json().get('custom_collections', [])
    smart = requests.get(smart_url, headers=headers).json().get('smart_collections', [])
    
    return custom + smart

if __name__ == "__main__":
    collections = get_collections()
    for c in collections:
        print(f"- {c['title']} (handle: {c['handle']})")
