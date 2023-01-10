const dummy = (blogs) => {
  blogs;
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((store, blog) => store + blog.likes, 0);
};

export default { dummy, totalLikes };
