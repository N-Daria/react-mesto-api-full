const Card = require('../models/card');
const { UndefinedError } = require('../errors/UndefinedError');
const { ValidationError } = require('../errors/ValidationError');
const { OtherUserInfoError } = require('../errors/OtherUserInfoError');
const { createdSuccesCode } = require('../errors/responseStatuses');

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(createdSuccesCode).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new UndefinedError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      const owner = card.owner.toString();
      if (owner !== req.user._id) {
        throw new OtherUserInfoError('Недостаточно прав для удаления чужой карточки');
      }
      card.delete().then(() => {
        res.send({ message: 'Карточка удалена' });
      })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new ValidationError('Передан некорректный id');
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new UndefinedError('Запрашиваемая карточка не найдена');
    })
    .then((card) => res.status(createdSuccesCode).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new ValidationError('Передан некорректный id');
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new UndefinedError('Запрашиваемая карточка не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new ValidationError('Передан некорректный id');
        return next(newErr);
      }

      return next(err);
    });
};
