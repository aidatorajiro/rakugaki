
import json
import base64
from http.server import BaseHTTPRequestHandler, HTTPServer
from PIL import Image
import io
from compress import compress_to_webp

class MyHandler(BaseHTTPRequestHandler):
    """
    Received the request as json, send the response as json
    please you edit the your processing
    """
    def do_POST(self):
        try:
            content_len=int(self.headers.get('content-length'))
            requestBody = json.loads(self.rfile.read(content_len).decode('utf-8'))

            databytes = base64.b64decode(requestBody['data'])
            img = Image.open(io.BytesIO(databytes))
            compressed_data = compress_to_webp(img)
            img.close()

            response = { 'data': compressed_data }
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            responseBody = json.dumps(response)

            self.wfile.write(responseBody.encode('utf-8'))
        except Exception as e:
            print("An error occured")
            print(e)
            response = { 'status' : 500,
                         'msg' : 'An error occured' }
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            responseBody = json.dumps(response)

            self.wfile.write(responseBody.encode('utf-8'))

def run(server_class=HTTPServer, handler_class=MyHandler, server_name='localhost', port=3001):
    server = server_class((server_name, port), handler_class)
    server.serve_forever()

def main():
    run(server_name="localhost", port=3001)

if __name__ == '__main__':
    main()