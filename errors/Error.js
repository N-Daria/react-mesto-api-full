const { UndefinedErrorCode, ValidationErrorCode, otherErrorCode } = require('./errorStatus')

module.exports.ValidationError = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = ValidationErrorCode;
  }
}

module.exports.UndefinedError = class UndefinedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UndefinedError";
    this.statusCode = UndefinedErrorCode;
  }
}

module.exports.OtherError = class OtherError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = otherErrorCode;
  }
}

