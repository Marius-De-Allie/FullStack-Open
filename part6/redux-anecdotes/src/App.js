import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { hanldeInitializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(hanldeInitializeAnecdotes)
  }, [dispatch]);

  const notification = useSelector(state => state.notification);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {notification !== '' && <Notification />}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
};

export default App