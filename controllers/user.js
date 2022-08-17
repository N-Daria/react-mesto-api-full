const User = require('../models/user');
const { ValidationError, UndefinedError, OtherError } = require('../errors/Error');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const newErr = new ValidationError('Переданы некорректные данные');
        return res.status(newErr.statusCode).send(newErr.message)
      }
      const otherErr = new OtherError(`Произошла ошибка: ${err.name}, ${err.message}`)
      res.status(otherErr.statusCode).send({ message: otherErr.message })
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UndefinedError('Запрашиваемый пользователь не найден');
    })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "UndefinedError") return res.status(err.statusCode).send({ message: err.message })

      const otherErr = new OtherError(`Произошла ошибка: ${err.name}, ${err.message}`)
      res.status(otherErr.statusCode).send({ message: otherErr.message })
    });
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      const otherErr = new OtherError(`Произошла ошибка: ${err.name}, ${err.message}`)
      res.status(otherErr.statusCode).send({ message: otherErr.message })
    });
}

module.exports.updateProfileInfo = (req, res) => {
  const userID = req.user._id;

  User.findByIdAndUpdate(
    userID,
    {
      name: req.body.name,
      about: req.body.about
    },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  )
    .orFail(() => {
      throw new UndefinedError('Запрашиваемый пользователь не найден');
    })
    .then(info => res.send({ data: info }))
    .catch((err) => {
      if (err.name === "UndefinedError") return res.status(err.statusCode).send({ message: err.message })

      if (err.name === "ValidationError") {
        const newErr = new ValidationError('Переданы некорректные данные');
        return res.status(newErr.statusCode).send(newErr.message)
      }
      const otherErr = new OtherError(`Произошла ошибка: ${err.name}, ${err.message}`)
      res.status(otherErr.statusCode).send({ message: otherErr.message })
    });
}

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
      upsert: true
    }
  )
    .orFail(() => {
      throw new UndefinedError('Запрашиваемый пользователь не найден');
    })
    .then(info => res.send({ data: info }))
    .catch((err) => {
      if (err.name === "UndefinedError") return res.status(err.statusCode).send({ message: err.message })

      if (err.name === "ValidationError") {
        const newErr = new ValidationError('Переданы некорректные данные');
        return res.status(newErr.statusCode).send(newErr.message)
      }
      const otherErr = new OtherError(`Произошла ошибка: ${err.name}, ${err.message}`)
      res.status(otherErr.statusCode).send({ message: otherErr.message })
    });
}