const express = require('express')
const Match = require('../models/Match')
const router = new express.Router()

// Routes for Matches
router.post('/maint/matches', async (req, res) => {
  const match = new Match(req.body)

  try {
    await match.save()
    res.status(201).send(match)
  } catch (e) {
    res.status(400).send(e)
  }
})


// Update match by date
router.patch('/maint/matches/update/:date', async (req, res) => {
  const match = new Match(req.body)

  try {
    const queryStr = req.params.date
    const newQueryStr = queryStr.replace(/-/g, '/')
    const query = { date: `${newQueryStr}`}

    const match = await Match.findOneAndUpdate(query, req.body, { new: true, runValidators: true})

    if (!match) {
      return res.status(404).send()
    }

    res.send(match)
  } catch (e) {
    res.status(400).send(err)
  }
})

// Get match by date
router.get('/maint/matches/:date', async (req, res) => {
  const match = new Match(req.body)

  try {
    const queryStr = req.params.date
    const newQueryStr = queryStr.replace(/-/g, '/')
    const query = { date: `${newQueryStr}`}

    const match = await Match.findOne(query, req.body, { new: true, runValidators: true})

    if (!match) {
      return res.status(404).send()
    }

    res.send(match)
  } catch (e) {
    res.status(400).send(err)
  }
})

module.exports = router