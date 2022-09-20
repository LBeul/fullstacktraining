const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :content'
  )
);

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

morgan.token('content', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

const getMaxID = (collection) => {
  return collection.length > 0
    ? Math.max(...collection.map((item) => item.id)) + 1
    : 0;
};

app.get('/info', (request, response) => {
  const timeStamp = new Date(Date.now());
  response.send(
    `<p>There are currently ${
      persons.length
    } entries in the phonebook</p><p>${timeStamp.toUTCString()}</p>`
  );
});

app.get('/', (request, response) => {
  response.send('<h1>Hello Jupiter!</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send('requested resource does not exist');
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'must contain name and number',
    });
  }
  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }
  const person = {
    ...body,
    id: getMaxID(persons),
  };
  persons = persons.concat(person);
  response.status(201).json(person);
});

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
    return response.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
