import axios from 'axios';
// live-server : "http://localhost:3001/persons"
// express BE: "http://localhost:3001/api/persons"
const baseURL = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const personService = { getAll, create, update, deleteEntry };

export default personService;
