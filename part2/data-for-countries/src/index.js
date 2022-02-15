import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplaySingleCountry from './components/DisplaySingleCountry'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [inputQuery, setInputQuery] = useState('')
  const [allResponseCountries, setAllResponseCountries] = useState([])
  const [numberOfResponse, setNumberOfResponse] = useState(0)
  const [weather, setWeather] = useState(false)

  const changeHandler = (event) => {
    setInputQuery(event.target.value)
  }

  /* whenever inputQuery changes, 
  search for all countries corresponding to it
  */
  useEffect(() => {
    console.log('input query: ', inputQuery)
    if (inputQuery.length === 0) {
      setAllResponseCountries([])
      setNumberOfResponse(0)
      setWeather(false)
    } else {
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
    }
  }, [inputQuery])

  /* Whenever allResponseCountries changes,
  the numberOfResponse change,
  */
  useEffect(() => {
    setNumberOfResponse(allResponseCountries.length)
    console.log('numberOfResponse', allResponseCountries.length)

    if (allResponseCountries.length === 1) {
      console.log('this should only be shown when one country selected')
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${allResponseCountries[0].capital}&units=metric&appid=55dd404984962ca1d3cb49d41afb1a40`
        )
        .then((response) => response.data)
        .then((data) => {
          console.log('weather response. ', data)
          setWeather(data)
        })
    } else {
      setWeather(false)
    }
  }, [allResponseCountries])

  /* how do you set target of a Button? you use custome attribute
   */
  const showButtonHandler = (event) => {
    event.preventDefault()
    console.log('button was being clicked!')
    const countryIndex = event.target.dataset.show
    console.log('countryIndex', countryIndex)
    const copyOfCountries = allResponseCountries
    setAllResponseCountries([copyOfCountries[countryIndex]])
  }
  /* we use the state, numberOfResponse, to decide
  whether we  DisplayOneCountry or DisplayCountries */
  return (
    <div>
      <label>
        find countries
        <input onChange={changeHandler} />
      </label>
      {inputQuery.length === 0 && <></>}
      {numberOfResponse === 0 && <></>}
      {numberOfResponse > 10 && (
        <div>Too many matches, specity another filter</div>
      )}
      {numberOfResponse === 1 && weather && (
        <DisplaySingleCountry
          country={allResponseCountries[0]}
          weather={weather}
        />
      )}
      {numberOfResponse <= 10 && numberOfResponse > 1 && (
        <DisplayCountries
          countries={allResponseCountries}
          showButtonHandler={showButtonHandler}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
