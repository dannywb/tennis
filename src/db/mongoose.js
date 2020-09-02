const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/tennis'

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(connectionURL, options)

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     trim: true,
//     minlength: 3,
//     unique: true,
//     validate: {
//       validator: validator.isEmail,
//       message: '{VALUE} is not a valid email'
//     }
//   }, 
//   userLevel: {
//     type: String,
//     required: true,
//     default: 'user'
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes('password')) {
//         throw new Error('Password cannot contain "password"')
//       }
//     }
//   },
//   approved: {
//     type: Boolean,
//     default: false
//   }
// })

// const me = new User({
//   name: 'Mike',
//   email: 'MiKe@msn.COM',
//   password: 'ears'
// })

// me.save().then(() => {
//   console.log(me)
// }).catch((err) => {
//   console.log('Error: ', err)
// })

const Player = mongoose.model('Player', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
}, 
  matches:[{
    date: {
      type: Date,
      required: true
    },
    gamesPlayed: {
      type: Number,
      required: true,
      min: 0
    }, 
    gamesWon: {
      type: Number,
      required: true,
      min: 0
    }
  }] 
})

const player = new Player({
  name: 'Elmo',
  email: 'elmo@sesamestreet.com'
})

player.save().then(() => {
  console.log(player)
}).catch((err) => {
  console.log(err)
})