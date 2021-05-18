
const config = require('./utils/config')
const booksRouter = require('./routes/books.js')
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())

console.log('connecting to,', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB, has MONGODB_URI been defined?', error.message)
  })

app.use(cors())
app.use(express.static(path.join(__dirname, './build')))

app.use('/api/books', booksRouter)

if (config.TEST) {
  const testingRouter = require('./routes/testing')
  app.use('/api/testing', testingRouter)
}

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './build', 'index.html'))
})

app.listen(config.PORT, () => {
  console.log(`server started on port ${config.PORT}`)
})