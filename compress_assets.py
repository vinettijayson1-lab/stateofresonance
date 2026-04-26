import os
from PIL import Image

def convert_to_webp(folder):
    for filename in os.listdir(folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')) and not filename.startswith('review-qr') and not 'social' in filename:
            filepath = os.path.join(folder, filename)
            webp_filepath = os.path.join(folder, os.path.splitext(filename)[0] + '.webp')
            try:
                with Image.open(filepath) as img:
                    img.save(webp_filepath, 'webp', quality=85)
                print(f"Converted {filename} to {os.path.basename(webp_filepath)}")
                # Delete original to save space and enforce the change
                os.remove(filepath)
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    public_dir = os.path.join(os.getcwd(), 'public')
    convert_to_webp(public_dir)
