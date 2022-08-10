const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  // res.send(req.body)
  // console.log(req.body)
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  res.send(req.body)
  // res.findById(req.params.userId)
  //   .then(user => res.send({ data: user }))
  //   .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUsers = (req, res) => {
  // res.send(users)

  // res.find({})
  //   .then(user => res.send({ data: user }))
  //   .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}