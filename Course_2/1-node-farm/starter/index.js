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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/(%PRODUCTNAME%)/g, product.productName)
  output = output.replace(/(%IMAGE%)/g, product.image)
  output = output.replace(/(%IMAGE%)/g, product.image)
  output = output.replace(/(%PRICE%)/g, product.price)
  output = output.replace(/(%FROM%)/g, product.from)
  output = output.replace(/(%NUTRIENTS%)/g, product.nutrients)
  output = output.replace(/(%QUANTITY%)/g, product.quantity)
  output = output.replace(/(%DESCRIPTION%)/g, product.description)
  output = output.replace(/(%ID%)/g, product.id)

  if (!product.organic) {
    output = output.replace(/(%NOT_ORGANIC%)/g, 'not-organic')
  }

  return output
}

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)
  console.log(query)

  //Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('')
    const output = tempOverview.replace('(%PRODUCT_CARDS%)', cardsHtml)
    res.end(output)

    //Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })
    const product = dataObj[query.id]
    console.log(product)
    const output = replaceTemplate(tempProduct, product)

    res.end(output)

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)

    //Not found
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
