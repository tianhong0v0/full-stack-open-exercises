const DisplayCountryName = ({ country }) => <li>{country.name.common}</li>

const DisplayCountries = ({ countries }) => {
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

export default DisplayCountries
