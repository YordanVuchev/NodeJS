const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method
  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>Enter message</title></head>')
    res.write('<body>')
    res.write('<p>Hello from home page</p>')
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>'
    )
    res.write('</body>')
    res.write('</html>')

    return res.end()
  } else if (url === '/users') {
    res.write('<html>')
    res.write('<head><title>Enter message</title></head>')
    res.write('<body>')
    res.write('<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>')
    res.write('</body>')
    res.write('</html>')
    return res.end()
  }

  if (url === '/create-user' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    })
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      console.log(message)
    })
    //status code for redirect
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
  }
}

module.exports = requestHandler
