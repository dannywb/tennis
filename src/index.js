const express = require('express')
require('./db/mongoose')
const User = require('./models/User')
const Player = require('./models/Player')
const Match = require('./models/Match')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hoorah!')
})

// Routes for Users
app.get('/maint/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users)
  }).catch((err) => {
    res.status(500).send()
  })
})

app.get('/maint/users/id/:id', (req, res) => {
  const _id = req.params.id

  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send()
    }

    res.send(user)

  }).catch((err) => {
    res.status(500).send()
  })
})

app.get('/maint/users/name/:name', (req, res) => {
  const name = req.params.name

  User.findOne({ 'name': name}).then((user) => {
    if (!user) {
      return res.status(404).send()
    }

    res.send(user)

  }).catch((err) => {
    res.status(500).send()
  })
})

app.post('/maint/users', (req, res) => {
  const user = new User(req.body)

  user.save().then(() => {
    res.status(201).send('User added.')
  }).catch((err) => {
    res.status(400).send(err)
  })
})

// Routes for Players
app.post('/maint/players', (req, res) => {
  const player = new Player(req.body)

  player.save().then(() => {
    res.status(201).send('Player added.')
  }).catch((err) => {
    res.status(400).send(err)
  })
})

app.get('/players', (req, res) => {
  Player.find({}).then((players) => {
    res.send(players)
  }).catch((err) => {
    res.status(500).send()
  })
})

app.get('/players/id/:id', (req, res) => {
  const _id = req.params.id

  Player.findById(_id).then((player) => {
    if (!player) {
      return res.status(404).send()
    }
    res.send(player)
  }).catch((err) => {
    res.status(500).send()
  })
})

app.get('/players/name/:name', (req, res) => {
  const name = req.params.name

  Player.findOne({ 'name': name}).then((player) => {
    if (!player) {
      return res.status(404).send()
    }

    res.send(player)

  }).catch((err) => {
    res.status(500).send()
  })
})



// Routes for Matches
app.post('/maint/matches', (req, res) => {
  const match = new Match(req.body)
  match.save().then(() => {
    res.status(201).send('Match added.')
  }).catch((err) => {
    res.status(400).send(err)
  })
})

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})