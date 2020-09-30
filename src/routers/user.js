const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/admin')
const { sendWelcomeEmail } = require('../emails/account')
const router = new express.Router()

// Routes for Users
// Add a new user
router.post('/user', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    if (token == 'User has not been approved for access') {
      return res.status(202).send(token)
    }

  } catch (e) {
    res.status(400).send(e)
  }
})

// User login
router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    if (token == 'User has not been approved for access') {
      return res.send(token)
    }
    res.send({user, token})
  } catch (e) {
    console.log('Error in router.post')
    console.log(e)
    res.status(400).send()
  }
})

// Find all users
router.get('/maint/users', authAdmin, async (req, res) => {

  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

// Get all users
router.get('/users', auth, async (req, res) => {

  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

// Get user (your) information
router.get('/user/me', auth, async (req, res) => {

  res.send(req.user)
})

// Update user information
router.patch('/user/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'matches.gamesPlayed', 'matches.gamesWon']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }

  try {

    updates.forEach((update) => req.user[update] = req.body[update])

    await req.user.save()

    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})


// Get user by ID
router.get('/maint/users/id/:id', authAdmin, async (req, res) => {
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


// Update user data by ID ADMIN FUNCTION
router.patch('/maint/users/id/:id', authAdmin, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'userLevel', 'password', 'approved', 'matches']
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

// Log out user
router.post('/user/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500)
  }
})

router.post('/user/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500)
  }
})

module.exports = router