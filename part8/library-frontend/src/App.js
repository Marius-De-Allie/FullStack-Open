
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


const App = () => {
  const result = useQuery(ALL_AUTHORS);

  const [page, setPage] = useState('authors');
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if(result.data) {
      setAuthors([...result.data.allAuthors])
    }
  }, [result])
  console.log(result.data)
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
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App