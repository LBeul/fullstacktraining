// Arrow Functions are the go-to way in modern JS
// However they are not to be used in objects as they don't work with 'this'

const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

const result = sum(1, 5)
console.log(result)

// Single params don't need to be wrapped in parantheses
const longSquare = n => {
  console.log(n)
  return n * n
}

// Return-only function can be written as one-liners...
const square = n => n * n

// ...which come in handy when manipulating arrays
const arr = [1, 2, 3]
const arr2 = arr.map(i => i + 2)
console.log(arr2)

// Prior to ES6, functions were defined by the 'function' keyword

// Note that there's still demand for them, as they (contrary to arrow functions)
// are "hoisted" - menaing they get loaded into mem at compile time and can therefore
// be called before they're declared in the code

const product = multiply(12, 5)
console.log(product)

function multiply(a, b) {
  return a * b
}

// Another way to define functions is using 'function expressions' or
// 'anonymous functions' which are spmewhat comparable to arrow functions
// but behave differently in their scoping
const avg = function (a, b) {
  return (a + b) / 2
}
