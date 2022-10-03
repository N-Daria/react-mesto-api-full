const User = require('../models/user');
const { OtherError } = require('../errors/OtherError');
const { UndefinedError } = require('../errors/UndefinedError');
const { ValidationError } = require('../errors/ValidationError');
const { IncorrectDataError } = require('../errors/IncorrectDataError');

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UndefinedError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'UndefinedError') return res.status(err.statusCode).send({ message: err.message });

      if (err.name === 'CastError') {
        const newErr = new IncorrectDataError('Передан некорректный id');
        return res.status(newErr.statusCode).send({ message: newErr.message });
      }

      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    });
};

module.exports.updateProfileInfo = (req, res) => {
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
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'UndefinedError') return res.status(err.statusCode).send({ message: err.message });

      if (err.name === 'ValidationError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        return res.status(newErr.statusCode).send({ message: newErr.message });
      }

      if (err.name === 'CastError') {
        const newErr = new IncorrectDataError('Передан некорректный id');
        return res.status(newErr.statusCode).send({ message: newErr.message });
      }

      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    });
};

module.exports.updateProfilePhoto = (req, res) => {
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
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'UndefinedError') return res.status(err.statusCode).send({ message: err.message });

      if (err.name === 'ValidationError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        return res.status(newErr.statusCode).send({ message: newErr.message });
      }

      if (err.name === 'CastError') {
        const newErr = new IncorrectDataError('Передан некорректный id');
        return res.status(newErr.statusCode).send({ message: newErr.message });
      }

      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    });
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'UndefinedError') { return res.status(err.statusCode).send({ message: err.message }); }

      if (err.name === 'CastError') {
        const newErr = new IncorrectDataError('Передан некорректный id');
        return res.status(newErr.statusCode).send({ message: newErr.message });
      }

      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    });
};
