const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const PORT = 3003

app.get('/', (req, res) => {
  res.send('hello, glitch')
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
