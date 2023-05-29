const express = require('express')

const app = express()

app.use('/users', (req, res, next) => {
  res.send('<h1>Hello from users</h1>')
})

app.use('/', (req, res, next) => {
  res.send('<h1>Hello</h1>')
})

app.listen(3000)
