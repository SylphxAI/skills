from PIL import Image
from pathlib import Path

SRC = Path("input.png")
OUT = Path("out")
MAGENTA = (255, 0, 255)
TOL = 12  # per-channel tolerance

im = Image.open(SRC).convert("RGB")
w, h = im.size
qw, qh = w // 2, h // 2
assert w % 2 == 0 and h % 2 == 0

OUT.mkdir(exist_ok=True)

def is_bg(p):
    return all(abs(p[i] - MAGENTA[i]) <= TOL for i in range(3))

transparent_total = 0
for qy in range(2):
    for qx in range(2):
        box = (qx * qw, qy * qh, (qx + 1) * qw, (qy + 1) * qh)
        quad = im.crop(box)
        rgba = quad.convert("RGBA")
        alpha = rgba.getchannel("A")
        px = quad.load()
        apx = alpha.load()
        for y in range(qh):
            for x in range(qw):
                apx[x, y] = 0 if is_bg(px[x, y]) else 255
        rgba.putalpha(alpha)
        name = f"pose-{qy * 2 + qx}.png"
        rgba.save(OUT / name)
        n_bg = sum(1 for y in range(qh) for x in range(qw) if apx[x, y] == 0)
        transparent_total += n_bg
        bbox = rgba.getbbox()
        print(f"{name}: {rgba.size}, transparent={n_bg}, content_bbox={bbox}")
print("total transparent pixels:", transparent_total)
