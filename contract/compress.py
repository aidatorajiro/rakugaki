from PIL import Image
import sys
import webp
from webp import WebPConfig
import base64
import math

img = Image.open(sys.argv[1])

pixels_orig = img.size[0] * img.size[1]

scale = min(1, math.sqrt(30000 / pixels_orig))

img = img.resize((math.ceil(img.size[0] * scale), math.ceil(img.size[1] * scale)), Image.LANCZOS)

pic = webp.WebPPicture.from_pil(img)
config = WebPConfig.new(preset=webp.WebPPreset.DRAWING, quality=0)
buf = pic.encode(config).buffer()

print("data:image/webp;base64,"+base64.b64encode(buf).decode())
