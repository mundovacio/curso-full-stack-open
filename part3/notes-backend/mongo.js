const mongoose = require('mongoose')


let notes = [
    {
        content: "HTML is easy",
        important: true
    },
    {
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mundovacio3:${password}@cluster0.e2vcqbm.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)



Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})