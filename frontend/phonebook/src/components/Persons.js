import React from "react";

const Entry = ({ person, onDelete }) => {
  const { name, number, id } = person;
  return (
    <>
      <p>
        <strong>{name}</strong>: {number}{" "}
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
