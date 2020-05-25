import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{ vote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes));

    const handleVote = (anecdote) => {
        // dispatch vote action.
        dispatch(vote(anecdote.id))
        // dispatch SET_NOTIFICATION action.
        dispatch(setNotification(`you voted '${anecdote.content}'`));
        // dispatch remove notification ation.
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <Fragment>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </Fragment>
    );
};

export default AnecdoteList;