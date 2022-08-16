const User = require('../models/user');

const UndefinedError = 404;
const invalidDataError = 400;
const otherError = 500;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") return res.status(invalidDataError).send({ message: "Переданы некорректные данные" })
      res.status(otherError).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` })
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('Запрашиваемый пользователь не найден');
      error.name("UndefinedError");
      throw error
    })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "UndefinedError") return res.status(UndefinedError).send({ message })
      if (err.name === "TypeError") return res.status(invalidDataError).send({ message: "Переданы некорректные данные" })
      res.status(otherError).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` })
    });
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      res.status(otherError).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` })
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
    .then(info => res.send({ data: info }))
    .catch((err) => {
      res.status(otherError).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` })
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
    .then(info => res.send({ data: info }))
    .catch((err) => {
      res.status(otherError).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` })
    });
}