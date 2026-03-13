"""
Final bulk fix for stateofresonance.ca.
Updates Titles, Descriptions, and adds Images for all AzureGreen products.
Targeting products in 'missing_both' and 'missing_image' categories.
"""
import requests
import json
import csv
import sys
import time
import os

shop = "state-of-resonance.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiicg8zNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDc0MWEzZWU1LTZiNWYtNGVlOC1hMGJlLWUzZmNkYmIxOWJhNkokNmQzN2JiMDUtYzE1OS00ZjQyLWJlZDktOGM5MWFkNjlmYTVkEm8KQCewygshO38aNVfYL2z7bAAHZnfpEYENXWVuIK3_WNlKDqploWNwQn_gUCfk7QDwRcd9_Lq7SR4UtKq0oucJRgwSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
api_version = "2024-01"

HEADERS = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
GRAPHQL_URL = f"https://{shop}/admin/api/{api_version}/graphql.json"

CSV_PATH = r"cvs. zip\AG_Complete_Files.csv"
AUDIT_PATH = "live_store_audit_results.json"

UPDATE_MUTATION = """
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product { id title }
    userErrors { field message }
  }
}
"""

CREATE_MEDIA_MUTATION = """
mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
  productCreateMedia(productId: $productId, media: $media) {
    media { alt mediaContentType }
    mediaUserErrors { field message }
  }
}
"""

def load_csv_data():
    sku_map = {}
    title_map = {}
    print(f"Loading CSV data from {CSV_PATH}...")
    try:
        with open(CSV_PATH, "r", encoding="utf-8", errors="replace") as f:
            reader = csv.DictReader(f)
            for row in reader:
                sku = row["NUMBER"].strip()
                title = row["INETSDESC"].strip()
                desc = row["INETSHORTD"].strip()
                img = row["INETIMAGE"].strip()
                
                title = " ".join(title.split())
                
                data = {
                    "sku": sku,
                    "title": title,
                    "description": desc,
                    "image_file": img
                }
                sku_map[sku] = data
                if title:
                    title_map[title] = data

        print(f"Loaded {len(sku_map)} SKU mappings.")
    except Exception as e:
        print(f"Error loading CSV: {e}")
        sys.exit(1)
    return sku_map, title_map

def graphql_call(query, variables=None):
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    for attempt in range(5):
        try:
            resp = requests.post(GRAPHQL_URL, headers=HEADERS, json=payload, timeout=30)
            if resp.status_code == 200:
                data = resp.json()
                if "errors" in data and any(e.get("message") == "Unauthorized" or "Access denied" in e.get("message") for e in data["errors"]):
                    print("ERROR: Token expired or unauthorized. Exiting.")
                    sys.exit(1)
                return data
            elif resp.status_code == 401:
                print("ERROR: 401 Unauthorized. Token expired. Exiting.")
                sys.exit(1)
            elif resp.status_code == 429:
                wait = (attempt + 1) * 2
                time.sleep(wait)
            else:
                print(f"  HTTP Error {resp.status_code}: {resp.text[:200]}")
                return None
        except Exception as e:
            time.sleep(1)
    return None

def main():
    dry_run = "--dry-run" in sys.argv
    limit = None
    start_from = 0
    for arg in sys.argv:
        if arg.startswith("--limit="):
            limit = int(arg.split("=")[1])
        if arg.startswith("--start="):
            start_from = int(arg.split("=")[1])

    if not os.path.exists(AUDIT_PATH):
        print(f"Error: Audit results not found")
        return

    with open(AUDIT_PATH, "r") as f:
        audit_data = json.load(f)

    sku_mapping, title_mapping = load_csv_data()
    
    missing_both = audit_data.get("missing_both", [])
    missing_image = audit_data.get("missing_image", [])
    # Also include missing_desc just in case
    missing_desc = audit_data.get("missing_desc", [])
    
    work_items = []
    for item in missing_both:  work_items.append((item, True, True)) # (item, needs_desc, needs_img)
    for item in missing_image: work_items.append((item, False, True))
    for item in missing_desc:  work_items.append((item, True, False))
    
    total_to_process = len(work_items)
    print(f"Audit Status: {len(missing_both)} missing both, {len(missing_image)} missing image only, {len(missing_desc)} missing desc only.")
    print(f"Total work items: {total_to_process}")

    success_desc = 0
    success_img = 0
    fail_csv = 0
    checked = 0

    if dry_run:
        print("\n--- DRY RUN MODE ---\n")

    for item, needs_desc, needs_img in work_items:
        checked += 1
        if checked <= start_from:
            continue
        if limit and (checked - start_from) > limit:
            break
        product_id = item["id"]
        lookup_key = item["title"]
        
        # Priority 1: Find by SKU (original Title)
        map_data = sku_mapping.get(lookup_key)
        if not map_data:
            # Priority 2: Find by Title (already corrected)
            map_data = title_mapping.get(lookup_key)
            
        if not map_data:
            fail_csv += 1
            if checked % 100 == 0:
                print(f"Progress: {checked}/{total_to_process}...")
            continue

        new_title = map_data["title"]
        new_desc = map_data["description"]
        img_file = map_data["image_file"]
        
        if dry_run:
            print(f"[{checked}] Needs: {'DESC' if needs_desc else ''} {'IMG' if needs_img else ''} | {lookup_key} -> {new_title}")
            continue

        gid = f"gid://shopify/Product/{product_id}"

        # 1. Update Title and Description if needed
        if needs_desc and new_title:
            html_desc = f"<p>{new_desc}</p>" if new_desc else ""
            resp = graphql_call(UPDATE_MUTATION, {
                "input": {
                    "id": gid,
                    "title": new_title,
                    "descriptionHtml": html_desc
                }
            })
            if resp and "data" in resp and resp["data"].get("productUpdate") and not resp["data"]["productUpdate"]["userErrors"]:
                success_desc += 1
            else:
                err = resp["data"]["productUpdate"]["userErrors"] if resp and "data" in resp and resp["data"].get("productUpdate") else "API Error"
                print(f"  [FAIL] {lookup_key} desc: {err}")

        # 2. Add Image if needed and file exists
        if needs_img and img_file:
            img_url = f"https://www.azuregreen.net/images/{img_file.strip()}"
            resp = graphql_call(CREATE_MEDIA_MUTATION, {
                "productId": gid,
                "media": [{
                    "originalSource": img_url,
                    "alt": new_title,
                    "mediaContentType": "IMAGE"
                }]
            })
            if resp and "data" in resp and resp["data"].get("productCreateMedia") and not resp["data"]["productCreateMedia"]["mediaUserErrors"]:
                success_img += 1
            else:
                err = resp["data"]["productCreateMedia"]["mediaUserErrors"] if resp and "data" in resp and resp["data"].get("productCreateMedia") else "API Error"
                print(f"  [FAIL] {lookup_key} img: {err}")

        if checked % 100 == 0:
            print(f"Progress: {checked}/{total_to_process} (Success Desc: {success_desc}, Img: {success_img})")
        
        time.sleep(0.1) # Faster throughput

    print("\n" + "="*50)
    print(f"Total Processed: {checked}")
    print(f"Descs Updated:   {success_desc}")
    print(f"Images Added:    {success_img}")
    print(f"Not in CSV:      {fail_csv}")
    print("="*50)

if __name__ == "__main__":
    main()
