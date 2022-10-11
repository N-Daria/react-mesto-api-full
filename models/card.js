const mongoose = require('mongoose');
const user = require('./user');
const { regExUrl } = require('../utils/utils');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => { v.match(regExUrl); },
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    ref: user,
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  likes: [{
    default: [],
    type: mongoose.Schema.ObjectId,
    ref: user,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
