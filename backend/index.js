const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors');

connectToMongo();

const app = express()
const port = 3000
app.use(cors()) 
app.use(express.json()) //  is a built-in middleware function in Express.js. It allows your server to parse incoming JSON requests and make the data available in req.body


// available routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

