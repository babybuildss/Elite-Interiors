import http.server
import os
import urllib.parse

DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        """Translate URL path to filesystem path in dist directory"""
        path = urllib.parse.unquote(path)
        path = os.path.normpath(path)
        # Remove leading slashes
        if path.startswith('/'):
            path = path[1:]
        return os.path.join(DIST_DIR, path)
    
    def do_GET(self):
        filepath = self.translate_path(self.path)
        if os.path.isfile(filepath):
            # File exists, serve it
            super().do_GET()
        else:
            # SPA fallback - serve index.html
            self.path = '/index.html'
            super().do_GET()
    
    def log_message(self, format, *args):
        pass  # Suppress logging to avoid issues

if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', 3000), SPAHandler)
    print('Elite Interiors running at http://localhost:3000', flush=True)
    server.serve_forever()
