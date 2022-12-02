const jwt = require('jsonwebtoken');
const DataAccessError = require('../errors/AuthError');
const { AUTH_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new DataAccessError(AUTH_MESSAGE));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new DataAccessError(AUTH_MESSAGE));
  }
  req.user = payload;
  next();
};
