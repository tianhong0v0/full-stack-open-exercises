import { useState, useEffect } from 'react'
import axios from 'axios'

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

const DisplaySingleCountry = ({ country }) => {
  //const [created, setCreated] = useState(false)
  const [weather, setWeather] = useState(false)

  useEffect(() => {
    console.log('Capital Name:  ', country.capital)
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=55dd404984962ca1d3cb49d41afb1a40`
      )
      .then((response) => response.data)
      .then((data) => {
        console.log('weather response. ', data)
        setWeather(data)
      })
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>{country.capital}</div>
      <h3>languaes</h3>
      <DisplayLanguages languages={Object.values(country.languages)} />
      <div>
        <img src={country.flags.png} alt='Flag' />
      </div>
      <div>
        <h2>Weather in {country.capital}</h2>
        {weather && (
          <>
            <div>temperature {weather.main.temp} Celcius </div>
            <div>wind {weather.wind.speed} m/s</div>
          </>
        )}
      </div>
    </div>
  )
}

export default DisplaySingleCountry
