const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('Hello world!!');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

// Подключаем Mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
