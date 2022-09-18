// When logging objects (or functions, which are js objects as well),
// don't do it "the java way" (concatenating with `+`) but separate with commas:

let someObj = {
  name: "Peter",
  age: 12,
}

console.log("Contains: ", someObj) // Will return "Contains:  Object { name: "Peter", age: 12 }"
console.log("Contains: " + someObj) // Will return "Contains: [object Object]"
