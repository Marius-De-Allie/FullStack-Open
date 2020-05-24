const ADD_VOTE = 'ADD_VOTE';

const vote = (id) => ({
    type: ADD_VOTE,
    id
});

export {vote as default, ADD_VOTE};

