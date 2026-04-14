"""
Generate luxury esoteric occult background programmatically.
Uses numpy for fast gradient computation.
"""

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import math
import random
import os

WIDTH, HEIGHT = 2048, 2048

# --- 1. Radial gradient base (numpy fast) ---
y_coords, x_coords = np.mgrid[0:HEIGHT, 0:WIDTH]
cx, cy = WIDTH // 2, HEIGHT // 2
dist = np.sqrt((x_coords - cx)**2 + (y_coords - cy)**2) / (WIDTH * 0.6)
dist = np.clip(dist, 0, 1)

r_ch = (8 + 18 * (1 - dist)).astype(np.uint8)
g_ch = (6 + 10 * (1 - dist)).astype(np.uint8)
b_ch = (12 + 20 * (1 - dist)).astype(np.uint8)
a_ch = np.full((HEIGHT, WIDTH), 255, dtype=np.uint8)

bg_arr = np.stack([r_ch, g_ch, b_ch, a_ch], axis=-1)
BG = Image.fromarray(bg_arr, 'RGBA')
print("[OK] Radial gradient done")

# --- 2. Sacred geometry (Flower of Life) ---
geo_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
geo_draw = ImageDraw.Draw(geo_layer)
gold_color = (212, 175, 55)
flower_radius = 180

def draw_circle_geo(draw_obj, cx, cy, r, color, alpha=25, width=1):
    draw_obj.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(*color, alpha), width=width)

# Central + 6 surrounding circles
draw_circle_geo(geo_draw, cx, cy, flower_radius, gold_color, alpha=30, width=2)
for i in range(6):
    angle = i * math.pi / 3
    x = cx + int(flower_radius * math.cos(angle))
    y = cy + int(flower_radius * math.sin(angle))
    draw_circle_geo(geo_draw, x, y, flower_radius, gold_color, alpha=20, width=1)

# Second ring
for i in range(12):
    angle = i * math.pi / 6
    x = cx + int(flower_radius * 2 * math.cos(angle))
    y = cy + int(flower_radius * 2 * math.sin(angle))
    draw_circle_geo(geo_draw, x, y, flower_radius, gold_color, alpha=12, width=1)

# Third ring
for i in range(18):
    angle = i * math.pi / 9
    x = cx + int(flower_radius * 3 * math.cos(angle))
    y = cy + int(flower_radius * 3 * math.sin(angle))
    draw_circle_geo(geo_draw, x, y, flower_radius, gold_color, alpha=8, width=1)

# Concentric rings
for r_mult in [1.5, 2.5, 3.5, 4.5]:
    draw_circle_geo(geo_draw, cx, cy, int(flower_radius * r_mult), gold_color, alpha=15, width=1)

geo_layer = geo_layer.filter(ImageFilter.GaussianBlur(radius=2))
BG = Image.alpha_composite(BG, geo_layer)
print("[OK] Sacred geometry done")

# --- 3. Gold dust particles ---
dust_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
dust_draw = ImageDraw.Draw(dust_layer)
random.seed(963)
for _ in range(800):
    x = random.randint(0, WIDTH - 1)
    y = random.randint(0, HEIGHT - 1)
    size = random.randint(1, 4)
    alpha = random.randint(20, 90)
    r = random.randint(190, 220)
    g = random.randint(155, 185)
    b = random.randint(35, 70)
    dust_draw.ellipse([x, y, x + size, y + size], fill=(r, g, b, alpha))

dust_layer = dust_layer.filter(ImageFilter.GaussianBlur(radius=1.5))
BG = Image.alpha_composite(BG, dust_layer)
print("[OK] Gold dust done")

# --- 4. Smoke / mist glow ---
smoke_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
smoke_draw = ImageDraw.Draw(smoke_layer)

for _ in range(25):
    x = random.randint(0, WIDTH)
    y = random.randint(0, HEIGHT)
    r = random.randint(200, 500)
    a = random.randint(5, 15)
    smoke_draw.ellipse([x - r, y - r, x + r, y + r], fill=(60, 20, 80, a))

for _ in range(15):
    x = random.randint(0, WIDTH)
    y = random.randint(0, HEIGHT)
    r = random.randint(150, 400)
    a = random.randint(3, 10)
    smoke_draw.ellipse([x - r, y - r, x + r, y + r], fill=(20, 25, 60, a))

# Central golden glow
smoke_draw.ellipse([cx - 400, cy - 400, cx + 400, cy + 400], fill=(212, 175, 55, 12))
smoke_draw.ellipse([cx - 250, cy - 250, cx + 250, cy + 250], fill=(212, 175, 55, 8))

smoke_layer = smoke_layer.filter(ImageFilter.GaussianBlur(radius=50))
BG = Image.alpha_composite(BG, smoke_layer)
print("[OK] Smoke effects done")

# --- 5. Alchemical geometry lines (hexagram) ---
line_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
line_draw = ImageDraw.Draw(line_layer)

tri_size = 500
tri1 = [(cx, cy - tri_size), (cx - int(tri_size * 0.866), cy + tri_size // 2), (cx + int(tri_size * 0.866), cy + tri_size // 2)]
tri2 = [(cx, cy + tri_size), (cx - int(tri_size * 0.866), cy - tri_size // 2), (cx + int(tri_size * 0.866), cy - tri_size // 2)]
line_draw.polygon(tri1, outline=(212, 175, 55, 15), width=1)
line_draw.polygon(tri2, outline=(212, 175, 55, 15), width=1)

s2 = 300
tri3 = [(cx, cy - s2), (cx - int(s2 * 0.866), cy + s2 // 2), (cx + int(s2 * 0.866), cy + s2 // 2)]
tri4 = [(cx, cy + s2), (cx - int(s2 * 0.866), cy - s2 // 2), (cx + int(s2 * 0.866), cy - s2 // 2)]
line_draw.polygon(tri3, outline=(212, 175, 55, 10), width=1)
line_draw.polygon(tri4, outline=(212, 175, 55, 10), width=1)

line_layer = line_layer.filter(ImageFilter.GaussianBlur(radius=1.5))
BG = Image.alpha_composite(BG, line_layer)
print("[OK] Alchemical lines done")

# --- 6. Vignette ---
vignette = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
vig_draw = ImageDraw.Draw(vignette)
for i in range(100):
    offset = i * 5
    alpha = int((i / 100) * 120)
    vig_draw.rectangle([offset, offset, WIDTH - offset, HEIGHT - offset], outline=(0, 0, 0, alpha), width=5)
vignette = vignette.filter(ImageFilter.GaussianBlur(radius=30))
BG = Image.alpha_composite(BG, vignette)
print("[OK] Vignette done")

# Save
os.makedirs('public/images', exist_ok=True)
final = BG.convert('RGB')
final.save('public/images/occult_bg.jpg', quality=95)
print(f"[DONE] Background saved: public/images/occult_bg.jpg ({WIDTH}x{HEIGHT})")
