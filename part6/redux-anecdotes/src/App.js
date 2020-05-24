import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import vote from './actions/anecdotes';
import CreateAnedcdote from './components/CreateAnecdote';

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <CreateAnedcdote />
    </div>
  )
}

export default App