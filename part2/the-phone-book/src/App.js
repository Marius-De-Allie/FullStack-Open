import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '905-467-9546' }
  ]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const nameChange = (evt) => {
    const value = evt.target.value.trimStart();
    setNewName(value);
  };

  const numberChange = (evt) => {
    const number = evt.target.value.trimStart();
    setNewNumber(number);
  }

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
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App;