import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
token = "REDACTED_SECRET"
api_version = "2024-01"

headers = {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json"
}

def create_smart_collection(title, handle, rules):
    url = f"https://{shop}/admin/api/{api_version}/smart_collections.json"
    data = {
        "smart_collection": {
            "title": title,
            "handle": handle,
            "rules": rules,
            "disjunctive": True  # True if ANY rule matches
        }
    }
    response = requests.post(url, json=data, headers=headers)
    return response.status_code, response.text

if __name__ == "__main__":
    # Create Adornments
    status, res = create_smart_collection(
        "Adornments", 
        "adornments", 
        [{"column": "tag", "relation": "equals", "condition": "Sacred Adornments"}]
    )
    print(f"Adornments: {status}")
    
    # Create Manuscripts
    status, res = create_smart_collection(
        "Manuscripts", 
        "manuscripts", 
        [{"column": "tag", "relation": "equals", "condition": "Esoteric Manuscripts"}]
    )
    print(f"Manuscripts: {status}")
    
    # Create Protocols & Tools
    status, res = create_smart_collection(
        "Protocols & Tools", 
        "protocols-tools", 
        [
            {"column": "tag", "relation": "equals", "condition": "Ritual Tools"},
            {"column": "tag", "relation": "equals", "condition": "Divination Tools"}
        ]
    )
    print(f"Protocols & Tools: {status}")
