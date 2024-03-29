import React, { useEffect, useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotifaction] = useState([null, false]);

  const fetchEntries = () => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => showNotification('Cannot reach server.', true));
  };

  useEffect(fetchEntries, []);

  const filteredList =
    filter === ''
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
      if (
        window.confirm(
          `${newName} is already added to the phonebook! Do you want to replace his number?`
        )
      ) {
        const original = persons.find((p) => p.name === newName);
        const update = { ...original, phoneNumber: newNumber };
        personService
          .update(original.id, update)
          .then(() => {
            showNotification(`${newName} successfully edited!`, false);
            setPersons(
              persons.filter((p) => p.name !== newName).concat(update)
            );
          })
          .catch((error) => showNotification(error.response.data.error, true));
      }
    } else {
      const newPerson = { name: newName, phoneNumber: newNumber };
      personService
        .create(newPerson)
        .then(() => {
          setPersons(persons.concat(newPerson));
          showNotification(`${newName} successfully added!`, false);
        })
        .catch((error) => showNotification(error.response.data.error, true));
    }
    setNewName('');
    setNewNumber('');
  };

  const deleteEntry = (id) => {
    const entry = persons.find((p) => p.id === id);
    if (window.confirm(`You sure to delete ${entry.name}?`)) {
      personService
        .deleteEntry(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          showNotification(
            `The entry ${entry.name} was already deleted from server`,
            true
          );
          fetchEntries();
        });
    }
  };

  const showNotification = (message, isError) => {
    setNotifaction([message, isError]);
    setTimeout(() => {
      setNotifaction([null, false]);
    }, 5000);
  };

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification content={notification} />
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
      <Persons personList={filteredList} deleteClickHandler={deleteEntry} />
    </div>
  );
};

export default App;
