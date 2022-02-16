import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplaySingleCountry from './components/DisplaySingleCountry'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [inputQuery, setInputQuery] = useState('')
  const [allResponseCountries, setAllResponseCountries] = useState([])
  const [weather, setWeather] = useState(false)

  useEffect(() => {
    if (inputQuery.length === 0) {
      setAllResponseCountries([])
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
          setWeather(false)
        })
    }
  }, [inputQuery])

  useEffect(() => {
    if (allResponseCountries.length === 1) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${allResponseCountries[0].capital}&units=metric&appid=${api_key}`
        )
        .then((response) => response.data)
        .then((data) => {
          console.log('weather inside coun,')
          setWeather(data)
        })
    }
  }, [allResponseCountries, api_key])

  const showButtonHandler = (event) => {
    event.preventDefault()
    const countryIndex = event.target.dataset.show
    const copyOfCountries = allResponseCountries
    setAllResponseCountries([copyOfCountries[countryIndex]])
  }

  return (
    <div>
      <label>
        find countries
        <input
          onChange={(e) => setInputQuery(e.target.value)}
          value={inputQuery}
        />
      </label>
      {allResponseCountries.length === 0 && <>haha</>}
      {allResponseCountries.length > 10 && (
        <div>Too many matches, specity another filter</div>
      )}
      {allResponseCountries.length === 1 && weather && (
        <DisplaySingleCountry
          country={allResponseCountries[0]}
          weather={weather}
        />
      )}
      {allResponseCountries.length <= 10 && allResponseCountries.length > 1 && (
        <DisplayCountries
          countries={allResponseCountries}
          showButtonHandler={showButtonHandler}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
