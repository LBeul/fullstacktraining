const t = [2, -3, 50]
/*
    t is set as const so that the object stored in t can't be reassigned,
    but its content can be manipulated in a mutable way
*/

t2 = t.concat(100) // Concat is preferred over push because it does not directly mutate the existing array
console.log(t2)

console.log(t.length) // Logs arrays length (3)
console.log(t[1]) // Logs 1st element (counting from zero)

t.forEach(item => {
  console.log(item) // Perform log for each item in array
})

// To create a new array based upon an old array's mutation, use map
const m = t.map(value => `<li>${value}</li>`)
console.log(m)
