const express = require('express')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const PORT = 3003

app.use('/api/v1', indexRouter)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
