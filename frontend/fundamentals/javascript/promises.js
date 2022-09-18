// Defining a custom promise
const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("worked")
  } else {
    reject("got rejected")
  }
})

// Using it
promise
  .then((res) => res + " and altered")
  .then((string) => console.log(string))

// and even catching errors in between
promise
  .then((res) => {
    throw Error
    return res + " and altered"
  })
  .then((string) => string.toUpperCase())
  .catch(() => console.error("SOMETHING FAILED"))
  .then((lowString) => console.log(lowString))

// Promise.all() waits for the termination of all assigned promises

const anotherPromise = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "Hello...")
})
const yetAnotherPromise = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "Is it me, ")
})
const theLastPromise = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "you're looking for?")
})

Promise.all([promise, anotherPromise, yetAnotherPromise, theLastPromise]).then(
  (values) => console.log(values)
)
