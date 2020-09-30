const mongoose = require('mongoose')

const connectionURL = process.env.MONGODB_URI

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(connectionURL, options)