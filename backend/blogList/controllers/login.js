import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Router from 'express';
import User from '../models/user.js';

const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const isCorrectPassword =
    !!user && (await bcrypt.compare(password, user.passwordHash));

  if (!(user && isCorrectPassword)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const tokenHolder = { username: user.username, id: user._id };
  const token = jwt.sign(tokenHolder, process.env.SECRET, {
    expiresIn: 60 * 60, // 60 Minutes
  });

  response
    .status(201)
    .send({ token, username: user.username, name: user.name });
});

export default loginRouter;
