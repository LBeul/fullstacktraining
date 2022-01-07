import React from "react"

const PersonForm = ({
  onNameChange,
  nameValue,
  onNumberChange,
  numberValue,
  onSubmit,
}) => (
  <form>
    <div>
      name: <input onChange={onNameChange} value={nameValue} />
    </div>
    <div>
      number: <input onChange={onNumberChange} value={numberValue} />
    </div>
    <div>
      <button type="submit" onClick={onSubmit}>
        Add
      </button>
    </div>
  </form>
)

export default PersonForm
