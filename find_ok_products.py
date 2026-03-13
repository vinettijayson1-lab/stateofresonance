
import json

with open("c:/Users/jayvi/OneDrive/Documents/antigravity worspace/live_store_audit_results.json", "r") as f:
    data = json.load(f)

print(f"Keys: {list(data.keys())}")
if "ok" in data:
    print(f"OK count in data: {len(data['ok'])}")
    # Print first 5 OK products
    for p in data['ok'][:5]:
        print(json.dumps(p, indent=2))
else:
    print("No 'ok' key found in JSON root.")
