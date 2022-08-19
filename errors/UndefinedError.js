const { UndefinedErrorCode } = require('./responseStatuses');

module.exports.UndefinedError = class UndefinedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UndefinedError';
    this.statusCode = UndefinedErrorCode;
  }
};
