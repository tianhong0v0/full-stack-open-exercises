import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplaySingleCountry from './components/DisplayOneCountry'
import DisplayCountries from './components/DisplayCountries'

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

  // useEffect(() => {
  //   axios
  //     .get(
  //       'http://api.openweathermap.org/data/2.5/weather?lat=60.17&lon=24.93&appid=55dd404984962ca1d3cb49d41afb1a40&units=metric'
  //     )
  //     .then((response) => response.data)
  //     .then((data) => console.log('weather response. ', data))
  // }, [])

  /* once the allResponseCountries change,
  the numberOfResponse change,
  we use this sate, numberOfResponse, to decide
  whether we  DisplayOneCountry or DisplayCountries */
  useEffect(() => {
    setNumberOfResponse(allResponseCountries.length)
  }, [allResponseCountries])

  const changeHandler = (event) => {
    setInputQuery(event.target.value)
  }

  //how do you set target of a Button? you use custome attribute
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
        <input onChange={changeHandler} />
      </label>
      {numberOfResponse > 10 && (
        <div>Too many matches, specity another filter</div>
      )}
      {numberOfResponse === 1 && (
        <DisplaySingleCountry country={allResponseCountries[0]} />
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
