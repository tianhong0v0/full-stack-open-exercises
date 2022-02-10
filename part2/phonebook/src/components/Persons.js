import React, { useState } from 'react'

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
)

const Persons = ({ persons, apply, filter }) => {
  const personsToShow = apply
    ? persons.filter((item) => item.name.toLowerCase().includes(filter))
    : persons
  return (
    <div>
      {personsToShow.map((person) => (
        <Person person={person} key={person.name} />
      ))}
    </div>
  )
}

export default Persons
