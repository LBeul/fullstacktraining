const info = (...props) => {
  console.log(...props);
};

const error = (...props) => {
  console.error(...props);
};

export default { info, error };
