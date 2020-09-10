const mongoose = require('mongoose');
const validator = require('validator');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

var playerSchema = new mongoose.Schema({
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
  active: {
    type: Boolean,
    default: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  matches:[{
    date: {
      type: String,
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

// userSchema.statics.findByCredentials = function (email, password) {
//   var User = this;

//   return User.findOne({email}).then((user) => {
//     if (!user) {
//       return Promise.reject();
//     }

//     return new Promise((resolve, reject) => {
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (res) {
//           resolve(user);
//         } else {
//           reject();
//         }
//       });
//     });
//   });
// };

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


module.exports = mongoose.model('Player', playerSchema);
