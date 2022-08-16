const Card = require('../models/card')

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}, ${err.name}` }));
};
