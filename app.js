const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const { PAGE_NOT_FOUND_ERROR, PAGE_NOT_FOUND_MESSAGE } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

// app.use('/', (req, res, next) => {
//   req.user = {
//     _id: '6377d4ed2bec3f253f899062',
//   };
//   next();
// });

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.use((req, res) => {
  res.status(PAGE_NOT_FOUND_ERROR).send({ message: PAGE_NOT_FOUND_MESSAGE });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
