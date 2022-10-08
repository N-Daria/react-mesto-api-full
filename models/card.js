const mongoose = require('mongoose');
const user = require('./user');

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
      validator: (v) => {
        // eslint-disable-next-line no-useless-escape
        const regex = /^(http(s)?:\/{2})((w{3}\.)?)([\w\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+)$(#)?/im;
        return v.match(regex);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
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
