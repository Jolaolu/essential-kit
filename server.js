//require dotenv
require('dotenv').config()

let express  = require('express')
let path     = require('path')
let favicon  = require('serve-favicon')
let mongoose = require('mongoose')
let cookieParser = require('cookie-parser')
let session    = require('express-session')
let bodyParser = require('body-parser')
let csrf       = require('csurf')
let flash  = require('connect-flash')
let { check, validationResult } = require('express-validator/check')
let { matchedData, sanitize }   = require('express-validator/filter')

//Initiate Express
let app = express()

//Require Database configurations
// to use postgres/mysql as default database comment out the code below
// let db = require('./database/db')

//Get port from the .env file
let PORT = process.env.PORT

//View Engine
app.set('view engine', 'pug')

//set Middlewares for security
app.use(cookieParser())

app.use(session({
  secret: 'keyboard',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//csrf
app.use(csrf({ cookie: true }))

//set public static path
app.use(express.static(path.join(__dirname, './public')))

//set favicon
app.use(favicon(path.join(__dirname, './public', 'favicon.ico')))

//set fash Middleware
app.use(flash())

//Define Routes Here
let index = require('./routes/index')
let form = require('./routes/form')
let forms = require('./routes/forms')

//Add Routes Middlewares Here
app.use('/', index)
app.use('/form', form)
app.use('/forms', forms)

//Catch 404
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

//Serve Application
app.listen(PORT, (req, res, next) => {
  console.log('now serving on port ' + PORT)
})

module.exports = app
