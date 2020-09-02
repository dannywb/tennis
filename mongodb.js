// CRUD for MongoDB
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'tennis'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}


MongoClient.connect(connectionURL, options, (error, client) => {
  if (error) {
    return console.log('Unable to connect')
  }

  const db = client.db(databaseName)


  // db.collection('users').insertOne({
  //   name: 'Ferris',
  //   email: 'ferris@gmail.com',
  //   password: '',
  //   userLevel: 'admin'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Insert failed')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('users').findOne({ _id: new ObjectID('5f4e4b58ca1b0e34d0778fce')}, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }

  //   console.log(user)
  // })

  // db.collection('users').find({ userLevel: 'admin'}).toArray((error, users) => {
  //   if (error) {
  //     return console.log('Unable to fetch users')
  //   }

  //   console.log(users)
  // })

  // db.collection('users').find({ userLevel: 'admin'}).count((error, count) => {
  //   if (error) {
  //     return console.log('Unable to fetch users')
  //   }

  //   console.log(count)
  // })

//  db.collection('users').updateOne({ _id: new ObjectID('5f4e4b58ca1b0e34d0778fce')}, {
//     $set: {
//       name: 'Susan',
//       email: 'sue@smn.com'
//     }
//   }).then((result) => {
//     console.log(result)
//   }).catch((err) => {
//     console.log(err)
//   })

})