const http = require("http");

const persons = [
  {
    name: "Dan Abramov",
    number: "123-123",
    id: 1,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 2,
  },
  {
    name: "Peter Shaw",
    number: "01805-4646",
    id: 3,
  },
  {
    name: "Jim Moriarty",
    number: "000-424242",
    id: 4,
  },
];

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(persons));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Listening on Port ${PORT}`);
