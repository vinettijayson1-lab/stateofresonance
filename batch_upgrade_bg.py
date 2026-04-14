"""
Batch process all 25 products:
1. Download product image from Shopify CDN
2. Remove background with rembg (keeping clothes intact)
3. Composite onto luxury occult background
4. Save to public/images/upgraded/ for Shopify upload
"""

import os
import requests
import json
from PIL import Image, ImageFilter, ImageEnhance
from io import BytesIO
from rembg import remove
import time

# Config
OUTPUT_DIR = 'public/images/upgraded'
BG_PATH = 'public/images/occult_bg.jpg'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load the occult background
occult_bg = Image.open(BG_PATH).convert('RGBA')
print(f"[OK] Loaded background: {occult_bg.size}")

# Fetch all products from Shopify
print("[...] Fetching products from Shopify...")
r = requests.get('https://state-of-resonance.myshopify.com/products.json?limit=250')
data = r.json()
products = data['products']
print(f"[OK] Found {len(products)} products")

# Track results
results = []
errors = []

for i, product in enumerate(products):
    handle = product['handle']
    title = product['title']
    images = product.get('images', [])
    
    if not images:
        print(f"[SKIP] {i+1}/{len(products)} {handle} - No images")
        errors.append({'handle': handle, 'error': 'No images'})
        continue

    # Use the FIRST image (primary product photo)
    img_url = images[0]['src']
    
    print(f"\n[{i+1}/{len(products)}] Processing: {title}")
    print(f"  URL: {img_url[:80]}...")
    
    try:
        # Step 1: Download image
        start = time.time()
        img_response = requests.get(img_url, timeout=30)
        if img_response.status_code != 200:
            raise Exception(f"HTTP {img_response.status_code}")
        
        original = Image.open(BytesIO(img_response.content)).convert('RGBA')
        orig_w, orig_h = original.size
        print(f"  Downloaded: {orig_w}x{orig_h} ({time.time()-start:.1f}s)")
        
        # Step 2: Remove background with rembg
        start = time.time()
        # Convert to bytes for rembg
        input_bytes = BytesIO()
        original.save(input_bytes, format='PNG')
        input_bytes.seek(0)
        
        output_bytes = remove(input_bytes.read())
        cutout = Image.open(BytesIO(output_bytes)).convert('RGBA')
        print(f"  Background removed ({time.time()-start:.1f}s)")
        
        # Step 3: Resize background to match product image dimensions
        bg_copy = occult_bg.copy()
        
        # Scale bg to fit the product image dimensions
        bg_ratio = max(orig_w / bg_copy.width, orig_h / bg_copy.height)
        new_bg_w = int(bg_copy.width * bg_ratio)
        new_bg_h = int(bg_copy.height * bg_ratio)
        bg_copy = bg_copy.resize((new_bg_w, new_bg_h), Image.Resampling.LANCZOS)
        
        # Center crop to match product dimensions
        left = (new_bg_w - orig_w) // 2
        top = (new_bg_h - orig_h) // 2
        bg_copy = bg_copy.crop((left, top, left + orig_w, top + orig_h))
        
        # Step 4: Composite clothing onto occult background
        # Add subtle shadow under the clothing for depth
        shadow = cutout.copy()
        shadow_data = shadow.split()
        # Create shadow from alpha channel
        shadow_alpha = shadow_data[3].point(lambda p: min(int(p * 0.3), 60))
        shadow_layer = Image.new('RGBA', (orig_w, orig_h), (0, 0, 0, 0))
        shadow_r = Image.new('L', (orig_w, orig_h), 0)
        shadow_g = Image.new('L', (orig_w, orig_h), 0)  
        shadow_b = Image.new('L', (orig_w, orig_h), 0)
        shadow_layer = Image.merge('RGBA', (shadow_r, shadow_g, shadow_b, shadow_alpha))
        shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=15))
        
        # Composite: bg -> shadow -> clothing
        result = bg_copy.convert('RGBA')
        result = Image.alpha_composite(result, shadow_layer)
        result = Image.alpha_composite(result, cutout)
        
        # Step 5: Slight enhancement for luxury feel
        result_rgb = result.convert('RGB')
        enhancer = ImageEnhance.Contrast(result_rgb)
        result_rgb = enhancer.enhance(1.05)
        enhancer = ImageEnhance.Sharpness(result_rgb)
        result_rgb = enhancer.enhance(1.1)
        
        # Step 6: Save
        output_path = os.path.join(OUTPUT_DIR, f"{handle}.jpg")
        result_rgb.save(output_path, quality=92)
        file_size = os.path.getsize(output_path) / 1024
        print(f"  Saved: {output_path} ({file_size:.0f} KB)")
        
        results.append({
            'handle': handle,
            'title': title,
            'output': output_path,
            'original_url': img_url,
            'size': f"{orig_w}x{orig_h}"
        })
        
    except Exception as e:
        print(f"  [ERROR] {str(e)}")
        errors.append({'handle': handle, 'error': str(e)})

# Summary
print(f"\n{'='*60}")
print(f"BATCH PROCESSING COMPLETE")
print(f"{'='*60}")
print(f"Successfully processed: {len(results)}/{len(products)}")
print(f"Errors: {len(errors)}")

if errors:
    print("\nFailed items:")
    for err in errors:
        print(f"  - {err['handle']}: {err['error']}")

# Save manifest
manifest = {'processed': results, 'errors': errors}
with open(os.path.join(OUTPUT_DIR, 'manifest.json'), 'w') as f:
    json.dump(manifest, f, indent=2)
print(f"\nManifest saved to {OUTPUT_DIR}/manifest.json")
