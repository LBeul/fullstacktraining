import React, { useState } from "react"
import Statistics from "./components/Statistics"
import FeedbackUI from "./components/FeedBackUI"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

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
      <FeedbackUI
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

export default App
