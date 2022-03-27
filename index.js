const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())


let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
  ]


  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  

    //Tehtävän 3.2 tapauksessa löytyy 
    //Ei mitään sillä id=5 eli status 404
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


const generateId = () => {
  return (Math.floor(Math.random() * 100000) + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'name must be unique'})
  }

  persons.find(person => {
    if(body.name === person.name){
      return response.status(400).json({error: 'name must be unique'})
    }
  })

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
})

  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
