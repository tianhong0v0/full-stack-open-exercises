import React, { useState } from 'react'

const PersonForm = ({
  nameChangeHandler,
  numberChangeHandler,
  submitHandler,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name:
        <input onChange={nameChangeHandler} value={newName} />
      </div>
      <div>
        number:
        <input onChange={numberChangeHandler} value={newNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
