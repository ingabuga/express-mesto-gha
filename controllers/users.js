const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const { CREATED_ERROR, EMAIL_MESSAGE, BAD_REQUEST_MESSAGE } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
// const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const EmailError = require('../errors/EmailError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Неверный запрос или данные'));
      } else {
        next(err);
      }
    });
};

// const createUser = (req, res, next) => {
//   const {
//     name,
//     about,
//     avatar,
//     password,
//     email,
//   } = req.body;

//   bcrypt.hash(password, 10)
//     .then((hash) => User.create({
//       name,
//       about,
//       avatar,
//       email,
//       password: hash,
//     }))
//     .then((user) => res.status(CREATED_ERROR).send({
//       data: {
//         name: user.name,
//         about: user.about,
//         avatar: user.avatar,
//         email: user.email,
//         _id: user._id,
//       },
//     }))
//     .catch((err) => {
//       if (err.code === 11000) {
//         return next(new ConflictError(EMAIL_MESSAGE));
//       }
//       if (err.name === 'ValidationError') {
//         return next(new BadRequestError(BAD_REQUEST_MESSAGE));
//       }
//       return next(err);
//     });
// };

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    password,
    email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    // .catch((err) => {
    //   if (err.code === 11000) {
    //     next(new EmailError('Пользователь с таким email уже существует'));
    //   } else if (err.name === 'ValidationError') {
    //     next(new BadRequestError('Переданы некорректные данные'));
    //   } else {
    //     next(err);
    //   }
    // });

    .catch((err) => {
      if (err.code === 11000) {
        return next(new EmailError('Пользователь с таким email уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные не корректны'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true }).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
};
