import './App.css'
import React, { useState, useEffect } from 'react'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import Notification from './components/Notification'
import Header from './components/Header'
import bookService from './services/books'
import { Container, Row, Col } from 'react-bootstrap'

//useful because currentBook controls form input state which should not be undefined
const emptyBook = {
  id: '',
  title: '',
  author: '',
  description: ''
}

const App = () => {
  const [ books, setBooks ] = useState(null)
  const [ currentBook, setCurrentBook ] = useState(emptyBook)

  //for displaying success and error notifications to user
  const [ notification, setNotification ] = useState(null)
  //needed for cancelling notification timeouts when user performs actions quickly
  const [ notificationTimeoutId, setNotificationTimeoutId ] = useState(null)

  useEffect(() => {
    const successCallback = (receivedBooks) => {
      setBooks(receivedBooks)
    }
    const errorCallback = (error) => {
      console.log('error fetching books from database', error)
      notifyWith('Could not fetch books from the database', 'error')
    }
    bookService.getAll(successCallback, errorCallback)
  },[])

  //display a success or error notification to the user for 5 seconds
  const notifyWith = (message, type='success') => {
    if(notificationTimeoutId) {
      clearTimeout(notificationTimeoutId)
    }
    setNotification({
      message, type
    })
    const newTimeoutId = setTimeout(() => {
      setNotification(null)
    }, 5000)
    setNotificationTimeoutId(newTimeoutId)
  }

  const deleteBook = async () => {
    if(!currentBook.id) {
      notifyWith('No book selected, cannot delete', 'error')
    } else {

      const deleteCallback = () => {
        setBooks(books.filter(book => book.id !== currentBook.id))
        setCurrentBook(emptyBook)
        notifyWith('Book deleted successfully', 'success')
      }

      const errorCallback = (error) => {
        if(error.response && error.response.status === 404) {
          setBooks(books.filter(book => book.id !== currentBook.id))
          setCurrentBook(emptyBook)
          notifyWith('Book was already deleted', 'error')
        } else {
          notifyWith('Could not delete, database might be down', 'error')
        }
        console.log('error deleting a book', error)
      }
      bookService.remove(currentBook.id, deleteCallback, errorCallback)

    }
  }

  const addBook = async () => {
    if(!currentBook.title || !currentBook.author) {
      notifyWith('Book must have a title and an author!', 'error')
    }
    else {

      const addCallback = (newBook) => {
        setBooks(books.concat(newBook))
        setCurrentBook(newBook)
        notifyWith('Book added successfully', 'success')
      }

      const errorCallback = (error) => {
        notifyWith('Error saving the book', 'error')
        console.log('error saving a book', error)
      }

      bookService.create(currentBook, addCallback, errorCallback)
    }
  }

  const updateBook = async () => {
    if(!currentBook.title || !currentBook.author) {
      notifyWith('Book must have a title and an author.', 'error')
    } else {

      const updateCallback = async (updatedBook) => {
        setBooks(books.map(book => book.id === currentBook.id ? updatedBook : book))
        notifyWith('Book info updated', 'success')
      }

      const errorCallback = (error) => {
        notifyWith('Could not update book, maybe it was deleted by another user', 'error')
        console.log('error updating a book', error)
      }

      bookService.update(currentBook, updateCallback, errorCallback)

    }
  }

  const handleInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    const changedCurrentBook = {
      ...currentBook,
      [name]: value
    }
    setCurrentBook(changedCurrentBook)
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <div className='fixed-form-wrapper'>
              <Header headerText='Book App'/>
              <BookForm
                currentBook={currentBook}
                handleInputChange={handleInputChange}
                deleteBook={deleteBook}
                updateBook={updateBook}
                addBook={addBook}
              />
              <Notification notification={notification}/>
            </div>
          </Col>

          <Col>
            <BookList
              currentBook={currentBook}
              books={books}
              selectCurrentBook={setCurrentBook}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
