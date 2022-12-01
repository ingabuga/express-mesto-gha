const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const {
  ITERNAL_SERVER_ERROR,
  ITERNAL_SERVER_MESSAGE,
} = require('./utils/constants');
// const { handleError } = require('./utils/utils');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', require('./routers/index'));

app.use(errors());
// eslint-disable-next-line no-unused-vars
// app.use((err, req, res, next) => {
//   handleError(err, res);
// });

app.use((req, res, next) => {
  res.status(ITERNAL_SERVER_ERROR).send({ ITERNAL_SERVER_MESSAGE });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
