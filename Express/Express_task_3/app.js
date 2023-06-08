const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const usersRoutes = require('./routes/users')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(adminRoutes.routes)
app.use(usersRoutes.routes)

app.listen(3000)
