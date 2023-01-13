const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  const sendError = (code, msg) => {
    return response.status(code).json({ error: msg });
  };

  if (error.name === 'CastError') {
    return sendError(400, 'malformatted id');
  } else if (error.name === 'ValidationError') {
    return sendError(400, error.message);
  } else if (error.name === 'JsonWebTokenError') {
    return sendError(401, 'invalid token');
  } else if (error.name === 'TokenExpiredError') {
    return sendError(401, 'token expired');
  }

  next(error);
  logger.error(error.message);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
