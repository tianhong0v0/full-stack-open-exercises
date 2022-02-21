import React from 'react'

const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number}{' '}
    <button onClick={() => deletePerson(person.id)}>delete</button>
  </div>
)

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person person={person} key={person.name} deletePerson={deletePerson} />
      ))}
    </div>
  )
}

export default Persons
