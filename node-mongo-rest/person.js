// person.js
const mongoose = require('./db');

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mobileNumber: String,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
