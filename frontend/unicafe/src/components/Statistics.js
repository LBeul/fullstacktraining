import React from "react"
import StatisticsLine from "./StatisticsLine"

const Statistics = ({ goodClicks, neutralClicks, badClicks, allClicks }) => {
  if (allClicks === 0) {
    return <p>No ratings given so far</p>
  }
  const positive = allClicks !== 0 ? (goodClicks / allClicks) * 100 : 0
  const average = allClicks !== 0 ? (goodClicks - badClicks) / allClicks : 0

  return (
    <table>
      <StatisticsLine metric="good" value={goodClicks} />
      <StatisticsLine metric="neutral" value={neutralClicks} />
      <StatisticsLine metric="bad" value={badClicks} />
      <StatisticsLine metric="all" value={allClicks} />
      <StatisticsLine metric="average" value={average.toFixed(2)} />
      <StatisticsLine metric="positive" value={positive.toFixed(2)} isPercent />
    </table>
  )
}

export default Statistics
