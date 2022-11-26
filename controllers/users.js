const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError } = require('../error/NotFoundError');
const {
  BAD_REQUEST_ERROR,
  ITERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  OK_CODE,
  ITERNAL_SERVER_MESSAGE,
} = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK_CODE).send({ data: users }))
    .catch(() => res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new NotFoundError();
      throw error;
    })
    .then((user) => res.send({ data: user }))
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

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      },
    }))
    .catch(next);
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new NotFoundError();
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.code).send({ message: err.message });
      } else if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new NotFoundError();
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
