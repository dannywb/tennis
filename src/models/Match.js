const mongoose = require('mongoose');
const validator = require('validator');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

var matchSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  sets: [{
    num: {
      type: Number,
      min: 1,
      max: 4
    },
    court: [{
      number: {
        type: Number,
        min: 1,
        max: 6
      },
      players: [{
        name: {
          type: String
        },
        playerId: {
          type: String
        },
        gamesplayed: {
          type: Number,
          min: 0,
          default: 0
        },
        gameswon: {
          type: Number,
          min: 0,
          default: 0
        }
      }]
    }]
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Match', matchSchema)
