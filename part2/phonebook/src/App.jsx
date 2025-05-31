import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      alert(`${newNumber} already exist in the list for ${persons.filter(({ number }) => number.toLowerCase().trim() === newNumber.toLowerCase().trim())[0].name}`)
      return
    }

    const objPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    }

    setPersons([...persons, objPerson])
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = ({ target: { value } }) => {
    setNewName(value)
  }

  const handleNumberChange = ({ target: { value } }) => {
    setNewNumber(value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(({ name, number }) => <li key={name + number}>{name} | {number}</li>)}
      </ul>
    </>
  )
}

export default App