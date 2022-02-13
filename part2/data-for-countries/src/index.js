import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Display from './components/Display'

const App = () => {
  const [inputQuery, setInputQuery] = useState('')
  const [allResponseCountries, setAllResponseCountries] = useState([])
  //execute useEffect after changing inputQuery
  useEffect(() => {
    console.log('input query: ', inputQuery)
    const query = `https://restcountries.com/v3.1/name/${inputQuery}`
    axios
      .get(query)
      .then((response) => response.data)
      .catch((err) => {
        //TO-DO: Distinguish when inputQuery is empty or cannot find certain country
        console.error(err.response.status)
        setAllResponseCountries([])
      })
  }, [inputQuery])

  const changeHandler = (event) => {
    setInputQuery(event.target.value)
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
