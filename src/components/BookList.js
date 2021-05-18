import React from 'react'
import Table from 'react-bootstrap/Table'

const BookList = ({ books, currentBook, selectCurrentBook }) => {

  if(!books) {
    return(
      <div>Loading books from database...</div>
    )
  }

  return(
    <div>
      <h2>Books</h2>
      <Table striped bordered>
        <tbody className='book-list' data-testid='book-list'>
          <tr><th>Title</th><th>Author</th></tr>
          {books.map(book => (
            <tr
              className={`book-list-row ${book.id === currentBook.id ? 'currentBook' : ''}`}
              data-testid={`book-list-row-${book.id}`}
              onClick={() => {selectCurrentBook(book)}}
              key={book.id}
            >
              <td>
                {book.title}
              </td>
              <td>
                {book.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default BookList