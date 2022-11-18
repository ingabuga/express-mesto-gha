const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const errorRouter = require('./error');

router.use(
  usersRouter,
  cardsRouter,
  errorRouter,
);

module.exports = router;
