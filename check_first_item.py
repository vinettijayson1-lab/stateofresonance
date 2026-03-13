import requests
import json

shop = "state-of-resonance.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBii438jNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJGE1OTVlY2FiLTBjMTQtNDRmNy05MGFiLTFhYmU2MTQxM2FiZEokYzlmMTMzZjQtNzYxZC00MjhlLWIzNDgtMDEyN2IzNjIxMTJlEm8KQJJg5R9i51C1wZQaoImzPpS6JtM1xTMQJGjJA_rV_rdEIHH7ycKeeHfRtHx2tUo22yY4IZjmVXsBhVaQMCfFswUSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
api_version = "2024-01"

HEADERS = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
GRAPHQL_URL = f"https://{shop}/admin/api/{api_version}/graphql.json"

CHECK_IDS = [
    "gid://shopify/Product/8742164922391", # GFCAR3
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
        print(f"ID: {gid}")
        print(f"  Title: {data.get('title')}")
        print(f"  Desc: {data.get('descriptionHtml')[:100]}...")
        imgs = data.get("images", {}).get("nodes", [])
        print(f"  Images: {len(imgs)}")
        if imgs: print(f"    URL: {imgs[0]['url']}")
        print("-" * 20)
    else:
        print(f"Error checking {gid}: {resp.status_code}")
