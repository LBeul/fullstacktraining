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
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
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
    const newPerson = { name: newName, phoneNumber: newNumber };
    personService
      .create(newPerson)
      .then(() => setPersons(persons.concat(newPerson)));
    showNotification(`${newName} successfully added!`, false);
    setNewName('');
    setNewNumber('');
  };

  const deleteEntry = () => {
    console.log('delete clicked');
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
