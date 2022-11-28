const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../error/NotFoundError');
const DataError = require('../error/DataError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      deafault: 'Жак Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      deafault: 'Исследователь океана',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      deafault: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) => validator.isEmail(v),
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  {
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .orFail(() => {
            throw new DataError();
          })
          .then((user) => bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new DataError();
              }
              return user;
            }));
      },
      findUserById(id, res, next) {
        return this.findById(id)
          .orFail(() => {
            throw new NotFoundError();
          })
          .then((user) => res.send({ data: user }))
          .catch(next);
      },
      updateUserData(id, res, next, params) {
        return this.findByIdAndUpdate(id, params, { new: true, runValidators: true })
          .orFail(() => {
            throw new NotFoundError();
          })
          .then((user) => res.send({ data: user }))
          .catch(next);
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
