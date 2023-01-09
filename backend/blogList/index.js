import blogsRouter from './controllers/blogs.js';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

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

app.use('/api/blogs', blogsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
