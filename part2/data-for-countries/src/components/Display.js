import DisplayCountries from './DisplayCountries'
import DisplaySingleCountry from './DisplayOneCountry'

const Display = ({ countries }) => {
  let result = ''
  if (countries.length > 10) {
    result = 'Too many matches, specify another filter'
  } else if (countries.length === 1) {
    result = <DisplaySingleCountry country={countries[0]} />
  } else {
    // less than 10 countries
    result = <DisplayCountries countries={countries} />
  }
  return <div>{result}</div>
}

export default Display
