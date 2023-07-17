const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://yordanyvuchev:12345@cluster0.ymewh8y.mongodb.net/'
  )
    .then((client) => {
      console.log('Connected')
      _db = client.db()
      callback(client)
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
