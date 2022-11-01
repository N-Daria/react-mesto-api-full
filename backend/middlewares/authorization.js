require('dotenv').config();
const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/AuthentificationError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.authorization = (req, res, next) => {
  let { authorization } = req.headers;

  authorization = authorization.replace('Bearer', '');

  if (!authorization) {
    const err = new AuthentificationError('Необходима авторизация');
    return next(err);
  }

  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    const err = new AuthentificationError('Необходима авторизация');
    return next(err);
  }

  req.user = payload;

  return next();
};
