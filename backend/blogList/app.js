import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';

import blogsRouter from './controllers/blogs.js';
import usersRouter from './controllers/users.js';

const app = express();

// Configure mongoDB
const mongoUrl = process.env.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => console.log('Connected to mongoDB'))
  .catch((e) => console.error('Error connecting to mongoDB:', e.message));

// Invoke middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Invoke routers
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

export default app;
