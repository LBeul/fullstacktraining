# JavaScript Functions

_Louis Beul, August 2021_

## Arrow Functions

Arrow Functions are the go-to way in modern JS.
However they are not to be used in objects as they don't work with 'this'.

```js
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

const result = sum(1, 5)
console.log(result)
```

Single parameters don't need to be wrapped in parantheses:

```js
const longSquare = n => {
  console.log(n)
  return n * n
}
```

You can write return-only functions as one-liners...

```js
const square = n => n * n
```

...which come in handy when iterating over arrays:

```js
const arr = [1, 2, 3]
const arr2 = arr.map(i => i + 2)
console.log(arr2)
```

## Hoisted functions

Before **ES6**, functions were defined by the `function` keyword.
Note that some cases still demand traditional functions, as they _(contrary to arrow functions)_
are **hoisted** - meaning they get loaded into memory **at compile-time** and can therefore
be called _before_ they're declared in the code:

```js
// Doesn't work with arrow functions!
const product = multiply(12, 5)
console.log(product)

function multiply(a, b) {
  return a * b
}
```

## Anonymous functions & function expressions

Another way to define functions is using **function expressions** or
**anonymous functions** which are _somewhat comparable_ to arrow functions
but behave differently in their **scoping**:

```js
const avg = function (a, b) {
  return (a + b) / 2
}
```
