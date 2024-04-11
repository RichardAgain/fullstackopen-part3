
require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://richardo:${password}@cluster0.uyqs1nl.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)

const schema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = new mongoose.model('Person', schema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

const save = () =>
person.save().then(res => {
    console.log(`added ${res.name}, number: ${res.number} to the phonebook`)
    mongoose.connection.close()
})

const getAll = () =>
Person.find({}).then(result => {
    console.log('Phonebook: ')
    result.forEach(p => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
})

if (process.argv.length == 3) getAll()

else save()
