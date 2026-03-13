"""
Audit all products on the LIVE store state-of-resonance.myshopify.com for missing images and descriptions.
"""
import requests
import json
import sys
import re

shop = "state-of-resonance.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBii438jNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJGE1OTVlY2FiLTBjMTQtNDRmNy05MGFiLTFhYmU2MTQxM2FiZEokYzlmMTMzZjQtNzYxZC00MjhlLWIzNDgtMDEyN2IzNjIxMTJlEm8KQJJg5R9i51C1wZQaoImzPpS6JtM1xTMQJGjJA_rV_rdEIHH7ycKeeHfRtHx2tUo22yY4IZjmVXsBhVaQMCfFswUSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
api_version = "2024-01"

HEADERS = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
GRAPHQL_URL = f"https://{shop}/admin/api/{api_version}/graphql.json"

QUERY_FIRST = """
{
  products(first: 250) {
    pageInfo { hasNextPage endCursor }
    edges {
      node {
        id title handle descriptionHtml
        images(first: 1) { edges { node { url } } }
      }
    }
  }
}
"""

QUERY_AFTER = """
query($cursor: String!) {
  products(first: 250, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    edges {
      node {
        id title handle descriptionHtml
        images(first: 1) { edges { node { url } } }
      }
    }
  }
}
"""

def fetch_all_products():
    products = []
    cursor = None
    page = 1
    while True:
        if cursor:
            payload = {"query": QUERY_AFTER, "variables": {"cursor": cursor}}
        else:
            payload = {"query": QUERY_FIRST}
        resp = requests.post(GRAPHQL_URL, headers=HEADERS, json=payload)
        print(f"Page {page}: HTTP {resp.status_code}", file=sys.stderr)
        if resp.status_code != 200:
            print(f"ERROR: {resp.status_code}")
            break
        data = resp.json()
        if "errors" in data and "data" not in data:
            print(f"GraphQL error: {data['errors'][0]['message']}")
            break
        page_data = data["data"]["products"]
        products.extend(page_data["edges"])
        if page_data["pageInfo"]["hasNextPage"]:
            cursor = page_data["pageInfo"]["endCursor"]
            page += 1
        else:
            break
    return products

def audit():
    print("Fetching products from state-of-resonance.myshopify.com (stateofresonance.ca)...")
    edges = fetch_all_products()
    print(f"Total products: {len(edges)}\n")

    missing_image = []
    missing_desc = []
    missing_both = []
    ok = []

    for edge in edges:
        p = edge["node"]
        pid = p["id"].split("/")[-1]
        has_image = len(p["images"]["edges"]) > 0
        desc = (p.get("descriptionHtml") or "").strip()
        plain = re.sub(r'<[^>]+>', '', desc).strip()
        has_desc = len(plain) > 0

        info = {"id": pid, "title": p["title"], "handle": p["handle"],
                "url": f"https://admin.shopify.com/store/state-of-resonance/products/{pid}"}

        if not has_image and not has_desc:
            missing_both.append(info)
        elif not has_image:
            missing_image.append(info)
        elif not has_desc:
            missing_desc.append(info)
        else:
            ok.append(info)

    print("=" * 70)
    print(f"[OK]           Products with image + description: {len(ok)}")
    print(f"[MISSING IMG]  Missing image only:                {len(missing_image)}")
    print(f"[MISSING DESC] Missing description only:          {len(missing_desc)}")
    print(f"[MISSING BOTH] Missing BOTH:                      {len(missing_both)}")
    print("=" * 70)

    if missing_both:
        print("\n--- MISSING BOTH ---")
        for p in missing_both:
            print(f"  [{p['id']}] {p['title']}")
    if missing_image:
        print("\n--- MISSING IMAGE ---")
        for p in missing_image:
            print(f"  [{p['id']}] {p['title']}")
    if missing_desc:
        print("\n--- MISSING DESCRIPTION ---")
        for p in missing_desc:
            print(f"  [{p['id']}] {p['title']}")

    results = {
        "total": len(edges),
        "ok_count": len(ok),
        "missing_both": missing_both,
        "missing_image": missing_image,
        "missing_desc": missing_desc
    }
    with open("live_store_audit_results.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\nResults saved to live_store_audit_results.json")
    return results

if __name__ == "__main__":
    audit()
