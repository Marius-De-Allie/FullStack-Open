import React from 'react';
import Person from './Person';

const Persons = ({persons, filteredPersons, handleDelete}) => {
    const output = filteredPersons.length <= 0 ? 
    persons.map(person => <Person key={person.name} person={person} handleDelete={handleDelete} />) :
    filteredPersons.map(person => <Person key={person.name} person={person} handleDelete={handleDelete} />)
    return output;
};
    
export default Persons;
    
