
require('dotenv').config()
const express = require("express")
const app = express()

const morgan = require("morgan")
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

const logger = morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
})

// app.use(logger)

app.get('/info', (request, response) => {
    const date = new Date()
    Person.find({}).then(persons => {
        const message = `<p> Phonebook has info of ${persons.length} people </p> <br/> <p> ${date} <p>`
        response.send(message)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).send({ "error": "ID not found" })
            }
        })
        .catch(err => next(err))
})

app.post('/api/persons', logger, (req, res, next) => {

    const person = new Person ({
        name: req.body.name,
        number: req.body.number
    })

    person.save()
        .then(saved => { 
            console.log(saved)
            res.json(saved) 
        })
        .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {

    const person = { 
        name: req.body.name,
        number: req.body.number
    }  

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query'})
        .then(updated => {
            res.send(updated)
        })
        .catch(err => next(err))

})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(deleted => {
            if (deleted) res.status(204).end()

            else res.status(404).send({ "error": "ID not found"})
        })
        .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res) => {
    res.status(400).send({ error: err.message })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
