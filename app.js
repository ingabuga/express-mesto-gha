const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
// const cards = require('./routes/cards');

const app = express();

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '637539a162602532de4985a8', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

// Подключаем Mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', users);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
