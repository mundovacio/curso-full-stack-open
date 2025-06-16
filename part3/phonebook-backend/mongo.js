const mongoose = require('mongoose')
require('dotenv').config()

switch (process.argv.length) {

    case 2:
        console.log('Provide password as argument')
        process.exit(1)
        break;
    case 3:
        connect(process.argv[2])
        .then(() => {
            getAllPersons()
        }).catch(() => {
            console.log('Connection error, invalid password');
            process.exit(1)
        })
        break;
    case 4:
        console.log('For creating a new entry you need to give name and number')
        process.exit(1)
        break;
    case 5:
        connect(process.argv[2])
        .then(() => {
            createPerson(process.argv[3], process.argv[4])
                .catch(() => {
                    console.log('Error creating new person');
                    process.exit(1)
                })
        }).catch(() => {
            console.log('Connection error');
            process.exit(1)
        })
        break;
    default:
        console.log('Invalid arguments')
        process.exit(1)
}

// connection
function connect(pass) {
    if (!pass) return new Error('Missing password')

    const username = 'mundovacio3'
    const password = pass
    const database = 'phonebook'

    // const username = process.env.MONGO_USER
    // const password = process.env.MONGO_PASS
    // const database = process.env.MONGO_DATABASE
    const url = `mongodb+srv://${username}:${password}@cluster0.8zoyqad.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`

    // mongoose.connection.on('connected', () => console.log('mongose event: connected'));
    // mongoose.connection.on('open', () => console.log('mongose event: open'));
    // mongoose.connection.on('close', () => console.log('mongose event: close'));
    // mongoose.connection.on('disconnected', () => console.log('mongose event: disconnected'));

    return mongoose.connect(url)
}


// create schema for person
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)



// getAllPersons()

// posting
function createPerson(name, number) {
    console.log('name, number: ', name, number);
    if (!name) {
        return new Error('Name is needed')
    }

    if (!number) {
        return new Error('Number is needed')
    }

    return new Person({ name: name, number: number }).save()
        .then(result => {
            console.log(`Added ${result.name} number ${result.number} to phonebook`)
            mongoose.connection.close()
        })
}

// getting
function getAllPersons() {
    return Person.find({})
        .then(result => {
            console.log('Phonebook:');
            result.forEach(p => console.log(p.name, p.number))
            mongoose.connection.close()
        })
}




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
