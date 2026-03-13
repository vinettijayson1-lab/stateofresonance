import requests
import json

STORE = "state-of-resonance-dev-store.myshopify.com"
URL = f"https://{STORE}/admin/api/2024-01/shop.json"

tokens_to_test = [
    "REDACTED_SECRET"
]

print("Testing possible API tokens...")
for t in tokens_to_test:
    headers = {
        "X-Shopify-Access-Token": t,
        "Content-Type": "application/json"
    }
    r = requests.get(URL, headers=headers)
    if r.status_code == 200:
        print(f"SUCCESS with token: {t}")
        # Test Products scope
        r_prod = requests.get(f"https://{STORE}/admin/api/2024-01/products.json?limit=1", headers=headers)
        if r_prod.status_code == 200:
            print("  Products Scope: OK")
        else:
            print(f"  Products Scope: Error {r_prod.status_code}")
        
        # Test Price Rules scope
        r_rules = requests.get(f"https://{STORE}/admin/api/2024-01/price_rules.json?limit=1", headers=headers)
        if r_rules.status_code == 200:
            print("  Price Rules Scope: OK")
        else:
            print(f"  Price Rules Scope: Error {r_rules.status_code}")
        break
    else:
        print(f"Failed token ({r.status_code}): {t}")
