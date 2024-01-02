require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://lopezivan763:o22n3NsIW3dlEFdr@cluster0.fqknf1f.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


module.exports = mongoose.connection;