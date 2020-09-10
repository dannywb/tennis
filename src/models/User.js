const mongoose = require('mongoose');
const validator = require('validator');
// const jwt = require('jsonwebtoken');
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
  approved: {
    type: Boolean,
    default: false
  }
})

// userSchema.methods.generateAuthToken = function () {
//   var user = this;
//   var access = 'auth';
//   var token = jwt.sign({_id: user._id.toHexString(), access}, 'jakata').toString();

//   user.tokens = user.tokens.concat([{access, token}]);

//   return user.save().then(() => {
//     return token;
//   });
// };

// userSchema.statics.findByToken = function (token) {
//   var User = this;
//   var decoded;

//   try {
//     decoded = jwt.verify(token, 'jakata');
//   } catch (e) {
//     return Promise.reject();
//   }

//   return User.findOne({
//     '_id': decoded._id,
//     'tokens.token': token,
//     'tokens.access': 'auth'
//   });
// };

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

// userSchema.pre('save', function (next) {
//   var user = this;

//   if (user.isModified('password')) {
//     bcrypt.genSalt(12, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });
// userSchema.pre('save', function (next) {
//   var user = this;
//
//   if (user.isModified('password')) {
//     bcrypt.genSalt(13, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         user.password = hash;
//         next();
//       });
//     } else {
//     next();
//     }
// });

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User