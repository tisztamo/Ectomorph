// Adapted from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

import http from "http"
import path from "path"
import fs from "fs"

const port = process.argv[2] || 8000

http.createServer(function (request, response) {
  // console.log('request ', request.url);

  let filePath = '.' + request.url
  if (filePath.endsWith('/')) {
    filePath += 'index.html'
  }

  const extname = String(path.extname(filePath)).toLowerCase()
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  }

  const contentType = mimeTypes[extname] || 'application/octet-stream'

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log(`${filePath} not found.`)
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end("Not Found.\n", 'utf-8')
      } else {
        console.log(error)
        response.writeHead(500)
        response.end("Error reading file.\n")
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType })
      response.end(content, 'utf-8')
    }
  })
}).listen(port)
console.log("Ectomorph dev server running at http://127.0.0.1:" + port)
