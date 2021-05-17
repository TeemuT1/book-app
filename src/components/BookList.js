import React from 'react'
import Table from 'react-bootstrap/Table'

const BookList = ({ books, currentBook, selectCurrentBook }) => {

  const currentBookStyle = {
    backgroundColor: 'teal'
  }
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
              className='book-list-row'
              data-testid={`book-list-row-${book.id}`}
              onClick={() => {selectCurrentBook(book)}}
              style={book.id === currentBook.id ? currentBookStyle : {}}
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