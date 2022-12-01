const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const DataAccessError = require('../errors/DataAccessError');
const { CREATED_ERROR } = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED_ERROR).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Данные не корректны'));
      }
      return next(err);
    });
};

const removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      const isOwn = card.owner.toString() === req.user._id;
      if (!isOwn) {
        throw new ForbiddenError('Нельзя удалить карточку другого пользователя');
      } else {
        return card.remove()
          .then(() => res.send({ data: card }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataAccessError('Переданы некорректные данные для удалении карточки.'));
      } else {
        next(err);
      }
    });
};

// const likeCard = (req, res, next) => {
//   Card.handleLikeToggle(req, res, next, '$addToSet');
// };

// const likeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Карточка не найдена');
//       }
//       return res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return next(new BadRequestError('Некорректные данные карточки'));
//       }
//       return next(err);
//     });
// };

// const dislikeCard = (req, res, next) => {
//   Card.handleLikeToggle(req, res, next, '$pull');
// };

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })

    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
