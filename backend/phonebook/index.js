import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Person from './models/person.js';

// Initiate Express App
const app = express();

// Enable json, cors, morgan
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms :content'));

// Log request body if it's a POST request
morgan.token('content', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// Get highest ID in collection
const getMaxID = (collection) => {
  return collection.length > 0
    ? Math.max(...collection.map((item) => item.id)) + 1
    : 0;
};

// Get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => response.json(people));
});

// Get specific person by id
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => response.json(person));
});

// Delete person with id
// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((p) => p.id !== id);
//   response.status(204).end();
// });

app.post('/api/persons', (request, response) => {
  const body = request.body;
  // Send 400 if incomplete
  if (!body.name || !body.phoneNumber) {
    return response.status(400).json({
      error: 'must contain name and phone number',
    });
  }
  // Construct & add new person
  const person = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });
  person.save().then((savedPerson) => response.status(201).json(savedPerson));
});

// Edit a person by id
// app.put('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   const body = request.body;
//   const existingPerson = persons.find((p) => p.id === id);
//   if (existingPerson) {
//     const updatedPerson = {
//       ...existingPerson,
//       phoneNumber: body.phoneNumber,
//     };
//     persons = persons.filter((p) => p.id !== id).concat(updatedPerson);
//     response.status(204).json(updatedPerson);
//   } else {
//     // Send 404 if person does not exist
//     return response.status(404).end();
//   }
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
