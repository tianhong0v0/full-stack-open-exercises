import React, { useState } from 'react'

const Filter = ({ filterChangeHandler }) => {
  return (
    <label>
      filter shown with
      <input onChange={filterChangeHandler} />
    </label>
  )
}

export default Filter
