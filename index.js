const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/info', (req, res) => {
  res.send(`<h2>Phonebook has info for ${persons.length} people.</h2>
                <div>${Date()}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 100000) + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  const nameExists = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())

  if(nameExists){
    return res.status(400).json({
        error: "Name already in phonebook."
    })
  }

  if(!body.name || !body.number){
    return res.status(400).json({
        error: 'name or number missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(), 
  }
 
  persons = persons.concat(person)

  res.json(person)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})