const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/tennis'

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(connectionURL, options)