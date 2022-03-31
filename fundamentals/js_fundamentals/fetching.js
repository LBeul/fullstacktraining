// fetching data from server as raw blob
// --> basically unusable
fetch("https://dummyjson.com/quotes").then((response) => console.log(response))

// turning data into useful json
fetch("https://dummyjson.com/quotes")
  .then((res) => res.json())
  .then((data) => doSomethingWith(data))
