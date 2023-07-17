const http = require('http')

const routes = require('./task1')

const server = http.createServer(routes)

server.listen(3000)
