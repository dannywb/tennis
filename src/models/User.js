const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  userLevel: {
    type: String,
    required: true,
    default: 'user'
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  rank: {
    type: Number,
    default: 0
  },
  totalGamesPlayed: {
    type: Number,
    default: 0
  }, 
  totalGamesWon: {
    type: Number,
    default: 0
  },
  approved: {
    type: Boolean,
    default: false
  },
  matches:[{
    date: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
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
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.tokens
  delete userObject.password

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET).toString()

  if (user.approved) {
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
  }

  const msg = 'User has not been approved for access'
  return msg
};


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})

  if (!user) {
    console.log('User not found')
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    console.log('Password did not match')
    throw new Error('Unable to login')
  }

  return user

}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User