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

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    res.send(user)
  } catch (e) {
    console.log('Error in router.post')
    console.log(e)
    res.status(400).send()
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

// Update player data by ID
router.patch('/maint/users/id/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'userLevel', 'password', 'approved']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }

  try {
    const user = await User.findById(req.params.id)

    updates.forEach((update) => user[update] = req.body[update])

    await user.save()

    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router