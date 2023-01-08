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

// Get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => response.json(people));
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

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
app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const person = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

// Error Handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformmated id' });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
