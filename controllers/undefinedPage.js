const { UndefinedError } = require('../errors/UndefinedError');

module.exports.undefinedPage = (req, res) => {
  const newErr = new UndefinedError('Запрашиваемая страница не найдена');
  return res.status(newErr.statusCode).send({ message: newErr.message });
};
