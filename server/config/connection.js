const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://blaulmax:journeylog@cluster0.ga4cgy2.mongodb.net/?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,

}
);

module.exports = mongoose.connection;
