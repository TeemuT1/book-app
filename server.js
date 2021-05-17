
const config = require('./utils/config')
const booksRouter = require('./routes/books.js')
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())

const PORT = config.PORT || 5000

console.log('connecting to,', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static(path.join(__dirname, './build')))

app.use('/api/books', booksRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/testing')
  app.use('/api/testing', testingRouter)
}

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})