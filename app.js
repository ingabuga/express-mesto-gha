const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', (req, res, next) => {
  req.user = {
    _id: '66377b473a27d23cb67389774',
  };
  next();
});

app.use('/users', require('./routers/users'));
app.use('/users', require('./routers/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
