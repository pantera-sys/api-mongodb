const express = require('express')
// const http = require('http')
const app = express()
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'Me tengo que suscribir a @midudev en YouTube',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases del FullStack Bootcamp',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de midudev',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  },
]

// const app = http.createServer((req, res) =>{
//     res.writeHead(200, {'Content-Type': 'aplication/json'})
//     res.end(JSON.stringify(notes))
// } )

app.get('/', (req, res) =>{
  res.send('<h1>hello world</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)

  if (note){
    res.json(note)
  }else{
    res.status(204).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes' , (req, res) => {
  const note = req.body
  
  const ids = notes.map(note => note.id)
  const idMax = Math.max(...ids)
  console.log('entra?')
  const newNote = {
    id : idMax + 1,
    content: note.content,
    important: note.important || false,
    date: new Date(),
  }

  notes = [...notes, newNote]
  console.log(newNote)
  res.json(newNote)
})

const PORT = 3001
app.listen(PORT, () =>{
  console.log(`Server en puerto ${PORT}`)
})

