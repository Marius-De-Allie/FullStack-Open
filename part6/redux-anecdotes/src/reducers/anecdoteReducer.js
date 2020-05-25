import anecdoteService from '../services/anecdotes';

// Action creators.

const ADD_VOTE = 'ADD_VOTE';
const ADD_ANECDOTE = 'ADD_ANECDOTE';
const INIT_ANECDOTES = 'INIT_ANECDOTES';

const vote = (id) => ({
    type: ADD_VOTE,
    id
});

const add = (newAnec) => ({
    type: ADD_ANECDOTE,
    newAnec
});

// Thunk action creator.
const handleAdd = (anecObj) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(anecObj);
    dispatch(add(newAnec));
  }
}

const initializeAnecdotes = (anecdotes) => ({
  type: INIT_ANECDOTES,
  anecdotes
});

// Thunk action creator.
const hanldeInitializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(initializeAnecdotes(anecdotes));
  }
};


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case INIT_ANECDOTES:
      return action.anecdotes
    case ADD_VOTE:
      const anec = state.find(anec => anec.id === action.id);
      const updatedAnec = {
        ...anec, 
        votes: anec.votes + 1
      };

      return state.map(el => {
        return el.id === action.id ? updatedAnec : el;
      })
    case ADD_ANECDOTE:
      return [
        ...state,
        action.newAnec
      ]
    default:
      return state;
  }
}

export { reducer as default, handleAdd, vote, hanldeInitializeAnecdotes }