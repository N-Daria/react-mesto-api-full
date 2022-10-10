const { OtherError } = require('../errors/OtherError');

// eslint-disable-next-line no-unused-vars
module.exports.errorHandling = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  const otherErr = new OtherError('На сервере произошла ошибка');
  return res.status(otherErr.statusCode).send({ message: otherErr.message });
};
