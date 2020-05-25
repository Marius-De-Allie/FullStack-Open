import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../reducers/anecdoteReducer'; 
import { setNotification, removeNotification } from '../reducers/notificationReducer'; 
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {

    const [value, setValue] = useState('');
    const dispatch= useDispatch();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const anecObj = {
            content: value,
            votes: 0
        }
        // Add new anecdeote to backend db.
        const newAnec = await anecdoteService.createNew(anecObj);
        // dispatch add action, passing in new anecdote object as arg.
        dispatch(add(newAnec));
        setValue('');
        // dispatch set notification action.
        dispatch(setNotification(`New anecdote '${anecObj.content}' successfully added.`));
        // dispatch remove notification ation.
        setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);
    };

    return (
        <Fragment>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        value={value}
                        onChange={({target}) => setValue(target.value.trimStart())}
                    />
                </div>
                <button>create</button>
            </form>
        </Fragment>
    );
};

export default AnecdoteForm;