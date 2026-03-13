import requests
import json

shop = "state-of-resonance.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiicg8zNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDc0MWEzZWU1LTZiNWYtNGVlOC1hMGJlLWUzZmNkYmIxOWJhNkokNmQzN2JiMDUtYzE1OS00ZjQyLWJlZDktOGM5MWFkNjlmYTVkEm8KQCewygshO38aNVfYL2z7bAAHZnfpEYENXWVuIK3_WNlKDqploWNwQn_gUCfk7QDwRcd9_Lq7SR4UtKq0oucJRgwSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
api_version = "2024-01"

HEADERS = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
GRAPHQL_URL = f"https://{shop}/admin/api/{api_version}/graphql.json"

CHECK_IDS = [
    "gid://shopify/Product/8742327255063", # 2510
]

QUERY = """
query getProduct($id: ID!) {
  product(id: $id) {
    id
    title
    descriptionHtml
    images(first: 1) {
      nodes {
        url
      }
    }
  }
}
"""

for gid in CHECK_IDS:
    payload = {"query": QUERY, "variables": {"id": gid}}
    resp = requests.post(GRAPHQL_URL, headers=HEADERS, json=payload)
    if resp.status_code == 200:
        data = resp.json().get("data", {}).get("product", {})
        if not data:
            print(f"Product {gid} not found.")
            continue
        print(f"ID: {gid}")
        print(f"  Title: {data.get('title')}")
        print(f"  Desc: {data.get('descriptionHtml')[:50]}...")
        imgs = data.get("images", {}).get("nodes", [])
        print(f"  Images: {len(imgs)}")
        if imgs: print(f"    URL/Found: Yes")
        print("-" * 20)
    else:
        print(f"Error checking {gid}: {resp.status_code}")
