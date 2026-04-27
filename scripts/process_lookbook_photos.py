import os
import glob
import json
import random
import shutil
import math
from PIL import Image, ImageEnhance, ImageOps, ImageFilter, ImageStat

SOURCE_DIR = r"C:\Users\jayvi\OneDrive\Pictures\photo shoot"
PROJECT_DIR = r"C:\Users\jayvi\.gemini\antigravity\scratch\stateofresonance-v3"
TARGET_DIR = os.path.join(PROJECT_DIR, "public", "lookbook")
JSON_OUTPUT = os.path.join(PROJECT_DIR, "src", "content", "lookbook.json")

MAX_DIMENSION = 1000 # Optimized for mobile LCP
TARGET_COUNT = 25

def process_photos():
    if os.path.exists(TARGET_DIR):
        shutil.rmtree(TARGET_DIR)
    os.makedirs(TARGET_DIR)
    os.makedirs(os.path.dirname(JSON_OUTPUT), exist_ok=True)

    image_files = glob.glob(os.path.join(SOURCE_DIR, "*.jpg")) + \
                  glob.glob(os.path.join(SOURCE_DIR, "*.jpeg")) + \
                  glob.glob(os.path.join(SOURCE_DIR, "*.png"))
                  
    print(f"Found {len(image_files)} images. Randomly selecting {TARGET_COUNT} for variation...")
    
    # Randomly select to avoid picking a burst of the exact same pose
    if len(image_files) > TARGET_COUNT:
        top_files = random.sample(image_files, TARGET_COUNT)
    else:
        top_files = image_files
    
    num_bw = int(len(top_files) * 0.4) 
    bw_indices = set(random.sample(range(len(top_files)), num_bw))
    
    lookbook_data = []
    
    for i, file_path in enumerate(top_files):
        try:
            filename = os.path.basename(file_path)
            name, _ = os.path.splitext(filename)
            target_filename = f"{name}_avantgarde.webp"
            target_path = os.path.join(TARGET_DIR, target_filename)
            
            with Image.open(file_path) as img:
                img = ImageOps.exif_transpose(img)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                    
                # Resize while keeping aspect ratio
                img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
                
                is_bw = i in bw_indices
                
                # Removed heavy Python filters to keep it natural as requested
                if is_bw:
                    img = img.convert("L").convert("RGB")
                
                img.save(target_path, "WEBP", quality=80)
                
                lookbook_data.append({
                    "src": f"/lookbook/{target_filename}",
                    "width": img.width,
                    "height": img.height,
                    "alt": f"State of Resonance Avant-Garde Lookbook {i+1}",
                    "style": "bw" if is_bw else "cinematic"
                })
                
            print(f"[{i+1}/{len(top_files)}] Processed {target_filename}")
            
        except Exception as e:
            print(f"Failed to process {file_path}: {e}")
            
    with open(JSON_OUTPUT, "w") as f:
        json.dump(lookbook_data, f, indent=2)

if __name__ == "__main__":
    process_photos()
