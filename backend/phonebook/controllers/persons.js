import { Router as personsRouter } from 'express';
import Person from '../models/person.js';

personsRouter.get('/', (request, response) => {
  Person.find({}).then((people) => response.json(people));
});

personsRouter.get('/:id', (request, response, next) => {
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

personsRouter.post('/', (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.phoneNumber) {
    return response.status(400).json({
      error: 'must contain name and phone number',
    });
  }
  const person = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });
  person
    .save()
    .then((savedPerson) => response.status(201).json(savedPerson))
    .catch((error) => next(error));
});

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

export default personsRouter;
