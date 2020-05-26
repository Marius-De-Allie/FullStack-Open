import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{ handleAddVote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();

    // const notes = useSelector(state => {
    //     if ( state.filter === 'ALL' ) {
    //       return state.notes
    //     }
    //     return state.filter  === 'IMPORTANT' 
    //       ? state.notes.filter(note => note.important)
    //       : state.notes.filter(note => !note.important)
    //   })
    
    const anecdotes = useSelector(state => {
        let anects;
        if(state.filter === '') {
            anects =  state.anecdotes;
        } else {
            anects = state.anecdotes.filter(anec => anec.content.includes(state.filter))
        }
        return anects.sort((a, b) => b.votes - a.votes)
    });

    const handleVote = (id, anecdote) => {
        const updatedAnec = {
            ...anecdote,
            votes: anecdote.votes + 1
        };
        // dispatch handle add vote thunk action.
        dispatch(handleAddVote(id, updatedAnec))
        // dispatch SET_NOTIFICATION action.
        dispatch(handleNotification(`you voted '${anecdote.content}'`, 5000));
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

export default AnecdoteList;