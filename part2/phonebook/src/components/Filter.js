import React from 'react'

const Filter = ({ filterChangeHandler, value }) => {
  return (
    <label>
      filter shown with
      <input onChange={filterChangeHandler} value={value} />
    </label>
  )
}

export default Filter
