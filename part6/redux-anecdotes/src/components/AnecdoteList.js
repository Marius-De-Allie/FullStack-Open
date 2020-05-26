import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import{ handleAddVote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({anecdotes, handleAddVote, handleNotification}) => {
    const handleVote = (id, anecdote) => {
        const updatedAnec = {
            ...anecdote,
            votes: anecdote.votes + 1
        };
        // dispatch handle add vote thunk action.
        handleAddVote(id, updatedAnec);
        // dispatch SET_NOTIFICATION action.
        handleNotification(`you voted '${anecdote.content}'`, 5000);
    };

    return (
        <Fragment>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id, anecdote)}>vote</button>
                </div>
                </div>
            )}
        </Fragment>
    );
};

const mapDispatchToProps = ({
    handleAddVote,
    handleNotification
});

const mapStateToprops = (state) => {
    let anecdotes;
    if(state.filter === '') {
        anecdotes =  state.anecdotes;
    } else {
        anecdotes = state.anecdotes.filter(anec => anec.content.includes(state.filter));
    }
    return {
        anecdotes: anecdotes.sort((a, b) => b.votes - a.votes)
    }

}
export default connect(mapStateToprops, mapDispatchToProps)(AnecdoteList);