require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createdSuccesCode } = require('../errors/responseStatuses');
const { ValidationError } = require('../errors/ValidationError');
const { AlreadyExsistsError } = require('../errors/AlreadyExsistsError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(createdSuccesCode).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        return next(newErr);
      }
      if (err.code === 11000) {
        const newErr = new AlreadyExsistsError('Такой email уже зарегестрирован');
        return next(newErr);
      }

      return next(err);
    });
};
