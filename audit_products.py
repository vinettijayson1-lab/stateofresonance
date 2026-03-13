import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
# token = "shpss_REDACTED"
api_version = "2024-01"

headers = {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json"
}

def get_all_products():
    products = []
    url = f"https://{shop}/admin/api/{api_version}/products.json?limit=250"
    while url:
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"ERROR: {response.status_code} - {response.text}")
            break
        data = response.json()
        batch = data.get('products', [])
        products.extend(batch)
        # Handle pagination
        link_header = response.headers.get('Link', '')
        url = None
        if 'rel="next"' in link_header:
            for part in link_header.split(','):
                if 'rel="next"' in part:
                    url = part.split(';')[0].strip().strip('<>')
                    break
    return products

def audit_products():
    print("Fetching all products from Shopify store...")
    products = get_all_products()
    print(f"Total products found: {len(products)}\n")

    missing_image = []
    missing_desc = []
    missing_both = []
    ok = []

    for p in products:
        has_image = len(p.get('images', [])) > 0
        body = (p.get('body_html') or '').strip()
        has_desc = len(body) > 0

        if not has_image and not has_desc:
            missing_both.append(p)
        elif not has_image:
            missing_image.append(p)
        elif not has_desc:
            missing_desc.append(p)
        else:
            ok.append(p)

    print("=" * 60)
    print(f"[OK]      Products with BOTH image & description: {len(ok)}")
    print(f"[MISSING] Missing BOTH image AND description:    {len(missing_both)}")
    print(f"[IMG]     Missing IMAGE only:                    {len(missing_image)}")
    print(f"[DESC]    Missing DESCRIPTION only:              {len(missing_desc)}")
    print("=" * 60)

    if missing_both:
        print("\n[MISSING BOTH IMAGE AND DESCRIPTION]:")
        for p in missing_both:
            admin_url = f"https://admin.shopify.com/store/state-of-resonance-dev-store/products/{p['id']}"
            print(f"  - {p['title']}")
            print(f"    Admin: {admin_url}")

    if missing_image:
        print("\n[MISSING IMAGE]:")
        for p in missing_image:
            admin_url = f"https://admin.shopify.com/store/state-of-resonance-dev-store/products/{p['id']}"
            print(f"  - {p['title']}")
            print(f"    Admin: {admin_url}")

    if missing_desc:
        print("\n[MISSING DESCRIPTION]:")
        for p in missing_desc:
            admin_url = f"https://admin.shopify.com/store/state-of-resonance-dev-store/products/{p['id']}"
            print(f"  - {p['title']}")
            print(f"    Admin: {admin_url}")

    # Save results to JSON for further processing
    results = {
        "total": len(products),
        "ok": len(ok),
        "missing_both": [{"id": p["id"], "title": p["title"], "handle": p["handle"]} for p in missing_both],
        "missing_image": [{"id": p["id"], "title": p["title"], "handle": p["handle"]} for p in missing_image],
        "missing_desc": [{"id": p["id"], "title": p["title"], "handle": p["handle"]} for p in missing_desc],
    }
    with open("product_audit_results.json", "w") as f:
        json.dump(results, f, indent=2)
    print(f"\n📁 Full results saved to product_audit_results.json")

if __name__ == "__main__":
    audit_products()
