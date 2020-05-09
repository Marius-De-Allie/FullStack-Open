import React, { useState, useEffect } from 'react';
import SearchFilter from './components/SearchFilter';
import Persons from './components/Persons';
import AddPerson from './components/AddPerson';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  // COMPONENT STATE.
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll()
    .then (initialPersons => {
      setPersons(initialPersons);
    });
  }, [])

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
    const personsArray = persons.map(person => {
      let newPerson;
      newPerson = {
        ...person,
        name: person.name.toUpperCase()
      }
      return newPerson;
    });
    const newNameUpper = newName.toUpperCase();
    const matchingPersons = personsArray.filter(person => person.name === newNameUpper);
    const match = matchingPersons.map(per => per.name);
    console.log(personsArray);
    console.log(matchingPersons);
    console.log(match)
    // Create newPerson object to be added to persons array piece of component state.
    const newPerson = {
      name: newName,
      number: newNumber
    };
    // Check whether persons array already contains the name of user attempting to be added.
    if(match.includes(newNameUpper)) {
      // Check whether newly added person's number value is not an empty string.
      if(newPerson.number !== '') {
        // If number is not an empty string then confirm updating person's number.
        if(window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
          const selected = personsArray.find(person => person.name === newNameUpper);
          const selectedPerson = persons.find(person => person.id === selected.id);
          // Selected Person's id property.
          const id = selectedPerson.id;
          // Update person's object, overwriting the number property on the object.
          const updatedPerson = {...selectedPerson, number: newPerson.number};
          personService.updateNumber(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(per => per.id === id ? returnedPerson : per))
            setMessage(`Added phone number for ${returnedPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000)
          })
        } else {
          // DO nothing.
        }
      } else {
        alert(`Sorry ${newPerson.name} has already been added to the phonebook!`);
      }
      // const per = personsArray.find(per => per.name === newNameUpper);
    } else {
      personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      })
      .catch(e => alert('Unable to complete request, please try again!'))
    }
    // Reset both input fields value to an empty string.
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = (personId) => {
    const personToDel = persons.find(person => person.id === personId);
    if(window.confirm(`Delete ${personToDel.name}?`)) {
      personService.deleteItem(personId)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== personId))
        setMessage(`Deleted ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000)

        
      })
      .catch(e => alert(`Unable to delete ${personToDel.name}.`))
    } else {
      //  do nothing.
    }
  };

  return (
    <div>
      <Notification message={message} />
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
        handleDelete={deletePerson}
      />
    </div>
  )
};

export default App;