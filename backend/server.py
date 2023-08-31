import base64
import io
from PIL import Image
from fastapi import FastAPI
from compress import compress_to_webp
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware



class DataField(BaseModel):
    data: str

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/compress/")
async def compress(request: DataField):
    try:
        databytes = base64.b64decode(request.data)
        img = Image.open(io.BytesIO(databytes))
        compressed_data = compress_to_webp(img)
        img.close()
        return { 'data': compressed_data }
    except Exception as e:
        return { 'error': str(e) }