const cardRouters = require('express').Router();
const {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cardRouters.post('/cards', createCard);

cardRouters.delete('/cards/:cardId', deleteCard);

cardRouters.get('/cards', getCards);

cardRouters.put('/cards/:cardId/likes', likeCard);

cardRouters.delete('/cards/:cardId/likes', dislikeCard);

module.exports = { cardRouters };
