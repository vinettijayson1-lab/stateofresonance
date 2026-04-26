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

def calculate_score(img):
    gray = img.convert("L")
    edges = gray.filter(ImageFilter.FIND_EDGES)
    stat_edges = ImageStat.Stat(edges)
    sharpness = stat_edges.var[0]
    stat_gray = ImageStat.Stat(gray)
    contrast = stat_gray.stddev[0]
    return sharpness * 0.4 + contrast * 0.6

def apply_master_edit(img, is_bw):
    if is_bw:
        img = img.convert("L").convert("RGB")
        # Extreme contrast for brutalist noir
        img = ImageEnhance.Contrast(img).enhance(1.6)
        img = ImageEnhance.Brightness(img).enhance(0.9)
        img = ImageEnhance.Sharpness(img).enhance(1.3)
    else:
        # Cinematic look (desaturated, warm/moody, high contrast)
        img = ImageEnhance.Color(img).enhance(0.65) # More desaturated
        img = ImageEnhance.Contrast(img).enhance(1.3)
        img = ImageEnhance.Brightness(img).enhance(0.95)
        img = ImageEnhance.Sharpness(img).enhance(1.15)
    
    return img

def process_photos():
    if os.path.exists(TARGET_DIR):
        shutil.rmtree(TARGET_DIR)
    os.makedirs(TARGET_DIR)
    os.makedirs(os.path.dirname(JSON_OUTPUT), exist_ok=True)

    image_files = glob.glob(os.path.join(SOURCE_DIR, "*.jpg")) + \
                  glob.glob(os.path.join(SOURCE_DIR, "*.jpeg")) + \
                  glob.glob(os.path.join(SOURCE_DIR, "*.png"))
                  
    print(f"Analyzing {len(image_files)} images for curation...")
    
    scored_images = []
    for i, file_path in enumerate(image_files):
        try:
            with Image.open(file_path) as img:
                img = ImageOps.exif_transpose(img)
                img.thumbnail((400, 400))
                score = calculate_score(img)
                scored_images.append((score, file_path))
        except Exception as e:
            pass
            
    scored_images.sort(key=lambda x: x[0], reverse=True)
    top_files = [x[1] for x in scored_images[:TARGET_COUNT]]
    
    num_bw = int(len(top_files) * 0.4) # Increased to 40% B&W for a starker look
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
                img = apply_master_edit(img, is_bw)
                
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
            print(f"Failed to master {file_path}: {e}")
            
    with open(JSON_OUTPUT, "w") as f:
        json.dump(lookbook_data, f, indent=2)

if __name__ == "__main__":
    process_photos()
