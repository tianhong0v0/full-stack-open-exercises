const DisplayCountryName = ({ country }) => <div>{country.name.common}</div>

// const Button = ({ country, submitHandler }) => {
//   return <button onClick={submitHandler}></button>
// }

const DisplayCountries = ({ countries }) => {
  return (
    <div>
      {countries.map((item, index) => (
        <DisplayCountryName country={item} key={index} />
      ))}
    </div>
  )
}

export default DisplayCountries
