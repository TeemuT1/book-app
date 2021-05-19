import React from 'react'
import BookList from './BookList'
import { render } from '@testing-library/react'

describe('Component BookList', () => {

  let testbooks = [
    {
      id: '1',
      title: 'Thinking Fast and Slow',
      author: 'Daniel Kahneman',
      description: 'Nice'
    },
    {
      id: '2',
      title: 'Homo Sapiens',
      author: 'Yuval Noah Harari',
      description: 'Nice'
    }
  ]
  const emptyBook = { id: '', title: '', author: '', description: '' }

  test('renders without crashing', () => {
    render(
      <BookList books={testbooks} currentBook={emptyBook} />
    )
  })

  test('list includes book details', () => {
    const { getByText } = render(
      <BookList books={testbooks} currentBook={emptyBook} />
    )
    expect(getByText('Title')).toBeVisible()
    expect(getByText('Author')).toBeVisible()
    expect(getByText('Thinking Fast and Slow')).toBeVisible()
    expect(getByText('Daniel Kahneman')).toBeVisible()
    expect(getByText('Homo Sapiens')).toBeVisible()
    expect(getByText('Yuval Noah Harari')).toBeVisible()
  })
})