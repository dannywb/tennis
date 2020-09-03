const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const playerRouter = require('./routers/player')
const matchRouter = require('./routers/match')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(playerRouter)
app.use(matchRouter)

app.get('/', (req, res) => {
  res.send('Hoorah!')
})


app.listen(port, () => {
  console.log(`Server running on ${port}`)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
  const password = 'Red12345'
  const hashedPassword = await bcrypt.hash(password, 12)

  console.log(password)
  console.log(hashedPassword)

  const isMatch = await bcrypt.compare('Red12345', hashedPassword)
  console.log(isMatch)
}

myFunction()