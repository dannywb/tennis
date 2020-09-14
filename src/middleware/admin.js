const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'jakataisonehellofaplacetovisit')
    const user = await User.findOne({_id: decoded._id, 'tokens.token' : token})

    if (!user) {
      throw new Error()
    }
    if (user.userLevel != 'admin') {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()

  } catch (e) {
    res.status(401).send('You are not authorized to access this page.')
  }
}

module.exports = authAdmin