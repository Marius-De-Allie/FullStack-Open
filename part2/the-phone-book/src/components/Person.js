import React from 'react';

const Person = ({person, handleDelete}) => (
    <div>
        <span>{person.name} {`${person.number} `}</span>
        <button 
            onClick={() => handleDelete(person.id)}
        >
            delete
        </button>
    </div>

);

export default Person;