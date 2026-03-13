"""
Bulk update 5,080+ SKU-titled products on the live store (stateofresonance.ca).
Uses local AzureGreen CSV to map SKUs to real titles and descriptions.
"""
import requests
import json
import csv
import sys
import time
import os

shop = "state-of-resonance.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiiPo8PNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDQxNzE1ZTUyLTZkOTYtNDA0ZS05MzBhLWU4MzVkOWFkNjgyOEokNDkxMjdjMWMtNmFhMC00YjExLTgwOGQtYzU3Yjg0NzRlZjdlEm8KQDkTwft8JWbkn7bYUd8GooJxK_ww_cADDMTQ95IRqXZA5uQjAhVBkidP-CpIlGtE60NCsL9XzXVRWd5XtV-OCAMSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
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

def load_csv_data():
    """Load SKU -> {title, description} mapping from CSV"""
    mapping = {}
    print(f"Loading CSV data from {CSV_PATH}...")
    try:
        with open(CSV_PATH, "r", encoding="utf-8", errors="replace") as f:
            reader = csv.DictReader(f)
            for row in reader:
                sku = row["NUMBER"].strip()
                title = row["INETSDESC"].strip()
                # If short desc is empty, it's missing from the main CSV. 
                # We'll use the short desc if available, otherwise just the title.
                desc = row["INETSHORTD"].strip()
                
                # Clean up repeated whitespace/newlines from export
                title = " ".join(title.split())
                
                mapping[sku] = {
                    "title": title,
                    "description": desc
                }
        print(f"Loaded {len(mapping)} SKU mappings.")
    except Exception as e:
        print(f"Error loading CSV: {e}")
        sys.exit(1)
    return mapping

def graphql_call(query, variables=None):
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    
    # Retry logic for rate limiting
    for attempt in range(5):
        try:
            resp = requests.post(GRAPHQL_URL, headers=HEADERS, json=payload, timeout=30)
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 429:
                wait = (attempt + 1) * 2
                print(f"  Rate limited (429). Waiting {wait}s...")
                time.sleep(wait)
            else:
                print(f"  HTTP Error {resp.status_code}: {resp.text[:200]}")
                return None
        except Exception as e:
            print(f"  Network Error: {e}")
            time.sleep(1)
    return None

def main():
    dry_run = "--dry-run" in sys.argv
    limit = None
    # Check if a limit was provided (e.g. for testing)
    for arg in sys.argv:
        if arg.startswith("--limit="):
            limit = int(arg.split("=")[1])

    if not os.path.exists(AUDIT_PATH):
        print(f"Error: Audit results not found at {AUDIT_PATH}")
        return

    with open(AUDIT_PATH, "r") as f:
        audit_data = json.load(f)

    # We want to fix "missing_both" and "missing_desc"
    to_fix = audit_data.get("missing_both", []) + audit_data.get("missing_desc", [])
    print(f"Identified {len(to_fix)} items to fix in audit.")

    csv_mapping = load_csv_data()
    
    success = 0
    fail_csv = 0
    fail_api = 0
    checked = 0

    if dry_run:
        print("\n--- DRY RUN MODE: No changes will be made ---\n")

    for item in to_fix:
        if limit and checked >= limit:
            break
        
        checked += 1
        product_id = item["id"]
        sku = item["title"] # Original title is often just the SKU
        
        # Try to find in CSV
        map_data = csv_mapping.get(sku)
        if not map_data:
            # Try cleaning SKU (sometimes they have extra spaces in Shopify title)
            clean_sku = "".join(sku.split())
            map_data = csv_mapping.get(clean_sku)
            
        if not map_data:
            # Still not found? Maybe the CSV mapping is different
            fail_csv += 1
            continue

        new_title = map_data["title"]
        new_desc = map_data["description"]
        
        if not new_title:
            fail_csv += 1
            continue
            
        # If desc is empty, we at least have a better title. 
        # But we should wrap it in HTML if it exists.
        html_desc = f"<p>{new_desc}</p>" if new_desc else ""
        
        if dry_run:
            print(f"[{checked}] Would update {sku} -> {new_title}")
            success += 1
            continue

        print(f"[{checked}/{len(to_fix)}] Updating {sku} -> {new_title} ({product_id})...")
        
        gid = f"gid://shopify/Product/{product_id}"
        resp = graphql_call(UPDATE_MUTATION, {
            "input": {
                "id": gid,
                "title": new_title,
                "descriptionHtml": html_desc
            }
        })
        
        if resp and "data" in resp:
            errors = resp["data"]["productUpdate"]["userErrors"]
            if errors:
                print(f"  [FAIL] {errors[0]['message']}")
                fail_api += 1
            else:
                success += 1
        else:
            fail_api += 1
            
        # Batch throttle: ~5 updates per second is safe for GraphQL
        time.sleep(0.2)

    print("\n" + "="*50)
    print(f"Processed: {checked}")
    print(f"Updated:   {success}")
    print(f"Not in CSV:{fail_csv}")
    print(f"API Failed:{fail_api}")
    print("="*50)

if __name__ == "__main__":
    main()
