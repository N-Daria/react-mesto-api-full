const { ValidationErrorCode } = require('./responseStatuses');

module.exports.ValidationError = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = ValidationErrorCode;
  }
};
