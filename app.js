const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { handleError } = require('./utils/utils');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL);
app.use('/', (req, res, next) => {
  req.user = {
    _id: '6377d4ed2bec3f253f899062',
  };
  next();
});

app.use('/', require('./routers/index'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT);
