const User = require('../models/user');
const { UndefinedError } = require('../errors/UndefinedError');
const { ValidationError } = require('../errors/ValidationError');
const { IncorrectDataError } = require('../errors/IncorrectDataError');
const { createdSuccesCode } = require('../errors/responseStatuses');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UndefinedError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(createdSuccesCode).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new IncorrectDataError('Передан некорректный id');
        next(newErr);
      }

      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(createdSuccesCode).send({ data: users }))
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
    .then((user) => res.status(createdSuccesCode).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        next(newErr);
      } else if (err.name === 'CastError') {
        const newErr = new IncorrectDataError('Передан некорректный id');
        next(newErr);
      }

      next(err);
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
    .then((user) => res.status(createdSuccesCode).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        next(newErr);
      } else if (err.name === 'CastError') {
        const newErr = new IncorrectDataError('Передан некорректный id');
        next(newErr);
      }

      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(createdSuccesCode).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new IncorrectDataError('Передан некорректный id');
        next(newErr);
      }

      next(err);
    });
};
