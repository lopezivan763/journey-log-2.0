require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/journey-log');

module.exports = mongoose.connection;

// || 'mongodb://127.0.0.1:27017/journey-log'