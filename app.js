const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');
const { handleError } = require('./utils/utils');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
