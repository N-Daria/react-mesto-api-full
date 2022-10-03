const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/AuthentificationError');

const { JWT_SECRET } = process.env;

module.exports.authorization = (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    const err = new AuthentificationError('Необходима авторизация');
    return res.status(err.statusCode).send({ message: err.message });
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (error) {
    const err = new AuthentificationError('Необходима авторизация');
    return res.status(err.statusCode).send({ message: err.message });
  }

  req.user = payload;

  return next();
};
