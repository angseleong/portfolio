# Compose lafaz phone screens (1..6.jpg) + Pelita into one tall showcase. Usage: lafaz_reel.py <dir> <out.jpg>
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont
src, out = sys.argv[1], sys.argv[2]
W, PW, GAP = 1280, 340, 50
BG = (233, 246, 228)
phones = [Image.open(f"{src}/{i}.jpg").convert("RGB") for i in range(1, 7)]
ph = round(phones[0].height * PW / phones[0].width)
HEAD = 300
c = Image.new("RGB", (W, HEAD + 2 * (ph + 70) + 40), BG)
d = ImageDraw.Draw(c)
pel = Image.open(f"{src}/lafaz-pelita.svg.png").convert("RGBA")
pel = pel.crop(pel.getbbox())
pel = pel.resize((round(pel.width * 170 / pel.height), 170), Image.LANCZOS)
font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf", 120)
tw = d.textlength("lafaz", font=font)
x0 = int((W - (pel.width + 30 + tw)) // 2)
c.paste(pel, (x0, 70), pel)
d.text((x0 + pel.width + 30, 95), "lafaz", font=font, fill=(46, 154, 63))
mask = Image.new("L", (PW, ph), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, PW - 1, ph - 1), 30, fill=255)
for k, p in enumerate(phones):
    p = p.resize((PW, ph), Image.LANCZOS)
    x = (W - 3 * PW - 2 * GAP) // 2 + (k % 3) * (PW + GAP)
    y = HEAD + (k // 3) * (ph + 70)
    sh = Image.new("L", (PW + 60, ph + 60), 0)
    ImageDraw.Draw(sh).rounded_rectangle((30, 36, PW + 30, ph + 36), 30, fill=70)
    c.paste(Image.new("RGB", sh.size, (60, 100, 60)), (x - 30, y - 30), sh.filter(ImageFilter.GaussianBlur(14)))
    c.paste(p, (x, y), mask)
c.save(out, quality=82, optimize=True, progressive=True)
print(out, c.size)
