const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/AuthentificationError');

const { JWT_SECRET } = process.env;

module.exports.authorization = (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    const err = new AuthentificationError('Необходима авторизация');
    next(err);
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (error) {
    const err = new AuthentificationError('Необходима авторизация');
    next(err);
  }

  req.user = payload;

  return next();
};
