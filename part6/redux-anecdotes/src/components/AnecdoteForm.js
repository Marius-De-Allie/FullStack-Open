import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleAdd } from '../reducers/anecdoteReducer'; 
import { handleNotification } from '../reducers/notificationReducer'; 

const AnecdoteForm = () => {

    const [value, setValue] = useState('');
    const dispatch= useDispatch();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const anecObj = {
            content: value,
            votes: 0
        };
        setValue('');
        // dispatch hanldeAdd action, passing in new anecdote object as arg.
        dispatch(handleAdd(anecObj));
        // dispatch handle notification thunk action.
        dispatch(handleNotification(`New anecdote '${anecObj.content}' successfully added.`, 5000));
        
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