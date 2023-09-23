const express = require('express')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT

app.use('/api/v1', indexRouter)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
