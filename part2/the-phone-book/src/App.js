import React, { useState } from 'react';
import SearchFilter from './components/SearchFilter';
import Persons from './components/Persons';
import AddPerson from './components/AddPerson';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  // COMPONENT STATE.
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState([]);


  const nameChange = (evt) => {
    const value = evt.target.value.trimStart();
    setNewName(value);
  };

  const numberChange = (evt) => {
    const number = evt.target.value.trimStart();
    setNewNumber(number);
  }

  const searchTermUpdate = (evt) => {
    const searchTerm = evt.target.value.trimStart();
    setSearchTerm(searchTerm);
    // Create a new persons array with every person's name in uppercase characters.
    const personsArray = persons.map(person => {
      return {
        name: person.name.toUpperCase(),
        number: person.number
      }
    });
    // Convert searchTerm piece of state to uppercase.
    const searchUpper = searchTerm.toUpperCase();
    // set filteredPersons to array of elements that match the search term.
    const newFilteredArray = personsArray.filter(person => person.name === searchUpper);
    setFilteredPersons(newFilteredArray.length > 0 ? newFilteredArray : []);
  };

  const formSubmit = (evt) => {
    evt.preventDefault();
    // Create a new persons array with every user name in uppercase characters.
    const personsArray = persons.map(person => person.name.toUpperCase());
    const newNameUpper = newName.toUpperCase();
    // Create newPerson object to be added to persons array piece of component state.
    const newPerson = {
      name: newName,
      number: newNumber
    };
    // Check whether persons array already contains the name of user attempting to be added.
    if(personsArray.includes(newNameUpper)) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    // Reset both input fields value to an empty string.
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter searchTerm={searchTerm} searchTermUpdate={searchTermUpdate} />
      <h2>add a new</h2>
      <AddPerson 
        newName={newName}
        nameChange={nameChange}
        formSubmit={formSubmit}
        newNumber={newNumber}
        numberChange={numberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filteredPersons={filteredPersons} 
      />
    </div>
  )
};

export default App;