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

  useEffect(async () => {
    try {
      const receivedBooks = await bookService.getAll()
      setBooks(receivedBooks)
    } catch(e) {
      console.log('error fetching books from database', e)
      notifyWith('Could not fetch books from the database', 'error')
    }
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
      try {
        await bookService.remove(currentBook.id)
        setBooks(books.filter(book => book.id !== currentBook.id))
        setCurrentBook(emptyBook)
        notifyWith('Book deleted successfully', 'success')
      } catch(e) {
        if(e.response && e.response.status === 404) {
          setBooks(books.filter(book => book.id !== currentBook.id))
          setCurrentBook(emptyBook)
          notifyWith('Book was already deleted', 'error')
        } else {
          notifyWith('Could not delete, database might be down', 'error')
        }
        console.log('error deleting a book', e)
      }
    }
  }

  const addBook = async () => {
    if(!currentBook.title || !currentBook.author) {
      notifyWith('Book must have a title and an author!', 'error')
    }
    else {
      try {
        const newBook = await bookService.create(currentBook)
        setBooks(books.concat(newBook))
        setCurrentBook(newBook)
        notifyWith('Book added successfully', 'success')
      } catch(e) {
        notifyWith('Error saving the book', 'error')
        console.log('error saving a book', e)
      }
    }
  }

  const updateBook = async () => {
    if(!currentBook.title || !currentBook.author) {
      notifyWith('Book must have a title and an author.', 'error')
    } else {
      try {
        const updatedBook = await bookService.update(currentBook)
        setBooks(books.map(book => book.id === currentBook.id ? updatedBook : book))
        notifyWith('Book info updated', 'success')
      } catch(e) {
        notifyWith('Could not update book, maybe it was deleted by another user', 'error')
        console.log('error updating a book', e)
      }
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
            <div style={{ position:'fixed', left:'3vw', width:'45vw' }}>
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
