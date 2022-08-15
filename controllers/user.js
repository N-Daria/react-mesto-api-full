const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
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
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
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
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
}