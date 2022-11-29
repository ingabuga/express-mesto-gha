const Card = require('../models/card');
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
    .then((cards) => res.status(OK_CODE).send({ data: cards }))
    .catch(() => res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      } else {
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
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.code).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE });
      }
    });
};

const setLike = (req, res, next) => {
  Card.handleLike(req, res, next, '$addToSet');
};

const removeLike = (req, res, next) => {
  Card.handleLike(req, res, next, '$pull');
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  setLike,
  removeLike,
};
