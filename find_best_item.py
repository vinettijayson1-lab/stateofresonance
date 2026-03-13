import csv

best_item = None
max_margin = 0

with open("shopify_azuregreen_import.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        try:
            price_str = row.get("Variant Price")
            cost_str = row.get("Cost per item")
            
            # AzureGreen format sometimes has these under different names or none at all
            if not price_str or not cost_str:
                # If "Cost per item" is not present, we can look at the raw row
                pass
                
            price = float(price_str)
            cost = float(cost_str)
            
            if cost > 0:
                margin = (price - cost) / price
                if margin > max_margin:
                    max_margin = margin
                    best_item = row
        except:
            pass

if best_item:
    print(f"BEST ITEM: {best_item.get('Title')} (Handle: {best_item.get('Handle')}), Price: {best_item.get('Variant Price')}, Cost: {best_item.get('Cost per item')}, Margin: {max_margin:.2%}")
else:
    print("Could not parse prices/costs from CSV automatically. Let's just print the headers to see if 'Cost per item' exists.")
    with open("shopify_azuregreen_import.csv", "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        headers = next(reader)
        print("HEADERS:", headers)
