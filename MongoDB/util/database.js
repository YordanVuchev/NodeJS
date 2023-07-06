const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://yordanyvuchev:12345@cluster0.ymewh8y.mongodb.net/'
  )
    .then((client) => {
      console.log('Connected')
      callback(client)
    })
    .catch((err) => {
      console.log('Connection failed')
      console.log(err)
    })
}

module.exports = mongoConnect
