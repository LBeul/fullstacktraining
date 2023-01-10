import listHelper from '../utils/list_helper';

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('Total Likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toEqual(0);
  });

  test('of list equals sum of all likes', () => {
    const blogs = [
      { title: 'a', likes: 1 },
      { title: 'b', likes: 2 },
      { title: 'c', likes: 3 },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toEqual(6);
  });

  test('of one blog equals that of blog', () => {
    const blogs = [{ title: 'only', likes: 100 }];
    const result = listHelper.totalLikes(blogs);
    expect(result).toEqual(100);
  });
});
