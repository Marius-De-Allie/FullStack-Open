import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { handleAdd } from '../reducers/anecdoteReducer'; 
import { handleNotification } from '../reducers/notificationReducer'; 

const AnecdoteForm = ({ handleAdd, handleNotification}) => {
    const [value, setValue] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const anecObj = {
            content: value,
            votes: 0
        };
        setValue('');
        // dispatch hanldeAdd action, passing in new anecdote object as arg.
        handleAdd(anecObj);
        // dispatch handle notification thunk action.
        handleNotification(`New anecdote '${anecObj.content}' successfully added.`, 5000);
        
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

const mapDispatchToProps = ({
    handleAdd,
    handleNotification
});

export default connect(null, mapDispatchToProps)(AnecdoteForm);