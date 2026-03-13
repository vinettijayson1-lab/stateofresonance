"""
Use Shopify GraphQL Admin API with the session token.
The shpss_ token works via the GraphQL endpoint when sent as X-Shopify-Access-Token.
"""
import requests
import json
import sys

shop = "state-of-resonance-dev-store.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiiPo8PNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDQxNzE1ZTUyLTZkOTYtNDA0ZS05MzBhLWU4MzVkOWFkNjgyOEokNDkxMjdjMWMtNmFhMC00YjExLTgwOGQtYzU3Yjg0NzRlZjdlEm8KQDkTwft8JWbkn7bYUd8GooJxK_ww_cADDMTQ95IRqXZA5uQjAhVBkidP-CpIlGtE60NCsL9XzXVRWd5XtV-OCAMSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
api_version = "2024-01"

# GraphQL query to get all products with images and description
QUERY = """
{
  products(first: 250) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        handle
        descriptionHtml
        media(first: 1) {
          edges {
            node {
              mediaContentType
            }
          }
        }
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
}
"""

QUERY_AFTER = """
query($cursor: String!) {
  products(first: 250, after: $cursor) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        handle
        descriptionHtml
        media(first: 1) {
          edges {
            node {
              mediaContentType
            }
          }
        }
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
}
"""

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

url = f"https://{shop}/admin/api/{api_version}/graphql.json"

def fetch_all_products():
    products = []
    cursor = None
    page = 1
    
    while True:
        if cursor:
            payload = {"query": QUERY_AFTER, "variables": {"cursor": cursor}}
        else:
            payload = {"query": QUERY}
        
        resp = requests.post(url, headers=headers, json=payload)
        print(f"Page {page}: HTTP {resp.status_code}", file=sys.stderr)
        
        if resp.status_code != 200:
            print(f"ERROR: {resp.status_code} - {resp.text[:500]}")
            break
        
        data = resp.json()
        if "errors" in data:
            print(f"GraphQL errors: {json.dumps(data['errors'], indent=2)}")
            break
        
        page_data = data["data"]["products"]
        edges = page_data["edges"]
        products.extend(edges)
        
        if page_data["pageInfo"]["hasNextPage"]:
            cursor = page_data["pageInfo"]["endCursor"]
            page += 1
        else:
            break
    
    return products

def audit():
    print("Fetching products via GraphQL...")
    edges = fetch_all_products()
    print(f"Total products: {len(edges)}\n")

    missing_image = []
    missing_desc = []
    missing_both = []
    ok = []

    for edge in edges:
        p = edge["node"]
        gid = p["id"]  # gid://shopify/Product/12345
        pid = gid.split("/")[-1]
        title = p["title"]
        handle = p["handle"]
        
        has_image = len(p["images"]["edges"]) > 0
        desc = (p.get("descriptionHtml") or "").strip()
        # Strip tags check
        import re
        plain = re.sub(r'<[^>]+>', '', desc).strip()
        has_desc = len(plain) > 0
        
        admin_url = f"https://admin.shopify.com/store/state-of-resonance-dev-store/products/{pid}"
        
        info = {"id": pid, "title": title, "handle": handle, "url": admin_url}
        
        if not has_image and not has_desc:
            missing_both.append(info)
        elif not has_image:
            missing_image.append(info)
        elif not has_desc:
            missing_desc.append(info)
        else:
            ok.append(info)

    print("=" * 70)
    print(f"[OK]          Products with image + description: {len(ok)}")
    print(f"[MISSING IMG] Missing image only:                {len(missing_image)}")
    print(f"[MISSING DESC]Missing description only:          {len(missing_desc)}")
    print(f"[MISSING BOTH]Missing BOTH image and description:{len(missing_both)}")
    print("=" * 70)

    if missing_both:
        print("\n--- MISSING BOTH IMAGE AND DESCRIPTION ---")
        for p in missing_both:
            print(f"  {p['title']}")
            print(f"    -> {p['url']}")

    if missing_image:
        print("\n--- MISSING IMAGE ---")
        for p in missing_image:
            print(f"  {p['title']}")
            print(f"    -> {p['url']}")

    if missing_desc:
        print("\n--- MISSING DESCRIPTION ---")
        for p in missing_desc:
            print(f"  {p['title']}")
            print(f"    -> {p['url']}")

    # Save results
    results = {
        "total": len(edges),
        "ok_count": len(ok),
        "missing_both": missing_both,
        "missing_image": missing_image,
        "missing_desc": missing_desc
    }
    with open("product_audit_results.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\nFull results saved to product_audit_results.json")

if __name__ == "__main__":
    audit()
