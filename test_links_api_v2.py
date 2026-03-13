import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
token = "f1367d058e79939290e0635a80fece8a298765e2795486c212ee50d770f78f72"
api_version = "2024-01"

headers = {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json"
}

def get_link_lists():
    url = f"https://{shop}/admin/api/{api_version}/link_lists.json"
    response = requests.get(url, headers=headers)
    return response.json()

if __name__ == "__main__":
    result = get_link_lists()
    print(json.dumps(result, indent=2))
