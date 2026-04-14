"""
Convert all upgraded product images from 2000x2000 JPEG → WebP at 1200x1200.
Saves ~70% file size. Also generates 600x600 thumbnail WebP for product cards.
"""
import os
from PIL import Image

INPUT_DIR = 'public/images/upgraded'
OUTPUT_DIR = 'public/images/upgraded'  # Save in-place as .webp alongside .jpg

TARGET_FULL = 1200   # Full product detail view
TARGET_THUMB = 600   # Card/grid thumbnail

converted = []
for filename in os.listdir(INPUT_DIR):
    if not filename.endswith('.jpg') or filename == 'occult_bg.jpg':
        continue
    
    src = os.path.join(INPUT_DIR, filename)
    base = filename.replace('.jpg', '')
    
    img = Image.open(src).convert('RGB')
    orig_size = os.path.getsize(src)
    
    # Full resolution WebP
    full_img = img.copy()
    full_img.thumbnail((TARGET_FULL, TARGET_FULL), Image.Resampling.LANCZOS)
    full_path = os.path.join(OUTPUT_DIR, f'{base}.webp')
    full_img.save(full_path, 'WEBP', quality=85, method=6)
    full_size = os.path.getsize(full_path)
    
    # Thumbnail WebP
    thumb_img = img.copy()
    thumb_img.thumbnail((TARGET_THUMB, TARGET_THUMB), Image.Resampling.LANCZOS)
    thumb_path = os.path.join(OUTPUT_DIR, f'{base}-thumb.webp')
    thumb_img.save(thumb_path, 'WEBP', quality=80, method=6)
    thumb_size = os.path.getsize(thumb_path)
    
    savings_pct = round((1 - full_size/orig_size) * 100)
    print(f'  {base}: {orig_size//1024}KB -> {full_size//1024}KB full + {thumb_size//1024}KB thumb ({savings_pct}% saved)')
    converted.append(base)

print(f'\n[DONE] Converted {len(converted)} images to WebP')
total_orig = sum(os.path.getsize(os.path.join(INPUT_DIR, f+'.jpg')) for f in converted)
total_webp = sum(os.path.getsize(os.path.join(INPUT_DIR, f+'.webp')) for f in converted)
print(f'Total: {total_orig//1024//1024}MB JPG -> {total_webp//1024}KB WebP ({round((1-total_webp/total_orig)*100)}% reduction)')
