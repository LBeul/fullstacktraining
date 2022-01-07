// In JS, a function that accepts and/or returns another function is called a higher-order function

// Functions as arguments:
isOdd = (num) => num % 2 == 1
oddNums = [1, 2, 3, 4, 5, 6, 7, 8].filter(isOdd)
console.log(oddNums) // Logs [1,3,5,7]

// Functions that return functions
multiply = (x) => (y) => x * y
console.log(multiply(4)(5)) // Logs 20
multBy5 = multiply(5)
console.log(multBy5(5)) // Logs 25

// Higher order functions are the core concept for array methods
const users = [
  {
    name: "Peter",
    age: 20,
  },
  {
    name: "George",
    age: 40,
  },
  {
    name: "Ronald",
    age: 60,
  },
]

let sumUpAge = (total, user) => user.age + total

let totalAge = users.reduce(sumUpAge, 0)
console.log(totalAge) // Logs 120
