#!/usr/bin/env python3
"""
ef-server.py — ExpertFlow local dev server
Auto-injects navbar.js into every HTML page so you never add it manually.

Usage:
  python3 ef-server.py

Then open any template in your browser:
  http://localhost:8080/list-view-template.html
  http://localhost:8080/agent-desk-v2-template.html

Press Ctrl+C to stop.
"""

import http.server
import socketserver
import os

PORT = 8080
NAVBAR_SNIPPET = '<script src="/navbar.js"></script>'


class EFHandler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        path = self.translate_path(self.path)

        # Only intercept HTML files
        if os.path.isfile(path) and path.endswith('.html'):
            with open(path, 'rb') as f:
                content = f.read().decode('utf-8', errors='replace')

            # Inject navbar.js before </body> only if not already present
            if 'navbar.js' not in content:
                content = content.replace('</body>', NAVBAR_SNIPPET + '\n</body>', 1)

            encoded = content.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(encoded)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(encoded)
        else:
            super().do_GET()

    def log_message(self, fmt, *args):
        # Only log HTML page loads, skip assets
        if args and str(args[0]).startswith('GET') and '.html' in str(args[0]):
            print(f'  {args[0].split()[1]}')


with socketserver.TCPServer(('', PORT), EFHandler) as httpd:
    print()
    print('  ExpertFlow dev server')
    print(f'  http://localhost:{PORT}')
    print()
    print('  navbar.js is injected automatically into every page.')
    print('  No script tags needed in new templates.')
    print()
    print('  Ctrl+C to stop')
    print()
    httpd.serve_forever()
