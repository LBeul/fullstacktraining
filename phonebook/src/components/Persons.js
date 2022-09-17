import React from "react";

const Entry = ({ person, clickHandler }) => {
  const { name, number, callCount, id } = person;
  return (
    <>
      <p>
        <strong>{name}</strong>: {number}
      </p>
      <p>
        Called {callCount} times.{" "}
        <button onClick={() => clickHandler(id)}>Call</button>
      </p>
    </>
  );
};

const Persons = ({ personList, callClickHandler }) => (
  <div>
    {personList.map((person) => (
      <Entry key={person.id} person={person} clickHandler={callClickHandler} />
    ))}
  </div>
);

export default Persons;
