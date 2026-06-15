#!/usr/bin/env python3
"""
Usage: python3 remove_bg.py assets/icons/myicon.png
Removes the white/near-white background from a PNG and saves it in-place.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "pylibs"))
from PIL import Image

THRESHOLD = 230   # pixels with R,G,B all >= this become transparent

def process(path):
    img = Image.open(path).convert("RGBA")
    data = img.getdata()
    new_data = [
        (r, g, b, 0) if (r >= THRESHOLD and g >= THRESHOLD and b >= THRESHOLD) else (r, g, b, a)
        for r, g, b, a in data
    ]
    img.putdata(new_data)
    img.save(path, "PNG")
    print(f"✓ {path}")

for p in sys.argv[1:]:
    process(p)
