const Book = require('../models/book')

const resetDatabase = async (request, response) => {
  await Book.deleteMany({})
  response.status(204).end()
}
module.exports = { resetDatabase }