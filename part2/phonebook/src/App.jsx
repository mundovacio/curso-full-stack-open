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

    if ([...persons].map(({ name }) => name.toLowerCase().trim()).includes(newName.toLowerCase().trim())) {
      alert(`${newName} already exist in the list`)
      return
    }

    if ([...persons].map(({ number }) => number.toLowerCase().trim()).includes(newNumber.toLowerCase().trim())) {
      alert(`${newNumber} already exist in the list for ${persons.find(({ number }) => number.toLowerCase().trim() === newNumber.toLowerCase().trim()).name}`)
      return
    }

    const objPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
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
      <Persons persons={personsFiltered} />
    </>
  )
}

export default App