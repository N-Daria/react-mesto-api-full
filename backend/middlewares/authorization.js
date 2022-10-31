require('dotenv').config();
const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/AuthentificationError');

const { JWT_SECRET } = process.env;

module.exports.authorization = (req, res, next) => {
  // const authorization = req.cookies.token;
  let { authorization } = req.headers;

  authorization = authorization.replace('Bearer', '');

  if (!authorization) {
    const err = new AuthentificationError('Необходима авторизация');
    return next(err);
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (error) {
    const err = new AuthentificationError('Необходима авторизация');
    return next(err);
  }

  req.user = payload;

  return next();
};
