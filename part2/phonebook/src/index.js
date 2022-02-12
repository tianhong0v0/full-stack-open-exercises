import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
  }, [])
  /* Notice that
  we create two independent state variables: newName, newNumber 

  Why not create a single [newPerson, setNewPerson] state? 
  (in which that newPerson object includes two fields: newName and newNumber)

  If you use this.setState in a class, 
  which merges the updated fields into object automatically
  in other words, this.setState updates partial object.  
  It makes more sense to create a single newPerson object
  
  However, if you are using useState(), 
  there is no automatic merging, 
  you will have to merge these fields (name, number, ...) 
  into the previous state object manually. 

  Separating independent state variables also has another benefit.
  It makes it easy to later extract some related logic into a custom Hook */

  //But, May be I should not seperate filter and applyFilter?
  //Since they always change together
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
