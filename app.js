const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const NOT_FOUND_CODE = 404;
const NOT_FOUND_MESSAGE = 'Данные не найдены';

// const { NOT_FOUND_CODE, NOT_FOUND_MESSAGE } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', (req, res, next) => {
  req.user = {
    _id: '637539a162602532de4985a8',
  };
  next();
});

// Подключаем Mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));

app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_MESSAGE });
});

app.listen(PORT);
