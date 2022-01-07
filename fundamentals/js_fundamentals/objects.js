const guy = {
  name: "Gary Miller",
  age: 34,
  education: "MSc",
}

const course = {
  name: "Algorithms and Data Structures",
  level: "Intermediate",
  credits: 6,
}

const obj = {
  name: {
    first: "Daniel",
    last: "Danger",
  },
  grades: [1, 3, 2, 4],
  university: "Harvard Business School",
}

console.log(guy.name) // Logs Gary Miller
const fieldName = "age"
console.log(guy[fieldName]) // Logs 34

course.level = "Basic"
course.credits = 4
console.log(course)
