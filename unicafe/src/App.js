import React, { useState } from "react"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const onGoodClick = event => {
    event.preventDefault()
    setGood(good + 1)
    adjustOverallStats()
  }

  const onNeutralClick = event => {
    event.preventDefault()
    setNeutral(neutral + 1)
    adjustOverallStats()
  }

  const onBadClick = event => {
    event.preventDefault()
    setBad(bad + 1)
    adjustOverallStats()
  }

  const adjustOverallStats = () => {
    setAll(all + 1)
  }

  return (
    <>
      <FeedbackButtons
        onGoodClick={onGoodClick}
        onNeutralClick={onNeutralClick}
        onBadClick={onBadClick}
      />
      <Statistics
        goodClicks={good}
        neutralClicks={neutral}
        badClicks={bad}
        allClicks={all}
      />
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

const Statistics = ({ goodClicks, neutralClicks, badClicks, allClicks }) => {
  if (allClicks == 0) {
    return <p>No ratings given so far</p>
  }
  const positive = allClicks != 0 ? goodClicks / allClicks : 0
  const average = allClicks != 0 ? (goodClicks - badClicks) / allClicks : 0

  return (
    <>
      <p>good: {goodClicks}</p>
      <p>neutral: {neutralClicks}</p>
      <p>bad: {badClicks}</p>
      <p>all: {allClicks}</p>
      <p>average: {average}</p>
      <p>positive: {positive} %</p>
    </>
  )
}

export default App
