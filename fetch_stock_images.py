import os
import urllib.request

images = {
    "Resonance_Drops": "tincture,dark",
    "Clarity_Oracle_Deck": "tarot,cards,dark",
    "Grounding_Tingsha": "chimes,meditation",
    "Sacred_Smoke": "palosanto,smoke",
    "Tuning_Fork": "tuningfork",
    "Zafu_Cushion": "meditation,cushion",
    "Breathwork_Oil": "essentialoil,dark",
    "Orgonite_Pyramid": "crystal,pyramid",
    "Intention_Journal": "journal,black",
    "Singing_Bowl": "singingbowl"
}

os.makedirs("stock_images", exist_ok=True)

for name, keywords in images.items():
    url = f"https://loremflickr.com/800/800/{keywords}/all"
    filepath = f"stock_images/{name}.jpg"
    try:
        urllib.request.urlretrieve(url, filepath)
        print(f"Downloaded {name} from {url}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
