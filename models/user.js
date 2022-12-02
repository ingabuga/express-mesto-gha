const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const AuthError = require('../errors/AuthError');
// const NotFoundError = require('../errors/NotFoundError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (email) => validator.isURL(email),
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .orFail(() => {
            throw new AuthError();
          })
          .then((user) => bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new AuthError();
              }
              return user;
            }));
      },
      // findUserById(id, res, next) {
      //   return this.findById(id)
      //     .orFail(() => {
      //       throw new NotFoundError();
      //     })
      //     .then((user) => res.send({ data: user }))
      //     .catch(next);
      // },
      // updateUserData(id, res, next, params) {
      //   return this.findByIdAndUpdate(id, params, { new: true, runValidators: true })
      //     .orFail(() => {
      //       throw new NotFoundError();
      //     })
      //     .then((user) => res.send({ data: user }))
      //     .catch(next);
      // },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
