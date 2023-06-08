const express = require('express')

const router = express.Router()
const users = require('./admin')

router.get('/users', (req, res, next) => {
  res.render('users', {
    users: users.users,
  })
})

exports.routes = router
