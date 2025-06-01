import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hookGetPersons = () => {
    personsService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }

  useEffect(hookGetPersons, [])

  const addPerson = (e) => {
    e.preventDefault()

    if (!newName) {
      alert('Name must not be empty');
      return
    }

    if (!newNumber) {
      alert('Number must not be empty');
      return
    }

    const objPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    }

    if ([...persons].map(({ name }) => name.toLowerCase().trim()).includes(newName.toLowerCase().trim())) {
      // person name exist, confirm update number
      const matchedPerson = persons.find(({ name }) => name.toLowerCase().trim() === newName.toLowerCase().trim())
      if (window.confirm(`${matchedPerson.name} already exist, would you like to update the phone number?\ncurrent: ${matchedPerson.number} \nnew: ${objPerson.number}`)) {
        objPerson.name = matchedPerson.name;
        personsService
          .update(matchedPerson.id, objPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id == matchedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          }).catch((error) => {
            console.log('error: ', error);
          })
      }
      return
    }

    if ([...persons].map(({ number }) => number.toLowerCase().trim()).includes(newNumber.toLowerCase().trim())) {
      // person number exist, confirm update name
      const matchedPerson = persons.find(({ number }) => number.toLowerCase().trim() === newNumber.toLowerCase().trim())
      if (window.confirm(`${matchedPerson.name} has the same phone number, would you like to update the name?\ncurrent: ${matchedPerson.name} \nnew: ${objPerson.name}`)) {
        objPerson.number = matchedPerson.number;
        personsService
          .update(matchedPerson.id, objPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id == matchedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          }).catch((error) => {
            console.log('error: ', error);
          })
      }
      return
    }

    personsService
      .create(objPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = ({ target: { value } }) => {
    setNewName(value)
  }

  const handleNumberChange = ({ target: { value } }) => {
    setNewNumber(value)
  }

  const handleFilterChange = ({ target: { value } }) => {
    setNewFilter(value)
  }

  const handleRemovePerson = id => {
    const { name, number } = persons.find(p => p.id === id);
    if (window.confirm(`You are about to remove ${name} with the number ${number}. Are you sure?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }

  const personsFiltered = persons
    .filter(({ name }) => name.toLowerCase().trim().indexOf(newFilter.toLowerCase().trim()) > -1)

  return (
    <>
      <h1>Phonebook</h1>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add new contact</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} onRemovePerson={handleRemovePerson} />
    </>
  )
}

export default App