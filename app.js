const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6377b3cbbbada9c40332962e',
  };
  next();
});

app.use('/users', require('./routers/users'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
