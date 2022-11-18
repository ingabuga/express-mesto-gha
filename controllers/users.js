const User = require('../models/user');
const { handleError } = require('../utils/utils');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports = { getUsers, getUser, createUser };
