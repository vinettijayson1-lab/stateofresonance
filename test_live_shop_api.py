import requests
import json

shop = "state-of-resonance.myshopify.com"
token = "f1367d058e79939290e0635a80fece8a298765e2795486c212ee50d770f78f72"
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
