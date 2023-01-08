import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Initiate Express App
const app = express();

// Enable json, cors, morgan
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :content'
  )
);

// Rudimentary database
let persons = [
  {
    name: 'Dan Abramov',
    number: '123-123',
    id: 1,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 2,
  },
  {
    name: 'Peter Shaw',
    number: '01805-4646',
    id: 3,
  },
  {
    name: 'James Moriarty',
    number: '000-424242',
    id: 4,
  },
];

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

// Return api status info as HTML
app.get('/info', (request, response) => {
  const timeStamp = new Date(Date.now());
  response.send(
    `<p>There are currently ${
      persons.length
    } entries in the phonebook</p><p>${timeStamp.toUTCString()}</p>`
  );
});

// Get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// Get specific person by id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send('requested resource does not exist');
  }
});

// Delete person with id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

// add new person to db
app.post('/api/persons', (request, response) => {
  const body = request.body;
  // Send 400 if incomplete
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'must contain name and number',
    });
  }
  // Send 400 if alredy existing
  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }
  // Construct & add new person
  const person = {
    ...body,
    id: getMaxID(persons),
  };
  persons = persons.concat(person);
  response.status(201).json(person);
});

// Edit a person by id
app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  const existingPerson = persons.find((p) => p.id === id);
  if (existingPerson) {
    const updatedPerson = {
      ...existingPerson,
      number: body.number,
    };
    persons = persons.filter((p) => p.id !== id).concat(updatedPerson);
    response.status(204).json(updatedPerson);
  } else {
    // Send 404 if person does not exist
    return response.status(404).end();
  }
});

// Define port and listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
