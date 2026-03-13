import requests
import json

shop = "state-of-resonance.myshopify.com"
token = "REDACTED_SECRET"
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
