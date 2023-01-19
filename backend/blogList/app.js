import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import blogsRouter from './controllers/blogs.js';

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

// Invoke routers
app.use('/api/blogs', blogsRouter);

export default app;
