import React from 'react'

const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number} <button onClick={deletePerson}>delete</button>
  </div>
)

const Persons = ({ persons, filter, deleteP }) => {
  const personsToShow = filter
    ? persons.filter((item) => item.name.toLowerCase().includes(filter))
    : persons
  return (
    <div>
      {personsToShow.map((person) => (
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
