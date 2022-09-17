import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const fetchEntries = () => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  };

  useEffect(fetchEntries, []);

  const filteredList =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const changeName = (event) => {
    setNewName(event.target.value);
  };
  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  const addEntry = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook!`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(newPerson));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const incrementCallCountOf = (id) => {
    const entry = persons.find((p) => p.id === id);
    const incrementedCount = entry.callCount + 1;
    const changedEntry = { ...entry, callCount: incrementedCount };

    personService.update(id, changedEntry).then(() => {
      fetchEntries();
    });
  };

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
      <Persons
        personList={filteredList}
        callClickHandler={incrementCallCountOf}
      />
    </div>
  );
};

export default App;
