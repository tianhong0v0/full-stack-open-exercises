import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Display from './components/Display'

const App = () => {
  const [c, setC] = useState([])

  const changeHandler = (event) => {
    const userInput = event.target.value
    if (userInput.length < 1) {
      console.log('Please put some query to search for')
    } else {
      const query = `https://restcountries.com/v3.1/name/${userInput}`
      searchQuery(query)
    }
  }

  const searchQuery = (query) => {
    console.log('while Im Searching!!!')
    axios
      .get(query)
      .then((response) => response.data)
      .then((data) => setC(data)) //set C
      .catch((err) => console.error('hello', err.response.status))
  }

  return (
    <div>
      <label>
        find countries
        <input onChange={changeHandler} />
      </label>
      <Display countries={c} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
