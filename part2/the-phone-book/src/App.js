import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const inputChange = (evt) => {
    const value = evt.target.value.trimStart();
    setNewName(value);
  };

  const formSubmit = (evt) => {
    evt.preventDefault();
    // Create a new persons array with every user name in uppercase characters.
    const personsArray = persons.map(person => person.name.toUpperCase());
    const newNameUpper = newName.toUpperCase();
    console.log('newName', newNameUpper)
    console.log('Array', personsArray)

    console.log(personsArray.includes(newNameUpper))
    // Create newPerson object to be added to persons array piece of component state.
    const newPerson = {
      name: newName
    };
    // Check whether persons array already contains the name of user attempting to be added.
    if(personsArray.includes(newNameUpper)) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    // Reset input field value to an empty string.
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmit}>
        <div>
          name: <input 
            value={newName} 
            onChange={inputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App;