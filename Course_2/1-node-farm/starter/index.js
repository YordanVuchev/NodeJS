const fs = require('fs')
const http = require('http')
const url = require('url')

///////////////////////
// FILES

//Blocking sync way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on: ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)

//Non-blocking async way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2)
//   })
// })

///////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview')
  } else if (pathName === '/product') {
    res.end('This is the product')
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    })
    res.end('<h1>Page not found!</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
