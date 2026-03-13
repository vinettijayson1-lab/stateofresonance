"""
Fix all products with missing images and descriptions in the Shopify store.
Uses the CLI OAuth token via Bearer auth.
"""
import requests
import json
import sys
import base64

shop = "state-of-resonance-dev-store.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiiPo8PNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDQxNzE1ZTUyLTZkOTYtNDA0ZS05MzBhLWU4MzVkOWFkNjgyOEokNDkxMjdjMWMtNmFhMC00YjExLTgwOGQtYzU3Yjg0NzRlZjdlEm8KQDkTwft8JWbkn7bYUd8GooJxK_ww_cADDMTQ95IRqXZA5uQjAhVBkidP-CpIlGtE60NCsL9XzXVRWd5XtV-OCAMSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
api_version = "2024-01"

HEADERS = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

GRAPHQL_URL = f"https://{shop}/admin/api/{api_version}/graphql.json"

# ============================================================
# PRODUCT DESCRIPTIONS
# All 15 products missing descriptions (or both)
# ============================================================
DESCRIPTIONS = {
    # Missing BOTH image and description
    "8152223121482": {
        "title": "The Minimal Snowboard",
        "description": """<p>Less is more — and The Minimal Snowboard proves it. Stripped of everything unnecessary, this board is built for riders who want pure performance without distraction. Every curve, every flex, every edge is precisely engineered to respond exactly the way you need it to.</p>
<ul>
  <li>Clean, low-profile design for advanced manoeuvrability</li>
  <li>Lightweight composite core for responsive edge-to-edge performance</li>
  <li>Versatile shape suited for groomed runs, off-piste, and park riding</li>
  <li>Durable sintered base for exceptional glide and minimal maintenance</li>
  <li>Available in a range of sizes to match your riding style</li>
</ul>
<p>Ride with intention. Ride minimal.</p>"""
    },
    # Missing description only
    "8152222990410": {
        "title": "The Inventory Not Tracked Snowboard",
        "description": """<p>Freedom on the mountain starts with the right gear — and The Inventory Not Tracked Snowboard delivers exactly that. Designed for riders who demand consistency and confidence on every run, this board combines classic snowboard construction with modern performance innovations.</p>
<ul>
  <li>All-mountain capable shape for versatility across terrain types</li>
  <li>Medium flex rating for a balanced blend of stability and playfulness</li>
  <li>Poplar wood core for natural feel and responsive rebound</li>
  <li>PTEX base for fast, smooth gliding across varying snow conditions</li>
  <li>Available in multiple size options for riders of all levels</li>
</ul>
<p>Built for the mountain. Ready for anything.</p>"""
    },
    "8152223023178": {
        "title": "The Draft Snowboard",
        "description": """<p>Before a masterpiece is finished, it's a draft — and The Draft Snowboard captures that spirit of raw potential. Engineered as a high-performance all-mountain board, it's designed for riders who are always refining their craft, always pushing further.</p>
<ul>
  <li>Progressive directional shape optimised for speed and carving</li>
  <li>Stiff flex profile for powerful, aggressive riding</li>
  <li>Carbon fibre inserts for explosive pop off the lip</li>
  <li>Magnetraction edge technology for superior grip on icy terrain</li>
  <li>Glossy topsheet with UV-protective coating</li>
</ul>
<p>Your ride. Your rules. Your draft.</p>"""
    },
    "8152223055946": {
        "title": "The Archived Snowboard",
        "description": """<p>Some classics never go out of style. The Archived Snowboard is a tribute to the heritage of snowboarding — timeless design language paired with modern engineering that meets the demands of today's mountain.</p>
<ul>
  <li>Classic twin-tip shape for switch riding and park versatility</li>
  <li>Medium-soft flex for a forgiving, playful feel on any terrain</li>
  <li>Wood core with fibreglass laminate for tried-and-true reliability</li>
  <li>Extruded base for easy waxing and straightforward maintenance</li>
  <li>Retro-inspired graphics with a modern matte finish</li>
</ul>
<p>Honouring the past. Riding the future.</p>"""
    },
    "8152223088714": {
        "title": "The Videographer Snowboard",
        "description": """<p>Made for the riders who perform for the lens and the ones who want to shred as if every run is on film. The Videographer Snowboard is designed for style-forward riders who express themselves through butters, presses, and effortless park lines.</p>
<ul>
  <li>Soft-to-medium freestyle flex for maximum creativity and expression</li>
  <li>True twin shape for identical feel in both directions</li>
  <li>Rockered profile for easy initiation and floaty, playful control</li>
  <li>Lightweight bamboo core for snappy pop and reduced fatigue</li>
  <li>Graphic-forward topsheet designed to stand out in any edit</li>
</ul>
<p>Hit every frame. Ride every line.</p>"""
    },
    "8152223187018": {
        "title": "The Collection Snowboard: Hydrogen",
        "description": """<p>Hydrogen — the lightest element, the most abundant in the universe, and the inspiration behind our lightest, most dynamic snowboard. The Collection Snowboard: Hydrogen is engineered for riders chasing speed and effortless control from summit to base.</p>
<ul>
  <li>Ultra-lightweight hollow carbon core for an extraordinary strength-to-weight ratio</li>
  <li>Directional shape designed for high-speed, responsive carving</li>
  <li>Stiff tip and tail with progressive flex for powerful landings</li>
  <li>Race-grade sintered base for maximum velocity on groomed runs</li>
  <li>Part of The Collection series — designed to perform at the elite level</li>
</ul>
<p>Light as hydrogen. Powerful as the universe.</p>"""
    },
    "8152223219786": {
        "title": "The Compare at Price Snowboard",
        "description": """<p>Premium performance at an unbeatable price point — The Compare at Price Snowboard delivers exceptional value without compromising on what matters most. Compare the specs, compare the price, and see for yourself why this board punches far above its weight class.</p>
<ul>
  <li>All-terrain shape adaptable to groomed runs, powder, and park features</li>
  <li>Medium flex for a balanced ride that suits most styles</li>
  <li>Durable fibreglass construction with a protective topsheet</li>
  <li>High-performance base for reliable speed and durability season after season</li>
  <li>Exceptional value — exceptional ride</li>
</ul>
<p>More board. Less spend. No compromise.</p>"""
    },
    "8152223252554": {
        "title": "The Hidden Snowboard",
        "description": """<p>The best lines on the mountain are the ones others haven't found yet. The Hidden Snowboard is built for the explorers — the riders who duck the ropes, read the terrain, and find the untouched snow everyone else missed.</p>
<ul>
  <li>Powder-optimised directional shape with set-back stance for deep snow flotation</li>
  <li>Tapered profile for intuitive surfing-style control in untracked powder</li>
  <li>Medium-stiff flex for stability in variable off-piste conditions</li>
  <li>Camber-rocker hybrid profile for the best of both worlds</li>
  <li>Matte anti-glare topsheet — built for stealth on the mountain</li>
</ul>
<p>Find your line. Stay hidden.</p>"""
    },
    "8152223285322": {
        "title": "The Out of Stock Snowboard",
        "description": """<p>It's out of stock for a reason — because every rider who gets their hands on one doesn't let go. The Out of Stock Snowboard is our most sought-after ride, a board that consistently disappears from shelves because of its unmatched combination of performance, feel, and durability.</p>
<ul>
  <li>All-mountain twin shape — equally capable in the park and on the mountain</li>
  <li>Medium flex with a lively, energetic feel underfoot</li>
  <li>Proprietary core blend for unparalleled energy transfer and ollie power</li>
  <li>Sintered base for extraordinary glide in all snow conditions</li>
  <li>Notoriously hard to keep in stock — grab yours while you can</li>
</ul>
<p>Worth the wait. Always.</p>"""
    },
    "8152223318090": {
        "title": "Selling Plans Ski Wax",
        "description": """<p>The difference between a good run and a great one is often in the details — and the right wax makes all the difference. Our Selling Plans Ski Wax is a high-performance glide wax formulated for riders who demand the most from their base.</p>
<ul>
  <li>Universal temperature formula effective across a wide range of snow conditions</li>
  <li>Fluorocarbon-free, environmentally responsible composition</li>
  <li>Extended durability — more runs between applications</li>
  <li>Easy iron-on application for use at home or in the shop</li>
  <li>Compatible with all ski and snowboard base materials</li>
</ul>
<p>Fast base. Faster runs. Every time.</p>"""
    },
    "8152223350858": {
        "title": "The Multi-location Snowboard",
        "description": """<p>From Whistler to the Alps, from Hakuba to the Rockies — The Multi-location Snowboard is designed to perform everywhere. Built to adapt to the unique characteristics of every mountain, every snow type, and every riding style the world has to offer.</p>
<ul>
  <li>Versatile all-mountain shape tuned for international conditions</li>
  <li>Medium flex optimised for adaptability across diverse terrain</li>
  <li>Multi-climate base treatment for consistent performance in wet and dry snow</li>
  <li>Reinforced edges for resistance to the varied rocks and conditions worldwide</li>
  <li>Lightweight design for easy travel between resorts</li>
</ul>
<p>One board. Every mountain. Everywhere.</p>"""
    },
    "8152223416394": {
        "title": "The Multi-managed Snowboard",
        "description": """<p>Designed for the rider who manages their gear as seriously as they manage their runs. The Multi-managed Snowboard is engineered with high-performance materials and durable construction that rewards proper care and rewires how you think about your setup.</p>
<ul>
  <li>Premium fibreglass and carbon composite build for elite-level performance</li>
  <li>Directional twin shape for versatility between freestyle and freeriding</li>
  <li>Medium-stiff flex that rewards precise technique and athletic riding</li>
  <li>Easy-wax sintered base for riders who maintain their gear regularly</li>
  <li>Built to last season after season with proper care</li>
</ul>
<p>Manage your ride. Maximise your mountain.</p>"""
    },
    "8152223449162": {
        "title": "The 3p Fulfilled Snowboard",
        "description": """<p>Performance, precision, and peace of mind — The 3p Fulfilled Snowboard is built around three core promises: that it will perform when you need it, handle with precision in every condition, and have you leaving the mountain feeling completely fulfilled every time.</p>
<ul>
  <li>All-terrain shape built for riders seeking a complete mountain experience</li>
  <li>Medium flex providing reliable, predictable response in all conditions</li>
  <li>Triaxial fibreglass construction for torsional rigidity and edge hold</li>
  <li>Full base bevel for smooth, catch-free riding across terrain transitions</li>
  <li>Guaranteed to deliver on every run</li>
</ul>
<p>Three promises. One board. Total fulfillment.</p>"""
    },
    "8152223481930": {
        "title": "The Collection Snowboard: Oxygen",
        "description": """<p>You can't breathe without it — and once you ride it, you won't breathe quite the same way again. The Collection Snowboard: Oxygen is engineered for riders who live for the feeling of effortless flow, pure kinetic freedom, and that breathless moment at the top of the run before you drop in.</p>
<ul>
  <li>Freeride-forward directional shape designed for smooth, powerful turns</li>
  <li>Medium-stiff flex for confident control at high speeds</li>
  <li>Oxygen-infused foam core — ultra-lightweight, maximally responsive</li>
  <li>Sintered speed base optimised for varied snow conditions</li>
  <li>Signature Collection series finish with premium base graphics</li>
</ul>
<p>Breathe mountain air. Ride like oxygen.</p>"""
    },
    "8152223514698": {
        "title": "The Collection Snowboard: Liquid",
        "description": """<p>Snow is just frozen water — and The Collection Snowboard: Liquid reminds you of that with every fluid, effortless turn. Inspired by the natural movement of water, this board is designed to flow over the mountain geometry like liquid in motion.</p>
<ul>
  <li>Fluid directional shape engineered for seamless, continuously linked turns</li>
  <li>Medium flex for a smooth, surfy feel across all mountain terrain</li>
  <li>Liquid-dampening core technology reduces vibration for a silky ride</li>
  <li>Matte aqua-inspired topsheet design exclusive to The Collection series</li>
  <li>Wide base profile for enhanced float in variable and soft snow conditions</li>
</ul>
<p>Flow down the mountain. Ride liquid.</p>"""
    },
}

