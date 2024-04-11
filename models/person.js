
const mongoose = require('mongoose')

console.log('connecting to mongoDB...')

mongoose.connect(process.env.MONGODB_URI)
.then(res => {
    console.log('connected to MONGODB')
})

const schema = new mongoose.Schema({
    name: String,
    number: String
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = new mongoose.model('Person', schema)
