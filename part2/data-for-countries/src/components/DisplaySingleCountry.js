const DisplayLanguages = ({ languages }) => {
  return (
    <ul>
      {languages.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

const DisplaySingleCountry = ({ country, weather }) => {
  console.log('here inside Display single, country is', country)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <h3>capital</h3>
      <div>{country.capital}</div>
      <h3>languages</h3>
      <DisplayLanguages languages={Object.values(country.languages)} />
      <div>
        <img src={country.flags.png} alt='Flag' />
      </div>
      <div>
        <h2>Weather in {country.capital}</h2>
        <div>temperature {weather.main.temp} Celcius </div>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt='Weather Icon'
          />
        </div>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    </div>
  )
}

export default DisplaySingleCountry
