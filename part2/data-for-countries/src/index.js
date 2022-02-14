import ReactDOM from 'react-dom'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Display from './components/Display'
import DisplaySingleCountry from './components/DisplayOneCountry'
import DisplayCountries from './components/DisplayCountries'

// const Button = ({ show, data-show }) => {
//   return <button onClick={show}> show</button>
// }

const App = () => {
  const [inputQuery, setInputQuery] = useState('')
  const [allResponseCountries, setAllResponseCountries] = useState([])
  const [numberOfResponse, setNumberOfResponse] = useState(0)

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

  //how do you set target of a Button?
  const show = (event) => {
    event.preventDefault()
    const countryIndex = event.target.dataset.show
    const copyOfCountries = allResponseCountries
    setAllResponseCountries([copyOfCountries[countryIndex]])
  }

  return (
    <div>
      <label>
        find countries
        <input onChange={changeHandler} />
      </label>
      {numberOfResponse > 10 && (
        <div>Too many matches, specity another filter</div>
      )}
      {numberOfResponse === 1 && (
        <DisplaySingleCountry country={allResponseCountries[0]} />
      )}
      {numberOfResponse <= 10 && numberOfResponse > 1 && (
        <div>
          {allResponseCountries.map((item, index) => (
            <div key={index}>
              {' '}
              {item.name.common}
              {/* the button element passed in a custom object for indicating which country to show */}
              <button onClick={show} data-show={index}>
                show
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
