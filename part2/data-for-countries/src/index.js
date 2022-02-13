import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

/* When there is only one country matching the query, then the basic data of the country (eg. capital and area), its flag and the languages spoken there, are shown: */

//const url = `https://restcountries.com/v3.1/name/${query}`
const DisplayCountryName = ({ country }) => <li>{country.name.common}</li>

const DisplayCountries = ({ countries }) => {
  console.log('did reach here')
  if (countries.length === 1) {
    return <DisplaySingleCountry country={countries[0]} />
  }
  return (
    <div>
      <ul>
        {countries.map((item, index) => (
          <DisplayCountryName country={item} key={index} />
        ))}
      </ul>
    </div>
  )
}

const DisplaySingleCountry = ({ country }) => {
  console.log('this single country is: ', country.name.common)
  console.log('its languages: ', country.languages)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>{country.capital}</div>
      <h3>languaes</h3>
      <DisplayLanguages languages={Object.values(country.languages)} />
      <div>
        <img src={country.flags.png} alt='Flag' />
      </div>
    </div>
  )
}

const DisplayCountryLanguage = ({ lang }) => <li>{lang}</li>
const DisplayLanguages = ({ languages }) => {
  return (
    <ul>
      {languages.map((item, index) => (
        <DisplayCountryLanguage key={index} lang={item} />
      ))}
    </ul>
  )
}

const Display = ({ countries }) => {
  return <DisplayCountries countries={countries} />
}

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
      .then((data) => display(data))
      .catch((err) => console.error('hello', err.response.status))
  }

  const display = (countries) => {
    if (countries.length > 10) {
      console.log('Too many matches')
      setC([])
    } else if (countries.lengh === 1) {
      setC(countries)
      console.log('just one country!')
    } else {
      console.log('less than 10 countries')
      setC(countries)
    }
  }

  return (
    <div>
      <label>
        find countries
        <input onChange={changeHandler} />
      </label>
      <DisplayCountries countries={c} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
