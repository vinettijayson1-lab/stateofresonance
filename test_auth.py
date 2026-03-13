"""
Test the atkn_2 CLI token with different auth header formats
"""
import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiiPo8PNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDQxNzE1ZTUyLTZkOTYtNDA0ZS05MzBhLWU4MzVkOWFkNjgyOEokNDkxMjdjMWMtNmFhMC00YjExLTgwOGQtYzU3Yjg0NzRlZjdlEm8KQDkTwft8JWbkn7bYUd8GooJxK_ww_cADDMTQ95IRqXZA5uQjAhVBkidP-CpIlGtE60NCsL9XzXVRWd5XtV-OCAMSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"

QUERY = '{ products(first: 5) { edges { node { id title } } } }'

test_cases = [
    # Format 1: X-Shopify-Access-Token 
    ("X-Shopify-Access-Token header", {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
    }),
    # Format 2: Bearer auth
    ("Authorization Bearer", {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }),
    # Format 3: Token
    ("Authorization Token", {
        "Authorization": f"Token {token}",
        "Content-Type": "application/json"
    }),
]

url = f"https://{shop}/admin/api/2024-01/graphql.json"

for name, headers in test_cases:
    resp = requests.post(url, headers=headers, json={"query": QUERY})
    print(f"{name}: HTTP {resp.status_code}")
    if resp.status_code == 200:
        data = resp.json()
        if "data" in data:
            products = data["data"]["products"]["edges"]
            print(f"  SUCCESS! Got {len(products)} products")
            for p in products:
                print(f"  - {p['node']['title']}")
        else:
            print(f"  Response: {str(data)[:200]}")
    else:
        print(f"  Error: {resp.text[:200]}")
    print()
