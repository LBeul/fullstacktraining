const guy = {
  name: "Albert Einstein",
  age: 102,
  education: "PhD",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`)
  },
  add: function (a, b) {
    return a + b
  },
}

guy.greet()

guy.growOlder = function () {
  this.age += 1
}

console.log(guy.age)
guy.growOlder()
console.log(guy.age)

const addReference = guy.add
console.log(addReference(5, 4)) // Will work

const greetReference = guy.greet
greetReference() // Won't work because 'this' is based on calling context

setTimeout(guy.greet, 100) // Won't work because scope is global and this.name is nonexistent

setTimeout(guy.greet.bind(guy), 100) // Will work because of context-binding
