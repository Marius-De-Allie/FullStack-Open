
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client';

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name,
    id,
    born,
    bookCount
  }
}
`
const ALL_BOOKS = gql`
query {
  allBooks {
    title,
    published,
    author,
    id
  }
}
`


const App = () => {
  const result = useQuery(ALL_AUTHORS);
  const bookResults = useQuery(ALL_BOOKS);

  const [page, setPage] = useState('authors');
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if(result.data) {
      setAuthors([...result.data.allAuthors])
    }
  }, [result]);

  useEffect(() => {
    if(bookResults.data) {
      setBooks(bookResults.data.allBooks)
    } else {
      // do nothing
    }
  }, [bookResults])
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App