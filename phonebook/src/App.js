import React, { useState } from "react"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"

const App = ({ entries }) => {
  const [persons, setPersons] = useState(entries)
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const filteredList =
    filter === ""
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )

  const changeName = event => {
    setNewName(event.target.value)
  }
  const changeNumber = event => {
    setNewNumber(event.target.value)
  }
  const changeFilter = event => {
    setFilter(event.target.value)
  }

  const addEntry = event => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to the phonebook!`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    setNewName("")
    setNewNumber("")
  }
  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter onChange={changeFilter} value={filter} />
      <h2>New Entry</h2>
      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={changeName}
        onNumberChange={changeNumber}
        onSubmit={addEntry}
      />
      <h2>Numbers</h2>
      <Persons personList={filteredList} />
    </div>
  )
}

export default App
