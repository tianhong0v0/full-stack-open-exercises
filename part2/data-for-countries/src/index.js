import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Display from './components/Display'
import DisplaySingleCountry from './components/DisplayOneCountry'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [inputQuery, setInputQuery] = useState('')
  const [allResponseCountries, setAllResponseCountries] = useState([])
  //const [displaySingle, setDisplaySingle] = useState(false)
  //const [tooMany, setTooMany] = useState(false)
  const [numberOfResponse, setNumberOfResponse] = useState(0)
  //execute useEffect after changing inputQuery
  useEffect(() => {
    console.log('input query: ', inputQuery)
    const query = `https://restcountries.com/v3.1/name/${inputQuery}`
    axios
      .get(query)
      .then((response) => response.data)
      .then((data) => setAllResponseCountries(data))
      .catch((err) => {
        //TO-DO: Distinguish when inputQuery is empty or cannot find certain country
        console.error(err.response.status)
        setAllResponseCountries([])
      })
  }, [inputQuery])

  useEffect(() => {
    setNumberOfResponse(allResponseCountries.length)
  }, [allResponseCountries])

  const changeHandler = (event) => {
    setInputQuery(event.target.value)
  }

  return (
    <div>
      <label>
        find countries
        <input onChange={changeHandler} />
      </label>
      {/* <Display countries={allResponseCountries} /> */}
      {numberOfResponse > 10 && (
        <div>Too many matches, specity another filter</div>
      )}
      {numberOfResponse === 1 && (
        <DisplaySingleCountry country={allResponseCountries[0]} />
      )}
      {numberOfResponse <= 10 && numberOfResponse > 1 && (
        <DisplayCountries countries={allResponseCountries} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

/*import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const AddTripButton = ({ addTrip }) => {
  return <button onClick={addTrip}> Add a trip</button>
}

const AnotherComponent = () => <div>added!!!</div>

const App = () => {
  const [state, setState] = useState('start')

  return (
    <div>
      {state === 'start' && (
        <AddTripButton addTrip={() => setState('add-trip')} />
      )}
      {state === 'add-trip' && <AnotherComponent />}
    </div>
  )
} 

ReactDOM.render(<App />, document.getElementById('root')) */
