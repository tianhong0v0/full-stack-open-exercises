const DisplayCountryName = ({ country }) => <div>{country.name.common}</div>

// const Button = ({ country, submitHandler }) => {
//   return <button onClick={submitHandler}></button>
// }

const NameWithButton = ({ country, show }) => {
  return (
    <div>
      <form onSubmit={show}>
        <label>
          {country.name.common}
          <button>show</button>
        </label>
      </form>
    </div>
  )
}

const DisplayCountries = ({ countries }) => {
  // const show = (event) => {
  //   event.preventDefault(0)
  //   console.log(event.target.value)
  // }
  return (
    <div>
      {countries.map((item, index) => (
        <div> {item.name.common} </div>
      ))}
    </div>
  )
}

export default DisplayCountries
