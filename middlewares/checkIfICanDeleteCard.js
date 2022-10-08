const { UndefinedError } = require('../errors/UndefinedError');
const { OtherUserInfoError } = require('../errors/OtherUserInfoError');
const Card = require('../models/card');

module.exports.checkIfICanDeleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new UndefinedError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      const owner = card.owner.toString();
      if (owner === req.user._id) {
        return next();
      }

      throw new OtherUserInfoError('Недостаточно прав для удаления чужой карточки');
    })
    .catch(next);
};