# ============================================================
# GraphQL mutation to update a product description
# ============================================================
UPDATE_DESCRIPTION_MUTATION = """
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      id
      title
      descriptionHtml
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

def update_description(product_id, description_html):
    """Update a product's description via GraphQL"""
    gid = f"gid://shopify/Product/{product_id}"
    result = graphql(UPDATE_DESCRIPTION_MUTATION, {
        "input": {
            "id": gid,
            "descriptionHtml": description_html
        }
    })
    if result is None:
        return False
    if "data" not in result:
        print(f"  Unexpected response: {result}")
        return False
    update_data = result["data"]["productUpdate"]
    errors = update_data["userErrors"]
    if errors:
        print(f"  User errors: {errors}")
        return False
    if update_data["product"] is None:
        print(f"  Product not found or not accessible")
        return False
    return True

def upload_image(product_id, image_path, alt_text="Product image"):
    """Upload a local image to a product using the staged uploads API"""
    import os
    
    if not os.path.exists(image_path):
        print(f"  Image file not found: {image_path}")
        return False
    
    # Step 1: Create staged upload
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
        print(f"  Failed to create staged upload")
        return False
    
    staged = stage_result["data"]["stagedUploadsCreate"]
    if staged["userErrors"]:
        print(f"  Staged upload errors: {staged['userErrors']}")
        return False
    
    target = staged["stagedTargets"][0]
    upload_url = target["url"]
    resource_url = target["resourceUrl"]
    params = {p["name"]: p["value"] for p in target["parameters"]}
    
    # Step 2: Upload the actual file
    with open(image_path, "rb") as f:
        file_data = f.read()
    
    upload_resp = requests.post(upload_url, data=params, files={"file": (filename, file_data, mime_type)})
    if upload_resp.status_code not in [200, 201, 204]:
        print(f"  Upload failed: HTTP {upload_resp.status_code}")
        return False
    
    # Step 3: Add the image to the product
    ADD_IMAGE_MUTATION = """
    mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        media {
          alt
          mediaContentType
          status
        }
        mediaUserErrors {
          field
          message
        }
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
        print(f"  Failed to attach image to product")
        return False
    
    errors = add_result["data"]["productCreateMedia"]["mediaUserErrors"]
    if errors:
        print(f"  Image attach errors: {errors}")
        return False
    
    return True

def main():
    print(f"Fixing {len(DESCRIPTIONS)} products...\n")
    
    success_desc = 0
    fail_desc = 0
    
    for product_id, info in DESCRIPTIONS.items():
        title = info["title"]
        desc = info["description"]
        
        print(f"Updating: {title} (ID: {product_id})")
        
        # Update description
        if update_description(product_id, desc):
            print(f"  [OK] Description updated")
            success_desc += 1
        else:
            print(f"  [FAIL] Description update failed")
            fail_desc += 1
        
        # Special case: upload image for The Minimal Snowboard
        if product_id == "8152223121482":
            print(f"  Uploading image for The Minimal Snowboard...")
            image_path = r"C:\Users\jayvi\.gemini\antigravity\brain\c42b1153-2eda-4621-a39d-425c82be6798\minimal_snowboard_1773189717928.png"
            if upload_image(product_id, image_path, "The Minimal Snowboard - clean minimalist design"):
                print(f"  [OK] Image uploaded")
            else:
                print(f"  [INFO] Image upload may have failed - will need manual image upload")
    
    print(f"\n{'='*60}")
    print(f"Done! Updated descriptions: {success_desc}/{len(DESCRIPTIONS)}")
    if fail_desc > 0:
        print(f"Failed: {fail_desc}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
