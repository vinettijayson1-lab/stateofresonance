import requests
import json

# token = "atkn_REDACTED"
live_shop = "state-of-resonance.myshopify.com"

headers = {
    "X-Shopify-Access-Token": token,
    "Content-Type": "application/json"
}

# Try to get shop info from live
print(f"Testing live shop: {live_shop}")
resp = requests.get(f"https://{live_shop}/admin/api/2024-01/shop.json", headers=headers)
print(f"Status: {resp.status_code}")
if resp.status_code == 200:
    print("SUCCESS! Token is valid for live shop.")
    # Create the price rule
    price_rule_data = {
        "price_rule": {
            "title": "RESONANCE24_FLASH_SALE",
            "target_type": "line_item",
            "target_selection": "all",
            "allocation_method": "across",
            "value_type": "percentage",
            "value": "-25.0",
            "customer_selection": "all",
            "starts_at": "2026-03-12T12:00:00Z"
        }
    }
    pr_resp = requests.post(f"https://{live_shop}/admin/api/2024-01/price_rules.json", headers=headers, json=price_rule_data)
    if pr_resp.status_code == 201:
        pr_id = pr_resp.json()['price_rule']['id']
        print(f"Price Rule Created: {pr_id}")
        # Create discount code
        dc_resp = requests.post(f"https://{live_shop}/admin/api/2024-01/price_rules/{pr_id}/discount_codes.json", headers=headers, json={"discount_code": {"code": "RESONANCE24"}})
        if dc_resp.status_code == 201:
            print("Discount Code RESONANCE24 is live!")
        else:
            print(f"Failed to create code: {dc_resp.text}")
    else:
        print(f"Failed to create price rule: {pr_resp.text}")
else:
    print(f"Failed: {resp.text}")
