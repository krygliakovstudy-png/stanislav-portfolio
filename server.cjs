const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.fbx': 'application/octet-stream',
};
http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, 'http://localhost').pathname,
      );
    } catch {
      res.writeHead(400).end();
      return;
    }
    if (pathname === '/') pathname = '/index.html';
    const file = path.resolve(root, '.' + pathname);
    const relative = path.relative(root, file);
    if (
      relative.startsWith('..') ||
      path.isAbsolute(relative) ||
      !['.html', '.css', '.js', '.svg', '.png', '.fbx'].includes(
        path.extname(file),
      )
    ) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404).end('Not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': mime[path.extname(file)],
        'Cache-Control': 'no-cache',
      });
      res.end(data);
    });
  })
  .listen(4173, '127.0.0.1', () =>
    console.log('Portfolio: http://127.0.0.1:4173'),
  );
