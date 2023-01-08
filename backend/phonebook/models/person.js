import mongoose from 'mongoose';

const url = process.env.MONGODB_URI;

console.log(`Connecting to ${url}`);

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Error connecting to MongoDB: ', e.message));

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Person', personSchema);
