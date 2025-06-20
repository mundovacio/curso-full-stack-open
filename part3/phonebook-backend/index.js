require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body, null, 4))
const requestLogger = morgan('Method :method \nPath :url \nStatus :status \nBody :body \nSize :res[content-length] - :response-time ms \n------')

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)


// routes
app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})


// api routes
// get all persons
app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(result => res.json(result))
        .catch(next)

})

// get single person
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// add person
app.post('/api/persons', async (req, res, next) => {
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
        next(error)
    }
});


// update person
app.put('/api/persons/:id', async (req, res, next) => {
    const { name, number } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'name missing' });
    }

    if (!number) {
        return res.status(400).json({ error: 'number missing' });
    }

    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).end()
        }
        person.name = name
        person.number = number
        const personUpdate = await person.save()
        res.json(personUpdate);
    } catch (error) {
        next(error)
    }
});


// delete person
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        }).catch(next)
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening port: ${PORT}`))

