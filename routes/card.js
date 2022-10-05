const cardRouters = require('express').Router();
const {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const { checkIfICanDeleteCard } = require('../middlewares/checkIfICanDeleteCard');

cardRouters.post('/', createCard);

cardRouters.delete('/:cardId', checkIfICanDeleteCard, deleteCard);

cardRouters.get('/', getCards);

cardRouters.put('/:cardId/likes', likeCard);

cardRouters.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRouters };
