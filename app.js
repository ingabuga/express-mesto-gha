const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { handleError } = require('./utils/utils');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { LINK_REG_EXP } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .pattern(LINK_REG_EXP),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
  }),
  createUser,
);

router.use('/users', auth, require('./routers/users'));
router.use('/cards', auth, require('./routers/cards'));

router.use(errors());
router.use(() => {
  throw new NotFoundError();
});

module.exports = router;
// app.use('/', require('./routers/index'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
