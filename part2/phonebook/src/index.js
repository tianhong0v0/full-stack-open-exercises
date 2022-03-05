import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    phonebookService.getAll().then((response) => setPersons(response))
  }, [])

  const notify = (content, type) => {
    setNotification({
      content: content,
      type: type,
    })
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
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
      .then((response) => {
        setPersons(persons.concat(response))
        notify(`Added ${response.name} Successfully`, 'info')
      })
      .catch((error) => {
        console.log(error.response.data)
        notify(`${JSON.stringify(error.response.data.error)}`, alert)
      })
  }

  const updatePerson = () => {
    alert(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
    const personToUpdate = persons.find((item) => item.name === newName)
    const changedPerson = { ...personToUpdate, number: newNumber }
    phonebookService
      .update(personToUpdate.id, changedPerson)
      .then((response) => {
        setPersons(
          persons.map((item) =>
            item.id === personToUpdate.id ? response : item
          )
        )
        notify(`Updated ${response.name} successfully`, 'info')
      })
      .catch((error) => {
        console.log(error.response.data)
        notify(`${JSON.stringify(error.response.data.error)}`, alert)
      })
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find((item) => item.id === id)
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      phonebookService.deletePerson(id)
      phonebookService.getAll().then((response) => {
        setPersons(response)
        notify(`Deleted ${personToDelete.name} Successfully`, 'info')
      })
    }
  }

  const personsToShow =
    filter.length !== 0
      ? persons.filter((item) => item.name.toLowerCase().includes(filter))
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterChangeHandler={handleFilterChange} value={filter} />
      <h3>add a new</h3>
      <PersonForm
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        submitHandler={addOrUpdate}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
