import React from 'react';
import Person from './Person';

const Persons = ({persons, filteredPersons}) => {
    const output = filteredPersons.length <= 0 ? 
    persons.map(person => <Person key={person.name} person={person} />) :
    filteredPersons.map(person => <Person key={person.name} person={person} />)
    return output;
};
    
export default Persons;
    
