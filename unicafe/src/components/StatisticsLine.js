import React from "react"

const StatisticsLine = ({ metric, value, isPercent }) => (
  <tr>
    <td>{`${metric}:`}</td>
    <td>{`${value}${isPercent ? " %" : ""}`}</td>
  </tr>
)

export default StatisticsLine
