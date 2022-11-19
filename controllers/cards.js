const Card = require('../models/card');
const { handleError } = require('../utils/utils');
const { NotFoundError } = require('../error/NotFoundError');
const {
  BAD_REQUEST_ERROR,
  ITERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  OK_CODE,
  ITERNAL_SERVER_MESSAGE,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res));
};

// const createCard = (req, res) => {
//   const { name, link } = req.body;
//   Card.create({ name, link, owner: req.user._id }, (err, newCard) => {
//     if (err) {
//       handleError(err, res);
//       return;
//     }
//     Card.findById(newCard._id)
//       .populate(['owner', 'likes'])
//       .then((card) => res.send({ data: card }))
//       .catch((evt) => handleError(evt, res)); //
//   });
// };

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error(err.name, '=', err.message);
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        console.error('err =', err.message);
        res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE });
      }
    });
};

const removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new NotFoundError();
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new NotFoundError();
      throw error;
    })
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new NotFoundError();
      throw error;
    })
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  setLike,
  removeLike,
};
