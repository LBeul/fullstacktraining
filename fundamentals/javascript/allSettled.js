const firstPromise = new Promise((resolve, reject) => setTimeout(resolve, 6000))
const secondPromise = new Promise((resolve, reject) => setTimeout(reject, 3000))

// Would not work because not all given promises resolve
// Needs a catch() block to catch rejected promise
Promise.all([firstPromise, secondPromise]).then((data) => console.log(data))

// Would work because it considered all settled promises
Promise.allSettled([firstPromise, secondPromise]).then((data) =>
  console.log(data)
)
