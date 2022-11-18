const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(400).send(err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error(err.name, '=', err.message);
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        console.error('err =', err.message);
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        console.error('err = ', err.message);
        res.status(404).send({ message: 'Карточка с таким id не найдена в базе' });
      } else {
        console.error('err = ', err.message);
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
