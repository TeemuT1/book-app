const Book = require('../models/book')

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({})
    res.status(200).json(books)
  } catch(e) {
    res.status(500).send('Database error when fetching books')
  }
}

const addBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
  })
  const addedBook = await book.save()
  res.status(201).json(addedBook)
}

const updateBook = async (req, res) => {
  const id = req.params.id
  const book = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, book, { new:true })
    if(updatedBook) {
      res.status(201).json(updatedBook)
    } else {
      res.status(404).send('Book to update not in database')
    }
  } catch(e) {
    res.status(500).send('Database error when updating')
  }
}

const deleteBook = async (req, res) => {
  const id = req.params.id
  try {
    const deletedBook = await Book.findByIdAndRemove(id)
    if(deletedBook) {
      res.status(204).end()
    } else {
      res.status(404).send('Book already deleted')
    }
  } catch(e) {
    res.status(500).send('Database error when deleting')
  }
}

module.exports = { getBooks, addBook, deleteBook, updateBook }