import React, { useState } from 'react'

const Button = ({ eventHandler, text }) => {
  return <button onClick={eventHandler}>{text}</button>
}

const DisplayAnecdote = ({ head, anecdote, voteNumber }) => {
  return (
    <>
      <h1>{head}</h1>
      <div>{anecdote}</div>
      <div>has {voteNumber} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the coed as cleverly as possibly, you are, by definition, not smart enough to debug it.',
  ]
  const h1 = 'Anecdote of the day'
  const h2 = 'Anecdote with most votes'
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const generateNextIndex = () => {
    let index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }

  const addVote = (index) => {
    return () => {
      let copyOfVotes = [...votes]
      copyOfVotes[index] += 1
      setVotes(copyOfVotes)
    }
  }

  const mostVotes = () => Math.max(...votes)

  const mostVotesAnecdote = () => anecdotes[votes.indexOf(Math.max(...votes))]

  return (
    <>
      <DisplayAnecdote
        head={h1}
        anecdote={anecdotes[selected]}
        voteNumber={votes[selected]}
      ></DisplayAnecdote>
      <Button eventHandler={addVote(selected)} text={'vote'} />
      <Button eventHandler={generateNextIndex} text={'next anecdote'} />
      <DisplayAnecdote
        head={h2}
        anecdote={mostVotesAnecdote()}
        voteNumber={mostVotes()}
      ></DisplayAnecdote>
    </>
  )
}

export default App
