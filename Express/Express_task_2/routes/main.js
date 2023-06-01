const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'home.html'))
})

router.get('/users', (req, res, next) => {
  res.send('Route 2')
})

module.exports = router
