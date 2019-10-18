const mongoose = require('mongoose');
require('mongoose-type-email');

const { Schema } = mongoose;

const User = new Schema({
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 50,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    minlength: 1,
    maxlength: 20,
    trim: true,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', User);
