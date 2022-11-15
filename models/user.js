const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // имя пользователя
    type: String, // имя это строка
    required: true, // обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: { // информация о пользователе
    type: String, // имя — это строка
    required: true, // обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: { // ссылка на аватарку
    type: String, // строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
});

module.exports = mongoose.model('user', userSchema);
