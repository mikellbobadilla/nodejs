const http = require('http')
const index = require('fs').readFileSync('./assets/index.html')

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(index)
  })
  .listen(3000, () => {
    console.log('Server listening on http://localhost:3000')
  })

