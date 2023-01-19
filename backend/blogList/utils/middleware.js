import jwt from 'jsonwebtoken';

const tokenExtractor = (request, response, next) => {
  const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7);
    }
    return null;
  };
  const token = getTokenFrom(request);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
  } catch (err) {
    next(err);
  }
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
};

export default { errorHandler, tokenExtractor };
