const mongoose = require('mongoose');

const { Schema } = mongoose;

const Password = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Password', Password);
