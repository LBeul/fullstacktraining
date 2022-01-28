import React from "react"

const StatisticsLine = ({ metric, value, isPercent }) => (
  <p>{`${metric}: ${value}${isPercent ? " %" : ""}`}</p>
)

export default StatisticsLine
