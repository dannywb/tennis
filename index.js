const express = require('express')
const mongoose = require('./src/db/mongoose')
const userRouter = require('./src/routers/user')
const matchRouter = require('./src/routers/match')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

// view engine setup
app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
 }))
app.set('view engine', 'handlebars')

// Middleware to serve static files
// app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname, 'assets')))

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(matchRouter)

app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page'})
})


app.listen(port, () => {
  console.log(`Server running on ${port}`)
})