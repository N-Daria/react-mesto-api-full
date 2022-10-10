const User = require('../models/user');
const { UndefinedError } = require('../errors/UndefinedError');
const { ValidationError } = require('../errors/ValidationError');
const { succesCode } = require('../errors/responseStatuses');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UndefinedError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(succesCode).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new ValidationError('Передан некорректный id');
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(succesCode).send({ data: users }))
    .catch(next);
};

module.exports.updateProfileInfo = (req, res, next) => {
  const userID = req.user._id;

  User.findByIdAndUpdate(
    userID,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new UndefinedError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(succesCode).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.updateProfilePhoto = (req, res, next) => {
  const userID = req.user._id;

  User.findByIdAndUpdate(
    userID,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new UndefinedError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(succesCode).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(succesCode).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new ValidationError('Передан некорректный id');
        return next(newErr);
      }

      return next(err);
    });
};
