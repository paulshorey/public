const handler = require('serve-handler')
const http = require('http')
const { readdirSync } = require('fs')
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

/*
 * server options
 */
const PUBLIC = 'public'
/*
 * server rewrites
 */
const REWRITES = []
// homepage
REWRITES.push({ 'source': '/', 'destination': '/domain/index.html' })
// other pages
const dirs = getDirectories(PUBLIC)
for (let src of dirs) {
  // auto rewrite
  let dest = src
  // manual rewrite
  if (dest === 'domains') dest = 'domain'
  // add
  REWRITES.push({ 'source': '/' + src, 'destination': '/' + dest + '/index.html' })
}

/*
 * serve
 */
const server = http.createServer((request, response) => {
  return handler(request, response, {
    'public': PUBLIC,
    'rewrites': REWRITES,
  })
})

server.listen(9000, () => {
  console.log('Running at http://localhost:9000')
})