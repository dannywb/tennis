const express = require('express')
const Player = require('../models/Player')
const router = new express.Router()

// Routes for Players
// Add player
router.post('/maint/players', async (req, res) => {
  const player = new Player(req.body)

  try {
    await player.save()
    res.status(201).send(player)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Get all players
router.get('/players', async (req, res) => {
  
  try {
    const players = await Player.find({})
    res.send(players)
  } catch (e) {
    res.status(500).send()
  }
})

// Get player by ID
router.get('/players/id/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const player = await Player.findById(_id)
    if (!player) {
      return res.status(404).send()
    }
    res.send(player)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/players/name/:name', async (req, res) => {
  const name = req.params.name

  try {
    const player = await Player.findOne({ name })
    if (!player) {
      return res.status(404).send()
    }

    res.send(player)

  } catch (e) {
    res.status(500).send()
  }
})

// Update player data by ID
router.patch('/players/id/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'active', 'matches']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }

  try {
    const player = await Player.findById(req.params.id)

    updates.forEach((update) => player[update] = req.body[update])

    await player.save()

    if (!player) {
      return res.status(404).send()
    }
    res.send(player)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Update player data by name
router.patch('/players/name/:name', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'active', 'matches']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }

  try {
    var query = { name: `${req.params.name}`}
    const player = await Player.findOneAndUpdate(query, req.body, { new: true, runValidators: true})

    if (!player) {
      return res.status(404).send()
    }
    res.send(player)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router