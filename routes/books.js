const express = require('express')
const booksController = require('../controllers/books.js')

const booksRouter = express.Router()

booksRouter.get('/', booksController.getBooks)

booksRouter.post('/', booksController.addBook)

booksRouter.put('/:id', booksController.updateBook)

booksRouter.delete('/:id', booksController.deleteBook)

module.exports = booksRouter