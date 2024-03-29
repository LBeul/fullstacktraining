import React from "react"

const Button = ({ label, onClick }) => (
  <button type="submit" onClick={onClick}>
    {label}
  </button>
)

export default Button
