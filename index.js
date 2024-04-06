
const express = require("express")
const app = express()

const morgan = require("morgan")
const cors = require('cors')

app.use(express.static('build/dist'))

app.use(cors())
app.use(express.json())

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

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Richardo", 
      "number": "Call me baby 🤙"
    }
]

app.get('/info', (request, response) => {
    const date = new Date()
    const message = `<p> Phonebook has info of ${persons.length} people </p> <br/> <p> ${date} <p>`
    response.send(message)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id == id)
    
    if (!person) { 
        return response.status(404).json(
            { error: "ID not found" }
            )
        }
        
    response.json(person)
})

app.post('/api/persons', logger, (request, response) => {
    const body = request.body
        
    if (!body.name || !body.number ) {
    return response.status(400).json(
        { error: "body does not contain name/number" }
    )}

    if (persons.map(p => p.name).includes(body.name)) {
    return response.status(400).json(
        { error: "name is already in phonebook" }
    )} 
            
    const person = {
        id: Math.floor(Math.random() * 999999),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)
    response.json(person)
})



app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    
    const person = persons.find(p => p.id == id)
    
    if (!person) { 
        return response.status(404).json(
            { error: "ID not found" }
        )}
    
    // response.statusMessage = 'Deleted succesfully'
    // response.json(person)
    persons = persons.filter(p => p.id != id)

    response.json({ message: "deleted succesfully" })
})
    
    
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
    
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
