import React, { useState } from "react"

const History = ({ clickSequence }) => {
  if (clickSequence.length === 0) {
    return <div>Click the Buttons to use the app</div>
  }
  return <div>Button press history: {clickSequence.join(" ")}</div>
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  })
  const [clickSequence, setClickSequence] = useState([])

  const handleLeftClick = () => {
    setClickSequence(clickSequence.concat("L"))
    setClicks({ ...clicks, left: clicks.left + 1 })
  }
  const handleRightClick = () => {
    setClickSequence(clickSequence.concat("R"))
    setClicks({ ...clicks, right: clicks.right + 1 })
  }
  const handleMiddleClick = () => {
    setClickSequence(clickSequence.concat("B"))
    setClicks({ left: clicks.left + 1, right: clicks.right + 1 })
  }

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleMiddleClick} text="both" />
      <Button handleClick={handleRightClick} text="right" />
      {clicks.right}
      <History clickSequence={clickSequence} />
    </div>
  )
}

export default App
