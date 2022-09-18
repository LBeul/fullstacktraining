const x = 120 // Constant value
let y = 2 // Variable value

console.log(x, y) // Logs 120, 2
y += 10
console.log(x, y) // Logs 120, 12
y = "foo"
console.log(x, y) // Logs 120, foo
x = 5 // Throws TypeError
