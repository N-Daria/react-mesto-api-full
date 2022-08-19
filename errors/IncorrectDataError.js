const { ValidationError } = require('./ValidationError');

module.exports.IncorrectDataError = class IncorrectDataError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'IncorrectData';
  }
};
