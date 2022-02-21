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

  //set applyFilter, filter when input is not empty
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
    phonebookService.create(personObject).then((response) => {
      setPersons(persons.concat(response))
      notify(`Added ${response.name} Successfully`, 'info')
    })
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
      .then((response) => {
        setPersons(persons.map((item) => (item.id === pid ? response : item)))
        notify(`Updated ${response.name} successfully`, 'info')
      })
      .catch((err) => {
        notify(`${p.name} has already been removed from server`, 'alert')
        setPersons(persons.filter((item) => item.id !== pid))
      })
  }

  const deletePerson = async (id) => {
    const personToDelete = persons.find((item) => item.id === id)
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      await phonebookService.deletePerson(id)
      phonebookService.getAll().then((response) => {
        setPersons(response)
        notify(`Deleted ${personToDelete.name} Successfully`, 'info')
      })
    }
  }

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
      <Persons persons={persons} filter={filter} deleteP={deletePerson} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
