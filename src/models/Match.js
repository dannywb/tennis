const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var matchSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  sets: [{
    setnumber: {
      type: Number,
      min: 1,
      max: 3
    },
    court: [{
      courtnumber: {
        type: Number,
        min: 1,
        max: 5
      },
      team: [{
        teamnumber: {
          type: Number,
          required: true,
          min: 1,
          max: 2
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
        },
        players: [{
          playername: {
            type: String,
            required: true
          },
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
          }
        }]
      }]
    }]
  }]
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match
