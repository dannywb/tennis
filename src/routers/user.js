const express = require('express')
const User = require('../models/User')
const router = new express.Router()

// Routes for Users
// Add a new user
router.post('/maint/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Find all users
router.get('/maint/users', async (req, res) => {

  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

// Get user by ID
router.get('/maint/users/id/:id', async (req, res) => {
  const _id = req.params.id

  try  {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

// Get user by name
router.get('/maint/users/name/:name', async (req, res) => {
  const name = req.params.name

  try {
    const user = await User.findOne({ name })
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router