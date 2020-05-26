import anecdoteService from '../services/anecdotes';

// Action creators.

const ADD_VOTE = 'ADD_VOTE';
const ADD_ANECDOTE = 'ADD_ANECDOTE';
const INIT_ANECDOTES = 'INIT_ANECDOTES';

const vote = (anec) => ({
    type: ADD_VOTE,
    anec
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

const initAnecdotes = (anecdotes) => ({
  type: INIT_ANECDOTES,
  anecdotes
});

// Thunk action creator.
const handleInitAnecdotes = () => {
  return (dispatch) => {
    anecdoteService.getAll()
    .then(anecs => {
      dispatch(initAnecdotes(anecs))
    })
  }
};

// THunk action creator.
const handleAddVote = (id, item) => {
  return async dispatch => {
    const updatedAnec = await anecdoteService.update(id, item);
    // dispatch add vote action creator.
    dispatch(vote(updatedAnec));
  }
};

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case INIT_ANECDOTES:
      return action.anecdotes
    case ADD_VOTE:
      return state.map(el => el.id === action.anec.id ? action.anec : el)
    case ADD_ANECDOTE:
      return [
        ...state,
        action.newAnec
      ]
    default:
      return state;
  }
};

export { reducer as default, handleAdd, handleAddVote, handleInitAnecdotes }