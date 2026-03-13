
import csv
import json

csv_path = "c:/Users/jayvi/OneDrive/Documents/antigravity worspace/cvs. zip/AG_Complete_Files.csv"
stock_images = [
    "Breathwork_Oil.jpg", "Clarity_Oracle_Deck.jpg", "Grounding_Tingsha.jpg", 
    "Intention_Journal.jpg", "Orgonite_Pyramid.jpg", "Resonance_Drops.jpg", 
    "Sacred_Smoke.jpg", "Singing_Bowl.jpg", "Tuning_Fork.jpg", "Zafu_Cushion.jpg"
]

results = []

with open(csv_path, "r", encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    for row in reader:
        if not row: continue
        title = row[1].strip()
        for img in stock_images:
            keyword = img.replace("_", " ").replace(".jpg", "").lower()
            if keyword in title.lower():
                results.append({
                    "title": title,
                    "price": f"${row[5].strip()}",
                    "image": f"/assets/{img}",
                    "description": row[2].strip()[:100] + "...",
                    "handle": row[0].strip().lower().replace(" ", "-"),
                    "sku": row[0].strip()
                })

print(json.dumps(results, indent=2))
