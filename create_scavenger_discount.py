import requests
import json
import os

# Shopify Configuration
STORE_DOMAIN = "state-of-resonance.myshopify.com" 
shop_url = f"https://{STORE_DOMAIN}/admin/api/2024-01/price_rules.json"

# You will need to replace this with your actual Admin API Access Token
ACCESS_TOKEN = "f1367d058e79939290e0635a80fece8a298765e2795486c212ee50d770f78f72"

headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": ACCESS_TOKEN
}

# 1. Create the Price Rule: 50% off, limited to 5 uses total
price_rule_data = {
    "price_rule": {
        "title": "SCAVENGER_HUNT_50",
        "target_type": "line_item",
        "target_selection": "all",
        "allocation_method": "across",
        "value_type": "percentage",
        "value": "-50.0",
        "customer_selection": "all",
        "usage_limit": 5, # Limit to first 5 people!
        "starts_at": "2026-03-07T00:00:00Z"
    }
}

print("Creating Scavenger Hunt Price Rule...")
response = requests.post(shop_url, headers=headers, json=price_rule_data)

if response.status_code == 201:
    price_rule_id = response.json()['price_rule']['id']
    print(f"Success! Price Rule ID: {price_rule_id}")
    
    # 2. Create the actual Discount Code linked to the Price Rule
    discount_url = f"https://{STORE_DOMAIN}/admin/api/2024-01/price_rules/{price_rule_id}/discount_codes.json"
    discount_data = {
        "discount_code": {
            "code": "SCAVENGER50"
        }
    }
    
    print("Creating SCAVENGER50 Discount Code...")
    discount_response = requests.post(discount_url, headers=headers, json=discount_data)
    
    if discount_response.status_code == 201:
         print("SUCCESS! SCAVENGER50 discount code is now live and limited to 5 uses.")
    else:
         print(f"Failed to create discount code: {discount_response.text}")

else:
    print(f"Failed to create price rule: {response.text}")
