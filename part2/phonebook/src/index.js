import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [applyFilter, setApplyFilter] = useState(false)

  useEffect(() => {
    phonebookService.getAll().then((response) => setPersons(response))
  }, [])

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
      setApplyFilter(true)
      setFilter(inputChars.toLowerCase())
    } else {
      setApplyFilter(false)
      setFilter('')
    }
  }

  const addOrUpdate = (event) => {
    event.preventDefault()
    if (persons.some((item) => item.name === newName)) {
      updatePerson()
    } else {
      addPerson()
    }
    setNewName('')
    setNewNumber('')
  }

  const addPerson = () => {
    const personObject = {
      name: newName, //using name as key
      number: newNumber,
    }
    phonebookService
      .create(personObject)
      .then((response) => setPersons(persons.concat(response)))
  }

  const updatePerson = () => {
    alert(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
    const p = persons.find((item) => item.name === newName)
    console.log('p', p)
    const pid = p.id
    const changedP = { ...p, number: newNumber }
    phonebookService
      .update(pid, changedP)
      .then((response) =>
        setPersons(persons.map((item) => (item.id === pid ? response : item)))
      )
  }

  const deletePerson = async (id) => {
    const personToDelete = persons.find((item) => item.id === id)
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      await phonebookService.deletePerson(id)
      phonebookService.getAll().then((response) => setPersons(response))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChangeHandler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        submitHandler={addOrUpdate}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        apply={applyFilter}
        filter={filter}
        deleteP={deletePerson}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
