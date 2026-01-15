from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import re

class RangeHTTPRequestHandler(SimpleHTTPRequestHandler):
    """支持Range请求的HTTP服务器处理程序"""
    
    def do_GET(self):
        """处理GET请求，支持Range头"""
        path = self.translate_path(self.path)
        
        if os.path.isfile(path):
            self.handle_range_request(path)
        else:
            super().do_GET()
    
    def handle_range_request(self, path):
        """处理Range请求"""
        try:
            with open(path, 'rb') as f:
                file_size = os.path.getsize(path)
                content_range = self.headers.get('Range')
                
                if content_range:
                    # 解析Range头
                    range_match = re.match(r'bytes=(\d+)-(\d*)', content_range)
                    if range_match:
                        start = int(range_match.group(1))
                        end = int(range_match.group(2)) if range_match.group(2) else file_size - 1
                        
                        # 确保范围有效
                        start = max(0, start)
                        end = min(file_size - 1, end)
                        
                        f.seek(start)
                        content = f.read(end - start + 1)
                        
                        # 发送响应
                        self.send_response(206)  # Partial Content
                        self.send_header('Content-Type', self.guess_type(path))
                        self.send_header('Content-Length', str(len(content)))
                        self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
                        self.send_header('Accept-Ranges', 'bytes')
                        self.end_headers()
                        self.wfile.write(content)
                        return
            
            # 如果没有Range头或解析失败，发送完整内容
            super().do_GET()
            
        except Exception as e:
            self.send_error(500, f"Internal Server Error: {str(e)}")

def run(server_class=HTTPServer, handler_class=RangeHTTPRequestHandler, port=8000):
    """运行HTTP服务器"""
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"启动服务器，监听端口 {port}...")
    print(f"访问地址: http://localhost:{port}")
    print("按 Ctrl+C 停止服务器")
    httpd.serve_forever()

if __name__ == '__main__':
    run()