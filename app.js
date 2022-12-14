const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  CORS_CONFIG,
} = require('./utils/constants');
const { errorLogger } = require('./middlewares/logger');

const { PORT = 3001, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use('*', cors(CORS_CONFIG));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use('/', require('./routers/index'));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
  }
});

app.listen(PORT);
