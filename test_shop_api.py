import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
token = "REDACTED_SECRET"
api_version = "2024-01"

headers = {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json"
}

def get_shop():
    url = f"https://{shop}/admin/api/{api_version}/shop.json"
    response = requests.get(url, headers=headers)
    return response.status_code, response.text

if __name__ == "__main__":
    status, text = get_shop()
    print(f"Status: {status}")
    print(f"Response: {text}")
