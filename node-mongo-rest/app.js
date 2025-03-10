// app.js
const express = require('express');
const bodyParser = require('body-parser');
const Person = require('../person');

const app = express();
app.use(bodyParser.json());

// GET /person
app.get('/person', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching persons' });
  }
});

// POST /person
app.post('/person', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    res.status(400).json({ message: 'Error creating person' });
  }
});

// PUT /person/:id
app.put('/person/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPerson = await Person.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(updatedPerson);
  } catch (err) {
    res.status(500).json({ message: 'Error updating person' });
  }
});

// DELETE /person/:id
app.delete('/person/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Person.findByIdAndRemove(id);
    res.status(204).json({ message: 'Person deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Person not found' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
