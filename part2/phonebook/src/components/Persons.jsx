import Person from "./Person"

function Persons({persons}) {
    return (
       <ul>
        {persons.map((person => <Person key={person.name+person.id} data={person}/> ))}
      </ul>
    )
}

export default Persons