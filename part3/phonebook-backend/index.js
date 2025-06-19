require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
// middleware to parse body request
app.use(cors())
app.use(express.json())

morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(morgan('Method :method \nPath :url \nStatus :status \nBody :body \nSize :res[content-length] - :response-time ms \n------'))

app.use('/', express.static('dist'))

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
    Person.find({})
        .then(result => res.json(result))

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

// add person
app.post('/api/persons', async (req, res) => {
    const { name, number } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'name missing' });
    }

    if (!number) {
        return res.status(400).json({ error: 'number missing' });
    }

    try {
        const existing = await Person.find({ name });

        if (existing.length) {
            return res.status(400).json({ error: 'name must be unique' });
        }

        const person = new Person({ name, number });
        const savedPerson = await person.save();

        res.json(savedPerson);

    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Error creating new entry' });
    }
});


// delete person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => console.log(`listening port: ${PORT}`))

