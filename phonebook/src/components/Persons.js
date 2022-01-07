import React from "react"

const Entry = ({ person }) => (
  <p>
    <strong>{person.name}</strong>: {person.number}
  </p>
)

const Persons = ({ personList }) => (
  <div>
    {personList.map((person) => (
      <Entry key={person.id} person={person} />
    ))}
  </div>
)

export default Persons
