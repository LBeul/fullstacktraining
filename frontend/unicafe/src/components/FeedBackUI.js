import React from "react"
import Button from "./Button"

const FeedbackUI = ({ onGoodClick, onNeutralClick, onBadClick }) => (
  <>
    <h1>Give Feedback</h1>
    <Button label="Good" onClick={onGoodClick} />
    <Button label="Neutral" onClick={onNeutralClick} />
    <Button label="Bad" onClick={onBadClick} />
  </>
)

export default FeedbackUI
