const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
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

module.exports = {
  getUsers,
  getUser,
  createUser,
};
