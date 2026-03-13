import json
import os

AUDIT_FILE = 'live_store_audit_results.json'

if os.path.exists(AUDIT_FILE):
    with open(AUDIT_FILE, 'r') as f:
        d = json.load(f)
        print(f"Total Products: {d.get('total', 'N/A')}")
        print(f"OK Count: {d.get('ok_count', 'N/A')}")
        print(f"Missing Both: {len(d.get('missing_both', []))}")
        print(f"Missing Image Only: {len(d.get('missing_image', []))}")
        print(f"Missing Desc Only: {len(d.get('missing_desc', []))}")
else:
    print("Audit file not found.")
