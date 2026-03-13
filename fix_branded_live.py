"""
Fix 13 branded products on the live state-of-resonance store (stateofresonance.ca).
Includes image upload for Angel's Influence and descriptions for all 13.
"""
import requests
import json
import os

shop = "state-of-resonance.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiiPo8PNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDQxNzE1ZTUyLTZkOTYtNDA0ZS05MzBhLWU4MzVkOWFkNjgyOEokNDkxMjdjMWMtNmFhMC00YjExLTgwOGQtYzU3Yjg0NzRlZjdlEm8KQDkTwft8JWbkn7bYUd8GooJxK_ww_cADDMTQ95IRqXZA5uQjAhVBkidP-CpIlGtE60NCsL9XzXVRWd5XtV-OCAMSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
api_version = "2024-01"

HEADERS = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
GRAPHQL_URL = f"https://{shop}/admin/api/{api_version}/graphql.json"

BRANDED_DATA = {
    "8742514065431": {
        "title": "Angel's Influence Herbal votive - teal",
        "description": """<p>Invite divine peace and angelic guidance into your space with the Angel's Influence Herbal Votive. Crafted in a calming teal hue, this candle is specially formulated with a blend of essential oils and herbs intended to facilitate connection with higher realms and inner stillness.</p>
<ul>
  <li>Vibrant teal wax infused with spiritual herb blends</li>
  <li>Designed for meditation, prayer, and ritual work</li>
  <li>Calming aroma that promotes tranquility and focus</li>
  <li>Perfect for altar use or as a serene home accent</li>
</ul>
<p>Light your path. Connect with the divine.</p>""",
        "image_path": r"C:\Users\jayvi\.gemini\antigravity\brain\c42b1153-2eda-4621-a39d-425c82be6798\angels_influence_votive_teal_1773190312104.png",
        "image_alt": "Angel's Influence Herbal votive - teal colored spiritual candle"
    },
    "8742442926103": {
        "title": "Strix Craft by Oracle Hekataios",
        "description": """<p>Dive deep into the ancient mysteries of the Strix with this comprehensive guide by Oracle Hekataios. Exploring the darker, more primal roots of witchcraft, this book offers historical insights, ritual practices, and spiritual exploration for the dedicated practitioner.</p>
<ul>
  <li>In-depth exploration of the Strix tradition and Hekatean mysteries</li>
  <li>Rituals, spells, and invocations tailored for the serious witch</li>
  <li>Insights into the history and mythology of ancient Greek magic</li>
  <li>Essential reading for those seeking a path of shadowed wisdom</li>
</ul>
<p>Unveil the mysteries. Walk the shadowed path.</p>"""
    },
    "8742587400215": {
        "title": "12\" Crescent Moon Eye sun catcher",
        "description": """<p>Bring a touch of celestial magic to any room with this stunning Crescent Moon Eye Sun Catcher. Featuring a beautifully crafted golden crescent moon adorned with vibrant, multi-colored faceted beads, it catches and reflects sunlight to create a dazzling display of color.</p>
<ul>
  <li>12-inch total length including hanging chain</li>
  <li>Golden crescent moon design with artistic eye motif</li>
  <li>Multi-colored beads that dance with light</li>
  <li>Perfect for windows, patios, or any sunny spot</li>
</ul>
<p>Capture the sun. Shine with celestial light.</p>"""
    },
    "8742587465751": {
        "title": "12\" Evil Eye sun catcher",
        "description": """<p>Protect your home and invite positive energy with this 12-inch Evil Eye Sun Catcher. This elegant gold-toned piece features a central star and moon motif, beautifully embellished with stone beads and a protective evil eye charm.</p>
<ul>
  <li>Powerful evil eye symbol for protection and positivity</li>
  <li>Gold-toned finish with shimmering prism accents</li>
  <li>Reflects a stunning rainbow of colors in direct sunlight</li>
  <li>Easy to hang in any window or protected outdoor space</li>
</ul>
<p>Ward off the negative. Welcome the light.</p>"""
    },
    "8742587564055": {
        "title": "13\" Blue & White sun catcher",
        "description": """<p>Experience the tranquil beauty of the Blue & White Sun Catcher. This 13-inch piece features a delicate silver-toned frame adorned with serene blue and white beads, designed to scatter calming light across your surroundings.</p>
<ul>
  <li>13-inch length for prominent window display</li>
  <li>Scholarly blue and pure white bead combination</li>
  <li>Features multiple prisms for maximum light scattering</li>
  <li>Crafted for durability and magical brilliance</li>
</ul>
<p>Transform your space with a dance of light.</p>"""
    },
    "8742587793431": {
        "title": "21\" Amethyst Moon W Butterfly sun catcher",
        "description": """<p>Make a bold statement with our 21-inch Amethyst Moon W Butterfly Sun Catcher. This large, exquisite piece pairs the healing energy of amethyst with the transformative symbol of the butterfly, all set within a celestial moon frame.</p>
<ul>
  <li>Impressive 21-inch length for a grand display</li>
  <li>Genuine amethyst bead accents for spiritual resonance</li>
  <li>Delicate butterfly motifs for a touch of natural grace</li>
  <li>High-quality gold-toned hardware and prism orbs</li>
</ul>
<p>Celebrate transformation. Radiate spiritual energy.</p>"""
    },
    "8742657458199": {
        "title": "4 1/4\" Mushroom backflow burner",
        "description": """<p>Add a whimsical touch to your incense rituals with the Mushroom Backflow Burner. Specifically designed for backflow cones, this 4 1/4-inch burner creates a mesmerizing waterfall effect as smoke cascades down the vibrant mushroom caps.</p>
<ul>
  <li>Intricate mushroom design with rich, hand-painted details</li>
  <li>Creates a soothing, slow-flowing smoke waterfall</li>
  <li>Compact size perfect for bedside tables or altars</li>
  <li>Durable ceramic construction for long-lasting use</li>
</ul>
<p>Let the magic flow. Find your tranquility.</p>"""
    },
    "8742804914199": {
        "title": "1oz Rosemary oil azuregreen",
        "description": """<p>Harness the potent essence of Rosemary with this high-quality 1oz anointing oil. Historically associated with memory, protection, and clarity, Rosemary oil is an essential tool for any practitioner's collection.</p>
<ul>
  <li>1oz bottle of pure anointing oil for external use</li>
  <li>Ideal for ritual work, candle anointing, and aromatherapy</li>
  <li>Promotes mental clarity, spiritual protection, and remembrance</li>
  <li>Resonates with the element of Earth and signs of Scorpio/Sagittarius</li>
</ul>
<p>Clarify your intent. Protect your spirit. Made in USA.</p>"""
    },
    "8742806061079": {
        "title": "1oz Tonka Bean oil azuregreen",
        "description": """<p>Attract love, luck, and sweet blessings with our 1oz Tonka Bean Oil. Known for its warm, vanilla-like aroma and powerful association with good fortune, this oil is perfect for enhancing intuition and warming your rituals.</p>
<ul>
  <li>1oz high-quality yellow label Tonka Bean oil</li>
  <li>Used in ritual magic to attract prosperity and affection</li>
  <li>Warm, sweet fragrance that inspires positivity</li>
  <li>Suitable for anointing candles, talismans, and ritual tools</li>
</ul>
<p>Magnetize luck. Invite sweet blessings.</p>"""
    },
    "8742806159383": {
        "title": "1oz Vanilla oil azuregreen",
        "description": """<p>Add warmth and harmony to your rituals with our 1oz Vanilla Oil. This pure anointing oil is celebrated for its ability to reduce tension, promote relaxation, and act as a powerful attracting agent in love and abundance magic.</p>
<ul>
  <li>1oz bottle of pure anointing oil for external use</li>
  <li>Promotes relaxation, sweet energy, and aphrodisiac effects</li>
  <li>Excellent for anointing ritual items to invite abundance</li>
  <li>A classic aid for tension and spiritual agitation</li>
</ul>
<p>Soothe the senses. Radiate abundance.</p>"""
    },
    "8742810058775": {
        "title": "2dr Rosemary oil azuregreen",
        "description": """<p>The potent essence of Rosemary in a convenient 2-dram bottle. Perfect for travel or a focused ritual, this oil carries properties of remembrance, protection, and mental clarity.</p>
<ul>
  <li>2-dram (1/4oz) vial convenient for travel or altar kits</li>
  <li>Use to anoint candles for memory-boosting rituals</li>
  <li>Associated with Earth and powerful spiritual cleansing</li>
  <li>Capture the traditional magic of the rosemary herb</li>
</ul>
<p>Focus your mind. Cleanse your craft. Made in USA.</p>"""
    },
    "8742810845207": {
        "title": "2dr Tonka Bean oil azuregreen",
        "description": """<p>A 2-dram vial of our high-quality Tonka Bean Oil, known for its powers of attraction and good fortune. This warm, sweet oil is a favorite for rituals involving love, luck, and spiritual warmth.</p>
<ul>
  <li>2-dram vial, ideal for precise ritual application</li>
  <li>Attracts love and enhances personal intuition</li>
  <li>Warm, sweet vanilla-like aroma</li>
  <li>Perfect for anointing small talismans or spirit bags</li>
</ul>
<p>Warm your rituals. Attract the light.</p>"""
    },
    "8742811074583": {
        "title": "2dr Vanilla oil azuregreen",
        "description": """<p>Our pure Vanilla anointing oil in a 2-dram vial. Use this to invite sweetness, harmony, and relaxation into your sacred space and ritual workings.</p>
<ul>
  <li>2-dram vial of high-quality anointing oil</li>
  <li>Aids in relaxation and releasing spiritual tension</li>
  <li>A powerful agent for attracting love and harmony</li>
  <li>Classic, sweet aroma loved by practitioners worldwide</li>
</ul>
<p>Invite sweetness. Find your harmony.</p>"""
    }
}

