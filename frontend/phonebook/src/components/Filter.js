import React from "react"

const Filter = ({ onChange, value }) => (
  <form>
    <div>
      Filter for name... <input onChange={onChange} value={value} />
    </div>
  </form>
)

export default Filter
