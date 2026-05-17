import { createServer } from 'http'
import { readFile, stat } from 'fs/promises'
import { join, extname } from 'path'

const DIST = join(import.meta.dirname, 'dist')
const PORT = 3000

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
}

createServer(async (req, res) => {
  try {
    let path = join(DIST, req.url === '/' ? 'index.html' : req.url)
    const ext = extname(path)
    const contentType = MIME[ext] || 'application/octet-stream'
    
    try {
      const data = await readFile(path)
      res.writeHead(200, { 'Content-Type': contentType + (ext === '.html' ? '; charset=utf-8' : '') })
      res.end(data)
    } catch {
      // SPA fallback - serve index.html for all unknown routes
      const html = await readFile(join(DIST, 'index.html'))
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(html)
    }
  } catch {
    res.writeHead(500)
    res.end('Server Error')
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Elite Interiors server running at http://localhost:${PORT}`)
})
