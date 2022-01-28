import React from "react"
import StatisticsLine from "./StatisticsLine"

const Statistics = ({ goodClicks, neutralClicks, badClicks, allClicks }) => {
  if (allClicks == 0) {
    return <p>No ratings given so far</p>
  }
  const positive = allClicks != 0 ? goodClicks / allClicks : 0
  const average = allClicks != 0 ? (goodClicks - badClicks) / allClicks : 0

  return (
    <>
      <StatisticsLine metric="good" value={goodClicks} />
      <StatisticsLine metric="neutral" value={neutralClicks} />
      <StatisticsLine metric="bad" value={badClicks} />
      <StatisticsLine metric="all" value={allClicks} />
      <StatisticsLine metric="average" value={average} />
      <StatisticsLine metric="positive" value={positive} isPercent />
    </>
  )
}

export default Statistics
