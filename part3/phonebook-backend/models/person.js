const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

// connection
mongoose.connect(url)
    .then(() => console.log('connected to MongoDB'))
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

// create schema for person
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person

// adding initial data
// let persons = [
//     {
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

// persons.forEach(person => {
//     new Person(person).save().then((result) => {
//         console.log('person added', result.name);
//     })
// })
