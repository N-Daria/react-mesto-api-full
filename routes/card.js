const { celebrate, Joi } = require('celebrate');
const cardRouters = require('express').Router();
const {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const { checkIfICanDeleteCard } = require('../middlewares/checkIfICanDeleteCard');

cardRouters.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().pattern(/^(http(s)?:\/{2})((w{3}\.)?)([\w\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+)$(#)?/im),
  }).unknown(true),
}), createCard);

cardRouters.delete('/:cardId', checkIfICanDeleteCard, deleteCard);

cardRouters.get('/', getCards);

cardRouters.put('/:cardId/likes', likeCard);

cardRouters.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRouters };
