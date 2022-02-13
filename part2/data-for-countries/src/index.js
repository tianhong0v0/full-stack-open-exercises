import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Display from './components/Display'

const App = () => {
  const [allResponseCountries, setAllResponseCountries] = useState([])

  const changeHandler = (event) => {
    if (event.target.value.length < 1) {
      console.log('Please put some query to search for')
      //setInputQuery('')
    } else {
      const userInput = event.target.value
      const query = `https://restcountries.com/v3.1/name/${userInput}`
      searchQuery(query)
    }
  }

  const searchQuery = (query) => {
    axios
      .get(query)
      .then((response) => response.data)
      .then((data) => setAllResponseCountries(data)) //set C
      .catch((err) => {
        console.error(err.response.status)
        setAllResponseCountries([])
      })
  }

  return (
    <div>
      <label>
        find countries
        <input onChange={changeHandler} />
      </label>
      <Display countries={allResponseCountries} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
