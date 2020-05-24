const ADD_VOTE = 'ADD_VOTE';
const ADD_ANECDOTE = 'ADD_ANECDOTE';

const vote = (id) => ({
    type: ADD_VOTE,
    id
});

const add = (newAnec) => ({
    type: ADD_ANECDOTE,
    newAnec
});

export {vote as default, add, ADD_VOTE, ADD_ANECDOTE};

