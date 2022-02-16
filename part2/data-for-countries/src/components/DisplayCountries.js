/* Notice that inside the <button> element,
there is a custom attribute, data-show={index}. 

The Event Handler, showButtonHandler, needs to know 
which particular country to will be showed. 

Thus, we define this custom attribute, 
to pass in the index of the selected country.
*/

const DisplayCountries = ({ countries, showButtonHandler }) => {
  return (
    <div>
      {countries.map((item, index) => (
        <div key={index}>
          {' '}
          {item.name.common}
          <button onClick={showButtonHandler} data-show={index}>
            show
          </button>
        </div>
      ))}
    </div>
  )
}

export default DisplayCountries
