import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    if(!newName) {
      alert('New name must not be empty');
      return
    }

    if([...persons].map(({name}) => name.toLowerCase().trim()).includes(newName.toLowerCase().trim())) {
      alert(`${newName} already exist in the list`)
      return
    }

    const objPerson = {
      name: newName.trim()
    }

    setPersons([...persons, objPerson])
    setNewName('')

  }

  const handleNameChange = ({ target: { value } }) => {
    setNewName(value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => <li key={person.name + i}>{person.name}</li>)}
      </ul>
    </>
  )
}

export default App