const { OtherError } = require('../errors/OtherError');
const { AlreadyExsistsError } = require('../errors/AlreadyExsistsError');

module.exports.errorHandling = (err, req, res, next) => {
  if (err.code === 11000) {
    const otherErr = new AlreadyExsistsError('На сервере произошла ошибка');
    return res.status(otherErr.statusCode).send({ message: otherErr.message });
  }

  switch (err.name) {
    case 'AuthentificationError':
      return res.status(err.statusCode).send({ message: err.message });
    case 'IncorrectDataError':
      return res.status(err.statusCode).send({ message: err.message });
    case 'UndefinedError':
      return res.status(err.statusCode).send({ message: err.message });
    case 'ValidationError':
      return res.status(err.statusCode).send({ message: err.message });
    default: {
      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    }
  }
};
