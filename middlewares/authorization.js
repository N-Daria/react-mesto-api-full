const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/AuthentificationError');

module.exports.authorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new AuthentificationError('Необходима авторизация');
    return res.status(err.statusCode).send({ message: err.message });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'hellohello');
  } catch (error) {
    const err = new AuthentificationError('Необходима авторизация');
    return res.status(err.statusCode).send({ message: err.message });
  }

  req.user = payload;

  return next();
};
