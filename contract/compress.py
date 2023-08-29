from PIL import Image
import sys
import webp
from webp import WebPConfig
import base64

img = Image.open(sys.argv[1])

pic = webp.WebPPicture.from_pil(img)
config = WebPConfig.new(preset=webp.WebPPreset.DRAWING, quality=0)
buf = pic.encode(config).buffer()

print("data:image/webp;base64,"+base64.b64encode(buf).decode())
