import requests
import json
import os

# Shopify Configuration
SHOPIFY_STORE_URL = "stateofresonance.ca"  # Assuming this from earlier context. Will fall back to .myshopify.com if needed.
# Let's try the .myshopify.com version first to be safe for API calls
STORE_DOMAIN = "state-of-resonance.myshopify.com" 
# Fallback to a generic approach if we don't know the exact .myshopify handle
shop_url = f"https://{STORE_DOMAIN}/admin/api/2024-01/price_rules.json"

ACCESS_TOKEN = "f1367d058e79939290e0635a80fece8a298765e2795486c212ee50d770f78f72"

headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": ACCESS_TOKEN
}

# 1. Create the Price Rule (The underlying logic for the discount)
price_rule_data = {
    "price_rule": {
        "title": "ALIGN20_LAUNCH_PROMO",
        "target_type": "line_item",
        "target_selection": "all",
        "allocation_method": "across",
        "value_type": "percentage",
        "value": "-20.0",
        "customer_selection": "all",
        "starts_at": "2026-03-07T00:00:00Z"
    }
}

print("Creating Price Rule...")
response = requests.post(shop_url, headers=headers, json=price_rule_data)

if response.status_code == 201:
    price_rule_id = response.json()['price_rule']['id']
    print(f"Success! Price Rule ID: {price_rule_id}")
    
    # 2. Create the actual Discount Code linked to the Price Rule
    discount_url = f"https://{STORE_DOMAIN}/admin/api/2024-01/price_rules/{price_rule_id}/discount_codes.json"
    discount_data = {
        "discount_code": {
            "code": "ALIGN20"
        }
    }
    
    print("Creating ALIGN20 Discount Code...")
    discount_response = requests.post(discount_url, headers=headers, json=discount_data)
    
    if discount_response.status_code == 201:
         print("SUCCESS! ALIGN20 discount code is now live.")
    else:
         print(f"Failed to create discount code: {discount_response.text}")

else:
    print(f"Failed to create price rule: {response.text}")
