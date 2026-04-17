import os
import re

rep_map = {
    "Artifacts": "Garments",
    "artifacts": "garments",
    "Artifact": "Piece",
    "artifact": "piece",
    "Sanctuary": "Shop",
    "sanctuary": "shop",
    "Reservoir": "Collection",
    "reservoir": "collection",
    "Calibration": "Construction",
    "calibration": "construction"
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # We want to replace only specific literal usages without breaking CSS classes where possible,
    # but the terms are rare.
    for k, v in rep_map.items():
        # Avoid replacing inside URLs or imports if possible, but for this project safe enough
        content = re.sub(rf'\b{k}\b', v, content)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/views'):
    for file in files:
        if file.endswith('.vue'):
            process_file(os.path.join(root, file))

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.vue'):
            process_file(os.path.join(root, file))
