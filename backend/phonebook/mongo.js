import mongoose from 'mongoose';

// Check that password is provided
if (process.argv.length < 3) {
  console.log('Ivalid usage: no password provided');
  console.log('HOW TO USE:');
  console.log('Add entry:         node mongo.js <password> <name> <number>');
  console.log('Get all entries:   node mongo.js <password>');
  process.exit(1);
}

// Retrieve password and include it in db url
const password = process.argv[2];
const url = `mongodb+srv://m0riarty:${password}@fs-open.nyuqpsf.mongodb.net/phoneBookApp?retryWrites=true&w=majority`;

// Create schema for the Person model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});
// Add Person model to mongoose config
const Person = mongoose.model('Person', personSchema);

const addPerson = (name, number) => {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: name,
        number: number,
        id: getUUID(),
      });
      return person.save();
    })
    .then(() => {
      console.log(`Added ${name} (${number}) to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
};

const getAllPersons = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log('phonebook:');
      Person.find({}).then((people) => {
        people.forEach((i) => console.log(`${i.name}    ${i.number}`));
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
};

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];
  addPerson(name, number);
} else {
  getAllPersons();
}

const getUUID = () => {
  return Math.round(Math.random() * 10000000);
};
