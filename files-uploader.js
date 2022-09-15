const http = require('http')
const util = require('util')
const formidable = require('formidable')
const fse = require('fs-extra')
const form = require('fs').readFileSync('./assets/form.html')

const upload = (req, res) => {
  const formi = formidable({})

      formi.parse(req, (err, fields, files) => {
        if (err) {
          res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
          res.end(String(err))
          return
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ fields, files }))
        fse.copy(files.file.filepath, `.\\upload\\${files.file.originalFilename}`, (err) => {
          if (err) console.error(err)
          console.log('success')
          fse.remove(files.file.filepath, (err) => {
            if (err) console.error(err)
            console.log('The temp file was deleted');
          })
        })
        return
      })
}

http
  .createServer((req, res) => {
    if (req.method.toLowerCase() == 'get') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(form)
    }

    if (req.url == '/upload' && req.method.toLowerCase() === 'post') {
      upload(req, res)
    }
  })
  .listen(3000, () => {
    console.log('Server listening on http://localhost:3000')
  })