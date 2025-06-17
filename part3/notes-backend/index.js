require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT
const Note = require('./models/note')

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body)
})

app.use(morgan('Method :method \nPath :url \nStatus :status \nBody :body \nSize :res[content-length] - :response-time ms \n------'))
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
})

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.map(note => note.id === id ? { ...note, ...req.body } : note)
  const updatedNote = notes.find(note => note.id === id)
  res.json(updatedNote)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})