import requests
import json
import re

shop = "state-of-resonance-dev-store.myshopify.com"
preview_theme_id = "143829729354"

# The storefront /products.json endpoint sometimes works with preview theme token
# Let's try multiple approaches

def try_storefront_products():
    """Try Shopify storefront products.json with preview theme"""
    base = f"https://{shop}"
    
    # Try 1: products.json with preview_theme_id
    url = f"{base}/products.json?limit=250&preview_theme_id={preview_theme_id}"
    resp = requests.get(url, allow_redirects=True)
    print(f"Attempt 1 (products.json + preview): HTTP {resp.status_code}")
    if resp.status_code == 200:
        try:
            return resp.json().get('products', [])
        except Exception as e:
            print(f"  Response: {resp.text[:200]}")
    
    # Try 2: Just products.json 
    url = f"{base}/products.json?limit=250"
    resp = requests.get(url)
    print(f"Attempt 2 (products.json): HTTP {resp.status_code}")
    if resp.status_code == 200:
        try:
            return resp.json().get('products', [])
        except:
            pass
    
    # Try 3: collections/all/products.json with preview
    url = f"{base}/collections/all/products.json?limit=250&preview_theme_id={preview_theme_id}"
    resp = requests.get(url, allow_redirects=True)
    print(f"Attempt 3 (collections/all/products.json): HTTP {resp.status_code}")
    if resp.status_code == 200:
        try:
            return resp.json().get('products', [])
        except Exception as e:
            print(f"  Error parsing: {e}")
            print(f"  Response: {resp.text[:500]}")
    
    # Try 4 - The search.json endpoint
    url = f"{base}/search/suggest.json?q=*&resources[type]=product&resources[limit]=250&preview_theme_id={preview_theme_id}"
    resp = requests.get(url, allow_redirects=True)
    print(f"Attempt 4 (search suggest): HTTP {resp.status_code}")
    if resp.status_code == 200:
        try:
            data = resp.json()
            print("  Response snippet:", str(data)[:300])
        except:
            pass
    
    return None

products = try_storefront_products()
if products is None:
    print("\nAll attempts failed - need a different approach")
else:
    print(f"\nGot {len(products)} products!")
    missing_image = []
    missing_desc = []
    missing_both = []
    ok = []
    for p in products:
        has_image = bool(p.get('images'))
        desc = (p.get('body_html') or '').strip()
        plain = re.sub(r'<[^>]+>', '', desc).strip()
        has_desc = len(plain) > 0
        info = {
            "id": p["id"],
            "title": p["title"],
            "handle": p["handle"]
        }
        if not has_image and not has_desc:
            missing_both.append(info)
        elif not has_image:
            missing_image.append(info)
        elif not has_desc:
            missing_desc.append(info)
        else:
            ok.append(info)
    print(f"OK: {len(ok)}, Missing Image: {len(missing_image)}, Missing Desc: {len(missing_desc)}, Missing Both: {len(missing_both)}")
