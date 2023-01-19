import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const usersRouter = Router();

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json('username is already taken');
  }
  if (password.length < 3) {
    return response
      .status(400)
      .json('password has to be 3 characters or longer');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/', (request, response) => {
  User.find({}).then((users) => response.json(users));
});

export default usersRouter;
