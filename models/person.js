
const mongoose = require('mongoose')

console.log('connecting to mongoDB...')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MONGODB')
    })

const schema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [ 5, 'NAME MUST BE MINIMUM 5 CHARACTERS' ],
        required: true
    },
    number: {
        type: String,
        required: true,
        minLength: [ 5, 'NUMBER MUST BE MINIMUM 5 CHARACTERS' ],
        validate: {
            validator: (value) => /^\d{3,4}-\d+$/.test(value),
            message: 'NOT THE RIGHT FORMAT: XXX-XXXXXXX OR XXXX-XXXXXXX',
        }
    }
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = new mongoose.model('Person', schema)
