const cardRouters = require('express').Router();
const {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cardRouters.post('/', createCard);

cardRouters.delete('/:cardId', deleteCard);

cardRouters.get('/', getCards);

cardRouters.put('/:cardId/likes', likeCard);

cardRouters.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRouters };
