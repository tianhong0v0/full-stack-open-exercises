import React from 'react'

const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number} <button onClick={deletePerson}>delete</button>
  </div>
)

const Persons = ({ persons, deleteP }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          person={person}
          key={person.name}
          deletePerson={() => deleteP(person.id)}
        />
      ))}
    </div>
  )
}

export default Persons
