const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OtherError } = require('../errors/OtherError');
const User = require('../models/user');
const { createdSuccesCode } = require('../errors/responseStatuses');
const { ValidationError } = require('../errors/ValidationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      });
      res.send({ _id: user._id });
    })
    .catch((err) => {
      if (err.name === 'AuthentificationError') return res.status(err.statusCode).send({ message: err.message });

      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    });
};

module.exports.createUser = (req, res) => {
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
        return res.status(newErr.statusCode).send({ message: newErr.message });
      }
      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    });
};
