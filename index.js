const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
var cors = require('cors')
const port = 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)


app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/v1/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


