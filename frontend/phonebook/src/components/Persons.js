import React from 'react';

const Entry = ({ person, onDelete }) => {
  const { name, phoneNumber, id } = person;
  return (
    <>
      <p>
        <strong>{name}</strong>: {phoneNumber}{' '}
        <button onClick={() => onDelete(id)}>🗑</button>
      </p>
    </>
  );
};

const Persons = ({ personList, deleteClickHandler }) => (
  <div>
    {personList.map((person) => (
      <Entry key={person.id} person={person} onDelete={deleteClickHandler} />
    ))}
  </div>
);

export default Persons;