UPDATE_MUTATION = """
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      id
      title
    }
    userErrors {
      field
      message
    }
  }
}
"""

def graphql(query, variables=None):
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    resp = requests.post(GRAPHQL_URL, headers=HEADERS, json=payload)
    if resp.status_code != 200:
        print(f"  HTTP Error: {resp.status_code} - {resp.text[:300]}")
        return None
    data = resp.json()
    if "errors" in data and "data" not in data:
        print(f"  GraphQL schema error: {data['errors'][0]['message']}")
        return None
    return data

def upload_image(product_id, image_path, alt_text="Product image"):
    """Upload a local image to a product using the staged uploads API"""
    if not os.path.exists(image_path):
        print(f"  Image file not found: {image_path}")
        return False
    
    STAGED_UPLOADS_MUTATION = """
    mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url
          resourceUrl
          parameters {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }
    """
    
    file_size = os.path.getsize(image_path)
    filename = os.path.basename(image_path)
    mime_type = "image/png" if image_path.lower().endswith(".png") else "image/webp"
    
    stage_result = graphql(STAGED_UPLOADS_MUTATION, {
        "input": [{
            "filename": filename,
            "mimeType": mime_type,
            "resource": "PRODUCT_IMAGE",
            "fileSize": str(file_size),
            "httpMethod": "POST"
        }]
    })
    
    if not stage_result or "data" not in stage_result:
        return False
    
    staged = stage_result["data"]["stagedUploadsCreate"]
    if staged["userErrors"]:
        print(f"  Staged upload errors: {staged['userErrors']}")
        return False
    
    target = staged["stagedTargets"][0]
    upload_url = target["url"]
    resource_url = target["resourceUrl"]
    params = {p["name"]: p["value"] for p in target["parameters"]}
    
    with open(image_path, "rb") as f:
        file_data = f.read()
    
    upload_resp = requests.post(upload_url, data=params, files={"file": (filename, file_data, mime_type)})
    if upload_resp.status_code not in [200, 201, 204]:
        print(f"  Upload failed: HTTP {upload_resp.status_code}")
        return False
    
    ADD_IMAGE_MUTATION = """
    mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        media { alt mediaContentType }
        mediaUserErrors { field message }
      }
    }
    """
    
    gid = f"gid://shopify/Product/{product_id}"
    add_result = graphql(ADD_IMAGE_MUTATION, {
        "productId": gid,
        "media": [{
            "originalSource": resource_url,
            "alt": alt_text,
            "mediaContentType": "IMAGE"
        }]
    })
    
    if not add_result or "data" not in add_result:
        return False
    
    errors = add_result["data"]["productCreateMedia"]["mediaUserErrors"]
    if errors:
        print(f"  Image attach errors: {errors}")
        return False
    
    return True

