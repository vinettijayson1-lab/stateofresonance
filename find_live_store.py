"""
Find out the myshopify.com internal domain for stateofresonance.ca
by trying common variations.
"""
import requests

token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiiPo8PNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDQxNzE1ZTUyLTZkOTYtNDA0ZS05MzBhLWU4MzVkOWFkNjgyOEokNDkxMjdjMWMtNmFhMC00YjExLTgwOGQtYzU3Yjg0NzRlZjdlEm8KQDkTwft8JWbkn7bYUd8GooJxK_ww_cADDMTQ95IRqXZA5uQjAhVBkidP-CpIlGtE60NCsL9XzXVRWd5XtV-OCAMSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"

candidates = [
    "stateofresonance.myshopify.com",
    "state-of-resonance.myshopify.com",
    "state-of-resonance-store.myshopify.com",
    "stateofresonanceca.myshopify.com",
]

QUERY = '{ shop { name myshopifyDomain primaryDomain { url } } }'

for domain in candidates:
    url = f"https://{domain}/admin/api/2024-01/graphql.json"
    try:
        resp = requests.post(url, headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }, json={"query": QUERY}, timeout=8)
        if resp.status_code == 200:
            data = resp.json()
            if "data" in data:
                shop = data["data"]["shop"]
                print(f"FOUND: {domain}")
                print(f"  Shop name: {shop['name']}")
                print(f"  Myshopify domain: {shop['myshopifyDomain']}")
                print(f"  Primary domain: {shop['primaryDomain']['url']}")
            else:
                print(f"{domain}: HTTP 200 but errors: {data.get('errors', '?')}")
        else:
            print(f"{domain}: HTTP {resp.status_code}")
    except Exception as e:
        print(f"{domain}: Error - {e}")
