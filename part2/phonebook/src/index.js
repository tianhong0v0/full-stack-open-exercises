import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [applyFilter, setApplyFilter] = useState(false)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //set applyFilter, filter when input is not empty
  const handleFilterChange = (event) => {
    let inputChars = event.target.value
    if (inputChars.length > 0) {
      //is there another way to check if the input is empty?
      setApplyFilter(true)
      setFilter(inputChars.toLowerCase())
    } else {
      setApplyFilter(false)
      setFilter('')
    }
  }

  const addPerson = (event) => {
    event.preventDefault() //Pay attention to this!!!
    if (persons.some((item) => item.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName, //using name as key
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChangeHandler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        submitHandler={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} apply={applyFilter} filter={filter} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
