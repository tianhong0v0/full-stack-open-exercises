import React, { useState } from 'react'

const Head = ({ text }) => <h1>{text}</h1>
const Button = ({ eventHandler, text }) => {
  return <button onClick={eventHandler}>{text}</button>
}
const StatisticLine = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
)
const Statistics = (props) => {
  if (props.totalValue === 0) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      {/* <StatisticLine text={props.goodText} value={props.goodValue} />
      <StatisticLine text={props.neutralText} value={props.neutralValue} />
      <StatisticLine text={props.badText} value={props.badValue} />
      <StatisticLine text={props.totalText} value={props.totalValue} />
      <StatisticLine text={props.averageText} value={props.averageValue} />
      <StatisticLine text={props.positiveText} value={props.positiveValue} /> */}
      <table>
        <tbody>
          <tr>
            <td>{props.goodText}</td>
            <td>{props.goodValue}</td>
          </tr>
          <tr>
            <td>{props.neutralText}</td>
            <td>{props.neutralValue}</td>
          </tr>
          <tr>
            <td>{props.badText}</td>
            <td>{props.badValue}</td>
          </tr>
          <tr>
            <td>{props.totalText}</td>
            <td>{props.totalValue}</td>
          </tr>
          <tr>
            <td>{props.averageText} </td>
            <td>{props.averageValue}</td>
          </tr>
          <tr>
            <td>{props.positiveText} </td>
            <td>{props.positiveValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  const computeTotal = () => good + neutral + bad
  const computeAverage = () => {
    return (good - bad) / computeTotal()
  }
  const computePositive = () => {
    return (good / computeTotal()) * 100 + '%'
  }

  return (
    <div>
      <Head text={'give feedback'} />
      <Button eventHandler={handleGoodClick} text={'good'} />
      <Button eventHandler={handleNeutralClick} text={'neutral'} />
      <Button eventHandler={handleBadClick} text={'bad'} />
      <Head text={'statistics'} />
      <Statistics
        goodText='good'
        goodValue={good}
        neutralText='neutral'
        neutralValue={neutral}
        badText='bad'
        badValue={bad}
        totalText='all'
        totalValue={computeTotal()}
        averageText='average'
        averageValue={computeAverage()}
        positiveText='positive'
        positiveValue={computePositive()}
      />
    </div>
  )
}

export default App
