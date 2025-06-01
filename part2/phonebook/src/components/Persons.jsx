import Person from "./Person"

function Persons({ persons, onRemovePerson }) {
  return (
    <ul>
      {persons.map((person => <Person key={person.name + person.id} data={person} onClick={() => { onRemovePerson(person.id) }} />))}
    </ul>
  )
}

export default Persons