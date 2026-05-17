import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')
const PORT = 3000

// Pre-load all files into memory to avoid file I/O issues
const files = new Map()
function loadFiles() {
  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(fullPath)
      else {
        const relPath = '/' + path.relative(DIST, fullPath).replace(/\\/g, '/')
        files.set(relPath, fs.readFileSync(fullPath))
      }
    }
  }
  walk(DIST)
  console.log(`Loaded ${files.size} files into memory`)
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'))

loadFiles()

const server = http.createServer((req, res) => {
  try {
    const urlPath = req.url.split('?')[0]
    const ext = path.extname(urlPath)
    const data = files.get(urlPath)
    
    if (data) {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      res.end(data)
    } else {
      // SPA fallback
      res.writeHead(200, { 'Content-Type': MIME['.html'] })
      res.end(indexHtml)
    }
  } catch (e) {
    res.writeHead(500)
    res.end('Error')
  }
})

server.on('error', (e) => {
  console.error('Server error:', e.message)
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Elite Interiors at http://localhost:${PORT}`)
})
