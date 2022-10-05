const { AuthentificationError } = require('../errors/AuthentificationError');
const Card = require('../models/card');
const { OtherError } = require('../errors/OtherError');
const { UndefinedError } = require('../errors/UndefinedError');

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

      throw new AuthentificationError('Недостаточно прав для удаления чужой карточки');
    })
    .catch((err) => {
      if (err.name === 'UndefinedError') return res.status(err.statusCode).send({ message: err.message });

      if (err.name === 'AuthentificationError') return res.status(err.statusCode).send({ message: err.message });

      const otherErr = new OtherError('На сервере произошла ошибка');
      return res.status(otherErr.statusCode).send({ message: otherErr.message });
    });
};
