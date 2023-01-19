import { Router } from 'express';
import Blog from '../models/blog.js';
import User from '../models/user.js';

const blogsRouter = Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne({});
  const blog = new Blog({ ...request.body, user: user._id });
  blog
    .save()
    .then((result) => response.status(201).json(result))
    .catch((error) => response.status(500).end({ error: error.message }));
});

export default blogsRouter;
