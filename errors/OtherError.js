const { otherErrorCode } = require('./errorStatus');

module.exports.OtherError = class OtherError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = otherErrorCode;
  }
};
