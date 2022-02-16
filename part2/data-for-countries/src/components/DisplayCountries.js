import DisplaySingleCountry from './DisplaySingleCountry'
/* Notice that inside the <button> element,
there is a custom attribute, data-show={index}. 

The Event Handler, showButtonHandler, needs to know 
which particular country to will be showed. 

Thus, we define this custom attribute, 
to pass in the index of the selected country.

Then, the Event Handler will 
have access to this selected country's index, 
therefore,
it can set AllResponseCountries to this single country. 
*/

//TODO: How to refactor this module into DisplayCountries and Button component?
//TODO: Instead of data-show custom attribute,
//useRef() to pass down single country may be a better choice

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
