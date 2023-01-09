import config from './utils/config.js';
import logger from './utils/logger.js';
import personsRouter from './controllers/persons.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { errorHandler } from './utils/middleware.js';

// Initiate Express App
const app = express();

// Connect to database
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('Error connecting to MongoDB:', err.message));

// Use middleware
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms :content'));

app.use('/api/persons', personsRouter);

// Log request body if it's a POST request
morgan.token('content', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Listening on Port ${config.PORT}`);
});
