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

export default DisplaySingleCountry
