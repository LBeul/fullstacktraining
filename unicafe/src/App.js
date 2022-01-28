import React, { useState } from "react"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = event => {
    event.preventDefault()
    setGood(good + 1)
  }

  const onNeutralClick = event => {
    event.preventDefault()
    setNeutral(neutral + 1)
  }

  const onBadClick = event => {
    event.preventDefault()
    setBad(bad + 1)
  }

  return (
    <>
      <FeedbackButtons
        onGoodClick={onGoodClick}
        onNeutralClick={onNeutralClick}
        onBadClick={onBadClick}
      />
      <Statistics goodClicks={good} neutralClicks={neutral} badClicks={bad} />
    </>
  )
}

const FeedbackButtons = ({ onGoodClick, onNeutralClick, onBadClick }) => (
  <>
    <h1>Give Feedback</h1>
    <button type="submit" onClick={onGoodClick}>
      Good
    </button>
    <button type="submit" onClick={onNeutralClick}>
      Neutral
    </button>
    <button type="submit" onClick={onBadClick}>
      Bad
    </button>
  </>
)

const Statistics = ({ goodClicks, neutralClicks, badClicks }) => (
  <>
    <p>good: {goodClicks}</p>
    <p>neutral: {neutralClicks}</p>
    <p>bad: {badClicks}</p>
  </>
)

export default App
