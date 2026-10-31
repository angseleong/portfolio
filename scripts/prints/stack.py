# Stack images vertically into one tall reel at a fixed width. Usage: stack.py out.jpg width gap img1 img2 ...
import sys
from PIL import Image
out, width, gap, files = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4:]
ims = []
for f in files:
    im = Image.open(f).convert("RGB")
    ims.append(im.resize((width, round(im.height * width / im.width)), Image.LANCZOS))
h = sum(i.height for i in ims) + gap * (len(ims) - 1)
reel = Image.new("RGB", (width, h), (11, 11, 11))
y = 0
for im in ims:
    reel.paste(im, (0, y)); y += im.height + gap
reel.save(out, quality=80, optimize=True, progressive=True)
print(out, reel.size)
