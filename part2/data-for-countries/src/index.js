import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplaySingleCountry from './components/DisplaySingleCountry'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [inputQuery, setInputQuery] = useState('')
  const [allResponseCountries, setAllResponseCountries] = useState([])
  const [numberOfResponse, setNumberOfResponse] = useState(0)
  /* The state weather is owned by App component,
    and get passed down as props to child component DisplaySingleCountry
    However, I now feel like DisplaySingleCountry should own this state 
  */
  const [weather, setWeather] = useState(false)

  const changeHandler = (event) => {
    setInputQuery(event.target.value)
  }

  /*IMPORTANT NOTE ON useEffect: 
    useEffect does not actively watching for changes.

    when you call useEffect,
    it was effectively queuing an effect to MAYBE run,
    after render is done. 

    After rendering finishes, 
    useEffect will check the list of dependency values 
    against the values from the last render, 
    and will call your effect function 
    if any one of them has changed.

    If the dependency value have changes,
    useEffect runs its first argument. 

    If you want to implement clean up function like (componentWillUnmount),
    let useEffect return this function , 
    and React will call it prior to unmounting.
  */

  /* whenever inputQuery changes, 
  search for all countries corresponding to it
  */
  useEffect(() => {
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

  /* The previous mistake I made: 
     Whenever inputQuery changes, setAllResponseCountries;
     Whenever AllResponseCountries changes, setNumberOfResponse;
     Whenever numberOfResponse changes, check if it was 1;
     if the numberOfResponse === 1, setWeather.

     Everything after the first "whenever", 
     relys on an wrong assumption,
     which is the states updates synchronously. 

    After experienment, I found that is not true.
     Inside the React.Component document, 
     the React team wrote:

     "React may batch multiple setState() calls 
     into a single update for performance. 
     Because this.props and this.state may be updated asynchronously, 
     you SHOULD NOT RELY ON THEIR VALUES
     TO CALCULATE NEXT VALUE" 
  */

  /* Whenever allResponseCountries changes,
      setNumberOfResponse, 
      and setWeather if there is only one reponse country
  */
  useEffect(() => {
    setNumberOfResponse(allResponseCountries.length)
    if (allResponseCountries.length === 1) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${allResponseCountries[0].capital}&units=metric&appid=${api_key}`
        )
        .then((response) => response.data)
        .then((data) => {
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
    const countryIndex = event.target.dataset.show
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
