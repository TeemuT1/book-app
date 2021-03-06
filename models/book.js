const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type:String,
    required: true
  },
  description: String,
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Book', bookSchema)