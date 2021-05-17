import React from 'react'
import { Form, Button } from 'react-bootstrap'

const BookForm = ({ currentBook, handleInputChange, addBook, updateBook, deleteBook }) => {

  const buttonStyle = {
    margin:'10px'
  }

  return (
    <div>
      <Form id="book-form">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            data-testid="book-form-title-field"
            name="title"
            value={currentBook.title}
            onChange={handleInputChange}
          />

          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            id="author"
            data-testid="book-form-author-field"
            name="author"
            value={currentBook.author}
            onChange={handleInputChange}
          />

          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            id="description"
            data-testid="book-form-description-field"
            name="description"
            value={currentBook.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div>
          <Button
            style={buttonStyle}
            type="button"
            data-testid="book-form-add-button"
            onClick={addBook}
            disabled={!(currentBook.title && currentBook.author)}
          >
            Save New
          </Button>
          <Button
            style={buttonStyle}
            type="button"
            data-testid="book-form-update-button"
            onClick={updateBook}
          >
            Save
          </Button>
          <Button
            style={buttonStyle}
            type="button"
            data-testid="book-form-delete-button"
            variant="danger"
            onClick={deleteBook}
            disabled={!currentBook.id}
          >
            Delete
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default BookForm