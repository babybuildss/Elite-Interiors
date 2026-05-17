import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')
const PORT = 3000

// Pre-cache ALL files in memory for instant serving
const cache = new Map()
const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8')

function loadDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) { loadDir(full); continue }
    const rel = '/' + path.relative(DIST, full).replace(/\\/g, '/')
    cache.set(rel, fs.readFileSync(full))
  }
}
loadDir(DIST)
console.log(`Cached ${cache.size} files`)

const MIME = {
  '.html':'text/html;charset=utf-8', '.js':'application/javascript;charset=utf-8',
  '.css':'text/css;charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg',
  '.svg':'image/svg+xml', '.ico':'image/x-icon', '.json':'application/json',
}

http.createServer((req, res) => {
  try {
    const url = req.url.split('?')[0]
    const ext = path.extname(url)
    const data = cache.get(url)
    if (data) {
      res.writeHead(200, { 'Content-Type': MIME[ext]||'application/octet-stream' })
      res.end(data)
    } else {
      res.writeHead(200, { 'Content-Type': MIME['.html'] })
      res.end(indexHtml)
    }
  } catch(e) {
    res.writeHead(500); res.end()
  }
}).listen(PORT, '0.0.0.0', () => console.log(`✅ Elite Interiors → http://localhost:${PORT}`))
