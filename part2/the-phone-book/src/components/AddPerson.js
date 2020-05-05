import React from 'react';

const AddPerson = ({formSubmit, newName, nameChange, newNumber, numberChange}) => (
    <form onSubmit={formSubmit}>
        <div>
        name: <input 
                type="text"
                placeholder="Please enter name"
                value={newName} 
                onChange={nameChange}
            />
        </div>
        <div>
        number: <input 
                    type="tel"
                    placeholder="Please enter phone #"
                    value={newNumber} 
                    onChange={numberChange}
                />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

export default AddPerson;