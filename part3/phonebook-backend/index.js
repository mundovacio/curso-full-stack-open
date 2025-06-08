const express = require('express')
const app = express()
const PORT = 3001
app.use(express.json())


// data
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

// routes
app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})


// api routes
// get all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// get single person
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

const generateId = () => {
    const newId = Math.floor(Math.random() * 1000)
    const personExist = persons.find(p => p.id === newId)
    return personExist ? generateId() : newId
}

// add person
app.post('/api/persons', (req, res) => {

    if (!req.body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!req.body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const personNameExist = persons.find(p => p.name === req.body.name)

    if (personNameExist) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        id: generateId(),
        name: req.body.name,
        number: req.body.number
    }

    persons = [...persons, person]

    res.json(person)
})
// delete person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.listen(PORT, () => console.log(`listening port: ${PORT}`))