def main():
    print(f"Updating {len(BRANDED_DATA)} branded products on state-of-resonance.myshopify.com...\n")
    
    count = 0
    for product_id, data in BRANDED_DATA.items():
        print(f"[{count+1}/{len(BRANDED_DATA)}] Updating: {data['title']} ({product_id})")
        
        # 1. Update Description (and Title to ensure matches)
        gid = f"gid://shopify/Product/{product_id}"
        resp = graphql(UPDATE_MUTATION, {
            "input": {
                "id": gid,
                "title": data["title"],
                "descriptionHtml": data["description"]
            }
        })
        
        if resp and "data" in resp:
            errors = resp["data"]["productUpdate"]["userErrors"]
            if errors:
                print(f"  [FAIL] Errors: {errors}")
            else:
                print(f"  [OK] Description updated")
        else:
            print(f"  [FAIL] Mutation failed")
            
        # 2. Upload Image if present
        if "image_path" in data:
            print(f"  Uploading image: {os.path.basename(data['image_path'])}...")
            if upload_image(product_id, data["image_path"], data.get("image_alt", "Product Image")):
                print(f"  [OK] Image uploaded")
            else:
                print(f"  [FAIL] Image upload failed")
        
        count += 1
    
    print("\nDone!")

if __name__ == "__main__":
    main()
