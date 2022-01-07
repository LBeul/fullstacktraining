class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log(`Hey there, I'm ${this.name}`)
  }
}

const albert = new Person("Albert Einstein", 115)
const grace = new Person("Grace Hopper", 101)
albert.greet()
grace.greet()
