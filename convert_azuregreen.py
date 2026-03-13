import csv
import re
import os

azuregreen_csv = r"C:\Users\jayvi\Downloads\New folder\AG_Complete_Files.csv"
dept_csv = r"C:\Users\jayvi\Downloads\New folder\Departments.csv"
prod_dept_csv = r"C:\Users\jayvi\Downloads\New folder\Product-Department.csv"
output_csv = r"C:\Users\jayvi\OneDrive\Documents\antigravity worspace\shopify_azuregreen_import.csv"

# Optional: Add keywords here if the user only wants specific items.
# For now, we will process everything, but we can filter later.
KEYWORDS = ["meditation", "resonance", "esoteric", "sober", "crystal", "incense", "tarot"]

def generate_handle(title):
    # Convert to lowercase and replace non-alphanumeric with hyphens
    handle = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    return handle

def get_esoteric_category(dept_names):
    # Maps standard AzureGreen departments to esoteric sub-categories
    mapping = {
        'book': 'Esoteric Manuscripts',
        'journal': 'Esoteric Manuscripts',
        'tarot': 'Divination Tools',
        'oracle': 'Divination Tools',
        'pendulum': 'Divination Tools',
        'crystal': 'Earth Relics',
        'stone': 'Earth Relics',
        'mineral': 'Earth Relics',
        'gemstone': 'Earth Relics',
        'incense': 'Sacred Smoke',
        'smudge': 'Sacred Smoke',
        'candle': 'Illuminations',
        'oil': 'Alchemical Elixirs',
        'herb': 'Alchemical Botanicals',
        'resin': 'Alchemical Botanicals',
        'jewelry': 'Sacred Adornments',
        'pendant': 'Sacred Adornments',
        'amulet': 'Sacred Adornments',
        'talisman': 'Sacred Adornments',
        'statue': 'Shrine Artifacts',
        'figure': 'Shrine Artifacts',
        'altar': 'Shrine Artifacts',
        'spell': 'Ritual Tools',
        'magic': 'Ritual Tools',
        'wicca': 'Ritual Tools',
        'pagan': 'Ritual Tools'
    }
    
    esoteric_tags = set()
    for dept in dept_names:
        d_lower = dept.lower()
        for key, esoteric_name in mapping.items():
            if key in d_lower:
                esoteric_tags.add(esoteric_name)
    
    # Default category if none match
    if not esoteric_tags:
        esoteric_tags.add('Mystic Curiosities')
        
    return list(esoteric_tags)

def main():
    if not os.path.exists(azuregreen_csv):
        print(f"Error: Could not find {azuregreen_csv}")
        return

    # Load Departments map
    dept_map = {}
    if os.path.exists(dept_csv):
        with open(dept_csv, 'r', encoding='utf-8', errors='replace') as f:
            reader = csv.DictReader(f)
            for row in reader:
                dept_map[row.get('DEPTCODE', '').strip()] = row.get('NAME', '').strip()

    # Load Product to Department map
    prod_depts = {}
    if os.path.exists(prod_dept_csv):
        with open(prod_dept_csv, 'r', encoding='utf-8', errors='replace') as f:
            reader = csv.DictReader(f)
            for row in reader:
                sku = row.get('NUMBER', '').strip()
                code = row.get('DEPTCODE', '').strip()
                if sku not in prod_depts:
                    prod_depts[sku] = []
                if code in dept_map:
                    prod_depts[sku].append(dept_map[code])

    shopify_header = [
        "Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", 
        "Published", "Option1 Name", "Option1 Value", "Variant SKU", 
        "Variant Grams", "Variant Inventory Tracker", "Variant Inventory Qty", 
        "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price", 
        "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable", 
        "Variant Barcode", "Image Src", "Image Position", "Image Alt Text", "Gift Card",
        "Status"
    ]

    count = 0
    seen_skus = set()
    with open(azuregreen_csv, 'r', encoding='utf-8', errors='replace') as infile, \
         open(output_csv, 'w', encoding='utf-8', newline='') as outfile:
        
        reader = csv.DictReader(infile)
        writer = csv.writer(outfile)
        writer.writerow(shopify_header)

        for row in reader:
            sku = row.get('NUMBER', '').strip()
            
            # Remove duplicates based on SKU
            if sku in seen_skus:
                continue
            seen_skus.add(sku)

            title = row.get('INETSDESC', '').strip()
            desc = row.get('INETSHORTD', '').strip()
            units = row.get('UNITS', '0').strip()
            weight_lbs = row.get('UNITWEIGHT', '0').strip()
            price_raw = row.get('PRICE1', '0').strip()
            discont = row.get('DISCONT', '0').strip()
            cantsell = row.get('CANTSELL', '0').strip()
            image_name = row.get('INETIMAGE', '').strip()

            # Skip highly discontinued or unsellable items
            if discont == '1' or cantsell == '1':
                continue
                
            # Remove out of stock products from view
            # Try to parse units as int, default to 0
            try:
                qty = int(float(units))
            except ValueError:
                qty = 0
                
            # Set Published to FALSE if there's no stock, so it disappears from the storefront
            published_status = "TRUE" if qty > 0 else "FALSE"

            try:
                base_price_usd = float(price_raw)
            except ValueError:
                base_price_usd = 0.0

            # 40% profit margin logic: Price = Cost / (1 - Margin)
            # Example: $10 cost / (1 - 0.40) = $16.67 USD Retail
            if base_price_usd > 0:
                price_with_margin_usd = base_price_usd / (1 - 0.40)
            else:
                price_with_margin_usd = 0.0

            # Convert to CAD (approx 1.36)
            USD_TO_CAD_RATE = 1.36
            retail_price_cad = round(price_with_margin_usd * USD_TO_CAD_RATE, 2)
            
            try:
                weight_g = int(float(weight_lbs) * 453.592)
            except ValueError:
                weight_g = 0

            handle = generate_handle(sku + "-" + title)
            
            dept_tags = prod_depts.get(sku, [])
            esoteric_tags = get_esoteric_category(dept_tags)
            
            all_tags = dept_tags + esoteric_tags + ["The Way to Resonance"]
            tags = ",".join(all_tags)
            
            image_src = f"https://www.azuregreen.net/images/{image_name}" if image_name else ""

            shopify_row = [
                handle,                  # Handle
                title,                   # Title
                desc,                    # Body (HTML)
                "AzureGreen",            # Vendor
                "Metaphysical Supplies", # Type
                tags,                    # Tags
                published_status,        # Published
                "Title",                 # Option1 Name
                "Default Title",         # Option1 Value
                sku,                     # Variant SKU
                weight_g,                # Variant Grams
                "shopify",               # Variant Inventory Tracker
                units,                   # Variant Inventory Qty
                "deny",                  # Variant Inventory Policy
                "azuregreen",            # Variant Fulfillment Service
                f"{retail_price_cad:.2f}",# Variant Price
                "",                      # Variant Compare At Price
                "TRUE",                  # Variant Requires Shipping
                "TRUE",                  # Variant Taxable
                "",                      # Variant Barcode
                image_src,               # Image Src
                "1" if image_src else "",# Image Position
                title if image_src else "",# Image Alt Text
                "FALSE",                 # Gift Card
                "active"                 # Status
            ]
            writer.writerow(shopify_row)
            count += 1

    print(f"Successfully generated Shopify import file at: {output_csv}")
    print(f"Total products processed: {count}")

if __name__ == "__main__":
    main()
