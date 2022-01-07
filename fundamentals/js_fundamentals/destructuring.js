// Using destrcuturing, you can destructure array values to single vars
const arr = [1, 2, 3]
const [first, second, third] = arr
console.log(first, second, third)

// It's even more powerful in combination with the spread operater (...)
const arr2 = ["a", "b", "c", "d"]
const [alpha, beta, ...rest] = arr2
console.log(alpha, beta)
console.log(rest)

// It also works with objects...
const car = {
  brand: "Porsche",
  model: "718 Cayman S",
  hp: 350,
  vmax: 28,
  price: 69462.0,
}
// ...Just make sure to use curly braces instead of brackets
const { brand, model, ...stats } = car
console.log(brand)
console.log(model)
console.log(stats)
