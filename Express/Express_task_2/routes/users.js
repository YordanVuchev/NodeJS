const express = require('express')

const router = express.Router()
const path = require('path')

router.post('/users', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'))
})

module.exports = router
